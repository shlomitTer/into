import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Grid, Typography, IconButton } from '@mui/material'

import { getUserTasks } from '../../features/slices/tasksSlice';
import TaskItem from '../eventPages/taskItem';

export default function TasksOfUser() {
  const userTasks = useSelector((state) => state.tasksReducer.userTasks);
  const [todo, setTodo] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserTasks())

  }, [])

  useEffect(() => {
    let ar = userTasks.filter((item) => item.status !== "Done")
    setTodo(ar)
  }, [userTasks])

  return (
    <Grid item >

      <Grid item sx={{
        my: 2
      }}>
        <Typography variant='h5' xs={2}>TO DO</Typography>
      </Grid >

      <Grid item>
        {todo && todo.map(task => (
          <TaskItem key={task._id} task={task}
          />
        ))
        }
        {(!todo || todo.length == 0) && <h3
          style={{
            padding: '12px',
            color: '#d3d3d3',
            fontSize: '20px'
          }}>There are no tasks to display</h3>}
      </Grid >
    </Grid >
  )
}
