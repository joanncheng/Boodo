import { createSlice } from '@reduxjs/toolkit';

const brushOptionsSlice = createSlice({
  name: 'brushOptions',
  initialState: { color: '#4740A5', size: 1 },
  reducers: {
    selectColor: (state, action) => {
      state.color = action.payload;
    },
    selectSize: (state, action) => {
      state.size = action.payload;
    },
  },
});

export const { selectColor, selectSize } = brushOptionsSlice.actions;

export default brushOptionsSlice.reducer;
