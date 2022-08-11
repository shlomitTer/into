import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import Home from './comps/home';
import EventPageX from './comps/events/EventPageX';
import Login from './comps/sign/login';
import UserPage from './comps/userPage/userPage';
import Layout from './layout/layout';
import TaskPage from './comps/tasks/taskPage';

import EventBoard from './comps/eventPages/eventBoard';



export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
      </Routes>

      <Routes>

        <Route path="/" element={<Home />} />


        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/profile" element={<UserPage />} />

          <Route path="/new/:idEvent" element={<EventBoard />} />


          <Route path="/event/:idEvent" element={<EventPageX />} />
          <Route path="/task/:idTsak" element={<TaskPage />} />
        </Route>
      </Routes>
      {/* opacity div for toast */}
      <ToastContainer position="top-left" theme='light' />
    </BrowserRouter>

  )
}
