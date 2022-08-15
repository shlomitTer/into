import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";

import { Grid, IconButton, Typography, Box, Divider, AvatarGroup, Avatar, InputLabel, MenuItem, FormControl, Select, OutlinedInput } from '@mui/material'

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PendingIcon from '@mui/icons-material/Pending';
import SyncIcon from '@mui/icons-material/Sync';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import { stringAvatar } from '../../features/functions/avatarStringColor'
import AddTaskModal from '../../forms/addTaskModal';
import { patchStatus } from '../../features/slices/tasksSlice';
// import { shorten_a_string } from '../../features/functions/string'


export default function TaskItem({ task }) {
  const dispatch = useDispatch()

  const [icon, setIcon] = useState({
    Ready: false,
    InProgress: false,
    Done: false
  });
  useEffect(() => {
    // console.log(task);
    console.table(icon);

    task?.status && setIcon(icon[task.status] = true)
    console.table(icon);
  }, [])

  const handleChange = (_id) => (e) => {
    let statusIcon = {
      Ready: false,
      InProgress: false,
      Done: false
    }
    // console.table(statusIcon);
    let statusStr = e.target.value
    let _dataBody = { status: statusStr }

    statusIcon[statusStr] = true;
    setIcon(statusIcon)
    dispatch(patchStatus({ _dataBody, _id }));
  }
  return (
    <Box
      sx={{
        height: '150px',
        bgcolor: 'white',
        p: 2,
        mb: 2,
        boxShadow: 1,
        borderRadius: 2,
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'space-between',
      }} key={task._id}>

      <Grid item xs={2}>
        <FormControl variant="standard" sx={{ width: '80%' }}>
          <Select
            fullWidth
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            defaultValue={task.status}
            onChange={handleChange(task._id)}
            label="status"
            sx={{
              fontSize: '11px',
            }}
          >

            <MenuItem value="Ready">Ready</MenuItem>
            <MenuItem value="InProgress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>

          </Select>
        </FormControl>
        {icon.Ready && <SyncIcon />}
        {icon.InProgress && <PendingIcon />}
        {icon.Done && <TaskAltIcon />}
      </Grid>
      <Divider orientation="vertical" variant="middle" flexItem />

      <Grid item xs={9} px={2}>

        <Typography variant='h6' >{task.title}</Typography>


        <Typography variant='body1' sx={{ height: '47px' }}>{task.description}</Typography>



        <Grid item sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyItems: 'center',
          justifyContent: 'center',
          alignContent: 'space-between',
          alignItems: 'center',
        }}>
          <Grid item xs={4} px={5}>

            <AvatarGroup max={2}>
              {task.usersId_arr && task.usersId_arr.map(user => (

                <Avatar key={user._id} {...stringAvatar(user?.name)} ></Avatar>
              ))}
            </AvatarGroup>
          </Grid>

          <Grid item xs={4} sx={{ borderLeft: 1, borderRight: 1, }}>
            <Typography variant='body2' sx={{ textAlign: 'center' }}>{task.date.slice(0, 10)}</Typography>
          </Grid>

          <Grid item xs={4} sx={{ textAlign: 'center' }} >
            {/* <AccessTimeIcon sx={{
            display: 'inline',

          }} /> */}
            <Typography variant='body2' sx={{
              display: 'inline'
            }}>23 Days left</Typography>
          </Grid>

        </Grid>
      </Grid>

    </Box>
  )
}
