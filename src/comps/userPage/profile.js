import React, { useEffect } from 'react'
import { Divider, Grid, IconButton } from '@mui/material';

import '../../App.css'

import { colors } from '../../theme/theme';


export default function Profile({ currentUser }) {
  useEffect(() => {

    // console.log(currentUser)
  }, []);
  // console.log(currentUser)

  return (
    <Grid container
      sx={{
        justifyContent: 'center',

      }}
    >
      <Grid item md={2}
        sx={{
          alignItems: 'center',
        }} >
        <img style={{
          border: 0,
          borderRadius: '50%',
          height: '300px',
          width: '300px',
          background: 'gray',

        }}
        // src={'https://www.pexels.com/photo/man-in-black-jacket-771742/'} 
        />
      </Grid>
      <Divider orientation="vertical" variant="middle" flexItem sx={{ p: 5 }} />

      <Grid item md={7}
        sx={{
          m: 5,
          my: 'auto',
          py: 4
        }}>
        <h2>HELLO {currentUser.name}</h2>
        <p className='h3'>Welcome to your personal page</p>
      </Grid>


      <Divider variant="middle" />
    </Grid >
  )
}
