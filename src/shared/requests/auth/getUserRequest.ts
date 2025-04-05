import { UserResponseModel } from '@/shared/models/responses/user-response-model';
import api from '@/utils/api';

export const getUserRequest = async (): Promise<UserResponseModel> => {
  const res = await api.get<UserResponseModel>('user');

  return res.data;
};
