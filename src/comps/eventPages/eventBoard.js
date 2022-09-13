import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";

import '../../App.css'
import TasksBoard from './tasksBoard'
import ParticipantsBoard from './participantsBoard'
import { getCurrentEvent } from '../../features/slices/eventsSlice';
import { getCurrentEventTasks } from '../../features/slices/tasksSlice';
import LeftArea from './leftArea';
import { isEditEventAllowed } from '../../features/functions/permissions';
import { getCurrentUser } from '../../features/slices/userSlice';

export default function EventBoard() {

  const dispatch = useDispatch();
  const currentEvent = useSelector((state) => state.eventsReducer.currentEvent);
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const usersOfCurrentEvent = useSelector((state) => state.eventsReducer.usersOfCurrentEvent);
  const params = useParams();
  const [editEventpermission, setEditEventpermission] = useState(false)

  useEffect(() => {
    dispatch(getCurrentEvent(params.idEvent));
    dispatch(getCurrentEventTasks(params.idEvent));
    dispatch(getCurrentUser())
  }, [])

  //Editing permission check 
  useEffect(() => {
    if (currentEvent && currentUser) {
      setEditEventpermission(isEditEventAllowed(currentEvent, currentUser._id, currentUser._id))
    }
  }, [currentEvent, currentUser])

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
          editEventpermission={editEventpermission}
        />
      </Grid>

      <Grid item md={5} xs={11}>
        <TasksBoard
          editEventpermission={editEventpermission}
          currentEvent={currentEvent}
          currentUser={currentUser}
        />
      </Grid>

      <Grid item md={3} xs={11} elevation={3}>
        <ParticipantsBoard
          editEventpermission={editEventpermission}
          usersOfCurrentEvent={usersOfCurrentEvent}
        />
      </Grid>

    </Grid>
  )
}
