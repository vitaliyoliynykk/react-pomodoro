import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';

export const CompletedBlock = () => {
  const { selectedTask } = useSelector((state: RootState) => state.tasks);
  const { completedToday } = useSelector((state: RootState) => state.pomodoro);

  if (!selectedTask) {
    <div>Completed: {completedToday}</div>;
  }

  return (
    <div>
      Completed: {completedToday} / {selectedTask?.sessions_goal}
    </div>
  );
};
