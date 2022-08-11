import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CirclePicker } from 'react-color';


import { toast } from 'react-toastify';

import { doApiMethod, API_URL } from '../../services/apiService'

export default function CreateEvent() {

  let { register, handleSubmit, formState: { errors } } = useForm();
  let nav = useNavigate();

  const [color, setColor] = useState("");

  const doApiAdd = async (_data) => {
    let url = API_URL + "/events";
    try {
      let resp = await doApiMethod(url, "POST", _data);
      console.log(resp.data)
      if (resp.data._id) {
        toast.success("New event created");
        nav(`/event/${resp.data._id}`);

      }


    }
    catch (err) {
      console.log(err.response);
      alert("There is an error, please try again later")
    }
  }



  const onSub = (_dataBody) => {
    _dataBody.color = color;
    doApiAdd(_dataBody);
  }

  return (
    <div className=''>
      <h2>Create An Event</h2>
      <form onSubmit={handleSubmit(onSub)} className=' p-3 shadow'>

        <label>Title</label>
        <input {...register('title', { required: true, minLength: 2 })} type="text" className='form-control' />
        {errors.title && <small className='text-danger d-block'>Enter valid name (min 2 chars)</small>}

        <label>Sub Title</label>
        <input {...register('subTitle', { required: true, minLength: 2 })} type="text" className='form-control' />
        {errors.subTitle && <small className='text-danger d-block'>Enter valid name (min 2 chars)</small>}

        <label>Description</label>
        <textarea {...register('description', { required: false, minLength: 0 })} type="text" className='form-control' ></textarea>
        {errors.description && <small className='text-danger d-block'>Enter valid name (min 2 chars)</small>}

        <label>Choose color</label>
      <CirclePicker color={color} onChange={(color) => { setColor(color.hex);console.log(color) }} />


        <div className='row'>

          <div className='form-group col-md-6'>
            <label>Date</label>
            <input {...register('date', { required: true, minLength: 2 })} type="date" min={Date.now()} className='form-control' />
            {errors.date && <small className='text-danger d-block'>Choose date</small>}</div>

          <div className='form-group col-md-6'>
            <label>Time:</label>
            <input {...register('time', { required: false, minLength: 0 })} type="time" defaultValue={"07:00"} className='form-control' /></div>
        </div>
        <label>Location:</label>
        <input {...register('location', { required: false, minLength: 0 })} type="text" className='form-control' />
        {errors.location && <small className='text-danger d-block'>Enter valid location</small>}
        <button className='btn btn-info mt-3'>coutinue</button>
      </form>

    </div>
  )
}

