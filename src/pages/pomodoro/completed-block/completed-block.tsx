import { Progress } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';

import { Container } from './styled-components';

export const CompletedBlock = () => {
  const { selectedTask } = useSelector((state: RootState) => state.tasks);
  const { completedToday } = useSelector((state: RootState) => state.pomodoro);

  if (!selectedTask) {
    return <div>Completed Today - {completedToday}</div>;
  }

  const percentage =
    selectedTask.sessions_completed && selectedTask.sessions_goal
      ? selectedTask.sessions_completed / (selectedTask.sessions_goal / 100)
      : 0;

  return (
    <Container>
      <p>
        Daily Goal - {selectedTask.sessions_completed ?? 0}/
        {selectedTask.sessions_goal}
      </p>

      <Progress.Root
        value={percentage}
        striped
        style={{ width: 200, marginTop: 8 }}
      >
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    </Container>
  );
};
