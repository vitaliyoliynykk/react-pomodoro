import { SettinsResponseModel } from '@/shared/models/responses/settings-response-model';
import api from '@/utils/api';

export const getSettingsRequest = async (): Promise<SettinsResponseModel> => {
  const res = await api.get<SettinsResponseModel>('settings');

  return res.data;
};
