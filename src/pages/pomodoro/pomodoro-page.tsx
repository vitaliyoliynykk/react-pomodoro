import { Spinner } from '@chakra-ui/react';
import { RefObject, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import clickSound from '@/assets/sounds/click.mp3';
import alarmSound from '@/assets/sounds/clock-alarm.mp3';
import TimerWorker from '@/assets/workers/timerWorker.js?worker';
import ClockComponent from '@/shared/components/clock/clock-component';
import { Sequence, SequenceType } from '@/shared/models';
import { AppDispatch, RootState } from '@/store';
import { formatTime } from '@/utils';

import { COLORS, HEADINGS } from './constants';
import {
  clockTick,
  getConfig,
  nextCycle,
  startClock,
  stopClock,
} from './pomodoro-slice';
import {
  Buttons,
  ClockContainer,
  Container,
  ControlButton,
  Heading,
  HeadingContainer,
} from './styled-components';

function PomodoroPage() {
  const workerRef = useRef<Worker | null>(null);
  const clickAudioRef = useRef(new Audio(clickSound));
  const alarmAudioRef = useRef(new Audio(alarmSound));

  const dispatch = useDispatch<AppDispatch>();

  const {
    config: { data: sequenceConfig, status },
    currentCycle,
    currentTime,
    completedToday,
    isClockRunning,
  } = useSelector((state: RootState) => state.pomodoro);

  useEffect(() => {
    void dispatch(getConfig());

    workerRef.current = new TimerWorker();

    workerRef.current.onmessage = () => {
      dispatch(clockTick());
    };

    return () => workerRef.current?.terminate();
  }, [dispatch]);

  useEffect(() => {
    handleUpdateDocumentTitle(currentCycle, currentTime, sequenceConfig);
  }, [currentCycle, currentTime, sequenceConfig]);

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
            <Heading>{HEADINGS[sequenceConfig[currentCycle].type]}</Heading>
            <div>Completed: {completedToday}</div>
          </HeadingContainer>

          <ClockComponent
            currentTime={currentTime}
            maxTime={sequenceConfig[currentCycle].duration}
            color={COLORS[sequenceConfig[currentCycle].type]}
          />

          <Buttons>
            <ControlButton
              variant="subtle"
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
