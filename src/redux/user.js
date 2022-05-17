import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    login: (_, action) => action.payload,
    logout: () => ({ id: '', email: '' }),
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
