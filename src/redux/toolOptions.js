import { createSlice } from '@reduxjs/toolkit';

const toolOptionsSlice = createSlice({
  name: 'toolOptions',
  initialState: {
    brushColor: '#4740A5',
    brushSize: 1,
    fontSize: 24,
    opacity: 1,
  },
  reducers: {
    selectBrushColor: (state, action) => {
      state.brushColor = action.payload;
    },
    selectBrushSize: (state, action) => {
      state.brushSize = action.payload;
    },
    selectFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    selectOpacity: (state, action) => {
      state.opacity = action.payload;
    },
  },
});

export const {
  selectBrushColor,
  selectBrushSize,
  selectFontSize,
  selectOpacity,
} = toolOptionsSlice.actions;

export default toolOptionsSlice.reducer;
