import React from 'react'
import { useSelector, useDispatch } from "react-redux";

import { Grid } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ProgressBar from './progressBar';

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Details() {
  const currentEvent = useSelector((state) => state.eventsReducer.currentEvent);


  return (
    <Grid container spacing={4}
      sx={{
        boxShadow: 1,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'space-around',
        maxHeight: '150px',
      }}>

      <ThemeProvider theme={theme}>

        <Grid item md={4}>
          <Typography variant='h5' sx={{ fontWeight: 700, pt: 0 }}>{currentEvent.title}</Typography>
          <Typography variant="subtitle2" sx={{}}>{currentEvent.description}</Typography>
        </Grid>

        <Grid item md={2} sx={{}}>
          <Typography variant="h4" sx={{ paddingRight: 5, fontWeight: 700 }}>01/01/23</Typography>
        </Grid>

        <Grid item md={2} sx={{ textAlign: 'center' }} >
          <AccessTimeIcon sx={{ fontSize: 36 }} />
          <Typography variant="body1" sx={{ pt: 1 }}>23 Days left</Typography>
        </Grid>

        <Grid item md={4} p={2}>
          <ProgressBar />
        </Grid>

      </ThemeProvider>

    </Grid>
  )
}
