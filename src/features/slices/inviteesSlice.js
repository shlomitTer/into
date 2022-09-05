import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { config, doApiGet, doApiMethod } from '../../services/apiService';

const URL = config.api.url

export const getCurrentEventInvitees = createAsyncThunk(
  "invitees/getCurrentEventInvitees", async (event_id) => {
    let resp = await doApiGet(URL + `/invitees/${event_id}`);
    return resp.data;
  }
);
export const getCurrentUserInvitations = createAsyncThunk(
  "invitees/getCurrentUserInvitations", async () => {
    let resp = await doApiGet(URL + `/invitees`);
    return resp.data;
  }
);
export const postNewinvitee = createAsyncThunk(
  "invitees/postNewinvitee", async (_payload) => {
    let resp = await doApiMethod(URL + `/invitees/${_payload.event_id}`, "POST", _payload);
    if (resp.code) {
      return resp
    }
    return resp.data;
  }
);
export const cancleInvitation = createAsyncThunk(
  "invitees/cancleInvitation", async (_payload) => {
    let resp = await doApiMethod(URL + `/invitees`, "DELETE", _payload)
    return resp.data;
  }
);
export const refusal = createAsyncThunk(
  "invitees/refusal", async (_payload) => {
    let resp = await doApiMethod(URL + `/invitees/refusal`, "DELETE", _payload);
    return resp.data;
  }
);
export const approveInvitation = createAsyncThunk(
  "invitees/approveInvitation", async (_payload) => {
    let resp = await doApiMethod(URL + `/invitees/approve/${_payload.event_id}`, "PUT", _payload);
    return resp.data;
  }
);


export const inviteesSlice = createSlice({
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

        state.currentEventInvitees = state.currentEventInvitees.filter((item) => (item._id !== action.payload))

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

        state.currentUserInvitations = state.currentUserInvitations.filter((item) => (item.email !== action.payload))
      })
      .addCase(refusal.rejected, (state, action) => {
        state.status = "failed";
      })


      .addCase(approveInvitation.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(approveInvitation.fulfilled, (state, action) => {
        state.status = "success";
        state.errors = null
        console.log(action.payload);
        state.eventsByParticpant.unshift(action.payload);

      })
      .addCase(approveInvitation.rejected, (state, action) => {
        state.status = "failed";
      })

  }

});

// Action creators are generated for each case reducer function
export const { approve } = inviteesSlice.actions;
export default inviteesSlice.reducer