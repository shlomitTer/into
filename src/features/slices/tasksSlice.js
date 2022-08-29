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
export const getCurrentTask = createAsyncThunk(
  "tasks/idTask", async (task_id) => {
    let resp = await doApiGet(API_URL + `/tasks/${task_id}`);
    return resp.data;
  }
);

export const getSortedCurrentEventTasks = createAsyncThunk(
  "tasks/getSortedCurrentEventTasks", async (_payload) => {
    let resp = await doApiGet(API_URL + `/tasks/${_payload.event_id}?status=${_payload.status}`);
    return resp.data;
  }
);

export const postNewTask = createAsyncThunk(
  "tasks/postNewTask", async (_payload) => {
    console.log(_payload);
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

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask", async (task_id) => {
    console.log("1");
    let resp = await doApiMethod(API_URL + `/tasks/delete/${task_id}`, "DELETE")
    return resp.data;
  }
);
export const editTask = createAsyncThunk(
  "tasks/editTask", async (_payload) => {
    console.log("yes111");

    let resp = await doApiMethod(API_URL + `/tasks/${_payload._id}`, "PUT", _payload._body)
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

      .addCase(getCurrentTask.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCurrentTask.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload) state.cuurentTask = action.payload;
      })
      .addCase(getCurrentTask.rejected, (state, action) => {
        state.status = "failed";
      })

      .addCase(getSortedCurrentEventTasks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getSortedCurrentEventTasks.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload) state.currentEventTasks = action.payload;
      })
      .addCase(getSortedCurrentEventTasks.rejected, (state, action) => {
        state.status = "failed";
      })


      .addCase(postNewTask.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postNewTask.fulfilled, (state, action) => {
        console.log(action.payload);

        state.status = "success";
        if (action.payload) {
          state.currentTask = action.payload;
          state.currentEventTasks.unshift(action.payload)

        }

      })
      .addCase(postNewTask.rejected, (state, action) => {
        state.status = "failed";
      })


      .addCase(patchStatus.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(patchStatus.fulfilled, (state, action) => {
        state.status = "success";
        //להוסיף לוגיקה
        // if (action.payload) state.currentTask = action.payload;
      })
      .addCase(patchStatus.rejected, (state, action) => {
        state.status = "failed";
      })


      .addCase(deleteTask.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload._id) {
          state.status = "success";
          state.userTasks = state.userTasks.filter((item) => item._id !== action.payload._id)
          state.currentEventTasks = state.currentEventTasks.filter((item) => item._id !== action.payload._id)
        }
      })
      .addCase(deleteTask.rejected, (state, action) => {
        console.log(action);
        state.status = "failed";
      })


      .addCase(editTask.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.status = "success";
        console.log(action.payload);
        if (action.payload._id) {
          state.userTasks = state.userTasks.filter((item) => item._id != action.payload._id)
          state.userTasks.unshift(action.payload)
          state.currentEventTasks = state.currentEventTasks.filter((item) => item._id != action.payload._id)
          state.currentEventTasks.unshift(action.payload)
        }

      })
      .addCase(editTask.rejected, (state, action) => {
        state.status = "failed";
      })
  }


});


// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default tasksSlice.reducer