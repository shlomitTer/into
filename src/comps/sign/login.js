import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { doApiMethod, API_URL, TOKEN_NAME } from '../../services/apiService'


export default function Login() {

  let { register, handleSubmit, formState: { errors } } = useForm();
  let nav = useNavigate();
  const [user, setUser] = useState({});

  const doApiLogin = async (_data) => {
    let url = API_URL + "/users/login";
    try {
      let resp = await doApiMethod(url, "POST", _data);
      if (resp.data.token) {
        localStorage.setItem(TOKEN_NAME, resp.data.token);
        setUser(resp.data.user);
      }


      // toast.success("New event created");
      nav(`/myEvents`);

    }
    catch (err) {
      console.log(err.response);
      alert("There is an error, please try again later")
    }
  }



  const onSub = (_dataBody) => {
    doApiLogin(_dataBody);
  }

  return (
    <div className=''>
      <h2>Create An Event</h2>
      <form onSubmit={handleSubmit(onSub)} className=' p-3 shadow'>

        <label>User Name</label>
        <input {...register('email', { required: true, minLength: 2 })} type="text" className='form-control' />
        {errors.email && <small className='text-danger d-block'>Enter valid name (min 2 chars)</small>}

        <label>Password</label>
        <input {...register('password', { required: true, minLength: 2 })} type="text" className='form-control' />
        {errors.password && <small className='text-danger d-block'>Enter valid name (min 2 chars)</small>}

        <button className='btn btn-info mt-3'>Login</button>
      </form>

    </div>
  )
}
