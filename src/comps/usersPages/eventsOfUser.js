import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Grid, Typography, IconButton, Box, Stack, Button } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import EventItem from './eventItem';
import EventModal from '../../forms/eventModal';
import { aprove, getCurrentUserInvitations } from '../../features/slices/inviteesSlice';
import { aproveInvitation, getEventsByParticpant, refusal } from '../../features/slices/eventsSlice';
import { getCurrentUser } from '../../features/slices/userSlice';
import InvitationItem from '../invitaions/invitationItem';

export default function EventsOfUser(props) {
  const [isCreationModeEvent, setIsCreationModeEvent] = useState(false)

  // const handleRefusal = () => {
  //   // dispatch(refusal({ email: currentUser.email }))
  //   setIsRefusal(true)

  // }
  // const handleAprove = (_event_id) => {
  //   let _body = { email: currentUser.email, event_id: _event_id }
  //   dispatch(aproveInvitation(_body))
  //   dispatch(aprove(_body))
  // }

  return (
    <React.Fragment>

      {/* invitaions of currentUser */}
      {(props.currentUserInvitations.length != 0) && <Typography variant='h5' xs={2}>New Events</Typography>
      }
      {/* <Grid container >
        {(props.currentUserInvitations.length != 0) && props.currentUserInvitations.map(item => (
          <InvitationItem
            invitation={item}
          />
        ))}
      </Grid> */}


      <Grid item
        sx={{
          display: 'flex',
          alignItems: 'center',
          my: 2
        }}>
        <Typography variant='h5' xs={2}>Events</Typography>
        <IconButton onClick={() => {
          setIsCreationModeEvent(true)
        }}>
          <AddBoxOutlinedIcon />
        </IconButton>

        <EventModal
          isCreationModeEvent={isCreationModeEvent}
          setIsCreationModeEvent={setIsCreationModeEvent}
        />

      </Grid>


      {/* eventsByParticpant of currentUser */}
      <Grid container
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
        }}
      >

        {props.eventsByParticpant && props.eventsByParticpant.map(event => (
          <EventItem
            event={event}
            user={props.currentUser}
            key={event._id} />
        ))
        }
        {(!props.eventsByParticpant || props.eventsByParticpant.length == 0) && <h4
          style={{
            paddingTop: '12px',
            color: '#d3d3d3',
            fontSize: '32px'
          }}>let's create your first event</h4>}

      </Grid >


    </React.Fragment>)
}
