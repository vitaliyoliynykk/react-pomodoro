import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_SEQUENCE_CONFIG } from '@/shared/constants/sequence-config';
import { Sequence } from '@/shared/models';
import { SettingsResponseModel } from '@/shared/models/responses/settings-response-model';
import { getSettingsRequest } from '@/shared/requests/settings/getSettingsRequset';
import { updateSettingsRequest } from '@/shared/requests/settings/updateSettingsRequest';

interface SettingsState {
  status: 'loading' | 'complete' | 'error' | 'empty';
  settings: {
    pushNotificationEnabled: boolean;
    pomodoroConfiguratin: Sequence;
  };
}

const initialState: SettingsState = {
  status: 'complete',
  settings: {
    pushNotificationEnabled: true,
    pomodoroConfiguratin: DEFAULT_SEQUENCE_CONFIG,
  },
};

export const getSettings = createAsyncThunk('settings/get', () =>
  getSettingsRequest()
);

export const updateSettings = createAsyncThunk<
  SettingsResponseModel,
  SettingsResponseModel
>('settings/update', ({ pushNotificationsEnabled, pomodoroConfiguration }) =>
  updateSettingsRequest(pushNotificationsEnabled, pomodoroConfiguration)
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSettings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        getSettings.fulfilled,
        (state, action: PayloadAction<SettingsResponseModel>) => {
          state.status = 'complete';

          state.settings.pomodoroConfiguratin =
            action.payload.pomodoroConfiguration;
          state.settings.pushNotificationEnabled =
            action.payload.pushNotificationsEnabled;
        }
      )
      .addCase(getSettings.rejected, (state) => {
        state.status = 'error';
      });

    builder
      .addCase(updateSettings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        updateSettings.fulfilled,
        (state, action: PayloadAction<SettingsResponseModel>) => {
          state.status = 'complete';

          state.settings.pomodoroConfiguratin =
            action.payload.pomodoroConfiguration;
          state.settings.pushNotificationEnabled =
            action.payload.pushNotificationsEnabled;
        }
      )
      .addCase(updateSettings.rejected, (state) => {
        state.status = 'error';
      });
  },
});

const settingsReducer = settingsSlice.reducer;

export { settingsReducer };
