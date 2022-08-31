import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Grid, Typography, AvatarGroup, Avatar } from '@mui/material'
import { stringAvatar } from '../../features/functions/avatarStringColor'
import './eventItem.css'
export default function EventItem(props) {
  const [date, setDate] = useState();
  const [title, setTitle] = useState();
  const [isEventCreator, setIsEventCreator] = useState(false)

  useEffect(() => {
    if (props.event.user_id._id === props.user._id)
      setIsEventCreator(true);
    let _date = new Date(props.event.date).toLocaleDateString()
    setDate(_date)

    let _title = props.event.title
    _title = _title.toUpperCase();
    setTitle(_title)
  }, [props])

  return (


    <Grid item xs={12} md={3} sx={{
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
    }} className={`${isEventCreator && 'colored'}`} key={props.event._id}>

      <Link to={`/event/${props.event._id}`} style={{
        textDecoration: "none",
        color: 'black'
      }}>
        <Grid item>
          <Typography variant='h6'>{title}</Typography>
          <Typography variant='body2' sx={{ fontWeight: 700, py: 1, color: "gray" }}>created by: {props.event.user_id?.name}</Typography>

        </Grid>
        <Grid item>
          <Typography variant='body2'
            sx={{
              height: 50
            }}>{props.event?.description}</Typography>
        </Grid>

        <Grid item>

          <Typography>{date}</Typography>
        </Grid>
        <AvatarGroup max={3}>
          {props.event.usersId_arr && props.event.usersId_arr.map(user => (
            <Avatar
              key={user._id} {...stringAvatar(user?.name)} ></Avatar>

          ))
          }
        </AvatarGroup>
      </Link>
    </Grid >


  )
}
