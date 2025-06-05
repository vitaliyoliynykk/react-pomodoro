import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_SEQUENCE_CONFIG } from '@/shared/constants/sequence-config';
import { Sequence, SequenceType } from '@/shared/models';
import { SettingsResponseModel } from '@/shared/models/responses/settings-response-model';
import { RootState } from '@/store/store';

import { getSettings } from './settings-slice';

const initialCurrentTime = 1500;

interface PomodoroState {
  pomodoroConfig: Sequence;
  currentCycle: number;
  currentTime: number;
  completedToday: number;
  isClockRunning: boolean;
}

const initialState: PomodoroState = {
  pomodoroConfig: [],
  currentCycle: 0,
  currentTime: initialCurrentTime,
  completedToday: 0,
  isClockRunning: false,
};

export const getConfig = createAsyncThunk('pomodoro/initConfig', (_, api) => {
  const state = api.getState() as RootState;

  return state.settings.settings.pomodoroConfiguratin;
});

const pomodoroSlice = createSlice({
  name: 'pomodoro',
  initialState,
  reducers: {
    nextCycle: (state) => {
      if (
        state.pomodoroConfig[state.currentCycle].type === SequenceType.POMODORO
      ) {
        state.completedToday += 1;
      }

      state.currentCycle =
        (state.currentCycle + 1) % state.pomodoroConfig.length;
      state.currentTime = state.pomodoroConfig[state.currentCycle].duration;
    },
    clockTick: (state) => {
      state.currentTime -= 1;
    },
    startClock: (state) => {
      state.isClockRunning = true;
    },
    stopClock: (state) => {
      state.isClockRunning = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getSettings.fulfilled,
      (state, action: PayloadAction<SettingsResponseModel | null>) => {
        if (action.payload) {
          state.pomodoroConfig = action.payload.pomodoroConfiguration;
        } else {
          state.pomodoroConfig = DEFAULT_SEQUENCE_CONFIG;
        }

        state.currentTime = state.pomodoroConfig[state.currentCycle].duration;
      }
    );
  },
});

export const { nextCycle, clockTick, startClock, stopClock } =
  pomodoroSlice.actions;

const pomodoroReducer = pomodoroSlice.reducer;

export { pomodoroReducer };
