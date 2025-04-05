import { SignInResponseModel } from '@/shared/models/responses/sign-in-response-model';
import api from '@/utils/api';

export const signInRequest = async (
  email: string,
  password: string
): Promise<SignInResponseModel> => {
  const res = await api.post<SignInResponseModel>('auth/login', {
    email,
    password,
  });

  return res.data;
};
