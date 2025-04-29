import { StatisticResponseModel } from '@/shared/models/responses/statistic-response-model';
import api from '@/utils/api';

export const getStatisticsForUserRequest = async (): Promise<
  StatisticResponseModel[]
> => {
  const res = await api.post<StatisticResponseModel[]>(
    'statistics/user-daily',
    {
      date: new Date(),
    }
  );

  return res.data;
};
