import { Grid } from '@mui/material'
import React from 'react'
import DashBoard from './dashBoard'
import Details from './details'

export default function LeftArea({ event,
  isEditEventAllowed }) {
  return (
    <Grid container
      sx={{
        position: "sticky",
        top: 2
      }}>
      <Details
        event={event}
        isEditEventAllowed={isEditEventAllowed} />
      <DashBoard />
    </Grid>
  )
}
