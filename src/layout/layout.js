import { Grid, Item } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Outlet } from 'react-router-dom'
import MiniDrawer from './nav'
import { colors, } from '../theme/theme'

export default function Layout() {
  return (

    <Grid container spacing={2}>
      <MiniDrawer />
      <Box sx={{ flexGrow: 1, p: 0 }}>
        <Outlet sx={{ bgcolor: colors.palette.background }} />
      </Box>
    </Grid>
  )
}

