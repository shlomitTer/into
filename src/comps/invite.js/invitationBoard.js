import { Button, Container, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getCurrentEvent } from '../../features/slices/eventsSlice';
import { cancleInvitation, getCurrentEventInvitees } from '../../features/slices/inviteesSlice';
import InvitationForm from '../../forms/invitationForm';


export default function InvitationBoard() {
  const dispatch = useDispatch();
  const currentEventInvitees = useSelector((state) => state.inviteeReducer.currentEventInvitees)
  const inviteesErrors = useSelector((state) => state.inviteeReducer.status)
  const currentEvent = useSelector((state) => state.eventsReducer.currentEvent);
  const params = useParams();
  const [isInvites, setIsInvites] = useState(false)


  useEffect(() => {
    dispatch(getCurrentEvent(params.idEvent))
    dispatch(getCurrentEventInvitees(params.idEvent))
  }, [])

  useEffect(() => {
    if (inviteesErrors == "ERR_BAD_REQUEST")
      alert("Email exists in the system")
    if (inviteesErrors == "ERR_NETWORK")
      alert("There is a problem, please try again later")
  }, [inviteesErrors])

  const handleDel = (_dataBody) => {
    _dataBody.event_id = currentEvent._id
    dispatch(cancleInvitation(_dataBody))
  }

  return (
    <Container sx={{ pt: 10 }} maxWidth='md'>
      <Stack
        direction="row"
        justifyContent="end"
        alignItems="baseline"
      >
        <Button variant="contained" onClick={() => {
          setIsInvites(true)
        }}>Invite</Button>

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
