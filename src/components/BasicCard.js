import React, { useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import {
  Typography,
  Card,
  CardContent,
  styled,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { CloseOutlined } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit'
import UpgradeIcon from '@mui/icons-material/Upgrade'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDrag } from 'react-dnd'
import { updateCard, deleteCard } from '../graphql/mutations'

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(1),
}))

const StyledTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'left',
}))

const StyledButton = styled(Button)(({ theme }) => ({
  float: 'right',
}))

const StyledLabelButton = styled(Button)(({ theme }) => ({
  float: 'right',
  cursor: 'none',
}))

const initialCardState = {
  id: '',
  title: '',
  description: '',
  status: '',
}

export const BasicCard = ({ children, card, ...props }) => {
  const [open, setOpen] = React.useState(false)

  const [selectedCard, setSelectedCard] = useState(initialCardState)

  //make card draggable between columns
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'card',
    item: { id: card.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  //update card details
  function setInput(key, value) {
    setSelectedCard({ ...selectedCard, [key]: value })
  }

  const handleClose = () => {
    setOpen(false)
  }

  function openEditorBox(card) {
    setSelectedCard(card)
    setOpen(true)
  }

  async function updateThisCard() {
    try {
      if (!selectedCard.title || !selectedCard.description) return
      delete selectedCard.createdAt
      delete selectedCard.updatedAt
      await API.graphql(graphqlOperation(updateCard, { input: selectedCard }))
    } catch (err) {
      console.log('error updating card:', err)
    }
    handleClose()
  }

  async function deleteThisCard() {
    try {
      const id = selectedCard.id
      await API.graphql(graphqlOperation(deleteCard, { input: { id } }))
    } catch (err) {
      console.log('error deleting card:', err)
    }
    handleClose()
  }

  return (
    <>
      <div
        ref={drag}
        style={{ border: isDragging ? '3px solid #cc0000' : '0px' }}
      >
        <StyledCard sx={{ maxWidth: 1 }}>
          <CardContent>
            <StyledTypography variant="h5" component="div">
              {card.title}
            </StyledTypography>
            <StyledTypography variant="body2">
              {card.description}
            </StyledTypography>
          </CardContent>

          <StyledButton
            onClick={(event) => openEditorBox(card)}
            startIcon={<EditIcon />}
          >
            Edit
          </StyledButton>
        </StyledCard>
      </div>
      <div>
        <Dialog fullWidth open={open} onClose={handleClose}>
          <DialogTitle>
            Edit story details:
            <StyledLabelButton
              variant="contained"
              color={selectedCard.status === 'done' ? 'success' : 'warning'}
            >
              {selectedCard.status}
            </StyledLabelButton>
          </DialogTitle>
          <DialogContent>
            <TextField
              margin="normal"
              label="Title"
              value={selectedCard.id}
              onChange={(event) => setInput('id', event.target.value)}
              sx={{ display: 'none' }}
            />

            <TextField
              required
              margin="normal"
              label="Title"
              value={selectedCard.title}
              onChange={(event) => setInput('title', event.target.value)}
            />
            <TextField
              required
              fullWidth
              margin="normal"
              label="Description"
              value={selectedCard.description}
              onChange={(event) => setInput('description', event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={updateThisCard}
              startIcon={<UpgradeIcon />}
            >
              Update
            </Button>
            <Button
              variant="contained"
              onClick={deleteThisCard}
              startIcon={<DeleteIcon />}
              color="error"
            >
              Delete
            </Button>
            <Button
              variant="contained"
              onClick={handleClose}
              endIcon={<CloseOutlined />}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}
