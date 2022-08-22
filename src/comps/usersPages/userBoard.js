import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEventsByParticpant } from '../../features/slices/eventsSlice';
import { getUserTasks } from '../../features/slices/tasksSlice';
import { getCurrentUser } from '../../features/slices/userSlice';
import EventsOfUser from './eventsOfUser';
import Profile from './profile'
import TasksOfUser from './tasksOfUser';

export default function UserBoard() {

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const eventsByParticpant = useSelector((state) => state.eventsReducer.eventsByParticpant);
  const userTasks = useSelector((state) => state.tasksReducer.userTasks);

  const [numberOfTasks, setNumberOfTasks] = useState(0);
  const [numberOfEvents, setNumberOfEvents] = useState(0);

  useEffect(() => {
    dispatch(getCurrentUser())
    dispatch(getEventsByParticpant());
    dispatch(getUserTasks())
    count();
  }, [])

  const count = () => {
    setNumberOfTasks(userTasks.length)
    setNumberOfEvents(eventsByParticpant.length)

  }

  return (
    <Grid m={2}>
      <Grid>
        {/* <Profile
          user={currentUser}
          numberOfTasks={numberOfTasks}
          numberOfEvents={numberOfEvents} /> */}
      </Grid>

      <Grid container spacing={2} my={4}>
        <Grid item md={8} xs={11}>
          <EventsOfUser
            user={currentUser}
            events={eventsByParticpant}
          />
        </Grid>

        <Grid item md={4} xs={11}>
          <TasksOfUser tasks={userTasks} />
        </Grid>
      </Grid>

    </Grid>
  )
}
