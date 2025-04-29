import { SettingsResponseModel } from '@/shared/models/responses/settings-response-model';
import api from '@/utils/api';

export const getSettingsRequest = async (): Promise<SettingsResponseModel> => {
  const res = await api.get<SettingsResponseModel>('settings');

  return res.data;
};
