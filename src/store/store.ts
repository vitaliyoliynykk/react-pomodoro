import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { pomodoroReducer } from './slices/pomodoro-slice';
import { settingsReducer } from './slices/settings-slice';
import { statisticsReducer } from './slices/statistics-slice';
import { tasksReducer } from './slices/tasks-slice';
import { userReducer } from './slices/user-slice';

const rootRedcuer = combineReducers({
  pomodoro: pomodoroReducer,
  user: userReducer,
  settings: settingsReducer,
  tasks: tasksReducer,
  statistics: statisticsReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootRedcuer,
    preloadedState,
  });

export type RootState = ReturnType<typeof rootRedcuer>;
export type AppStore = ReturnType<typeof setupStore>;

export const useAppDispatch = useDispatch.withTypes<AppStore['dispatch']>();
export const useAppSelector = useSelector.withTypes<RootState>();
