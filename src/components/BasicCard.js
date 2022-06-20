import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, styled } from '@mui/material';
import { useDrag } from 'react-dnd';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'left',
}));

export const BasicCard = ({ children, card, ...props }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'card',
    item: { id: card.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ border: isDragging ? '5px solid pink' : '0px' }}>
      <StyledCard sx={{ maxWidth: 1 }}>
        <CardContent>
          <StyledTypography variant="h5" component="div">
            {card.title}
          </StyledTypography>
          <StyledTypography variant="body2">
            {card.description}
          </StyledTypography>
        </CardContent>
      </StyledCard>
    </div>
  );
};
