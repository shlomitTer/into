import { Grid } from '@mui/material'
import React from 'react'
import Details from './details'
import Chart from './chart'

export default function DashBoard({ event }) {
  return (
    <Grid container
      sx={{
        // display: 'flex',
        flexWrap: 'wrap',
        minHeight: '95vh'
      }}>
      <Grid item xs={11}
        sx={{
          display: 'flex',
          padding: 5,
          bgcolor: "#ffff",
          boxShadow: 1,
          borderRadius: 2,
          maxHeight: '35vh'
        }}>
        <Details event={event} />
      </Grid>
      <Grid item xs={11}
        sx={{
          display: 'flex',
          padding: 5,
          bgcolor: "#ffff",
          boxShadow: 1,
          borderRadius: 2,
          maxHeight: '55vh'

        }}>
        <Chart />
      </Grid>
    </Grid >
  )
}
