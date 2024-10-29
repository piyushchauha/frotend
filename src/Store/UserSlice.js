//Redux_toolkit
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: null,
    email: null,
    password: null,
    language: 'en',
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

    setlanguage: (state, action) => {
      state.language = action.payload;
    },

    logout: state => {
      state.name = null;
      state.email = null;
      state.password = null;
    },
  },
});

export const { signup, signin, logout, setlanguage } = userSlice.actions;

export default userSlice.reducer;
