import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { Button, Stack, Typography, Box } from '@mui/material';

import './forms.css'
import { editEvent, postNewEvent } from '../features/slices/eventsSlice';

export default function EventForm(props) {

  const dispatch = useDispatch();
  let { register, handleSubmit, reset, formState: { errors } } = useForm();


  useEffect(() => {
    if (props.isCreationModeEvent)
      reset({})
    else if (props.isEditModeEvent) {
      let body = {
        title: props.event.title,
        description: props.event.description,
        date: props.event.date,
        time: props.event.time,
        location: props.event.location
      }
      reset(body)
    }
  }, [props.event])

  const onSub = (_dataBody) => {
    if (props.isCreationModeEvent)
      dispatch(postNewEvent(_dataBody))
    else {
      let _id = props.event._id;
      dispatch(editEvent({ _id, _dataBody }))
    }
    handleClose();
  }
  const handleClose = () => {
    props.setOpen(false);
    if (props.isEditModeEvent)
      props.setIsEditModeEvent(false)
    if (props.isCreationModeEvent)
      props.setIsCreationModeEvent(false)
  }
  return (
    <Box >
      {props.isCreationModeEvent && <Typography variant='h3'>New Event</Typography>}
      {props.isEditModeEvent && <Typography variant='h3'>Edit Event</Typography>}
      <form onSubmit={handleSubmit(onSub)}>

        <label >Title</label>
        <input {...register('title', { required: true, minLength: 2, maxLength: 99 })} type="text" />
        {errors.title && <small className='_error'>Enter valid title (min 2 chars)</small>}

        <label >Description</label>
        <textarea {...register('description', { required: false, minLength: 2, maxLength: 150 })} type="text" ></textarea>
        {errors.description && <small className='_error'>Enter valid description (min 2 chars)</small>}

        <label >Date</label>
        <input min={new Date().toISOString().slice(0, -8)} {...register('date', { required: true })} type="datetime-local" />
        {errors.date && <small className='_error'>Choose date</small>}

        {/* 
        <label>Time:</label>
        <input {...register('time', { required: false, minLength: 0 })} type="time" defaultValue={"07:00"} /> */}

        <label >Location:</label>
        <input {...register('location', { required: false, minLength: 0 })} type="text" />
        {errors.location && <small className='_error'>Enter valid location</small>}
        <div>
          <label className='_lable'>
            <input type="checkbox" id='permission' name='permission' {...register('EditableByParticipants')} />
            Allow participants to edit the event</label>
        </div>


        <Stack
          spacing={2}
          direction="row"
          justifyContent="end"
          alignItems="baseline"
        >
          <Button variant="text" onClick={handleClose}>Cancel</Button>

          {props.isCreationModeEvent ?
            <Button variant="text" type='submit'>Create</Button> :
            <Button variant="text" type='submit'>Edit</Button>
          }
        </Stack>

      </form>

    </Box >
  )
}
