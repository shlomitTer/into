import { Avatar, Box, Card, Grid, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { stringAvatar } from '../../features/functions/avatarStringColor'

export default function Profile({
  user,
  numberOfTasks,
  numberOfEvents
}) {

  const [name, setName] = useState("")
  useEffect(() => {
    let _name = user.name;
    _name = _name.toUpperCase()
    setName(_name)
  }, [])

  return (
    <Grid container maxWidth sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <Grid item xs={12} sx={{
        height: '160px',
        border: 1,
        backgroundImage: `url(${"https://www.pexels.com/photo/pen-calendar-to-do-checklist-3243/"})`
      }}>
        kkk
      </Grid>

      <Grid item xs={10}
        sx={{
          borderRadius: 2,
          backgroundColor: 'white',
          boxShadow: 1,
          p: 2,
          m: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',

        }}>
        <Grid item md={6} xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'start',
          }}
        >
          <Avatar {...stringAvatar(user?.name)} ></Avatar>

          <Typography variant='h6' sx={{
            px: 2,
            fontSize: {
              lg: 20,
              md: 18,
              sm: 16,
              xs: 12
            }
          }}>{name}</Typography>
        </Grid>
        <Grid item md={6} xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'end',
          }}>
          <Typography variant='h6' sx={{
            px: 2,
            fontSize: {
              lg: 20,
              md: 18,
              sm: 16,
              xs: 12
            }
          }}>{numberOfEvents} EVENTS</Typography>
          <Typography variant='h6' sx={{
            px: 2,
            fontSize: {
              lg: 20,
              md: 18,
              sm: 16,
              xs: 12
            }
          }}>{numberOfTasks} TASKS</Typography>
        </Grid>


      </Grid>
    </Grid>
  )
}
