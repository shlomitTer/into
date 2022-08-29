import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Grid, Typography, IconButton, Box, Stack, Button } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import EventItem from './eventItem';
import EventModal from '../../forms/eventModal';
import { getCurrentUserInvitations, refusal } from '../../features/slices/inviteesSlice';
import { getEventsByParticpant } from '../../features/slices/eventsSlice';
import { getCurrentUser } from '../../features/slices/userSlice';

export default function EventsOfUser() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const eventsByParticpant = useSelector((state) => state.eventsReducer.eventsByParticpant);
  const currentUserInvitations = useSelector((state) => state.inviteeReducer.currentUserInvitations)
  const [isCreationModeEvent, setIsCreationModeEvent] = useState(false)

  const [isEditModeEvent, setIsEditModeEvent] = useState(false)
  useEffect(() => {
    dispatch(getCurrentUser())
    dispatch(getEventsByParticpant())
    dispatch(getCurrentUserInvitations())
  }, [])

  const handleRefusal = () => {
    dispatch(refusal({ email: currentUser.email }))
  }

  return (
    <React.Fragment>

      {/* invitaions of currentUser */}
      {(currentUserInvitations.length != 0) && <Typography variant='h5' xs={2}>New Events</Typography>
      }
      <Grid container >
        {(currentUserInvitations.length != 0) && currentUserInvitations.map(item => (
          <Grid item key={item._id} xs={11}
            sx={{
              borderRadius: 2,
              backgroundColor: 'white',
              p: 2,
              mt: 2,
              '&:hover': {
                transform: "scale3d(1.01, 1.01, 1.01)",
              },
            }}>

            <Typography variant='h5'>{item.event_name}</Typography>
            <Typography variant='body1'>creaed by: {item.creator} </Typography>
            <Stack
              spacing={2}
              direction="row"
              justifyContent="end"
              alignItems="baseline"
            >
              <Button onClick={handleRefusal}>Refusal</Button>
              <Button>Get</Button>
            </Stack>
          </Grid>
        ))
        }

      </Grid>


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
          isEditModeEvent={isEditModeEvent}
          setIsEditModeEvent={setIsEditModeEvent}
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

        {eventsByParticpant && eventsByParticpant.map(event => (
          <EventItem
            event={event}
            user={currentUser}
            key={event._id} />
        ))
        }
        {(!eventsByParticpant || eventsByParticpant.length == 0) && <h4
          style={{
            padding: '12px',
            color: '#d3d3d3',
            fontSize: '40px'
          }}>There are no events to display</h4>}

      </Grid >


    </React.Fragment>)
}
