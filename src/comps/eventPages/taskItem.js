import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

import { Grid, Typography, Divider, AvatarGroup, Avatar, IconButton, MenuItem, FormControl, Select, Button, Stack } from '@mui/material'
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { stringAvatar } from '../../features/functions/avatarStringColor'
import { patchStatus } from '../../features/slices/tasksSlice';

import { countDays } from '../../features/functions/countDays';
import TaskModal from '../../forms/TaskModal';
import Alert from '../../forms/alert'
import './taskItem.css'
// import { shorten_a_string } from '../../features/functions/string'


export default function TaskItem(props) {
  const dispatch = useDispatch()
  const [days, setDays] = useState('')
  const [date, setDate] = useState();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteTask, setIsDeleteTask] = useState(false);
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


  useEffect(() => {
    let _date = new Date(props.task.date).toLocaleDateString()
    setDate(_date)
  }, [])

  const handleClick = (_id, _value) => {
    let statusIcon = {
      Ready: false,
      InProgress: false,
      Done: false
    }
    statusIcon[_value] = true;
    setIcon(statusIcon)

    let _dataBody = { status: _value }
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

      <Grid item xs={3}
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}>
        {/* <FormControl variant="standard" sx={{ width: '80%' }}>
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
        </FormControl> */}
        <Stack spacing={2} sx={{}}>
          <Button onClick={() => { handleClick(props.task._id, "Ready") }} className={`${icon.Ready ? '_red' : 'btn'}`}>Ready</Button>
          <Button onClick={() => { handleClick(props.task._id, "InProgress") }} className={`${icon.InProgress ? '_yellow' : 'btn'}`}>In Progress</Button>
          <Button onClick={() => { handleClick(props.task._id, "Done") }} className={`${icon.Done ? '_green' : 'btn'}`}>Done</Button>
        </Stack>
        {/* {icon.Ready && <PendingIcon fontSize='large' color='error' />}
        {icon.InProgress && <SyncIcon fontSize='large' color='warning' />}
        {icon.Done && <TaskAltIcon fontSize='large' color='success' />} */}
      </Grid>
      <Divider orientation="vertical" variant="middle" flexItem />

      <Grid item xs={8} px={2}>

        <Grid item sx={{
          display: 'flex',
          justifyContent: 'end',
        }}>
          <IconButton onClick={() => {
            setIsEditMode(true);

          }}>
            <ModeEditOutlinedIcon fontSize="small" />
          </IconButton>

          <IconButton onClick={() => {
            setIsDeleteTask(true)
          }}>
            <DeleteOutlinedIcon fontSize="small" />
          </IconButton>
        </Grid>
        <Typography variant='h6'>{props.task.title}</Typography>
        <Typography variant='body1' sx={{ height: '47px' }}>{props.task.description}</Typography>
        <Grid item sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyItems: 'center',
          justifyContent: 'center',
          alignContent: 'space-between',
          alignItems: 'center',
        }}>
          <Grid item xs={12} xl={4} >
            <Typography variant='body2' sx={{ textAlign: 'center' }}>{date}</Typography>
          </Grid>

          <Grid item xs={12} xl={4} sx={{ textAlign: 'center' }} >
            <Typography variant='body2' color={days.color}>{days.str}</Typography>
          </Grid>

          <Grid item xs={12} xl={4} px={5}>
            <AvatarGroup max={2}>
              {props.task.usersId_arr && props.task.usersId_arr.map(user => (

                <Avatar key={user._id} {...stringAvatar(user?.name)} ></Avatar>
              ))}
            </AvatarGroup>
          </Grid>

        </Grid>
      </Grid>

      <TaskModal
        task={props.task}
        // isCreationMode={props.isCreationMode}
        // setIsCreationMode={props.setIsCreationMode}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}

      />
      <Alert
        task={props.task}
        isDeleteTask={isDeleteTask}
        setIsDeleteTask={setIsDeleteTask}
        title={"Delete Task"}
        content={"Are you sure?"}
      />

    </Grid>
  )
}
