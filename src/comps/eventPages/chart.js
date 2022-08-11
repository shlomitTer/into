import React from 'react'
import { Typography, Grid } from '@mui/material'
import ChartCanvasJS from '../events/chart'


export default function Chart() {
  return (
    <Grid>
      <Typography variant='h5'>Event Dashboard</Typography>
      <ChartCanvasJS />
    </Grid>
  )
}
