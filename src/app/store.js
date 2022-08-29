import { configureStore } from '@reduxjs/toolkit'
import eventsReducer from '../features/slices/eventsSlice'
import userReducer from '../features/slices/userSlice'
import tasksReducer from '../features/slices/tasksSlice'
import inviteeReducer from '../features/slices/inviteesSlice'


export default configureStore({
  reducer: {
    eventsReducer,
    userReducer,
    tasksReducer,
    inviteeReducer

  },
})