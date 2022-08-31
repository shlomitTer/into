import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Dialog, Stack, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../features/slices/userSlice';
import { toast } from 'react-toastify';

export default function SignUpForm(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  let { register, handleSubmit, reset, formState: { errors } } = useForm();
  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const dispatch = useDispatch()
  const nav = useNavigate()

  useEffect(() => {
    console.log(props.isDeleteTask);
    if (props.isNew) {
      setOpen(true)

    }
  }, [props])


  const onSub = (_dataBody) => {
    dispatch(signUp(_dataBody))
    if (currentUser) {
      toast.success('signUp successfully')
      nav(`/profile`)
    }
    else {
      //to do:handling with possible errors
    }

  };

  const handleClose = () => {
    props.setIsNew(false)
    setOpen(false);
  }

  return (
    <div>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth='xs'
        fullWidth
      >
        <form onSubmit={handleSubmit(onSub)} style={{ padding: '40px 30px' }}>
          <Typography variant='h3'>New account</Typography>

          <label >Name</label>
          <input {...register('name', { required: true, minLength: 2 })} type="text" />
          {errors.name && <small className='_error'>Enter valid name (min 2 chars)</small>}

          <label >Email</label>
          <input {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} type="email"></input>
          {errors.email && <small className='_error'>Enter valid Email</small>}

          <label>phone:</label>
          <input  {...register("phone", { required: true, minLength: 9 })} type="phone" className='form-control' />
          {errors.phone && <small className='_error'>Enter valid phone (min 9 chars)</small>}

          <label >Password</label>
          <input {...register('password', { required: true, minLength: 2 })} type="password"></input>
          {errors.password && <small className='_error'>Enter valid password (min 3 chars)</small>}
          <Stack
            spacing={2}
            direction="row"
            justifyContent="end"
            alignItems="baseline"
            sx={{ pt: 3 }}
          >
            <Button variant="text" onClick={handleClose}>Cancel</Button>
            <Button variant="text" type='submit'>Sign Up</Button>

          </Stack>

        </form>
      </Dialog>
    </div>
  );
}
