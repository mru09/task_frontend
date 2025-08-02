import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import reminderReducer from './slices/reminderSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    reminders: reminderReducer
  },
});

export default store;
