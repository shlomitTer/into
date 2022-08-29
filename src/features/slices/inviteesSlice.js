import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';



export const getCurrentEventInvitees = createAsyncThunk(
  "invitees/getCurrentEventInvitees", async (event_id) => {
    let resp = await doApiGet(API_URL + `/invitees/${event_id}`);
    return resp.data;
  }
);
export const getCurrentUserInvitations = createAsyncThunk(
  "invitees/getCurrentUserInvitations", async () => {
    let resp = await doApiGet(API_URL + `/invitees`);
    return resp.data;
  }
);
export const postNewinvitee = createAsyncThunk(
  "invitees/postNewinvitee", async (_payload) => {
    console.log(_payload);
    let resp = await doApiMethod(API_URL + `/invitees/${_payload.event_id}`, "POST", _payload);
    return resp.data;
  }
);
export const cancleInvitation = createAsyncThunk(
  "invitees/cancleInvitation", async (_payload) => {
    console.log(_payload);
    let resp = await doApiMethod(API_URL + `/invitees`, "DELETE", _payload);
    return resp.data;
  }
);
export const refusal = createAsyncThunk(
  "invitees/refusal", async (_payload) => {
    console.log(_payload);
    let resp = await doApiMethod(API_URL + `/invitees/refusal`, "DELETE", _payload);
    return resp.data;
  }
);




export const userSlice = createSlice({
  name: 'invitees',

  initialState: {
    currentEventInvitees: [],
    currentUserInvitations: [],
    status: null,
    errors: null

  },
  reducers: {

  },

  extraReducers(builder) {
    builder
      .addCase(getCurrentEventInvitees.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCurrentEventInvitees.fulfilled, (state, action) => {

        if (action.payload) {
          state.status = "success";
          state.errors = null
        } state.currentEventInvitees = action.payload;
      })
      .addCase(getCurrentEventInvitees.rejected, (state, action) => {
        state.status = "failed";
      })


      .addCase(getCurrentUserInvitations.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCurrentUserInvitations.fulfilled, (state, action) => {
        if (action.payload) {
          state.errors = null

          state.status = "success";
          state.currentUserInvitations = action.payload;
        }

      })
      .addCase(getCurrentUserInvitations.rejected, (state, action) => {
        state.status = "failed";
      })

      .addCase(postNewinvitee.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postNewinvitee.fulfilled, (state, action) => {

        if (action.payload) {
          state.status = "success";
          state.errors = null

          state.currentEventInvitees.unshift(action.payload);

        }
      })
      .addCase(postNewinvitee.rejected, (state, action) => {
        console.log(action);
        state.errors = action.error.code;
        state.status = "failed";
      })

      .addCase(cancleInvitation.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(cancleInvitation.fulfilled, (state, action) => {
        state.status = "success";
        state.errors = null

        state.currentEventInvitees = state.currentEventInvitees.filter((item) => (item._id != action.payload))


      })
      .addCase(cancleInvitation.rejected, (state, action) => {
        console.log(action);
        state.status = "failed";
      })

      .addCase(refusal.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(refusal.fulfilled, (state, action) => {

        state.status = "success";
        state.errors = null

        console.log(action.payload);

        state.currentUserInvitations = state.currentUserInvitations.filter((item) => (item.email != action.payload))
      })
      .addCase(refusal.rejected, (state, action) => {
        state.status = "failed";
      })
  }


});


// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default userSlice.reducer