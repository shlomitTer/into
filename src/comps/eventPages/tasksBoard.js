import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography, IconButton } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import TaskModal from '../../forms/TaskModal';
import TaskItem from './taskItem';
import { getCurrentEventTasks, getSortedCurrentEventTasks } from '../../features/slices/tasksSlice';


export default function TasksBoard(props) {
  const dispatch = useDispatch();
  const [isCreationMode, setIsCreationMode] = useState(false);
  const [tasks, setTasks] = useState();
  const currentEventTasks = useSelector((state) => state.tasksReducer.currentEventTasks);
  const currentEventSortedTasks = useSelector((state) => state.tasksReducer.currentEventSortedTasks);
  const selectRef = useRef()
  useEffect(() => {
    setTasks(currentEventTasks)
  }, [])

  const handleChange = () => {
    let status = selectRef.current.value;
    let event_id = props.currentEvent._id;
    if (status === 'All')
      dispatch(getCurrentEventTasks(event_id))
    else
      dispatch(getSortedCurrentEventTasks({ event_id, status }))
  };

  useEffect(() => {
    if (selectRef.current.value === '' || selectRef.current.value === 'All')
      setTasks(currentEventTasks)
    else {

      setTasks(currentEventSortedTasks)
    }
  }, [currentEventTasks, currentEventSortedTasks])


  return (
    <Grid item >

      <Grid item sx={{
        display: 'flex',
        alignItems: 'center',

      }}>
        <Grid item xs={8}
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}>
          <Typography variant='h5'>Tasks</Typography>

          {props.editEventpermission && <IconButton onClick={() => {
            setIsCreationMode(true)
          }}>
            <AddBoxOutlinedIcon />
          </IconButton>}
        </Grid>
        <Grid item xs={4}>
          <select ref={selectRef} onChange={handleChange} name="status" style={{
            fontSize: '14px',
            padding: '2px',
            boxShadow: 'none'
          }}>
            <option value="" disabled selected hidden>Sort By</option>
            <option value="All">All</option>
            <option value="Ready">Ready</option>
            <option value="InProgress">In progress</option>
            <option value="Done">Done</option>
          </select>
        </Grid>
      </Grid>
      <Grid item>

        {tasks && tasks.map(task => (
          <TaskItem key={task._id}
            task={task}
            currentEvent={props.currentEvent}
            currentUser={props.currentUser}
          />
        ))
        }
        {(!tasks || tasks === 0) && <h3
          style={{
            paddingTop: '12px',
            color: '#d3d3d3',
            fontSize: '32px'
          }}>let's create a task</h3>}

      </Grid >
      <TaskModal
        isCreationMode={isCreationMode}
        setIsCreationMode={setIsCreationMode}
      />
    </Grid >
  )
}
