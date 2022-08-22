import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL, doApiGet } from '../../services/apiService';



export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser", async (dispatch, getState) => {
    let resp = await doApiGet(API_URL + `/users/userInfo`);
    // console.log(resp.data);
    return resp.data;
  }
);




export const userSlice = createSlice({
  name: 'user',

  initialState: {
    currentUser: null,
    status: null,
  },
  reducers: {

  },

  extraReducers(builder) {
    builder
      .addCase(getCurrentUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.status = "success";

        if (action.payload) state.currentUser = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.status = "failed";
      })



  }


});


// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default userSlice.reducer