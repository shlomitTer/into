import React from 'react'
import { Grid, Typography } from '@mui/material'
import { createTheme, responsiveFontSizes, ThemeProvider, } from '@mui/material/styles';
let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function DashBoard({ event }) {
  return (
    <Grid container
      sx={{
        mt: 2,
        boxShadow: 1,
        bgcolor: 'white',
        borderRadius: 2,
        alignItems: 'space-between',
        // justifyContent: 'space-around',
        height: '53vh',
        p: 2
      }}>

      <ThemeProvider theme={theme}>
        <Grid item>
          <Typography variant='h5'>DashBoard  </Typography>
        </Grid>

        <Grid item>

        </Grid>


      </ThemeProvider>

    </Grid>
  )
}
