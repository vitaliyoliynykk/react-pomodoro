import { createSlice } from '@reduxjs/toolkit';

import { DEFAULT_SEQUENCE_CONFIG } from '@/shared/constants/sequence-config';
import { Sequence } from '@/shared/models';

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

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
});

const settingsReducer = settingsSlice.reducer;

export { settingsReducer };
