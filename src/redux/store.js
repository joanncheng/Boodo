import { configureStore } from '@reduxjs/toolkit';
import usernameReducer from './username';
import activeToolReducer from './activeTool';
import brushOptionsReducer from './brushOptions';
import fontSizeReducer from './fontSize';

export default configureStore({
  reducer: {
    username: usernameReducer,
    activeTool: activeToolReducer,
    brushOptions: brushOptionsReducer,
    fontSize: fontSizeReducer,
  },
});
