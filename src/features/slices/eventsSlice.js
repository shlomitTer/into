import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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
    // console.log(resp.data);
    return resp.data;
  }
);

export const editTitle = createAsyncThunk(
  "events/editTitle", async (_payload) => {
    // console.log(state)
    console.log(_payload._id);
    let resp = await doApiMethod(API_URL + `/events/patchTitle/${_payload._id}`, "PATCH", _payload._dataBody);
    console.log(resp.data);
    return resp.data;
  }
);



export const eventsSlice = createSlice({
  name: 'events',

  initialState: {
    eventsByCreator: [],
    eventsByParticpant: [],
    currentEvent: {},
    usersOfCurrentEvent: [],
    status: null,
  },
  reducers: {
    // createNewEventItem: (state, action) => {
    //   state.currentEvent = action.payload;
    //   console.log(action.payload)
    //   state.usersOfCurrentEvent = action.payload.usersId_arr;
    // },


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



      .addCase(editTitle.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(editTitle.fulfilled, (state, action) => {
        // להשלים לוגיקה
        state.status = "success";
      })
      .addCase(editTitle.rejected, (state, action) => {
        state.status = "failed";
      })


  }


});

export const {
  createNewEventItem,
} = eventsSlice.actions;


export default eventsSlice.reducer