import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { BsPencil, BsCheckLg, BsX } from 'react-icons/bs'

// import './eventPageStyle.css';

import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';

export default function Heading({ event }) {

  const [allowedEdit, setAllowedEdit] = useState(false)
  const [titleEdit, setTitleEdit] = useState(false);
  const [subTEdit, setSubTEdit] = useState(false);



  let { register, handleSubmit, formState: { errors } } = useForm();

  let inputRef = useRef();

  useEffect(() => {
    doApiInit();
  }, [])

  const doApiIdToken = async () => {
    let url = API_URL + "/users/getIdToken";
    let resp = await doApiGet(url);
    if (resp == event.id_user) {
      setIsCreator(true);
    }


  }
  const doApiInit = async () => {
    let userId = ;
    return _event.userId == userId ||
      (_event.usersId_arr.includes(userId) && _event.EditableByParticipants)
  }


  doApiIdToken();
  const onSub = (_dataBody) => {
  }


  const editTitle = async (_dataBody) => {
    let url = API_URL + "/events/patchTitle/" + params.idEdit;
    let resp = await doApiMethod(url, "PATCH", _dataBody);
    doApiInit();
    setTitleEdit(false);

  }
  const editSubTitle = async (_dataBody) => {
    let url = API_URL + "/events/patchSubTitle/" + params.idEdit;
    let resp = await doApiMethod(url, "PATCH", _dataBody);
    // console.log(resp)
    doApiInit();
    setSubTEdit(false);

  }

  const editDes = async (_dataBody) => {
    let url = API_URL + "/events/patchDes/" + params.idEdit;
    let resp = await doApiMethod(url, "PATCH", _dataBody);
    // console.log(resp)
    doApiInit();
    setSubTEdit(false);

  }
  const editColor = async (_dataBody) => {
    let url = API_URL + "/events/patchColor/" + params.idEdit;
    let resp = await doApiMethod(url, "PATCH", _dataBody);
    // console.log(resp)
    doApiInit();
  }

  return (
    <div className='container col-md-8'>

      {/* title */}
      {!titleEdit && <h1 className='display-2 my-5'>{event.title}<button onClick={() => {
        setTitleEdit(true);
      }} className='btn'><BsPencil /></button></h1>}

      {titleEdit && <form onSubmit={handleSubmit(editTitle)}>
        <input  {...register('title', { required: true, minLength: 2 })} type="text" style={{ fontSize: "4.5rem" }} className='form-control display-2' defaultValue={event.title} />
        {errors.title && <small className='text-danger d-block'>Enter valid name (min 2 chars)</small>}
        <button className='btn'><BsCheckLg /></button>

      </form>}



      {/* sub title */}
      {!subTEdit && <h2 className='display-5 my-2'>{event.subTitle}<button onClick={() => {
        setSubTEdit(true);
      }} className='btn'><BsPencil /></button></h2>}

      {subTEdit && <form onSubmit={handleSubmit(editSubTitle)}>
        <input  {...register('subTitle', { required: true, minLength: 2 })} type="text" style={{ fontSize: "3rem" }} className='form-control-plaintext display-5' defaultValue={event.subTitle} />
        {errors.subTitle && <small className='text-danger d-block'>Enter valid name (min 2 chars)</small>}
        <button className='btn'><BsCheckLg /></button>

      </form>}



      {event.description != "" && <div className='py-4'><p className=''>description</p>
        <p className='pb-3 h5'>{event.description}</p></div>}
      <div className='row'></div>


    </div>
  )
}
