import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {
  Grid, Typography, Divider, AvatarGroup, Avatar, IconButton, Button, Stack
} from '@mui/material'
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import { stringAvatar } from '../../features/functions/avatarStringColor'
import { patchStatus, setIsTaskPageOpen, setTask_id } from '../../features/slices/tasksSlice';
import { countDays } from '../../features/functions/countDays';
import TaskModal from '../../forms/TaskModal';
import Alert from '../../forms/alert'
import { isTaskEditAllowed } from '../../features/functions/permissions';
import './taskItem.css'

// import { shorten_a_string } from '../../features/functions/string'

export default function TaskItem(props) {
  const dispatch = useDispatch()
  const [days, setDays] = useState('')
  const [date, setDate] = useState();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteTask, setIsDeleteTask] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const [icon, setIcon] = useState({
    Ready: false,
    InProgress: false,
    Done: false
  });
  const [editTaskPermission, setEditTaskPermission] = useState(false)
  const { isTaskPageOpen } = useSelector((state) => state.tasksReducer)

  //Editing permission check 
  useEffect(() => {
    if (props.isUserTask)
      setEditTaskPermission(true)
    if (props.currentEvent && props.currentUser) {
      setEditTaskPermission(isTaskEditAllowed(props.currentEvent, props.task, props.currentUser._id))
    }
  }, [props.currentEvent, props.currentUser, props.isUserTask])

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

  const handleClick = (e, _id, _value) => {
    e.stopPropagation()
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

  const handleOpen = (e) => {
    e.stopPropagation()
    dispatch(setIsTaskPageOpen(!isTaskPageOpen));
    dispatch(setTask_id(props.task._id));
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

        <Stack spacing={2} sx={{}}>
          <Button onClick={(e) => { handleClick(e, props.task._id, "Ready") }} className={`${icon.Ready ? '_red' : 'btn'}`} disabled={!editTaskPermission}>Ready</Button>
          <Button onClick={(e) => { handleClick(e, props.task._id, "InProgress") }} className={`${icon.InProgress ? '_yellow' : 'btn'}`} disabled={!editTaskPermission}>In Progress</Button>
          <Button onClick={(e) => { handleClick(e, props.task._id, "Done") }} className={`${icon.Done ? '_green' : 'btn'}`} disabled={!editTaskPermission}>Done</Button>
        </Stack>
      </Grid>
      <Divider orientation="vertical" variant="middle" flexItem />

      <Grid item xs={8} ps={2}>
        {editTaskPermission && <Grid item sx={{
          display: 'flex',
          justifyContent: 'end',
        }}><IconButton onClick={handleOpen}>
            <KeyboardArrowLeftIcon fontSize="small" />
          </IconButton>

          <IconButton onClick={(e) => {
            e.stopPropagation(e)
            setIsEditMode(true);
          }}>
            <ModeEditOutlinedIcon fontSize="small" />
          </IconButton>

          <IconButton onClick={(e) => {
            e.stopPropagation()
            setIsDeleteTask(true)
          }}>
            <DeleteOutlinedIcon fontSize="small" />
          </IconButton>

        </Grid>}
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
          <Grid item xs={4}  >
            <Typography variant='body2' sx={{ textAlign: 'center' }}>{date}</Typography>
          </Grid>

          <Grid item xs={4} sx={{ textAlign: 'center' }} >
            <Typography variant='body2' color={days.color}>{days.str}</Typography>
          </Grid>

          <Grid item xs={4} >
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
