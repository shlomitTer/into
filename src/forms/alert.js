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

export default function Alert(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch()
  const nav = useNavigate()
  console.log(open)

  useEffect(() => {
    console.log(props.isDeleteTask);
    if (props.isDeleteEvent || props.isDeleteTask) {
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
  };
  const handleClose = () => {
    if (props.isDeleteEvent)
      props.setIsDeleteEvent(false)
    if (props.isDeleteTask)
      props.setIsDeleteTask(false)
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
          <Button autoFocus onClick={handleClose}>
            Cancle
          </Button>
          <Button onClick={handleClick} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
