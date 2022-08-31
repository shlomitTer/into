import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';

import { Container, Grid, IconButton, Typography } from '@mui/material'
import { createTheme, responsiveFontSizes, ThemeProvider, } from '@mui/material/styles';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { shorten_a_string } from '../../features/functions/string'
import { countDays } from '../../features/functions/countDays';
import EventModal from '../../forms/eventModal';
import Alert from '../../forms/alert'
import { getCurrentEvent } from '../../features/slices/eventsSlice';

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Details({ editEventpermission }) {

  const [des, setDes] = useState("")
  const [date, setDate] = useState('00/00/00')
  const [days, setDays] = useState('')
  const [isEditModeEvent, setIsEditModeEvent] = useState(false)
  const [isDeleteEvent, setIsDeleteEvent] = useState(false);
  const currentEvent = useSelector((state) => state.eventsReducer.currentEvent);
  const dispatch = useDispatch()
  const params = useParams();

  useEffect(() => {
    dispatch(getCurrentEvent(params.idEvent));
  }, [])

  useEffect(() => {
    currentEvent?.description && setDes(shorten_a_string(currentEvent?.description, 20));
    let _date = new Date(currentEvent?.date).toLocaleDateString()
    setDate(_date)
    setDays(countDays(currentEvent?.date))
  }, [currentEvent])


  return (
    <Container
      sx={{
        boxShadow: 1,
        bgcolor: 'white',
        borderRadius: 2,
        // height: '42vh',
        p: 1,
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'start',
      }}>

      {editEventpermission && <Grid item xs={12} sx={{
        display: 'flex',
        justifyContent: 'end'
      }}>
        <IconButton onClick={() => {
          setIsEditModeEvent(true)
        }}>
          <ModeEditOutlinedIcon fontSize="small" />
        </IconButton>

        <IconButton onClick={() => {
          setIsDeleteEvent(true)
        }}>
          <DeleteOutlinedIcon fontSize="small" />
        </IconButton>
      </Grid>}

      <Grid item xs={12} sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'space-beween',
        height: '42vh'
      }}>
        <Grid item xs={12} sx={{ pb: 8 }}>
          <Typography variant='h5' sx={{ fontWeight: 700, pt: 0 }}>{currentEvent?.title}</Typography>
          <Typography variant='body2' sx={{ fontWeight: 700, py: 1, color: "gray" }}>created by: {currentEvent?.user_id?.name}</Typography>
          <Typography variant="h6">{des}</Typography>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>

          <Grid item xs={6}>
            <Typography variant="h6" sx={{ paddingRight: 5, fontWeight: 700 }}>{date}</Typography>
          </Grid>

          <Grid item xs={5} sx={{ textAlign: 'center' }} >
            {/* <AccessTimeIcon fontSize="medium" /> */}
            <Typography variant="body2" sx={{ pt: 1 }} color={days.color}>{days.str} </Typography>
          </Grid>
        </Grid>
      </Grid>
      <EventModal
        isEditModeEvent={isEditModeEvent}
        setIsEditModeEvent={setIsEditModeEvent}
        event={currentEvent}
      />
      <Alert
        title={"Delete Event"}
        content={"Are you sure?"}
        isDeleteEvent={isDeleteEvent}
        setIsDeleteEvent={setIsDeleteEvent}
        event={currentEvent}
      />

    </Container>
  )
}
