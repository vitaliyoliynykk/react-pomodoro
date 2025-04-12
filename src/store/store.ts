import { configureStore } from '@reduxjs/toolkit';

import { pomodoroReducer } from './slices/pomodoro-slice';
import { settingsReducer } from './slices/settings-slice';
import { userReducer } from './slices/user-slice';

export const store = configureStore({
  reducer: {
    pomodoro: pomodoroReducer,
    user: userReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
