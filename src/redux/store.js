import { configureStore } from '@reduxjs/toolkit';
import usernameReducer from './username';
import activeToolReducer from './activeTool';
import brushOptionsReducer from './brushOptions';

export default configureStore({
  reducer: {
    username: usernameReducer,
    activeTool: activeToolReducer,
    brushOptions: brushOptionsReducer,
  },
});
