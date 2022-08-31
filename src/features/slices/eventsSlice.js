import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';


export const getEventsByCreator = createAsyncThunk(
  "events/getEventsByCreator", async () => {
    let resp = await doApiGet(API_URL + `/events/myEvents`);
    return resp.data;
  }
);
export const getEventsByParticpant = createAsyncThunk(
  "events/getEventsByParticpant", async () => {
    let resp = await doApiGet(API_URL + `/events/userEvents`);
    return resp.data;
  }
);
export const getCurrentEvent = createAsyncThunk(
  "events/getCurrentEvent", async (event_id) => {
    let resp = await doApiGet(API_URL + `/events/eventInfo/${event_id}`);
    return resp.data;
  }
);

export const postNewEvent = createAsyncThunk(
  "events/postNewEvent", async (_payload) => {
    let resp = await doApiMethod(API_URL + `/events`, "POST", _payload);
    return resp.data;
  }
);
export const editEvent = createAsyncThunk(
  "events/editEvent", async (_payload) => {
    let resp = await doApiMethod(API_URL + `/events/editEvent/${_payload._id}`, "PUT", _payload._dataBody);
    return resp.data;
  });
export const deleteEvent = createAsyncThunk(
  "events/deleteEvent", async (_payload) => {
    let resp = await doApiMethod(API_URL + `/events/del/${_payload}`, "DELETE");
    return resp.data;
  }
);

// export const editTitle = createAsyncThunk(
//   "events/editTitle", async (_payload) => {
//     // console.log(state)
//     console.log(_payload._id);
//     let resp = await doApiMethod(API_URL + `/events/patchTitle/${_payload._id}`, "PATCH", _payload._dataBody);
//     console.log(resp.data);
//     return resp.data;
//   }
// );


export const eventsSlice = createSlice({
  name: 'events',

  initialState: {
    eventsByCreator: undefined,
    eventsByParticpant: undefined,
    currentEvent: undefined,
    usersOfCurrentEvent: undefined,
    status: null,
  },
  reducers: {
  },

  extraReducers(builder) {
    builder
      .addCase(getEventsByCreator.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getEventsByCreator.fulfilled, (state, action) => {
        state.status = "success";

        if (action.payload) state.eventsByCreator = action.payload;
      })
      .addCase(getEventsByCreator.rejected, (state, action) => {
        state.status = "failed";
      })

      .addCase(getEventsByParticpant.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getEventsByParticpant.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload) state.eventsByParticpant = action.payload;
      })
      .addCase(getEventsByParticpant.rejected, (state, action) => {
        state.status = "failed";
      })


      .addCase(getCurrentEvent.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCurrentEvent.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload) {
          state.currentEvent = action.payload;
          state.usersOfCurrentEvent = action.payload.usersId_arr;
        }
      })
      .addCase(getCurrentEvent.rejected, (state, action) => {
        state.status = "failed";
      })


      .addCase(postNewEvent.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postNewEvent.fulfilled, (state, action) => {
        if (action.payload) state.eventsByParticpant.unshift(action.payload);

        state.status = "success";
      })
      .addCase(postNewEvent.rejected, (state, action) => {
        state.status = "failed";
      })


      .addCase(editEvent.pending, (state, action) => {
        state.status = "loading";
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
        state.status = "failed";
      })


      .addCase(deleteEvent.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        if (action.payload) {
          //return id
          state.eventsByParticpant = state.eventsByParticpant.filter((item) => item._id !== action.payload);
          // state.currentEvent = {}
          // state.usersOfCurrentEvent = {};
        }
        state.status = "success";
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.status = "failed";
      })

    // .addCase(editTitle.pending, (state, action) => {
    //   state.status = "loading";
    // })
    // .addCase(editTitle.fulfilled, (state, action) => {
    //   // להשלים לוגיקה
    //   state.status = "success";
    // })
    // .addCase(editTitle.rejected, (state, action) => {
    //   state.status = "failed";
    // })

  }

});

export const {
  createNewEventItem,
} = eventsSlice.actions;

export default eventsSlice.reducer