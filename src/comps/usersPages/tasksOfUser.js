import React, { useState } from 'react'
import { Grid, Typography, IconButton } from '@mui/material'

import TaskItem from '../eventPages/taskItem';

export default function TasksOfUser({ tasks }) {
  console.log(tasks);
  return (
    <Grid item >

      <Grid item sx={{
        my: 2
      }}>
        <Typography variant='h5' xs={2}>TO DO</Typography>
      </Grid >

      <Grid item>
        {tasks && tasks.map(task => (
          <TaskItem key={task._id} task={task}
          />
        ))
        }
        {(!tasks || tasks.length == 0) && <h3
          style={{
            padding: '12px',
            color: '#d3d3d3',
            fontSize: '20px'
          }}>There are no tasks to display</h3>}
      </Grid >
    </Grid >
  )
}
