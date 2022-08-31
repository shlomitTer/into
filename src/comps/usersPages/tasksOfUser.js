import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Grid, Typography, IconButton } from '@mui/material'

import { getUserTasks } from '../../features/slices/tasksSlice';
import TaskItem from '../eventPages/taskItem';

export default function TasksOfUser(props) {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    let ar = props.userTasks.filter((item) => item.status !== "Done")
    setTodo(ar)
  }, [props.userTasks])

  return (
    <Grid item >

      <Grid item sx={{
        my: 2
      }}>
        <Typography variant='h5' xs={2}>To do</Typography>
      </Grid >

      <Grid item>
        {todo && todo.map(task => (
          <TaskItem key={task._id} task={task}
          />
        ))
        }
        {(!todo || todo.length == 0) && <h3
          style={{
            paddingTop: '12px',
            color: '#d3d3d3',
            fontSize: '32px'
          }}>Yay! you have nothing to do</h3>}
      </Grid >
    </Grid >
  )
}
