import axios, { AxiosError } from 'axios';

import { toaster } from '@/components/ui/toaster';
import { ACCESS_TOKEN_KEY } from '@/shared/constants/tokens';
import { MessageResponseModel } from '@/shared/models/responses/error-response-model';

const baseURL = import.meta.env.VITE_API_URL as string;

const api = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError<MessageResponseModel>) => {
    toaster.create({
      description: error.response?.data.message ?? 'Unexpected error',
      type: 'error',
      duration: 3000,
    });
    return Promise.reject(error);
  }
);

export default api;
