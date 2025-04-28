import { TaskModel } from '@/shared/models/responses/task-respose-model';
import api from '@/utils/api';

export const updateCompletedRequest = async (
  taskId: string,
  completed: number
): Promise<TaskModel> => {
  const res = await api.patch<TaskModel>('tasks/update-completed', {
    task_id: taskId,
    sessions_completed: completed,
  });

  return res.data;
};
