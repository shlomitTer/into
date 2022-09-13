import { Button, Stack, Grid, Typography, Divider } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

import { login } from '../features/slices/userSlice';
import '../forms/forms.css'
import SignUpForm from '../forms/signUpForm';

export default function Home() {
  let { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const userErrorCode = useSelector((state) => state.userReducer.errorCode);
  const nav = useNavigate();
  const [isNew, setIsNew] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (userErrorCode === 'ERR_BAD_REQUEST') {
      setError(userErrorCode)
      console.log(error)
    }
    else if (userErrorCode === 'ERR_NETWORK') {
      toast.error('An error occurred')
    }
    else {
      setError("")
    }
  }, [userErrorCode])

  useEffect(() => {
    if (currentUser) {
      toast.success('login successfully')
      nav(`/profile`)
    }
  }, [currentUser])

  const onSub = (_dataBody) => {
    dispatch(login(_dataBody))
  }

  return (
    <Grid container sx={{
      justifyContent: "center",
      alignContent: 'center',
      height: '100vh'
    }}

    >
      <Grid item xs={12} sx={{ textAlign: 'center', mb: 10 }}>
        <Typography variant='h1' color={'#1976d2'}>
          <strong>Into</strong>It
        </Typography>
        <Typography variant='h5' color={'#1565c0'}>
          let's do it together..
        </Typography>
      </Grid>

      <Grid item xs={8} sm={5} md={3}>
        <form onSubmit={handleSubmit(onSub)}>
          {/* <label >Email</label> */}
          <input placeholder='email'  {...register("email", { required: true, pattern: /^[A-Z0-9][A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} type="email"></input>
          {errors.email && <small className='_error'>Enter valid Email</small>}

          {/* <label >Password</label> */}
          <input placeholder='password'{...register('password', { required: true, minLength: 3 })} type="password"
            style={{ marginTop: '16px' }}></input>
          {errors.password && <small className='_error'>Enter valid password (min 3 chars)</small>}
          <Stack direction="column" alignItems="center" spacing={2}>

            <Button variant="contained" type='submit' fullWidth sx={{ my: 2 }}>
              Login
            </Button>
            {error && <small className='_error'>Incorrect email or password</small>}
            <Divider />
            <hr />
            <Button variant="text" sx={{ mx: 'auto', my: 1 }} onClick={() => {
              setIsNew(true)
            }}>
              Create new account
            </Button>
          </Stack>
        </form>

      </Grid>
      <SignUpForm
        isNew={isNew}
        setIsNew={setIsNew}
      />
    </Grid >
  )
}
