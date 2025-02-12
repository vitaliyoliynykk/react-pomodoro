import { Spinner } from '@chakra-ui/react';
import { RefObject, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import clickSound from '@/assets/sounds/click.mp3';
import alarmSound from '@/assets/sounds/clock-alarm.mp3';
import ClockComponent from '@/components/clock/clock-component';
import { AppDispatch, RootState } from '@/store';

import {
  clockTick,
  initializeConfig,
  nextCycle,
  startClock,
  stopClock,
} from './pomodoro-slice';
import {
  Buttons,
  Container,
  ControlButton,
  Heading,
  HeadingContainer,
} from './styled-components';

function PomodoroPage() {
  const intervalRef = useRef<number | null>(null);
  const clickAudioRef = useRef(new Audio(clickSound));
  const alarmAudioRef = useRef(new Audio(alarmSound));

  const dispatch = useDispatch<AppDispatch>();

  const sequenceConfig = useSelector(
    (state: RootState) => state.pomodoro.config.data
  );
  const status = useSelector(
    (state: RootState) => state.pomodoro.config.status
  );
  const currentCycle = useSelector(
    (state: RootState) => state.pomodoro.currentCycle
  );
  const currentTime = useSelector(
    (state: RootState) => state.pomodoro.currentTime
  );
  const completedToday = useSelector(
    (state: RootState) => state.pomodoro.completedToday
  );
  const isClockRunning = useSelector(
    (state: RootState) => state.pomodoro.isClockRunning
  );

  const intervalDuration = 1000;
  const headings = {
    pomodoro: 'Pomodoro',
    short_break: 'Short break',
    long_break: 'Long break',
  };

  const colors = {
    pomodoro: 'rgb(163, 21, 59)',
    short_break: 'rgb(42, 46, 170)',
    long_break: 'rgb(42, 46, 170)',
  };

  useEffect(() => {
    void dispatch(initializeConfig());

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [dispatch]);

  useEffect(() => {
    if (currentTime === 0 && intervalRef.current) {
      playSound(alarmAudioRef);
      clearInterval(intervalRef.current);
      dispatch(stopClock());
      dispatch(nextCycle());
    }
  }, [currentTime, dispatch]);

  const handleStartClock = () => {
    intervalRef.current = setInterval(() => {
      dispatch(clockTick());
    }, intervalDuration);
    dispatch(startClock());
  };

  const handleStopClock = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      dispatch(stopClock());
    }
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
        <HeadingContainer>
          <Heading>{headings[sequenceConfig[currentCycle].type]}</Heading>
          <div>Completed: {completedToday}</div>
        </HeadingContainer>

        <ClockComponent
          currentTime={currentTime}
          maxTime={sequenceConfig[currentCycle].duration}
          color={colors[sequenceConfig[currentCycle].type]}
        />

        <Buttons>
          <ControlButton
            variant="solid"
            onClick={() => {
              handleStartStop(isClockRunning);
            }}
          >
            {isClockRunning ? 'Stop' : 'Start'}
          </ControlButton>

          <ControlButton
            variant="solid"
            onClick={() => {
              skipClock();
            }}
          >
            Skip
          </ControlButton>
        </Buttons>
      </Container>
    );
  } else {
    return <Spinner />;
  }
}

export default PomodoroPage;
