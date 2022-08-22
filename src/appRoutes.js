import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import Home from './comps/home';
import Login from './comps/sign/login';
import Layout from './layout/layout';
import TaskPage from './comps/tasks/taskPage';

import EventBoard from './comps/eventPages/eventBoard';
import UserBoard from './comps/usersPages/userBoard';



export default function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/profile" element={<UserBoard />} />

          <Route path="/event/:idEvent" element={<EventBoard />} />

          <Route path="/task/:idTsak" element={<TaskPage />} />
        </Route>
      </Routes>

      {/* opacity div for toast */}
      <ToastContainer position="top-left" theme='light' />
    </BrowserRouter>

  )
}
