import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import Alert from '../../forms/alert'
import { Grid, Typography, Stack, Button } from '@mui/material'
import { aproveInvitation } from '../../features/slices/inviteesSlice';
import { useNavigate } from 'react-router-dom';

export default function InvitationItem(props) {
  const [isRefusal, setIsRefusal] = useState(false);
  const dispatch = useDispatch()
  const nav = useNavigate();

  const handleRefusal = () => {
    setIsRefusal(true)
  }

  const handleAprove = (_event_id) => {
    let _body = { email: props.currentUser.email, event_id: _event_id }
    dispatch(aproveInvitation(_body))

    nav(`/event/${_event_id}`)
  }

  return (
    <Grid item key={props.invitation._id} xs={10}
      sx={{
        // borderRadius: 2,
        // backgroundColor: 'white',
        p: 2,
        mt: 2,
        '&:hover': {
          transform: "scale3d(1.01, 1.01, 1.01)",
        },
      }}>

      <Typography variant='h5'>{props.invitation.event_name}</Typography>
      <Typography variant='body1'>creaed by: {props.invitation.creator} </Typography>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="end"
        alignItems="baseline"
      >
        <Button onClick={handleRefusal}>Refusal</Button>
        <Button onClick={() => {
          handleAprove(props.invitation.event_id._id)
        }}>Aprove</Button>
      </Stack>
      <Alert
        title={"Refusing the event"}
        content={"Are you sure?"}
        isRefusal={isRefusal}
        setIsRefusal={setIsRefusal}
        invitation={props.invitation} />
    </Grid>

  )
}
