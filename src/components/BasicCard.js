import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, styled } from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'left',
}));

export const BasicCard = ({ children, ...props }) => {
  return (
    <StyledCard sx={{ maxWidth: 1 }}>
      <CardContent>
        <StyledTypography variant="h5" component="div">
          {props.title}
        </StyledTypography>
        <StyledTypography variant="body2">{props.description}</StyledTypography>
      </CardContent>
    </StyledCard>
  );
};
