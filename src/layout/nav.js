import { Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import './leftNav.css'
import { padding } from '@mui/system';

export default function LeftNav() {
  return (
    <Grid container
      sx={{
        display: 'flex',
        position: "sticky",
        textAlign: 'center',
        top: 2,
        padding: 1
      }}>
      <Typography>IntoIt</Typography>

      <div>
        <IconButton >
          <AddBoxOutlinedIcon fontSize='large' />
        </IconButton>
        <h6>
          Add Event
        </h6>
      </div>

      <div>
        <IconButton >
          <AccountBoxOutlinedIcon fontSize='large' />
        </IconButton>
        <h6>
          My Board
        </h6>
      </div>
    </Grid>

  )
}
