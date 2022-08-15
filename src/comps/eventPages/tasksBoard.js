import React from 'react'
import { Grid, Typography } from '@mui/material'


import AddTaskModal from '../../forms/addTaskModal';
import TaskItem from './taskItem';


export default function TasksBoard({ tasks }) {



  return (
    <Grid item >

      <Grid item
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}>
        <Typography variant='h5' xs={2}>Tasks</Typography>
        <AddTaskModal xs={2} />

      </Grid>

      <Grid item>
        {tasks && tasks.map(task => (
          <TaskItem task={task} key={task._id} />
        ))
        }

      </Grid >
    </Grid >
  )
}
