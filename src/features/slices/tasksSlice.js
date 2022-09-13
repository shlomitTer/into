import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { config, doApiGet, doApiMethod } from '../../services/apiService';

const URL = config.api.url


export const getUserTasks = createAsyncThunk(
  "tasks/getUserTasks", async () => {
    let resp = await doApiGet(URL + `/tasks`);
    return resp.data;
  }
);
export const getCurrentEventTasks = createAsyncThunk(
  "tasks/getCurrentEventTasks", async (event_id) => {
    let resp = await doApiGet(URL + `/tasks/${event_id}`);
    return resp.data;
  }
);
export const getCurrentTask = createAsyncThunk(
  "tasks/idTask", async (task_id) => {
    let resp = await doApiGet(URL + `/tasks/${task_id}`);
    return resp.data;
  }
);

export const getSortedCurrentEventTasks = createAsyncThunk(
  "tasks/getSortedCurrentEventTasks", async (_payload) => {
    let resp = await doApiGet(URL + `/tasks/${_payload.event_id}?status=${_payload.status}`);
    return resp.data;
  }
);

export const postNewTask = createAsyncThunk(
  "tasks/postNewTask", async (_payload) => {
    let resp = await doApiMethod(URL + `/tasks/${_payload._id}`, "POST", _payload._dataBody)
    return resp.data;
  }
);

export const patchStatus = createAsyncThunk(
  "tasks/patchStatus", async (_payload) => {
    let resp = await doApiMethod(URL + `/tasks/updateStatus/${_payload._id}`, "PATCH", _payload._dataBody)
    return resp.data;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask", async (task_id) => {
    let resp = await doApiMethod(URL + `/tasks/delete/${task_id}`, "DELETE")
    return resp.data;
  }
);
export const editTask = createAsyncThunk(
  "tasks/editTask", async (_payload) => {
    let resp = await doApiMethod(URL + `/tasks/${_payload._id}`, "PUT", _payload._body)
    return resp.data;
  }
);



export const tasksSlice = createSlice({
  name: 'tasks',

  initialState: {
    userTasks: [],
    currentEventTasks: [],
    currentEventSortedTasks: [],
    currentTask: {},
    currentTaskWeight: 1,
    status: null,
  },
  reducers: {
    setTaskWeight: (state, action) => {
      state.currentTaskWeight = action.payload;
    }
  },

  extraReducers(builder) {
    builder
      .addCase(getUserTasks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUserTasks.fulfilled, (state, action) => {

        if (action.payload) {
          state.status = "success";
          state.userTasks = action.payload;
        }
      })
      .addCase(getUserTasks.rejected, (state, action) => {
        state.status = "failed";
      })


      .addCase(getCurrentEventTasks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCurrentEventTasks.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "success";
          state.currentEventTasks = action.payload;
        }
      })
      .addCase(getCurrentEventTasks.rejected, (state, action) => {
        state.status = "failed";
      })

      .addCase(getCurrentTask.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCurrentTask.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "success";
          state.currentTask = action.payload
          state.currentTaskWeight = action.payload.weight;
        };
      })
      .addCase(getCurrentTask.rejected, (state, action) => {
        state.status = "failed";
      })

      .addCase(getSortedCurrentEventTasks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getSortedCurrentEventTasks.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "success";
          state.currentEventSortedTasks = action.payload;
        }
      })
      .addCase(getSortedCurrentEventTasks.rejected, (state, action) => {
        state.status = "failed";
      })

      .addCase(postNewTask.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postNewTask.fulfilled, (state, action) => {

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
        if (action.payload) {
          state.status = "success";
          let k = -1, l = -1;
          for (let i = 0; i < state.currentEventTasks.length; i++) {
            if (state.currentEventTasks[i]._id === action.payload._id) {
              k = i;
              break;
            }
          }
          for (let j = 0; j < state.currentEventSortedTasks.length; j++) {
            if (state.currentEventSortedTasks[j]._id === action.payload._id) {
              l = j;
              break;
            }
          }
          state.currentEventSortedTasks.splice(l, 1, action.payload)
          state.currentEventTasks.splice(k, 1, action.payload)
        }
      })
      .addCase(patchStatus.rejected, (state, action) => {
        state.status = "failed";
      })


      .addCase(deleteTask.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "success";
          state.userTasks = state.userTasks.filter((item) => item._id !== action.payload.task._id)
          state.currentEventTasks = state.currentEventTasks.filter((item) => item._id !== action.payload.task._id)
        }
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
      })


      .addCase(editTask.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload._id) {
          state.userTasks = state.userTasks.filter((item) => item._id !== action.payload._id)
          state.userTasks.unshift(action.payload)
          state.currentEventTasks = state.currentEventTasks.filter((item) => item._id !== action.payload._id)
          state.currentEventTasks.unshift(action.payload)
        }

      })
      .addCase(editTask.rejected, (state, action) => {
        state.status = "failed";
      })
  }


});


export const {
  setTaskWeight
} = tasksSlice.actions;

export default tasksSlice.reducer