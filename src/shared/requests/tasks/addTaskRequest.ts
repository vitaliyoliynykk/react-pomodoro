import { TaskModel } from '@/shared/models/responses/task-respose-model';
import api from '@/utils/api';

export const addTaskRequest = async (task: TaskModel): Promise<TaskModel> => {
  const res = await api.put<TaskModel>('tasks', task);

  return res.data;
};
