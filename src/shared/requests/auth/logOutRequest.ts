import api from '@/utils/api';

export const logOutRequest = async (): Promise<void> => api.post('auth/logout');
