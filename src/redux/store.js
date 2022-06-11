import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import displayNameReducer from './displayName';
import toolOptionsReducer from './toolOptions';

export default configureStore({
  reducer: {
    user: authReducer,
    cursorDisplayName: displayNameReducer,
    toolOptions: toolOptionsReducer,
  },
});
