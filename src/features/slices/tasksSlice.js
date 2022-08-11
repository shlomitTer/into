import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL, doApiGet } from '../../services/apiService';



export const getUserTasks = createAsyncThunk(
  "tasks/getUserTasks", async () => {
    let resp = await doApiGet(API_URL + `/tasks`);
    return resp.data;
  }
);
export const getCurrentEventTasks = createAsyncThunk(
  "tasks/getCurrentEventTasks", async (event_id) => {
    let resp = await doApiGet(API_URL + `/tasks/${event_id}`);
    return resp.data;
  }
);



export const tasksSlice = createSlice({
  name: 'tasks',

  initialState: {
    userTasks: [],
    currentEventTasks: [],
    status: null,
  },
  reducers: {

  },

  extraReducers(builder) {
    builder
      .addCase(getUserTasks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUserTasks.fulfilled, (state, action) => {
        state.status = "success";

        if (action.payload) state.userTasks = action.payload;
      })
      .addCase(getUserTasks.rejected, (state, action) => {
        state.status = "failed";
      })


      .addCase(getCurrentEventTasks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCurrentEventTasks.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload) state.currentEventTasks = action.payload;
      })
      .addCase(getCurrentEventTasks.rejected, (state, action) => {
        state.status = "failed";
      })



  }


});


// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default tasksSlice.reducer