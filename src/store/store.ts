import { configureStore } from '@reduxjs/toolkit';

import { pomodoroReducer } from './slices/pomodoro-slice';
import { settingsReducer } from './slices/settings-slice';
import { statisticsReducer } from './slices/statistics-slice';
import { tasksReducer } from './slices/tasks-slice';
import { userReducer } from './slices/user-slice';

export const store = configureStore({
  reducer: {
    pomodoro: pomodoroReducer,
    user: userReducer,
    settings: settingsReducer,
    tasks: tasksReducer,
    statistics: statisticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
