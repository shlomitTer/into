import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Grid, IconButton, Typography } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import '../../App.css'
import { stringAvatar } from '../../features/functions/avatarStringColor'

export default function ParticipantsBoard(props) {


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
            {props.editEventpermission && <IconButton onClick={() => {
              nav(`/event/invitation/${params.idEvent}`)
            }}>
              <AddBoxOutlinedIcon />
            </IconButton>}
          </Typography>

          {props.usersOfCurrentEvent && props.usersOfCurrentEvent.map(user => (
            <Grid item xs={12}
              sx={{
                mt: 1,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                // borderBottom: 1,
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

              <Grid item xs={8} >
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
