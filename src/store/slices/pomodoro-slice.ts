import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Sequence, SequenceType } from '@/shared/models';
import { fetchSequenceConfig } from '@/shared/requests/fetchConfig';

const initialCurrentTime = 1500;

interface PomodoroState {
  config: {
    status: 'loading' | 'complete' | 'error' | 'empty';
    data: Sequence;
  };
  currentCycle: number;
  currentTime: number;
  completedToday: number;
  isClockRunning: boolean;
}

const initialState: PomodoroState = {
  config: {
    status: 'empty',
    data: [],
  },
  currentCycle: 0,
  currentTime: initialCurrentTime,
  completedToday: 0,
  isClockRunning: false,
};

export const getConfig = createAsyncThunk('pomodoro/initConfig', async () => {
  return await fetchSequenceConfig('defaultConfig');
});

const pomodoroSlice = createSlice({
  name: 'pomodoro',
  initialState,
  reducers: {
    nextCycle: (state) => {
      if (
        state.config.data[state.currentCycle].type === SequenceType.POMODORO
      ) {
        state.completedToday += 1;
      }

      state.currentCycle = (state.currentCycle + 1) % state.config.data.length;
      state.currentTime = state.config.data[state.currentCycle].duration;
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
    builder
      .addCase(getConfig.pending, (state) => {
        state.config.status = 'loading';
      })
      .addCase(
        getConfig.fulfilled,
        (state, action: PayloadAction<Sequence>) => {
          state.config.status = 'complete';
          state.config.data = action.payload.slice();
          // state.currentTime = action.payload[0].duration;
        }
      )
      .addCase(getConfig.rejected, (state) => {
        state.config.status = 'error';
      });
  },
});

export const { nextCycle, clockTick, startClock, stopClock } =
  pomodoroSlice.actions;

const pomodoroReducer = pomodoroSlice.reducer;

export { pomodoroReducer };
