import { Sequence } from '@/shared/models';
import { SettinsResponseModel } from '@/shared/models/responses/settings-response-model';
import api from '@/utils/api';

export const updateSettingsRequest = async (
  pushNotificationsEnabled: boolean,
  pomodoroConfiguration: Sequence
): Promise<SettinsResponseModel> => {
  const res = await api.put<SettinsResponseModel>('settings', {
    pushNotificationsEnabled,
    pomodoroConfiguration,
  });

  return res.data;
};
