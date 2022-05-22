import { configureStore } from '@reduxjs/toolkit';
import usernameReducer from './username';
import activeToolReducer from './activeTool';
import toolOptionsReducer from './toolOptions';

export default configureStore({
  reducer: {
    username: usernameReducer,
    activeTool: activeToolReducer,
    toolOptions: toolOptionsReducer,
  },
});
