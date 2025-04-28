import { Sequence } from '@/shared/models';
import { SettingsResponseModel } from '@/shared/models/responses/settings-response-model';
import api from '@/utils/api';

export const updateSettingsRequest = async (
  pushNotificationsEnabled: boolean,
  pomodoroConfiguration: Sequence
): Promise<SettingsResponseModel> => {
  const res = await api.put<SettingsResponseModel>('settings', {
    pushNotificationsEnabled,
    pomodoroConfiguration,
  });

  return res.data;
};
