import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import CountEvent from './countEvent'
import Heading from './heading'
import { Box, Grid } from '@mui/material'

import { getCurrentEvent } from '../../features/slices/eventsSlice';
import { getCurrentEventTasks } from '../../features/slices/tasksSlice';



export default function EditEvent() {
  const dispatch = useDispatch();
  const currentEvent = useSelector((state) => state.eventsReducer.currentEvent);
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const currentEventTasks = useSelector((state) => state.tasksReducer.currentEventTasks);
  const usersOfCurrentEvent = useSelector((state) => state.eventsReducer.usersOfCurrentEvent);
  const params = useParams();
  useEffect(() => {

    doApi();
  }, [])

  const doApi = () => {
    console.log(params);
    console.log(params.idEvent);
    dispatch(getCurrentEvent(params.idEvent));
    dispatch(getCurrentEventTasks(params.idEvent));
  }


  return (
    <Grid container>
      <Heading event={currentEvent} currentUser={currentUser} />
      <Grid container sx={{ display: 'flex', justifyContent: 'space-between', mt: '80px', flexWrap: 'wrap' }}>

        <CountEvent event={currentEvent} tasks={currentEventTasks} users={usersOfCurrentEvent} />

      </Grid>
    </Grid>
  )
}
