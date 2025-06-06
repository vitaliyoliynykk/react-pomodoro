import { Spinner } from '@chakra-ui/react';
import { RefObject, useCallback, useEffect, useRef } from 'react';

import clickSound from '@/assets/sounds/click.mp3';
import alarmSound from '@/assets/sounds/clock-alarm.mp3';
import ClockComponent from '@/shared/components/clock/clock-component';
import { useAuth } from '@/shared/context/auth-context';
import { Sequence, SequenceType } from '@/shared/models';
import { StatisticResponseModel } from '@/shared/models/responses/statistic-response-model';
import { TaskModel } from '@/shared/models/responses/task-respose-model';
import {
  clockTick,
  nextCycle,
  startClock,
  stopClock,
} from '@/store/slices/pomodoro-slice';
import { getSettings } from '@/store/slices/settings-slice';
import {
  getStatisticsForUser,
  updateTaskStatistic,
} from '@/store/slices/statistics-slice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { formatTime } from '@/utils/time';
import TimerWorker from '@/workers/timerWorker.js?worker';

import { CompletedBlock } from './completed-block/completed-block';
import { COLORS, HEADINGS } from './constants';
import {
  Buttons,
  ClockContainer,
  Container,
  ControlButton,
  Heading,
  HeadingContainer,
  TasksContainer,
} from './styled-components';
import { TaskCreatorDialog } from './task-creator-dialog/task-creator-dialog';
import { TaskSelector } from './task-selector/task-selector';

function PomodoroPage() {
  const workerRef = useRef<Worker | null>(null);
  const clickAudioRef = useRef(new Audio(clickSound));
  const alarmAudioRef = useRef(new Audio(alarmSound));

  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const { currentCycle, currentTime, isClockRunning } = useAppSelector(
    (state) => state.pomodoro
  );
  const { selectedTask } = useAppSelector((state) => state.tasks);
  const {
    status,
    settings: { pomodoroConfiguratin },
  } = useAppSelector((state) => state.settings);
  const { statistics } = useAppSelector((state) => state.statistics);

  const updateTaskCompletedValue = useCallback(
    (selectedTask: TaskModel | null, statistics: StatisticResponseModel[]) => {
      if (
        pomodoroConfiguratin[currentCycle].type === SequenceType.POMODORO &&
        selectedTask?._id &&
        selectedTask.sessions_goal
      ) {
        const completed =
          statistics.find((item) => item.task_id === selectedTask._id)
            ?.total_sessions ?? 0;

        const completedNext = completed + 1;

        void dispatch(
          updateTaskStatistic({
            taskId: selectedTask._id,
            completed: completedNext,
            goalReached:
              completedNext > 0 && completedNext >= selectedTask.sessions_goal,
          })
        );
      }
    },
    [dispatch, currentCycle, pomodoroConfiguratin]
  );

  useEffect(() => {
    if (user) {
      void dispatch(getSettings());
      void dispatch(getStatisticsForUser());
    }

    workerRef.current = new TimerWorker();

    workerRef.current.onmessage = () => {
      dispatch(clockTick());
    };

    return () => workerRef.current?.terminate();
  }, [dispatch, user]);

  useEffect(() => {
    handleUpdateDocumentTitle(currentCycle, currentTime, pomodoroConfiguratin);
  }, [currentCycle, currentTime, pomodoroConfiguratin]);

  useEffect(() => {
    if (currentTime === 0) {
      playSound(alarmAudioRef);
      workerRef.current?.postMessage('stop');
      dispatch(stopClock());
      updateTaskCompletedValue(selectedTask, statistics);
      dispatch(nextCycle());
    }
  }, [
    currentTime,
    dispatch,
    pomodoroConfiguratin,
    currentCycle,
    selectedTask,
    updateTaskCompletedValue,
    statistics,
  ]);

  const handleUpdateDocumentTitle = (
    currentCycle: number,
    currentTime: number,
    sequenceConfig: Sequence
  ) => {
    let documentTitle = '';

    if (sequenceConfig[currentCycle]?.type === SequenceType.POMODORO) {
      documentTitle = 'Time to focus!';
    } else {
      documentTitle = 'Time for a break!';
    }

    document.title = `${formatTime(currentTime).toString()} - ${documentTitle}`;
  };

  const handleStartClock = () => {
    workerRef.current?.postMessage('start');
    dispatch(startClock());
  };

  const handleStopClock = () => {
    workerRef.current?.postMessage('stop');
    dispatch(stopClock());
  };

  const skipClock = () => {
    playSound(clickAudioRef);
    handleStopClock();
    updateTaskCompletedValue(selectedTask, statistics);
    dispatch(nextCycle());
  };

  const handleStartStop = (clockIsRunning: boolean) => {
    playSound(clickAudioRef);

    if (clockIsRunning) {
      handleStopClock();
      return;
    }

    handleStartClock();
  };

  const playSound = (audioRef: RefObject<HTMLAudioElement>) => {
    audioRef.current.currentTime = 0;
    void audioRef.current.play();
  };

  if (status === 'complete') {
    return (
      <Container>
        <ClockContainer>
          <HeadingContainer>
            <Heading>
              {HEADINGS[pomodoroConfiguratin[currentCycle].type]}
            </Heading>
            <CompletedBlock />
          </HeadingContainer>
          <ClockComponent
            currentTime={currentTime}
            maxTime={pomodoroConfiguratin[currentCycle].duration}
            color={COLORS[pomodoroConfiguratin[currentCycle].type]}
          />
          <Buttons>
            <ControlButton
              colorPalette={'teal'}
              onClick={() => {
                handleStartStop(isClockRunning);
              }}
            >
              {isClockRunning ? 'Stop' : 'Start'}
            </ControlButton>

            <ControlButton
              variant="solid"
              disabled={!isClockRunning}
              onClick={skipClock}
            >
              Skip
            </ControlButton>
          </Buttons>
          {!!user && (
            <TasksContainer>
              <TaskSelector /> <TaskCreatorDialog />
            </TasksContainer>
          )}
        </ClockContainer>
      </Container>
    );
  } else {
    return (
      <Container>
        <Spinner />;
      </Container>
    );
  }
}

export default PomodoroPage;
