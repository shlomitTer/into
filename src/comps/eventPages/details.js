import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";

import { Container, Grid, Typography } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import { shorten_a_string } from '../../features/functions/string'

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Details() {
  const currentEvent = useSelector((state) => state.eventsReducer.currentEvent);
  const [des, setDes] = useState("")
  const [date, setDate] = useState()

  useEffect(() => {
    let str;
    currentEvent?.description && setDes(shorten_a_string(currentEvent.description, 4));

    let _date = new Date(currentEvent.date).toLocaleDateString()
    setDate(_date)
  }, [currentEvent])


  return (
    <Container
      sx={{
        boxShadow: 1,
        bgcolor: 'white',
        borderRadius: 2,
        height: '42vh',
        p: 2,
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'space-between',
      }}>


      <Grid item>
        <Typography variant='h5' sx={{ fontWeight: 700, pt: 0 }}>{currentEvent.title}</Typography>
        <Typography variant="subtitle2"></Typography>
      </Grid>

      <Grid item sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>

        <Grid item xs={8} sx={{}}>
          <Typography variant="h5" sx={{ paddingRight: 5, fontWeight: 700 }}>{date}</Typography>
        </Grid>

        <Grid item xs={4} sx={{ textAlign: 'center' }} >
          <AccessTimeIcon fontSize="medium" />
          <Typography variant="body1" sx={{ pt: 1, fontSize: '12px' }}>23 Days left</Typography>
        </Grid>

        <Grid item xs={2}>

        </Grid>

      </Grid>

    </Container>
  )
}
