import React, { useState } from 'react'
import { Grid, Typography, IconButton, Container, Box } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import EventItem from './eventItem';
import EventModal from '../../forms/eventModal';
import TaskModal from '../../forms/TaskModal';

export default function EventsOfUser({ events, user }) {
  const [isCreationModeEvent, setIsCreationModeEvent] = useState(false)
  const [isEditModeEvent, setIsEditModeEvent] = useState(false)
  return (
    <Box sx={{ flexGrow: 1 }}>

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

      <Grid container spacing={2}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          alignContent: 'space-between'

        }}
      >

        {events && events.map(event => (
          <EventItem
            event={event}
            user={user}
            key={event._id} />
        ))
        }

      </Grid >


    </Box >
  )
}
