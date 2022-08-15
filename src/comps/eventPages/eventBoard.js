import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import { Container, Grid } from '@mui/material'

import DashBoard from './dashBoard'
import ParticipantsBoard from './participantsBoard'
import TasksBoard from './tasksBoard'

import '../../App.css'
import { getCurrentEvent } from '../../features/slices/eventsSlice';
import { getCurrentEventTasks } from '../../features/slices/tasksSlice';
import Details from './details';

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
    <Container maxWidth="99vw">
      <Grid container spacing={2}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          justifyItems: 'center',
          m: 1
        }}>

        <Grid item md={3} xs={11} >
          <Details />
          <DashBoard />
        </Grid>

        <Grid item md={5} xs={11}>
          <TasksBoard tasks={currentEventTasks} />
        </Grid>

        <Grid item md={3} xs={11} elevation={3}>
          <ParticipantsBoard users={usersOfCurrentEvent} />
        </Grid>

      </Grid>
    </Container>
  )
}
