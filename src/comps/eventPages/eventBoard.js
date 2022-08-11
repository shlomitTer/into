import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import { Container, Grid } from '@mui/material'

import DashBoard from './dashBoard'
import ParticipantsBoard from './participantsBoard'
import TasksBoard from './tasksBoard'

import { getCurrentEvent } from '../../features/slices/eventsSlice';
import { getCurrentEventTasks } from '../../features/slices/tasksSlice';

export default function EventBoard() {

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
    dispatch(getCurrentEvent(params.idEvent));
    dispatch(getCurrentEventTasks(params.idEvent));
  }


  return (
    <Container maxWidth='xl'
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',

      }}>
      <Grid item md={4} xs={11}>
        <DashBoard event={currentEvent} />
      </Grid>
      <Grid item md={5} xs={11} >
        <TasksBoard tasks={currentEventTasks} />
      </Grid>

      <Grid item md={3} xs={11} >
        <ParticipantsBoard users={usersOfCurrentEvent} />
      </Grid>
    </Container>
  )
}
