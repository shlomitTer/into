import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import { Button, Stack, Typography } from '@mui/material';

import { postNewTask, editTask } from '../features/slices/tasksSlice';
import HoverRating from './rating';
import './forms.css'

export default function TaskForm(props) {

  const dispatch = useDispatch();
  const params = useParams();
  const currentEvent = useSelector((state) => state.eventsReducer.currentEvent);
  const currentTaskWeight = useSelector((state) => state.tasksReducer.currentTaskWeight);
  const [owner, setOwner] = useState();
  let { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (props.isCreationMode)
      reset({})
    else if (props.isEditMode) {
      let body = {
        title: props.task.title,
        description: props.task.description,
        date: props.task.date,
        time: props.task.time,
        location: props.task.location
      }
      reset(body)
    }
  }, [props])

  const onSub = (_dataBody) => {
    const _id = params.idEvent;
    _dataBody.weight = currentTaskWeight;
    if (owner !== "")
      _dataBody.usersId_arr = owner;

    if (props.isCreationMode) {
      _dataBody.weight = currentTaskWeight;
      _dataBody.status = 'Ready';
      dispatch(postNewTask({ _dataBody, _id }))
    }
    else {
      dispatch(editTask({ _id: props.task._id, _body: _dataBody }))
    }
    props.setOpen(false)
    props.setIsCreationMode(false)
  }
  const handleClose = () => {
    props.setOpen(false)
    if (props.isEditMode)
      props.setEditMode(false)
    if (props.isCreationMode)
      props.setIsCreationMode(false)
  }
  return (
    <Box >
      {props.isCreationMode && <Typography variant='h3'>New Task</Typography>}
      {props.isEditMode && <Typography variant='h3'>Edit Task</Typography>}
      <form onSubmit={handleSubmit(onSub)}>

        <label >Title</label>
        <input {...register('title', { required: true, minLength: 2, maxLength: 50 })} type="text" />
        {errors.title && <small className='_error'>Enter valid title (min 2 chars max 50 chars)</small>}

        <label >Description</label>
        <textarea {...register('description', { required: false, minLength: 2, maxLength: 99 })} type="text" ></textarea>
        {errors.description && <small className='_error'>Enter valid description (min 2 chars max 99 chars)</small>}

        <label >Date</label>
        <input min={new Date().toISOString().slice(0, -8)} max={currentEvent.date} {...register('date', { required: true })} type="datetime-local" />
        {errors.date && <small className='_error'>Choose date</small>}

        {/* <label>Time:</label>
        <input {...register('time', { required: false, minLength: 0 })} type="time" defaultValue={"07:00"} /> */}

        {/* <label >Location:</label>
        <input {...register('location', { required: false, minLength: 0 })} type="text" />
        {errors.location && <small className='_error'>Enter valid location</small>} */}
        {/* <HoverRating /> */}
        <label> participant</label>

        <select onChange={(e) => {
          setOwner(e.target.value)
        }}>
          <option value={undefined}></option>
          {currentEvent.usersId_arr && currentEvent.usersId_arr.map(item => (
            <option value={item._id} key={item._id}> {item.name}</option>
          ))}

        </select>
        <HoverRating />
        <Stack
          spacing={2}
          direction="row"
          justifyContent="end"
          alignItems="baseline"
        >
          <Button variant="text" onClick={handleClose}>Cancel</Button>

          {props.isCreationMode ?
            <Button variant="text" type='submit'>Create</Button> :
            <Button variant="text" type='submit'>Edit</Button>
          }
        </Stack>

      </form>

    </Box >
  )
}
