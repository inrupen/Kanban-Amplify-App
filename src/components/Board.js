import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { BasicCard } from './BasicCard';
import { listCards, listStatuses } from './../graphql/queries';

const Column = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#cbcbcc',
  ...theme.typography.body2,
  height: 500,
  padding: theme.spacing(1),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const Board = (triggerFetch) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchCards();
  }, [triggerFetch]);

  async function fetchCards() {
    try {
      const cardData = await API.graphql(graphqlOperation(listCards));
      const cards = cardData.data.listCards.items;
      console.log('***', cards);
      setCards(cards);
    } catch (err) {
      console.log('error fetching cards', err);
    }
  }
  console.log('cards', cards);
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
            <Column elevation={12}>
              <div>
                <div>ToDo</div>
                {cards.map((card, index) => (
                  <div key={card.id ? card.id : index}>
                    <BasicCard
                      title={card.title}
                      description={card.description}
                    />
                  </div>
                ))}
              </div>
            </Column>
          </Grid>
          <Grid item xs={4}>
            <Column elevation={12}>Doing</Column>
          </Grid>
          <Grid item xs={4}>
            <Column elevation={12}>
              <div>
                <div>Done</div>
                {/* <BasicCard /> */}
              </div>
            </Column>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
