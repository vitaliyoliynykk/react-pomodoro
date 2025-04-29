import { TaskModel } from '@/shared/models/responses/task-respose-model';
import api from '@/utils/api';

export const getTasksRequest = async (): Promise<TaskModel[]> => {
  const res = await api.get<TaskModel[]>('tasks');

  return res.data;
};
