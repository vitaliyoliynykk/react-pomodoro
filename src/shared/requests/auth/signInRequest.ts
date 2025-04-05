import { SignInResponseModel } from '@/shared/models/responses/sign-in-response-model';
import { UserResponseModel } from '@/shared/models/responses/user-response-model';
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

export const getUserRequest = async (): Promise<UserResponseModel> => {
  const res = await api.get<UserResponseModel>('user');

  return res.data;
};
