import { MessageResponseModel } from '@/shared/models/responses/error-response-model';
import api from '@/utils/api';

export const registerRequest = async (
  email: string,
  password: string
): Promise<MessageResponseModel> => {
  const res = await api.post<MessageResponseModel>('auth/register', {
    email,
    password,
  });

  return res.data;
};
