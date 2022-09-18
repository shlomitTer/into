import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { deleteEvent, leaveEvent, removeAparticipant } from '../features/slices/eventsSlice';
import { deleteTask } from '../features/slices/tasksSlice';
import { refusal } from '../features/slices/inviteesSlice';

export default function Alert(props) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch()
  const nav = useNavigate()
  const params = useParams();

  useEffect(() => {
    if (props.isDeleteEvent || props.isDeleteTask || props.isRefusal || props.isLeavingEvent || props.isRemove) {
      setOpen(true)
    }
  }, [props])

  const handleClick = () => {
    if (props.isDeleteEvent) {
      dispatch(deleteEvent(props.event._id))
      props.setIsDeleteEvent(false)
      nav("/profile")
    }
    if (props.isDeleteTask) {
      dispatch(deleteTask(props.task._id))
      props.setIsDeleteTask(false)
      setOpen(false)
    }
    if (props.isRefusal) {
      let body = { email: props.invitation.email, event_id: props.invitation.event_id._id }
      dispatch(refusal(body))
      props.setIsRefusal(false)
      setOpen(false)
    }
    if (props.isLeavingEvent) {
      dispatch(leaveEvent(params.idEvent))
      props.setIsLeavingEvent(false)
      props.setIsConfirmed(true)
      setOpen(false)
    }
    if (props.isRemove) {
      dispatch(removeAparticipant({ event_id: params.idEvent, _id: props.participant._id }))
      props.setIsRemove(false)
      setOpen(false)
    }
  };

  const handleClose = () => {
    if (props.isDeleteEvent)
      props.setIsDeleteEvent(false)
    if (props.isDeleteTask)
      props.setIsDeleteTask(false)
    if (props.isRefusal)
      props.setIsRefusal(false)
    if (props.isLeavingEvent)
      props.setIsLeavingEvent(false)
    if (props.isRemove)
      props.setIsRemove(false)
    setOpen(false);

  };

  return (
    <div>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
      >
        <DialogTitle id="responsive-dialog-title"> {props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.content}</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>
            Cancle
          </Button>
          <Button onClick={handleClick}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
