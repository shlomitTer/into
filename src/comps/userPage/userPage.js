import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Grid from '@mui/material/Grid';

import { getEventsByCreator, getEventsByParticpant } from '../../features/slices/eventsSlice';
import { getCurrentUser } from '../../features/slices/userSlice';
import { getUserTasks } from '../../features/slices/tasksSlice';

import Count from './count'
import EventsX from './eventsX'
import Profile from './profile'
import ToDos from './toDos'
import CheckboxList from './newToDo'

export default function UserPage(props) {
  const dispatch = useDispatch();
  const eventsByCreator = useSelector((state) => state.eventsReducer.eventsByCreator);
  const eventsByParticpant = useSelector((state) => state.eventsReducer.eventsByParticpant);

  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const userTasks = useSelector((state) => state.tasksReducer.userTasks);


  useEffect(() => {
    doApi()
    console.log(userTasks)
  }, []);


  useEffect(() => {
  }, [eventsByCreator]);



  const doApi = () => {
    dispatch(getEventsByCreator());
    dispatch(getEventsByParticpant());
    dispatch(getCurrentUser());
    dispatch(getUserTasks());
  }




  return (
    <React.Fragment>
      <Profile currentUser={currentUser} />
      {/* <Count /> */}
      <Grid container sx={{ dislay: 'flex', justifyContent: 'flex-end', paddingTop: 5 }}>

        <EventsX eventsByCreator={eventsByCreator} eventsByParticpant={eventsByParticpant} />
        <ToDos userTasks={userTasks} />
        {/* <CheckboxList /> */}

      </Grid>
    </React.Fragment>
  )
}
