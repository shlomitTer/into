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

      </Grid >
    </Grid >
  )
}
