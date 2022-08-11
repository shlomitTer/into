import { Avatar, Container, Divider, Grid, IconButton, Typography } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import React from 'react'

import '../../App.css'
export default function ParticipantsBoard({ users }) {

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    // console.log(name);

    let names = name.split(' ')
    let shortName = name.match(/\b(\w)/g) ? name.match(/\b(\w)/g).join('').toUpperCase() : '-';
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: shortName,
    };
  }

  return (
    <Container sx={{ bgcolor: '#ffff', boxShadow: 1, borderRadius: 2, paddingTop: 5, minHeight: '95vh' }}>
      <Grid item>
        <Typography variant='h5'>Participants<IconButton><AddBoxOutlinedIcon /></IconButton></Typography>

        {users && users.map(user => (
          <Grid item
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              padding: 2,
              borderBottom: 1,
              color: '#767676',
              '&:hover': {
                transform: "scale3d(1.02, 1.02, 1.02)",
                cursor: 'pointer'
              },
            }}
            key={user._id}>

            <Grid item xs={3}>
              <Avatar key={user._id} {...stringAvatar(user?.name)} ></Avatar>
              {/* <Avatar key={user._id} >{user.name}</Avatar> */}
            </Grid>

            <Grid item xs={7} >
              <Typography>{user.name}</Typography>
              <Typography>{user.email}</Typography>
            </Grid>

          </Grid >

        ))}
      </Grid>
    </Container >
  )
}
