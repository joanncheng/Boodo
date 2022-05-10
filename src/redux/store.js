import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import activeToolReducer from './activeTool';
import brushOptionsReducer from './brushOptions';

export default configureStore({
  reducer: {
    user: userReducer,
    activeTool: activeToolReducer,
    brushOptions: brushOptionsReducer,
  },
});
