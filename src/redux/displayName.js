import { createSlice } from '@reduxjs/toolkit';

const displayNameSlice = createSlice({
  name: 'displayName',
  initialState: '',
  reducers: {
    displayName: (_, action) => action.payload,
  },
});

export const { displayName } = displayNameSlice.actions;

export default displayNameSlice.reducer;
