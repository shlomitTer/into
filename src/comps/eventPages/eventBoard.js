import React, { useEffect, useState } from 'react'
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
import LeftArea from './leftArea';

export default function EventBoard() {

  const dispatch = useDispatch();
  const currentEvent = useSelector((state) => state.eventsReducer.currentEvent);
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const currentEventTasks = useSelector((state) => state.tasksReducer.currentEventTasks);
  const usersOfCurrentEvent = useSelector((state) => state.eventsReducer.usersOfCurrentEvent);
  const params = useParams();
  const [isEditEventAllowed, setIsEditEventAllowed] = useState(false);

  useEffect(() => {
    doApi();

  }, [])

  const doApi = () => {
    dispatch(getCurrentEvent(params.idEvent));
    dispatch(getCurrentEventTasks(params.idEvent));
  }

  // useEffect(() => {

  //   //check if user can edit event
  //   if (currentEvent?.user_id == currentUser?._id ||
  //     (currentEvent?.usersId_arr.includes(currentUser?._id) && currentEvent?.EditableByParticipants))
  //     setIsEditEventAllowed(true);
  // }, [currentEvent, currentUser])

  return (
    <Grid container spacing={2}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        justifyItems: 'center',

      }}>

      <Grid item md={3} xs={11} >
        <LeftArea
          event={currentEvent}
          isEditEventAllowed={isEditEventAllowed} />
      </Grid>

      <Grid item md={5} xs={11}>
        <TasksBoard
          tasks={currentEventTasks}
          currentEvent={currentEvent} />
      </Grid>

      <Grid item md={3} xs={11} elevation={3}>
        <ParticipantsBoard
          users={usersOfCurrentEvent}
        />
      </Grid>

    </Grid>
  )
}
