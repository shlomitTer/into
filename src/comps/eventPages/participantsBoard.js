import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Grid, IconButton, Typography } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

import ParticipantItem from './participantItem';

export default function ParticipantsBoard(props) {

  const nav = useNavigate()
  const params = useParams()

  return (
    <Grid container sx={{
      position: "sticky",
      top: 2
    }}>
      <Box sx={{
        bgcolor: '#ffff',
        boxShadow: 1,
        borderRadius: 2,
        padding: 2,
        minHeight: '90vh',
        position: 'sticky',
      }}>
        <Box>
          <Typography variant='h5'>Participants
            {props.editEventpermission && <IconButton onClick={() => {
              nav(`/event/invitation/${params.idEvent}`)
            }}>
              <AddBoxOutlinedIcon />
            </IconButton>}
          </Typography>
        </Box>
        {props.usersOfCurrentEvent && props.usersOfCurrentEvent.map(user => (
          <ParticipantItem
            user={user}
            key={user._id}
            isEventCreator={props.isEventCreator}
          />
        ))}
      </Box>

    </Grid >
  )
}
