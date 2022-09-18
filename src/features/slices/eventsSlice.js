import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { config, doApiGet, doApiMethod } from '../../services/apiService';

const URL = config.api.url


export const getEventsByCreator = createAsyncThunk(
  "events/getEventsByCreator", async () => {
    let resp = await doApiGet(URL + `/events/myEvents`);
    return resp.data;
  }
);
export const getEventsByParticpant = createAsyncThunk(
  "events/getEventsByParticpant", async () => {
    let resp = await doApiGet(URL + `/events/userEvents`);
    return resp.data;
  }
);
export const getCurrentEvent = createAsyncThunk(
  "events/getCurrentEvent", async (event_id) => {
    let resp = await doApiGet(URL + `/events/eventInfo/${event_id}`);
    return resp.data;
  }
);

export const postNewEvent = createAsyncThunk(
  "events/postNewEvent", async (_payload) => {
    let resp = await doApiMethod(URL + `/events`, "POST", _payload);
    return resp.data;
  }
);
export const editEvent = createAsyncThunk(
  "events/editEvent", async (_payload) => {
    let resp = await doApiMethod(URL + `/events/editEvent/${_payload._id}`, "PUT", _payload._dataBody);
    return resp.data;
  });
export const leaveEvent = createAsyncThunk(
  "events/leaveEvent", async (_payload) => {
    let resp = await doApiMethod(URL + `/events/leaveEvent/${_payload}`, "PATCH");
    return resp.data;
  });
export const deleteEvent = createAsyncThunk(
  "events/deleteEvent", async (_payload) => {
    let resp = await doApiMethod(URL + `/events/del/${_payload}`, "DELETE");
    return resp.data;
  }
);




export const eventsSlice = createSlice({
  name: 'events',

  initialState: {
    eventsByCreator: undefined,
    eventsByParticpant: undefined,
    currentEvent: undefined,
    usersOfCurrentEvent: undefined,
    status: null,
    errorCode: ""
  },
  reducers: {
  },

  extraReducers(builder) {
    builder
      .addCase(getEventsByCreator.pending, (state, action) => {
        state.status = "loading";
        state.errorCode = ""
      })
      .addCase(getEventsByCreator.fulfilled, (state, action) => {
        state.status = "success";

        if (action.payload) state.eventsByCreator = action.payload;
      })
      .addCase(getEventsByCreator.rejected, (state, action) => {
        state.errorCode = action.error.code;
        state.status = "failed";
      })

      .addCase(getEventsByParticpant.pending, (state, action) => {
        state.status = "loading";
        state.errorCode = ""
      })
      .addCase(getEventsByParticpant.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload) state.eventsByParticpant = action.payload;
      })
      .addCase(getEventsByParticpant.rejected, (state, action) => {
        state.errorCode = action.error.code;
        state.status = "failed";

      })


      .addCase(getCurrentEvent.pending, (state, action) => {
        state.status = "loading";
        state.errorCode = ""
      })
      .addCase(getCurrentEvent.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload) {
          state.currentEvent = action.payload;
          state.usersOfCurrentEvent = action.payload.usersId_arr;
        }
      })
      .addCase(getCurrentEvent.rejected, (state, action) => {
        state.errorCode = action.error.code;
        state.status = "failed";
      })


      .addCase(postNewEvent.pending, (state, action) => {
        state.status = "loading";
        state.errorCode = ""
      })
      .addCase(postNewEvent.fulfilled, (state, action) => {
        if (action.payload) state.eventsByParticpant.unshift(action.payload);

        state.status = "success";
      })
      .addCase(postNewEvent.rejected, (state, action) => {
        state.errorCode = action.error.code;
        state.status = "failed";
      })


      .addCase(editEvent.pending, (state, action) => {
        state.status = "loading";
        state.errorCode = ""
      })
      .addCase(editEvent.fulfilled, (state, action) => {
        if (action.payload) {
          state.eventsByParticpant = state.eventsByParticpant.filter((item) => item._id !== action.payload._id);
          state.currentEvent = action.payload;
          state.usersOfCurrentEvent = action.payload.usersId_arr;
        }
        state.status = "success";
      })
      .addCase(editEvent.rejected, (state, action) => {
        state.errorCode = action.error.code;
        state.status = "failed";
      })
      .addCase(leaveEvent.pending, (state, action) => {
        state.status = "loading";
        state.errorCode = ""
      })
      .addCase(leaveEvent.fulfilled, (state, action) => {
        if (action.payload) {
          state.eventsByParticpant = state.eventsByParticpant.filter((item) => item._id !== action.payload.event_id)
          state.status = "success";
        }
      })
      .addCase(leaveEvent.rejected, (state, action) => {
        state.errorCode = action.error.code;
        state.status = "failed";
      })


      .addCase(deleteEvent.pending, (state, action) => {
        state.status = "loading";
        state.errorCode = ""
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        if (action.payload) {
          state.eventsByParticpant = state.eventsByParticpant.filter((item) => item._id !== action.payload);
          state.currentEvent = undefined;
          state.usersOfCurrentEvent = undefined;
        }
        state.status = "success";
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.errorCode = action.error.code;
        state.status = "failed";
      })


  }

});

export const {
  createNewEventItem,
} = eventsSlice.actions;

export default eventsSlice.reducer