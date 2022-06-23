import React, { useState, useRef } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { createCard } from './../graphql/mutations'
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { CloseOutlined } from '@mui/icons-material'
import SendIcon from '@mui/icons-material/Send'
import { Board } from './Board'

import './Main.css'

const initialCardState = {
  title: '',
  description: '',
  status: 'todo',
}
const initialStatuses = [
  { name: 'ToDo', cards: '' },
  { name: 'In Progress', cards: '' },
  { name: 'Done', cards: '' },
]

export const Main = () => {
  const [inputState, setInputState] = useState(initialCardState)
  // const [inputStatus, setInputStatus] = useState(initialStatuses)

  const [cards, setCards] = useState([])
  const [open, setOpen] = React.useState(false)

  const triggerFetch = useRef(null)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  function setInput(key, value) {
    setInputState({ ...inputState, [key]: value })
  }

  async function addCard() {
    try {
      if (!inputState.title || !inputState.description) return
      const card = { ...inputState }
      setCards([...cards, card])
      setInputState(initialCardState)
      await API.graphql(
        graphqlOperation(createCard, {
          input: card,
        })
      )
    } catch (err) {
      console.log('error creating card:', err)
    }
    handleClose()
    triggerFetch.current()
  }

  return (
    <div className="Main">
      <div>
        {/* Create a new story on the board  */}
        <Button variant="contained" onClick={handleClickOpen}>
          Create story
        </Button>
        <Dialog fullWidth open={open} onClose={handleClose}>
          <DialogTitle>Create a story</DialogTitle>
          <DialogContent>
            <TextField
              required
              margin="normal"
              label="Title"
              value={inputState.title}
              onChange={(event) => setInput('title', event.target.value)}
            />
            <TextField
              required
              fullWidth
              margin="normal"
              label="Description"
              value={inputState.description}
              onChange={(event) => setInput('description', event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={addCard}
              startIcon={<SendIcon />}
            >
              Create
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
      <Board triggerFetch={triggerFetch} />
    </div>
  )
}
