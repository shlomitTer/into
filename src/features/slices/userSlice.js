import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';

import { config, doApiGet, doApiMethod } from '../../services/apiService';

const URL = config.api.url

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser", async (dispatch, getState) => {
    let resp = await doApiGet(URL + `/users/userInfo`);
    return resp.data;
  }
);
export const login = createAsyncThunk(
  "user/login", async (_payload) => {

    let resp = await doApiMethod(URL + `/users/login`, "POST", _payload);
    return resp.data;

  }
);
export const signUp = createAsyncThunk(
  "user/signUp", async (_payload) => {
    let resp = await doApiMethod(URL + `/users`, "POST", _payload);
    return resp.data;
  }
);

export const userSlice = createSlice({
  name: 'user',

  initialState: {
    currentUser: undefined,
    status: "",
    errorCode: "",
  },
  reducers: {
    logout: (state, action) => {
      state.currentUser = undefined
    }
  },

  extraReducers(builder) {
    builder
      .addCase(getCurrentUser.pending, (state, action) => {
        state.status = "loading";
        state.errorCode = ""
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.status = "success";

        state.currentUser = action.payload;

        if (action.payload.message) state.currentUser = undefined;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.status = "failed";
      })

      .addCase(login.pending, (state, action) => {
        state.status = "loading";
        state.errorCode = ""
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.user) {
          state.status = "success";
          localStorage.setItem("into_token", action.payload.token);
          state.currentUser = action.payload.user;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.errorCode = action.error.code;

      })
      .addCase(signUp.pending, (state, action) => {
        state.status = "loading";
        state.errorCode = ""

      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = "success";
        state.errorCode = ""


        if (action.payload.user) {
          localStorage.setItem("into_token", action.payload.token);
          state.currentUser = action.payload.user;
        }
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
      })

  }

});

export const {
  logout
} = userSlice.actions;
export default userSlice.reducer