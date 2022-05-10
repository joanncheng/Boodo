import { createSlice } from '@reduxjs/toolkit';

const activeToolSlice = createSlice({
  name: 'activeTool',
  initialState: 'selection',
  reducers: {
    selectTool: (_, action) => action.payload,
  },
});

export const { selectTool } = activeToolSlice.actions;

export default activeToolSlice.reducer;
