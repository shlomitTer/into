import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Backdrop from '@mui/material/Backdrop';
import { Box, Stack, Button, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';


import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { postNewinvitee } from '../features/slices/inviteesSlice';
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

  const [open, setOpen] = useState(false);
  // const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const dispatch = useDispatch()
  const nav = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (props.isInvites)
      setOpen(true)
    reset({})
  }, [props])

  const onSub = (_dataBody, e) => {
    _dataBody.event_name = props.event.title;
    _dataBody.creator = props.event.user_id.name;
    _dataBody.user_id = props.event.user_id._id;
    _dataBody.event_id = props.event._id;
    console.log(_dataBody);
    dispatch(postNewinvitee(_dataBody))
    setOpen(false)
    props.setIsInvites(false)
    e.target.reset();
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
              <input  {...register("phone", { required: true, pattern: /^\+(972)([5]{1}\d{8})$/ })} type="tel" defaultValue={'+972'} />
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
