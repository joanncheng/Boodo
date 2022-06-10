import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    logIn: (_, action) => action.payload,
    logOut: () => null,
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
