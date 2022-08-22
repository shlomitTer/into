import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';

import { Button, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import HoverRating from './rating';
import './taskForm.css'
import { rootShouldForwardProp } from '@mui/material/styles/styled';
import { postNewTask } from '../features/slices/tasksSlice';



export default function TaskForm(props) {

  const dispatch = useDispatch();
  const params = useParams();
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
      console.log(body);
      console.log(props);
      // reset(body)
    }
  }, [props.task])



  const onSub = (_dataBody) => {
    const _id = params.idEvent;
    if (props.isCreationMode) {
      _dataBody.weight = 1;
      _dataBody.status = 'Ready';
      dispatch(postNewTask({ _dataBody, _id }))
    } else {
    }
    props.handleClose();

  }

  return (
    <Box >
      {props.isCreationMode && <Typography variant='h3'>New Task</Typography>}
      {props.isEditMode && <Typography variant='h3'>Edit Task</Typography>}
      <form onSubmit={handleSubmit(onSub)}>

        <label >Title</label>
        <input {...register('title', { required: true, minLength: 2 })} type="text" />
        {errors.title && <small className='_error'>Enter valid name (min 2 chars)</small>}

        <label >Description</label>
        <textarea {...register('description', { required: true, minLength: 2, maxLength: 99 })} type="text" ></textarea>
        {errors.description && <small className='_error'>Enter valid name (min 2 chars)</small>}




        <label >Date</label>
        <input {...register('date', { required: true, minLength: 2 })} type="date" />
        {errors.date && <small className='_error'>Choose date</small>}


        <label>Time:</label>
        <input {...register('time', { required: false, minLength: 0 })} type="time" defaultValue={"07:00"} />

        <label >Location:</label>
        <input {...register('location', { required: false, minLength: 0 })} type="text" />
        {errors.location && <small className='_error'>Enter valid location</small>}
        <HoverRating />

        <Stack
          spacing={2}
          direction="row"
          justifyContent="end"
          alignItems="baseline"
        >
          <Button variant="text" onClick={props.handleClose}>Cancel</Button>

          <Button
            variant="text" type='submit'>Create</Button>
        </Stack>

      </form>

    </Box >
  )
}
