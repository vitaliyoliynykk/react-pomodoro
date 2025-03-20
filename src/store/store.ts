import { configureStore } from '@reduxjs/toolkit';

import { pomodoroReducer } from './slices/pomodoro-slice';

export const store = configureStore({
  reducer: {
    pomodoro: pomodoroReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
