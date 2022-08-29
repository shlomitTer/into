import React from 'react'
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'

import EventsOfUser from './eventsOfUser';
import TasksOfUser from './tasksOfUser';

export default function UserBoard() {
  const currentUser = useSelector((state) => state.userReducer.currentUser);


  return (

    <Grid container>
      <Grid item md={8} xs={12}>
        <EventsOfUser />
      </Grid>
      <Grid item md={4} xs={12}>
        <TasksOfUser />
      </Grid>
    </Grid>
  )
}
