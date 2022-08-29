import { Avatar, Container, Divider, Grid, IconButton, Typography } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import React from 'react'

import '../../App.css'
import { stringAvatar } from '../../features/functions/avatarStringColor'
import { useNavigate, useParams } from 'react-router-dom';
export default function ParticipantsBoard({ users }) {
  const nav = useNavigate()
  const params = useParams()

  return (
    <Grid sx={{
      bgcolor: '#ffff',
      boxShadow: 1,
      borderRadius: 2,
      padding: 2,
      minHeight: '100vh',
      position: 'sticky',
      display: "flex",
      alignContent: 'flex-end'
    }}>
      <Grid item
        sx={{
          minHeight: '90vh',
          position: 'sticky',
        }}>
        <Grid item>
          <Typography variant='h5'>Participants
            <IconButton onClick={() => {
              nav(`/event/invitation/${params.idEvent}`)
            }}>
              <AddBoxOutlinedIcon />
            </IconButton></Typography>

          {users && users.map(user => (
            <Grid item xs={12}
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
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
              </Grid>

              <Grid item xs={9} >
                <Typography>{user.name}</Typography>
                <Typography>{user.email}</Typography>
              </Grid>

            </Grid >

          ))}
        </Grid>
      </Grid >
    </Grid >
  )
}
