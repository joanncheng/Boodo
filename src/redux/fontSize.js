import { createSlice } from '@reduxjs/toolkit';

const fontSizeSlice = createSlice({
  name: 'fontSize',
  initialState: 24,
  reducers: {
    selectFontSize: (_, action) => action.payload,
  },
});

export const { selectFontSize } = fontSizeSlice.actions;

export default fontSizeSlice.reducer;
