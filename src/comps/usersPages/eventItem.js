import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { Grid, Typography, Box, AvatarGroup, Avatar, Button } from '@mui/material'
import { stringAvatar } from '../../features/functions/avatarStringColor'

export default function EventItem({ event, user }) {
  const [date, setDate] = useState();
  const [title, setTitle] = useState();
  const [isCreator, setIsCreator] = useState(true);
  const nav = useNavigate();


  useEffect(() => {

    if (event.user_id === user._id)
      setIsCreator(true);

    let _date = new Date(event.date).toLocaleDateString()
    setDate(_date)

    let _title = event.title
    _title = _title.toUpperCase();
    // t = t.charAt(0).toUpperCase() + t.slice(1);
    setTitle(_title)
  }, [])

  return (


    <Grid item xs={11} md={3} sx={{
      boxShadow: 1,
      borderRadius: 2,
      // height: '180px',
      p: 2,
      m: 1,
      backgroundColor: "white",
      display: 'block',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignContent: 'space-between',
      transition: "transform 0.15s ease-in-out",
      '&:hover': {
        transform: "scale3d(1.01, 1.01, 1.01)",
      },
    }} key={event._id} style={isCreator ? { background: '#EDFFE8' } : {}}>

      <Link to={`/event/${event._id}`} style={{
        textDecoration: "none",
        color: 'black'
      }}>
        <Grid item>
          <Typography variant='h6'>{title}</Typography>
        </Grid>
        <Grid item>
          <Typography variant='body2'
            sx={{
              height: 50
            }}>{event?.description}</Typography>
        </Grid>

        <Grid item>

          <Typography>{date}</Typography>
        </Grid>
        {/* <AvatarGroup max={3}>
          {event.usersId_arr && event.usersId_arr.map(user => (
            <Avatar
              key={user._id} {...stringAvatar(user?.name)} ></Avatar>

          ))
          }
        </AvatarGroup> */}
      </Link>
    </Grid >


  )
}
