import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { Box, Button, Grid, IconButton, Typography } from '@mui/material'
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { countDays } from '../../features/functions/countDays';
import EventModal from '../../forms/eventModal';
import Alert from '../../forms/alert'

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Details(props) {
  const [date, setDate] = useState('00/00/00')
  const [days, setDays] = useState('')
  const [isEditModeEvent, setIsEditModeEvent] = useState(false)
  const [isDeleteEvent, setIsDeleteEvent] = useState(false);
  const [isLeavingEvent, setIsLeavingEvent] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const currentEvent = useSelector((state) => state.eventsReducer.currentEvent);
  const errorCode = useSelector((state) => state.eventsReducer.errorCode);
  const nav = useNavigate()

  useEffect(() => {
    let _date = new Date(currentEvent?.date).toLocaleDateString()
    setDate(_date)
    setDays(countDays(currentEvent?.date))
  }, [currentEvent])

  useEffect(() => {
    if (isConfirmed)
      if (!errorCode.length)
        nav(`/profile`)
  }, [isConfirmed])

  return (
    <Grid item xs={12}>
      <Box
        sx={{
          boxShadow: 1,
          bgcolor: 'white',
          borderRadius: 2,
          height: '42vh',
          p: 1,
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'end'
          }}>
            {!props.isEventCreator &&
              <Button style={{ textTransform: 'none' }} onClick={() => {
                setIsLeavingEvent(true)
                setAlertTitle("Leave an event and delete tasks you created")
              }}> Leave</Button>}
            {props.editEventpermission &&
              <IconButton onClick={() => {
                setIsEditModeEvent(true)
              }}>
                <ModeEditOutlinedIcon fontSize="small" />
              </IconButton>}
            {props.isEventCreator &&
              <IconButton onClick={() => {
                setIsDeleteEvent(true)
                setAlertTitle("Delete an event")

              }}>
                <DeleteOutlinedIcon fontSize="small" />
              </IconButton>
            }
          </Box>
          <Box sx={{ pt: 1 }}>
            <Box>
              <Typography variant='h5' sx={{ fontWeight: 700, pt: 0 }}>{currentEvent?.title}</Typography>
            </Box>
            <Box>
              <Typography variant='body2' sx={{ fontWeight: 700, pt: 1, color: "gray" }}>created by: {currentEvent?.user_id?.name}</Typography>
            </Box>
            <Box >
              <Typography variant="h6" sx={{ wordBreak: 'break-word' }}>{currentEvent?.description}</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>

          <Box>
            <Typography variant="h6" sx={{ paddingRight: 5, fontWeight: 700 }}>{date}</Typography>
          </Box>

          <Box sx={{ textAlign: 'center' }} >
            {/* <AccessTimeIcon fontSize="medium" /> */}
            <Typography variant="body2" sx={{ pt: 1 }} color={days.color}>{days.str} </Typography>
          </Box>

        </Box>
      </Box>
      <EventModal
        isEditModeEvent={isEditModeEvent}
        setIsEditModeEvent={setIsEditModeEvent}
        event={currentEvent}
      />
      <Alert
        title={alertTitle}
        content={"Are you sure?"}
        isDeleteEvent={isDeleteEvent}
        setIsDeleteEvent={setIsDeleteEvent}
        isLeavingEvent={isLeavingEvent}
        setIsConfirmed={setIsConfirmed}
        setIsLeavingEvent={setIsLeavingEvent}
        event={currentEvent}
      />
    </Grid >
  )
}




