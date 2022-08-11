import { Typography, Grid } from '@mui/material'
import { useSelector, useDispatch } from "react-redux";
import AccessTimeIcon from '@mui/icons-material/AccessTime';


import React from 'react'

export default function Details() {
  const currentEvent = useSelector((state) => state.eventsReducer.currentEvent);


  return (
    <Grid>
      <Typography variant='h5' sx={{ fontWeight: 700 }}>{currentEvent.title}</Typography>
      <Typography variant="subtitle2" sx={{ pt: 1, pb: 3 }}>{currentEvent.description}</Typography>

      <Typography variant="h4" sx={{ paddingRight: 5, display: 'inline', fontWeight: 700 }}>01/01/23</Typography>
      <AccessTimeIcon sx={{ display: 'inline', fontSize: 36 }} />
      <Typography variant="body1" sx={{ pt: 1, display: 'inline' }}>23 Days left</Typography>

    </Grid>
  )
}
