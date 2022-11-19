import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";

import '../../App.css'
import TasksBoard from './tasksBoard'
import ParticipantsBoard from './participantsBoard'
import { getCurrentEventTasks, setIsTaskPageOpen, setTask_id } from '../../features/slices/tasksSlice';
import LeftArea from './leftArea';
import { isEditEventAllowed } from '../../features/functions/permissions';
import { getCurrentUser } from '../../features/slices/userSlice';
import { getCurrentEvent } from '../../features/slices/eventsSlice';
import TaskPage from '../tasks/taskPage';

export default function EventBoard() {

  const dispatch = useDispatch();
  const { currentEvent, usersOfCurrentEvent, errorCode } = useSelector((state) => state.eventsReducer);
  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const params = useParams();
  const [editEventpermission, setEditEventpermission] = useState(false)
  const [isEventCreator, setIsEventCreator] = useState(false)
  const nav = useNavigate();

  useEffect(() => {
    dispatch(getCurrentEvent(params.idEvent));
    dispatch(getCurrentEventTasks(params.idEvent));
    dispatch(getCurrentUser())
  }, [])


  //Editing permission check 
  useEffect(() => {
    if (currentEvent && currentUser) {
      setEditEventpermission(isEditEventAllowed(currentEvent, currentUser._id))
      if (currentEvent.user_id._id === currentUser._id) {
        setIsEventCreator(true)
      }
    }
  }, [currentEvent, currentUser])


  useEffect(() => {
    if (errorCode === 'ERR_BAD_REQUEST') {
      nav('/profile')
    }
  }, [errorCode])

  return (
    <>
      <Grid onClick={() => { dispatch(setIsTaskPageOpen(false)) }} container spacing={2}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          justifyItems: 'center',

        }}>

        <Grid item md={3} xs={11} >
          <LeftArea
            editEventpermission={editEventpermission}
            isEventCreator={isEventCreator}
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
            isEventCreator={isEventCreator}
          />
        </Grid>
      </Grid>
      <TaskPage />
    </>
  )
}
