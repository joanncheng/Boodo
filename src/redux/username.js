import { createSlice } from '@reduxjs/toolkit';

const usernameSlice = createSlice({
  name: 'username',
  initialState: '',
  reducers: {
    displayName: (_, action) => action.payload,
  },
});

export const { displayName } = usernameSlice.actions;

export default usernameSlice.reducer;
