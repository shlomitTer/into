import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';



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

export const postNewTask = createAsyncThunk(
  "tasks/postNewTask", async (_payload) => {
    let resp = await doApiMethod(API_URL + `/tasks/${_payload._id}`, "POST", _payload._dataBody)
    return resp.data;
  }
);

export const patchStatus = createAsyncThunk(
  "tasks/patchStatus", async (_payload) => {
    let resp = await doApiMethod(API_URL + `/tasks/updateStatus/${_payload._id}`, "PATCH", _payload._dataBody)
    return resp.data;
  }
);



export const tasksSlice = createSlice({
  name: 'tasks',

  initialState: {
    userTasks: [],
    currentEventTasks: [],
    cuurentTask: {},
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


      .addCase(postNewTask.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postNewTask.fulfilled, (state, action) => {
        state.status = "success";
        console.log(action.payload);
        if (action.payload) state.currentTask = action.payload;
      })
      .addCase(postNewTask.rejected, (state, action) => {
        state.status = "failed";
      })


      .addCase(patchStatus.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(patchStatus.fulfilled, (state, action) => {
        state.status = "success";
        console.log("here");
        // if (action.payload) state.currentTask = action.payload;
      })
      .addCase(patchStatus.rejected, (state, action) => {
        state.status = "failed";
      })
  }


});


// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default tasksSlice.reducer