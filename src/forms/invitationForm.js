import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import { Box, Stack, Button, Typography } from '@mui/material';

import { getCurrentEventInvitees, postNewinvitee } from '../features/slices/inviteesSlice';
import './forms.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function InvitationForm(props) {

  let { register, handleSubmit, reset, formState: { errors } } = useForm();
  const inviteesErrors = useSelector((state) => state.inviteeReducer.errors)
  const currentEvent = useSelector((state) => state.eventsReducer.currentEvent);
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const currentEventInvitees = useSelector((state) => state.inviteeReducer.currentEventInvitees)
  const [open, setOpen] = useState(false);
  const [emails, setEmails] = useState([]);
  // const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const dispatch = useDispatch()
  const nav = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (props.isInvites)
      setOpen(true)
    reset({})
  }, [props])

  useEffect(() => {
    dispatch(getCurrentEventInvitees(params.idEvent))
  }, [])

  useEffect(() => {
    if (currentEvent) {
      let usersAndInvieesList = [...currentEventInvitees, ...currentEvent.usersId_arr]
      let usersAndInvieesListEmail = usersAndInvieesList.map(item => item.email)
      setEmails(usersAndInvieesListEmail)
    }
  }, [currentEventInvitees, currentEvent])

  const onSub = (_dataBody, e) => {
    if (emails.includes(_dataBody.email)) {
      toast.error("Email already exists")
    }
    _dataBody.event_name = props.event.title;
    _dataBody.creator = props.event.user_id.name;
    _dataBody.user_id = props.event.user_id._id;
    _dataBody.event_id = props.event._id;
    dispatch(postNewinvitee(_dataBody))
    setOpen(false)
    props.setIsInvites(false)
    e.target.reset({});
  };

  const handleClose = () => {
    setOpen(false)
    props.setIsInvites(false)
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant='h3' sx={{ py: 2 }}>Invite</Typography>
            <form onSubmit={handleSubmit(onSub)}>

              <label >Name</label>
              <input {...register('name', { required: true, minLength: 2 })} type="text" />
              {errors.name && <small className='_error'>Enter valid name (min 2 chars)</small>}

              <label >Email</label>
              <input  {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} type="email"></input>
              {errors.email && <small className='_error'>Enter valid Email</small>}

              <label>phone:</label>
              <input  {...register("phone", { required: true, pattern: /^\+(972)([5]{1}\d{8})$/ })} type="phone" defaultValue={'+972'} />
              {errors.phone && <small className='_error'>
                Enter valid phone (min 9 chars)
              </small>}
              <Stack
                spacing={2}
                direction="row"
                justifyContent="end"
                alignItems="baseline"
                sx={{ pt: 5 }}
              >
                <Button variant="text" onClick={handleClose}>
                  Cancle
                </Button>
                <Button variant="text" type='submit'>
                  Invite
                </Button>
              </Stack>
            </form>

          </Box>
        </Fade>
      </Modal>
    </div >
  );
}
