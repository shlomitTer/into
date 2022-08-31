import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'

import Nav from './nav'

export default function Layout() {
  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth='xl' sx={{ mt: '70px' }}>
        <Outlet />
      </Container>

    </React.Fragment>

  )
}

