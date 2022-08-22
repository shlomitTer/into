import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";

import { Container, Grid, IconButton, Typography } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { createTheme, responsiveFontSizes, ThemeProvider, } from '@mui/material/styles';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { shorten_a_string } from '../../features/functions/string'
import { countDays } from '../../features/functions/countDays';
import EventModal from '../../forms/eventModal';
import MessagesModal from '../../forms/messagesModal';

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Details({ event }) {
  const [des, setDes] = useState("")
  const [date, setDate] = useState()
  const [days, setDays] = useState('')
  const [isCreationModeEvent, setIsCreationModeEvent] = useState(false)
  const [isEditModeEvent, setIsEditModeEvent] = useState(false)
  const [deleteItem, setDeleteItem] = useState(false);


  useEffect(() => {
    let str;
    event?.description && setDes(shorten_a_string(event.description, 4));

    let _date = new Date(event.date).toLocaleDateString()
    setDate(_date)

    setDays(countDays(event.date))
  }, [event])


  return (
    <Container
      sx={{
        boxShadow: 1,
        bgcolor: 'white',
        borderRadius: 2,
        height: '42vh',
        p: 1,
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'start',
      }}>

      <Grid item xs={12} sx={{
        display: 'flex',
        justifyContent: 'end',

      }}>
        <IconButton onClick={() => {
          setIsEditModeEvent(true)
        }}>
          <ModeEditOutlinedIcon fontSize="small" />
        </IconButton>

        <IconButton onClick={() => {
          setDeleteItem(true)
        }}>
          <DeleteOutlinedIcon fontSize="small" />
        </IconButton>
      </Grid>

      <Grid item xs={12} sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'space-beween',
        height: '42vh'
      }}>
        <Grid item xs={12} sx={{ pb: 8 }}>
          <Typography variant='h5' sx={{ fontWeight: 700, pt: 0 }}>{event.title}</Typography>
          <Typography variant='body2' sx={{ fontWeight: 700, py: 1, color: "gray" }}>created by:{event.user_id?.name}</Typography>
          <Typography variant="subtitle2">{event.description}</Typography>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>

          <Grid item xs={6} sx={{}}>
            <Typography variant="h5" sx={{ paddingRight: 5, fontWeight: 700 }}>{date}</Typography>
          </Grid>

          <Grid item xs={6} sx={{ textAlign: 'center' }} >
            <AccessTimeIcon fontSize="medium" />
            <Typography variant="body2" sx={{ pt: 1, display: "inline" }} color={days.color}>{days.str} </Typography>
          </Grid>
        </Grid>
      </Grid>
      <EventModal
        isEditModeEvent={isEditModeEvent}
        setIsEditModeEvent={setIsEditModeEvent}
        isCreationModeEvent={isCreationModeEvent}
        setIsCreationModeEvent={setIsCreationModeEvent}
        event={event}
      />
      <MessagesModal
        deleteItem={deleteItem}
        setDeleteItem={setDeleteItem}
        event={event}
      />
    </Container>
  )
}
