import React, { useState, useEffect } from 'react'
import { Grid, Typography } from '@mui/material'

import TaskItem from '../eventPages/taskItem';

export default function TasksOfUser(props) {
  const [todo, setTodo] = useState([]);
  const isUserTask = true;
  useEffect(() => {
    let todoTasks = props.userTasks.filter((item) => item.status !== "Done")
    setTodo(todoTasks)
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
          <TaskItem
            key={task._id
            } task={task}
            isUserTask={isUserTask}
          />
        ))
        }
        {(!todo || todo.length === 0) && <h3
          style={{
            paddingTop: '12px',
            color: '#d3d3d3',
            fontSize: '32px'
          }}>Yay! you have nothing to do</h3>}
      </Grid >
    </Grid >
  )
}
