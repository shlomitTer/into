import React from 'react'

import { Box, Grid, Typography } from '@mui/material'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PeopleIcon from '@mui/icons-material/People';

import '../../App.css'


export default function CountEvent({ event, tasks, users }) {

  return (
    <Grid item md={6}
      sx={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignContent: 'space-between',
        fontSize: '2em',

      }}
    >
      <Grid item md={5} xs={10}
        sx={{

          height: '150px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 500

        }} className="box_">
        {event.date}
      </Grid>


      <Grid item md={5} xs={10}
        sx={{
          mx: 2,
          height: '150px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 500

        }} className="box_">
        {event.time}
      </Grid >


      <Grid item md={5} xs={10}
        sx={{
          height: '150px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 500,


        }} className="box_">
        <PeopleIcon xs={12} sx={{ fontSize: '80px', m: 5 }} />
        <Typography>{users.length} Participants</Typography>


      </Grid>


      <Grid item md={5} xs={10}
        sx={{
          height: '150px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

        }} className="box_">
        <AssignmentTurnedInIcon />
        <Grid item sx={{
          display: 'flex',
          fontWeight: 500,
          p: 2,
        }} >
          <p>{tasks.length}</p>
          <p> Tasks </p>
        </Grid>
      </Grid>

    </Grid>

  )
}
