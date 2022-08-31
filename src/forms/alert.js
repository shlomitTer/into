import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { deleteEvent } from '../features/slices/eventsSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteTask } from '../features/slices/tasksSlice';
import { refusal } from '../features/slices/inviteesSlice';

export default function Alert(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch()
  const nav = useNavigate()
  console.log(props)

  useEffect(() => {
    if (props.isDeleteEvent || props.isDeleteTask || props.isRefusal) {
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
      console.log(props.invitation.email);
      console.log(props.invitation.event_id._id);
      let body = { email: props.invitation.email, event_id: props.invitation.event_id._id }
      console.log(body);
      dispatch(refusal(body))
      props.setIsRefusal(false)
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
