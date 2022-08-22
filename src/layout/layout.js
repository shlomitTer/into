import { Container, Grid, Item } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Outlet } from 'react-router-dom'
import MiniDrawer from './nav'
import { colors, } from '../theme/theme'
import LeftNav from './nav'

export default function Layout() {
  return (

    <Box spacing={2} maxWidth='100vw' display="grid" gridTemplateColumns="repeat(19, 1fr)">

      {/* <Grid container 
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}> */}

      <Box gridColumn="span 1">
        <LeftNav />
      </Box>

      <Box gridColumn="span 18">
        <Outlet />
      </Box>

      {/* </Grid> */}

    </Box>
  )
}

