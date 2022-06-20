/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import { styled, Typography, Box, Paper, Grid } from '@mui/material';
import { useDrop } from 'react-dnd';
import { BasicCard } from './BasicCard';
import { listCards, listStatuses } from './../graphql/queries';
import { updateCard } from '../graphql/mutations';

const Column = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#cbcbcc',
  ...theme.typography.body2,
  height: '90%',
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export const Board = (triggerFetch) => {
  const [cards, setCards] = useState([]);

  const [{ isOverToDo }, droptoToDo] = useDrop(() => ({
    accept: 'card',
    drop: (item) => addCardToBoard(item.id, 'todo'),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [{ isOverDoing }, droptoDoing] = useDrop(() => ({
    accept: 'card',
    drop: (item) => addCardToBoard(item.id, 'doing'),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [{ isOverDone }, droptoDone] = useDrop(() => ({
    accept: 'card',
    drop: (item) => addCardToBoard(item.id, 'done'),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  async function addCardToBoard(id, status) {
    try {
      const cardData = await API.graphql(graphqlOperation(listCards));
      const cards = cardData.data.listCards.items;
      const cardSelected = cards.filter((card) => id === card.id);
      cardSelected[0].status = status;
      delete cardSelected[0].createdAt;
      delete cardSelected[0].updatedAt;
      await API.graphql(
        graphqlOperation(updateCard, { input: cardSelected[0] })
      );
    } catch (err) {
      console.log('error updating card:', err);
    }
  }

  useEffect(() => {
    fetchCards();
  }, [triggerFetch, cards]);

  async function fetchCards() {
    try {
      const cardData = await API.graphql(graphqlOperation(listCards));
      const cards = cardData.data.listCards.items;
      setCards(cards);
    } catch (err) {
      console.log('error fetching cards', err);
    }
  }
  return (
    <>
      <Box
        sx={{
          width: 0.9,
          height: 0.9,
          padding: 4,
          flexGrow: 1,
        }}
      >
        <Grid container spacing={2} columns={12}>
          <Grid item xs={4}>
            <Column elevation={12} ref={droptoToDo}>
              <div>
                <Typography variant="h4" component="div">
                  ToDo
                </Typography>
                {cards
                  .filter((card) => {
                    if (card.status === 'todo') return card;
                  })
                  .map((card, index) => (
                    <div key={card.id ? card.id : index}>
                      <BasicCard card={card} />
                    </div>
                  ))}
              </div>
            </Column>
          </Grid>
          <Grid item xs={4}>
            <Column elevation={12} ref={droptoDoing}>
              <div>
                <Typography variant="h4" component="div">
                  Doing...
                </Typography>
                {cards
                  .filter((card) => {
                    if (card.status === 'doing') return card;
                  })
                  .map((card, index) => (
                    <div key={card.id ? card.id : index}>
                      <BasicCard card={card} />
                    </div>
                  ))}
              </div>
            </Column>
          </Grid>
          <Grid item xs={4}>
            <Column elevation={12} ref={droptoDone}>
              <div>
                <div>
                  <div>
                    <Typography variant="h4" component="div">
                      Done!
                    </Typography>
                    {cards
                      .filter((card) => {
                        if (card.status === 'done') return card;
                      })
                      .map((card, index) => (
                        <div key={card.id ? card.id : index}>
                          <BasicCard card={card} />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </Column>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
