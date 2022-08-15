import React, { useEffect, useState } from 'react'
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
import { shorten_a_string } from '../../features/functions/string'

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Details() {
  const currentEvent = useSelector((state) => state.eventsReducer.currentEvent);
  const [des, setDes] = useState("")

  useEffect(() => {
    console.log(currentEvent);
    let str
    currentEvent?.description && setDes(shorten_a_string(currentEvent.description, 4));
  }, [currentEvent])


  return (
    <Grid item
      sx={{
        boxShadow: 1,
        bgcolor: 'white',
        borderRadius: 2,
        height: '40vh',
        p: 2,
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'space-between',
      }}>

      <ThemeProvider theme={theme}>

        <Grid item>
          <Typography variant='h5' sx={{ fontWeight: 700, pt: 0 }}>{currentEvent.title}</Typography>
          <Typography variant="subtitle2"></Typography>
        </Grid>

        <Grid item sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>

          <Grid item xs={6} sx={{}}>
            <Typography variant="h5" sx={{ paddingRight: 5, fontWeight: 700 }}>01/01/23</Typography>
          </Grid>

          <Grid item xs={4} sx={{ textAlign: 'center' }} >
            <AccessTimeIcon fontSize="medium" />
            <Typography variant="body1" sx={{ pt: 1, fontSize: '12px' }}>23 Days left</Typography>
          </Grid>

          <Grid item xs={2}>

          </Grid>

        </Grid>
      </ThemeProvider>

    </Grid>
  )
}
