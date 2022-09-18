import React, { useState } from 'react'
import { useSelector } from "react-redux";

import { Avatar, Grid, IconButton, Typography } from '@mui/material'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import '../../App.css'
import { stringAvatar } from '../../features/functions/avatarStringColor'
import Alert from '../../forms/alert';

export default function ParticipantItem(props) {
  const currentEvent = useSelector((state) => state.eventsReducer.currentEvent);
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const [isRemove, setIsRemove] = useState(false)
  const [participant, setParticipant] = useState({})


  const handleRemove = (_participant) => {
    setParticipant(_participant)
    setIsRemove(true)
  }
  return (
    <Grid container spacing={1} xs={12}
      sx={{
        mt: 1,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        color: '#767676',
        '&:hover': {
          transform: "scale3d(1.02, 1.02, 1.02)",
          cursor: 'pointer'
        },
      }}>

      <Grid item xs={2}>
        <Avatar key={props.user._id} {...stringAvatar(props.user?.name)} ></Avatar>
      </Grid>

      <Grid item xs={8} >
        <Typography sx={{ wordBreak: 'revert' }} variant='body2'>{props.user.name}</Typography>
        <Typography sx={{ wordBreak: 'revert' }} variant='body2'>{props.user.email}</Typography>
      </Grid>
      {/* Only the event creator can remove a participant (not himself) */}
      {(props.isEventCreator && (currentUser._id !== props.user._id) && (props.user._id !== currentEvent.user_id._id)) ? <Grid item xs={1} padding={3} >
        <IconButton onClick={() => {
          handleRemove(props.user)
        }}>
          <ClearOutlinedIcon fontSize='small' />
        </IconButton>
      </Grid> : <Grid item xs={1} padding={3}></Grid>}
      <Alert
        title={`Remove a participant: ${props.user.name}`}
        content={"Are you sure?"}
        isRemove={isRemove}
        setIsRemove={setIsRemove}
        participant={participant}
      />

    </Grid >

  )
}
