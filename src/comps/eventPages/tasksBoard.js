import React, { useState } from 'react'
import { Grid, Typography, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';


import TaskModal from '../../forms/TaskModal';
import TaskItem from './taskItem';
import { useDispatch } from 'react-redux';
import { getCurrentEventTasks, getSortedCurrentEventTasks } from '../../features/slices/tasksSlice';


export default function TasksBoard({ tasks, currentEvent }) {

  const [isCreationMode, setIsCreationMode] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    let status = e.target.value;
    let event_id = currentEvent._id;
    if (status == 'All')
      dispatch(getCurrentEventTasks(event_id))
    else
      dispatch(getSortedCurrentEventTasks({ event_id, status }))
  };

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

          <IconButton onClick={() => {
            setIsCreationMode(true)
          }}>
            <AddBoxOutlinedIcon />
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <select onChange={handleChange} name="status" style={{
            fontSize: '14px',
            padding: '2px'
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

          />
        ))
        }
        {(!tasks || tasks.length == 0) && <h3
          style={{
            padding: '12px',
            color: '#d3d3d3',
            fontSize: '40px'
          }}>There are no tasks to display</h3>}

      </Grid >
      <TaskModal
        isCreationMode={isCreationMode}
        setIsCreationMode={setIsCreationMode}

      />
    </Grid >
  )
}
