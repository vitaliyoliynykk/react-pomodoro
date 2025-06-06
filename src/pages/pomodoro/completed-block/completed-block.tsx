import { Progress } from '@chakra-ui/react';

import { useAppSelector } from '@/store/store';

import { Container } from './styled-components';

export const CompletedBlock = () => {
  const { selectedTask } = useAppSelector(({ tasks }) => tasks);
  const { completedToday } = useAppSelector(({ pomodoro }) => pomodoro);
  const { statistics } = useAppSelector(({ statistics }) => statistics);

  if (!selectedTask) {
    return <div>Completed Today - {completedToday}</div>;
  }

  const taskStatistcs = statistics.find(
    (item) => item.task_id === selectedTask._id
  );

  const percentage =
    taskStatistcs?.total_sessions && selectedTask.sessions_goal
      ? taskStatistcs.total_sessions / (selectedTask.sessions_goal / 100)
      : 0;

  return (
    <Container>
      <p>
        Daily Goal - {taskStatistcs?.total_sessions ?? 0}/
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
