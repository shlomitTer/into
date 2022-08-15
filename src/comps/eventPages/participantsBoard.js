import { Avatar, Container, Divider, Grid, IconButton, Typography } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import React from 'react'

import '../../App.css'
import { stringAvatar } from '../../features/functions/avatarStringColor'
export default function ParticipantsBoard({ users }) {



  return (
    <Grid item sx={{ bgcolor: '#ffff', boxShadow: 1, borderRadius: 2, padding: 2, minHeight: '95vh' }}>
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
    </Grid >
  )
}
