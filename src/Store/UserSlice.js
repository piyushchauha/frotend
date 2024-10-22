//Redux_toolkit
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: null,
    email: null,
    password: null,
  },


  reducers: {
    signup: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;

    },


    signin: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;

    },


    logout: (state) => {
      state.name = null;
      state.email = null;
      state.password = null;
      localStorage.removeItem("user");

    },
  },
});


export const { signup, signin, logout } = userSlice.actions;
export default userSlice.reducer;
