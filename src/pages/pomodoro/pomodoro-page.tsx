import { Button, Dialog, Portal, Spinner } from '@chakra-ui/react';
import { RefObject, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import clickSound from '@/assets/sounds/click.mp3';
import alarmSound from '@/assets/sounds/clock-alarm.mp3';
import ClockComponent from '@/shared/components/clock/clock-component';
import { Sequence, SequenceType } from '@/shared/models';
import {
  clockTick,
  nextCycle,
  startClock,
  stopClock,
} from '@/store/slices/pomodoro-slice';
import { getSettings } from '@/store/slices/settings-slice';
import { AppDispatch, RootState } from '@/store/store';
import { formatTime } from '@/utils/time';
import TimerWorker from '@/workers/timerWorker.js?worker';

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
import { TaskSelector } from './task-selector/task-selector';

function PomodoroPage() {
  const workerRef = useRef<Worker | null>(null);
  const clickAudioRef = useRef(new Audio(clickSound));
  const alarmAudioRef = useRef(new Audio(alarmSound));

  const dispatch = useDispatch<AppDispatch>();

  const { currentCycle, currentTime, completedToday, isClockRunning } =
    useSelector((state: RootState) => state.pomodoro);
  const {
    status,
    settings: { pomodoroConfiguratin },
  } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    void dispatch(getSettings());

    workerRef.current = new TimerWorker();

    workerRef.current.onmessage = () => {
      dispatch(clockTick());
    };

    return () => workerRef.current?.terminate();
  }, [dispatch]);

  useEffect(() => {
    handleUpdateDocumentTitle(currentCycle, currentTime, pomodoroConfiguratin);
  }, [currentCycle, currentTime, pomodoroConfiguratin]);

  useEffect(() => {
    if (currentTime === 0) {
      playSound(alarmAudioRef);
      workerRef.current?.postMessage('stop');
      dispatch(stopClock());
      dispatch(nextCycle());
    }
  }, [currentTime, dispatch]);

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
            <div>Completed: {completedToday}</div>
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
          <TasksContainer>
            <TaskSelector />
            {/* TODO: Move to separate component */}
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <ControlButton variant="solid">Add</ControlButton>
              </Dialog.Trigger>
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content style={{ width: '90%' }}>
                    <Dialog.Header>
                      <Dialog.Title>Add a new task</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body></Dialog.Body>
                    <Dialog.Footer>
                      <Dialog.ActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                      </Dialog.ActionTrigger>
                      <Button>Save</Button>
                    </Dialog.Footer>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          </TasksContainer>
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
