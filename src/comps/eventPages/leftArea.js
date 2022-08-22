import { Grid } from '@mui/material'
import React from 'react'
import DashBoard from './dashBoard'
import Details from './details'

export default function LeftArea() {
  return (
    <Grid container
      sx={{
        position: "sticky",
        top: 2
      }}>
      <Details />
      <DashBoard />
    </Grid>
  )
}
