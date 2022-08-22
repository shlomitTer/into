import { Box, Stack, Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteEvent } from '../features/slices/eventsSlice'

export default function DeletionAlert(props) {
  const dispatch = useDispatch()
  const nav = useNavigate()

  const del = () => {
    nav("/profile")
    dispatch(deleteEvent(props.event._id))

  }



  return (
    <Box>
      <h3>Delete Event</h3>
      <p>Are you sure?</p>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="end"
        alignItems="baseline"
      >
        <Button variant="text" onClick={props.handleClose}>Cancel</Button>

        <Button variant="text" type='submit' onClick={del}>Delete</Button>

      </Stack>

    </Box>
  )
}
