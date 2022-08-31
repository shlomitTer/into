import React, { useEffect } from 'react'
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'

import EventsOfUser from './eventsOfUser';
import TasksOfUser from './tasksOfUser';
import { getCurrentUser } from '../../features/slices/userSlice';
import { getEventsByParticpant } from '../../features/slices/eventsSlice';
import { getCurrentUserInvitations } from '../../features/slices/inviteesSlice';
import { getUserTasks } from '../../features/slices/tasksSlice';

export default function UserBoard() {
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const eventsByParticpant = useSelector((state) => state.eventsReducer.eventsByParticpant);
  const currentUserInvitations = useSelector((state) => state.inviteeReducer.currentUserInvitations)
  const userTasks = useSelector((state) => state.tasksReducer.userTasks);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentUser())
    dispatch(getEventsByParticpant())
    dispatch(getCurrentUserInvitations())
    dispatch(getUserTasks())
  }, [])

  return (

    <Grid container>
      <Grid item md={8} xs={12}>
        <EventsOfUser
          eventsByParticpant={eventsByParticpant}
          currentUserInvitations={currentUserInvitations}
          currentUser={currentUser}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <TasksOfUser
          userTasks={userTasks}
        />
      </Grid>
    </Grid>
  )
}
