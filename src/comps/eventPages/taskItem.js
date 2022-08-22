import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";

import { Grid, Typography, Box, Divider, AvatarGroup, Avatar, InputLabel, MenuItem, FormControl, Select, OutlinedInput, Card } from '@mui/material'

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PendingIcon from '@mui/icons-material/Pending';
import SyncIcon from '@mui/icons-material/Sync';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import { stringAvatar } from '../../features/functions/avatarStringColor'
import { patchStatus } from '../../features/slices/tasksSlice';
import BtnDelEdit from '../tasksPages/btnDelEdit';
import { theme } from '../../theme/theme'
import { countDays } from '../../features/functions/countDays';
// import { shorten_a_string } from '../../features/functions/string'


export default function TaskItem(props) {
  const [days, setDays] = useState('')
  const dispatch = useDispatch()

  const [icon, setIcon] = useState({
    Ready: false,
    InProgress: false,
    Done: false
  });

  useEffect(() => {
    let tempStatus = {
      Ready: false,
      InProgress: false,
      Done: false
    }
    tempStatus[props.task.status] = true
    setIcon(tempStatus)
    setDays(countDays(props.task.date))

  }, [props.task])

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
    <Grid item xs={12}
      sx={{
        minHeight: '150px',
        bgcolor: 'white',
        p: 2,
        mb: 2,
        boxShadow: 1,
        borderRadius: 2,
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
        alignItems: 'space-between',
        justifyContent: 'space-between',
        justifyItems: 'center'
      }} key={props.task._id}>

      <Grid item xs={2}>
        <FormControl variant="standard" sx={{ width: '80%' }}>
          <Select
            fullWidth
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            defaultValue={props.task.status}
            onChange={handleChange(props.task._id)}
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
        {icon.Ready && <PendingIcon fontSize='large' color='error' />}
        {icon.InProgress && <SyncIcon fontSize='large' color='warning' />}
        {icon.Done && <TaskAltIcon fontSize='large' color='success' />}
      </Grid>
      <Divider orientation="vertical" variant="middle" flexItem />

      <Grid item xs={9} px={2}>
        <Grid item sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between'
        }}>
          <Grid item sm={11} md={9}>
            <Typography variant='h6'>{props.task.title}</Typography>
          </Grid>
          <Grid item sm={11} md={2}>
            <BtnDelEdit
              task={props.task}
              isCreationMode={props.isCreationMode}
              setIsCreationMode={props.setIsCreationMode}
              isEditMode={props.isEditMode}
              setIsEditMode={props.setIsEditMode}
            />
          </Grid>

        </Grid>



        <Typography variant='body1' sx={{ height: '47px' }}>{props.task.description}</Typography>



        <Grid item sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyItems: 'center',
          justifyContent: 'center',
          alignContent: 'space-between',
          alignItems: 'center',
        }}>
          <Grid item xs={11} lg={4} px={5}>

            <AvatarGroup max={2}>
              {props.task.usersId_arr && props.task.usersId_arr.map(user => (

                <Avatar key={user._id} {...stringAvatar(user?.name)} ></Avatar>
              ))}
            </AvatarGroup>
          </Grid>

          <Grid item xs={11} lg={4} >
            <Typography variant='body2' sx={{ textAlign: 'center' }}>{props.task.date.slice(0, 10)}</Typography>
          </Grid>

          <Grid item xs={11} lg={4} sx={{ textAlign: 'center' }} >

            <Typography variant='body2' color={days.color}>{days.str}</Typography>
          </Grid>

        </Grid>
      </Grid>


    </Grid>
  )
}
