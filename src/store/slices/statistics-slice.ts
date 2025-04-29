import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UpdateTaskStatisticRequestModel } from '@/shared/models/requests/update-completed-request-model';
import { StatisticResponseModel } from '@/shared/models/responses/statistic-response-model';
import { getStatisticsForUserRequest } from '@/shared/requests/statistics/getStatisticsForUser';
import { updateTaskStatisticRequest } from '@/shared/requests/statistics/updateTaskStatistics';

interface StatisticsState {
  status: 'loading' | 'complete' | 'error' | 'empty';
  statistics: StatisticResponseModel[];
}

const initialState: StatisticsState = {
  status: 'complete',
  statistics: [],
};

export const updateTaskStatistic = createAsyncThunk<
  StatisticResponseModel,
  UpdateTaskStatisticRequestModel
>('statistics/updateTaskStatistic', (req) => updateTaskStatisticRequest(req));

//TODO: Add filter for date
export const getStatisticsForUser = createAsyncThunk(
  'statistics/getForUser',
  () => getStatisticsForUserRequest()
);
const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateTaskStatistic.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        updateTaskStatistic.fulfilled,
        (state, action: PayloadAction<StatisticResponseModel>) => {
          state.status = 'complete';
          const itemToUpdate = state.statistics.find(
            (item) => item.task_id === action.payload.task_id
          );

          if (itemToUpdate) {
            itemToUpdate.total_sessions = action.payload.total_sessions;
          } else {
            state.statistics.push(action.payload);
          }
        }
      )
      .addCase(updateTaskStatistic.rejected, (state) => {
        state.status = 'error';
      });

    builder
      .addCase(getStatisticsForUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        getStatisticsForUser.fulfilled,
        (state, action: PayloadAction<StatisticResponseModel[]>) => {
          state.status = 'complete';
          state.statistics = action.payload;
        }
      )
      .addCase(getStatisticsForUser.rejected, (state) => {
        state.status = 'error';
      });
  },
});

const statisticsReducer = statisticsSlice.reducer;

export { statisticsReducer };
