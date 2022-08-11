import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField } from '@mui/material';

import { doApiMethod, API_URL, TOKEN_NAME } from '../../services/apiService'
import { colors } from '../../theme/theme'
import { borderRadius } from '@mui/system';

export default function Login() {

  let { register, handleSubmit, formState: { errors } } = useForm();
  let nav = useNavigate();


  const doApiLogin = async (_data) => {
    let url = API_URL + "/users/login";
    try {
      let resp = await doApiMethod(url, "POST", _data);
      if (resp.data.token) {
        localStorage.setItem(TOKEN_NAME, resp.data.token);
        nav(`/profile`);
      }

    }
    catch (err) {
      alert("There is an error, please try again later")
    }
  }



  const onSub = (_dataBody) => {
    doApiLogin(_dataBody);
  }

  return (

    <Grid container
      direction="column"
      justifyContent="center"
      alignItems="center">
      <Grid
        sx={{
          textAlign: 'center',
          m: 3,
          py: 10,
          px: 15,
          border: 1,
          borderColor: colors.palette.primary.light,
          borderRadius: '16px'
        }}>
        <h2>Into</h2>

        <form onSubmit={handleSubmit(onSub)}
          style={{
            width: '300px'
          }}
        >
          <div>
            <TextField
              id="outlined-textarea"
              required
              fullWidth
              label="User Name"
              variant="standard"
              {...register('email', { required: true, minLength: 2 })} />
            {errors.email && <small className='text-danger d-block'>Enter valid name (min 2 chars)</small>}
          </div>
          <div>
            <TextField
              id="outlined-textarea"
              required
              fullWidth
              label="Password"
              variant="standard"
              {...register('password', { required: true, minLength: 2 })}
            />
            {errors.password && <small className='text-danger d-block'>Enter valid name (min 2 chars)</small>}

          </div >
          <div style={{ textAlign: 'end' }}>
            <button style={{
              background: colors.palette.primary.dark,
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingTop: '5px',
              paddingBottom: '5px',
              marginTop: '20px',
              marginRight: 0,
              color: '#ffff',
              border: 0,
              borderRadius: '5%',

            }}>Login</button>

          </div>
        </form>
      </Grid>
    </Grid >

  )
}
