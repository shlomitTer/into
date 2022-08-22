import React, { useState } from 'react'
import { Grid, Typography, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';


import TaskModal from '../../forms/TaskModal';
import TaskItem from './taskItem';


export default function TasksBoard({ tasks }) {

  const [isCreationMode, setIsCreationMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // console.log(isCreationMode);
  // console.log(isEditMode);
  const handleChange = (e) => {
    let query = e.target.value;
    alert(query)
  };

  return (
    <Grid item >

      <Grid item sx={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <Grid item xs={6}
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
        <Grid item xs={5}>
          <select onChange={handleChange} name="status">
            <option>Sort By</option>
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
            isCreationMode={isCreationMode}
            setIsCreationMode={setIsCreationMode}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
          />
        ))
        }

      </Grid >
      <TaskModal
        isCreationMode={isCreationMode}
        setIsCreationMode={setIsCreationMode}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
      />
    </Grid >
  )
}
