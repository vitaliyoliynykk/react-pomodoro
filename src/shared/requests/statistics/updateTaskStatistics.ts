import { UpdateTaskStatisticRequestModel } from '@/shared/models/requests/update-completed-request-model';
import { StatisticResponseModel } from '@/shared/models/responses/statistic-response-model';
import api from '@/utils/api';

export const updateTaskStatisticRequest = async ({
  taskId,
  completed,
  goalReached,
}: UpdateTaskStatisticRequestModel): Promise<StatisticResponseModel> => {
  const res = await api.put<StatisticResponseModel>('statistics', {
    task_id: taskId,
    sessions_completed: completed,
    goal_reached: goalReached,
    date: new Date(),
  });

  return res.data;
};
