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
    config.headers['ngrok-skip-browser-warning'] = 'true';
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError<MessageResponseModel>) => {
    if (
      error.response?.status === 401 &&
      error.response.data.message === 'Not authorized'
    ) {
      try {
        const refreshResponse = await api.post<{ accessToken: string }>(
          'auth/refresh'
        );

        const newAccessToken = refreshResponse.data.accessToken;
        localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);

        const originalRequest = { ...error.config };
        if (typeof newAccessToken === 'string' && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return await api(originalRequest);
        }
      } catch {
        toaster.create({
          description: 'Token refresh failure',
          type: 'error',
          duration: 3000,
        });

        return;
      }
    }

    toaster.create({
      description: error.response?.data.message ?? 'Unexpected error',
      type: 'error',
      duration: 3000,
    });
    return Promise.reject(error);
  }
);

export default api;
