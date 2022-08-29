import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/slices/userSlice';
import { TOKEN_NAME } from '../services/apiService';

export default function Logout() {
  const nav = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    localStorage.removeItem("into_token");
    dispatch(logout())
    nav("/");

    toast.info("Logged out seccsesfully");

  }, [])
  return (
    <React.Fragment>
    </React.Fragment>
  )
}
