import React, { useEffect, useState } from 'react'
import { Button, Container, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';

import { isEditEventAllowed } from '../../features/functions/permissions';
import { getCurrentEvent } from '../../features/slices/eventsSlice';
import { cancleInvitation, getCurrentEventInvitees } from '../../features/slices/inviteesSlice';
import { getCurrentUser } from '../../features/slices/userSlice';
import InvitationForm from '../../forms/invitationForm';


export default function InvitationBoard() {
  const dispatch = useDispatch();
  const currentEventInvitees = useSelector((state) => state.inviteeReducer.currentEventInvitees)
  const currentEvent = useSelector((state) => state.eventsReducer.currentEvent);
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const params = useParams();
  const [isInvites, setIsInvites] = useState(false)
  const [editEventpermission, setEditEventpermission] = useState(false)
  const nav = useNavigate()

  useEffect(() => {
    dispatch(getCurrentEvent(params.idEvent))
    dispatch(getCurrentEventInvitees(params.idEvent))
    dispatch(getCurrentUser())
  }, [])

  //Editing permission check 
  useEffect(() => {
    if (currentEvent && currentUser) {
      setEditEventpermission(isEditEventAllowed(currentEvent, currentUser._id))
    }
  }, [currentEvent, currentUser])

  const handleDel = (_dataBody) => {
    _dataBody.event_id = currentEvent._id
    dispatch(cancleInvitation(_dataBody))
  }

  return (
    <Container sx={{ pt: 10 }} maxWidth='md'>
      <Button onClick={() => {
        nav(-1)
      }}>  back </Button>
      <Stack
        direction="row"
        justifyContent="end"
        alignItems="baseline"
      >
        {editEventpermission && <Button variant="contained" onClick={() => {
          setIsInvites(true)
        }}>Invite</Button>
        }

      </Stack>
      <Typography variant='h3' sx={{ py: 2 }}>People You Invited</Typography>

      <Table sx={{ maxWidth: 750, mt: 10 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Full Name</TableCell>
            <TableCell align="left">email</TableCell>
            <TableCell align="left">phone</TableCell>
            <TableCell align="left">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentEventInvitees && currentEventInvitees.map((item) => (
            <TableRow key={item._id}>
              <TableCell align="left">{item.name}</TableCell>
              <TableCell align="left">{item.email}</TableCell>
              <TableCell align="left">{item.phone}</TableCell>
              <TableCell align="left"><Button onClick={() => {
                handleDel({ email: item.email })
              }}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <InvitationForm
        event={currentEvent}
        isInvites={isInvites}
        setIsInvites={setIsInvites}
      />
    </Container>
  )
}
