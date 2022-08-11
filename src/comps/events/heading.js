import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { BsPencil, BsCheckLg, BsX } from 'react-icons/bs'

import '../../App.css'

import { useDispatch } from 'react-redux';
import { editEvent, editTitle } from '../../features/slices/eventsSlice';
import { Box } from '@mui/material';

export default function Heading({ event, currentUser }) {

  const [isAllowedEdit, setIsAllowedEdit] = useState(false)
  const [titleEdit, setTitleEdit] = useState(false);
  const [subTEdit, setSubTEdit] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();



  let { register, handleSubmit, formState: { errors } } = useForm();

  let inputRef = useRef();

  useEffect(() => {
    doApiInit();
  }, [])

  const onSub = async (_dataBody) => {
    console.log(params);
    setTitleEdit(false)
    setSubTEdit(false)
    console.log(params.idEvent);
    console.log(_dataBody);
    const _id = params.idEvent
    dispatch(editTitle({ _dataBody, _id }));

  }

  const doApiInit = async () => {
    const creator = event.user_id == currentUser._id
    setIsAllowedEdit(creator)

  }




  return (
    <Box sx={{ paddingY: 15 }}>

      {/* title */}


      {isAllowedEdit && !titleEdit && <h1 onClick={() => { setTitleEdit(true) }}>{event.title}</h1>}

      {titleEdit && <form onBlur={handleSubmit(onSub)}>
        <input  {...register('title', { required: true, minLength: 2 })} type="text" defaultValue={event.title} className={'h1 noBg'} />
        {errors.title && <small className='text-danger d-block'>Enter valid name (min 2 chars)</small>}
      </form>}
      {!isAllowedEdit && <h1>{event.title}</h1>}


      {/* sub title */}

      {isAllowedEdit && !subTEdit && <h2 onClick={() => { setSubTEdit(true) }}>{event.subTitle}</h2>}

      {subTEdit && <form onBlur={handleSubmit(onSub)}>
        <input  {...register('subTitle', { required: true, minLength: 2 })} type="text" defaultValue={event.subTitle} className={'h1 noBg'} />
        {errors.subTitle && <small className='text-danger d-block'>Enter valid name (min 2 chars)</small>}
      </form>}
      {!isAllowedEdit && <h1>{event.subTitle}</h1>}

    </Box>
  )
}
