import { Button, Box, Grid } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { colors } from '../theme/theme'

export default function Home() {
  const nav = useNavigate();
  return (
    <Grid container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item
        sx={{
          textAlign: 'center',
          m: 3,
          p: 10,
          border: 1,
          borderColor: colors.palette.primary.light,
          borderRadius: '16px'
        }}>
        <h2>Into</h2>
        <Grid item sx={{ pt: 5, pb: 3, px: 3 }} >
          <Button variant="outlined" sx={{ px: 4, m: 2 }}>Sign up</Button>
          <Button variant="outlined" sx={{ px: 4, m: 2 }} onClick={() => {
            nav("/login")
          }}>Login</Button>
        </Grid>
      </Grid>
    </Grid >
  )
}
