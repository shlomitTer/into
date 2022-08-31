import { Grid } from '@mui/material'
import React from 'react'
import DashBoard from './dashBoard'
import Details from './details'

export default function LeftArea(props) {
  return (
    <Grid container
      sx={{
        position: "sticky",
        top: 2
      }}>
      <Details
        editEventpermission={props.editEventpermission}
      />
      <DashBoard />
    </Grid>
  )
}
