/** @jsxImportSource @emotion/react */
import { Button } from '@chakra-ui/react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ClockComponent from '../../components/clock/clock-component';
import { AppDispatch, RootState } from '../../store';
import { clockTick, initializeConfig, nextCycle } from './pomodoro-slice';

const HeadingContainer = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-bottom: 24px;
`;

const Heading = styled.h1`
  font-weight: bold;
  width: 100%;
  font-size: 32px;
`;

const Container = styled.div`
  width: 250px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 24px;
`;

const buttonStyle = css`
  width: 50%;

  &:first-child {
    margin-right: 8px;
  }
`;

function PomodoroPage() {
  const intervalRef = useRef<number | null>(null);
  const [clockIsRunning, setClockIsRunning] = useState(false);

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

  const intervalDuration = 1000;
  const headings = {
    pomodoro: 'Pomodoro',
    short_break: 'Short break',
    long_break: 'Long break',
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
      clearInterval(intervalRef.current);
      setClockIsRunning(false);
      dispatch(nextCycle());
    }
  }, [currentTime, dispatch]);

  const startClock = () => {
    intervalRef.current = setInterval(() => {
      dispatch(clockTick());
    }, intervalDuration);
    setClockIsRunning(true);
  };

  const stopClock = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setClockIsRunning(false);
    }
  };

  const skipClock = () => {
    stopClock();
    dispatch(nextCycle());
  };

  const handleStartStop = (clockIsRunning: boolean) => {
    if (clockIsRunning) {
      stopClock();
      return;
    }

    startClock();
  };

  if (status === 'complete') {
    return (
      <Container>
        <HeadingContainer>
          <Heading>{headings[sequenceConfig[currentCycle].type]}</Heading>
        </HeadingContainer>
        <ClockComponent
          currentTime={currentTime}
          maxTime={sequenceConfig[currentCycle].duration}
        ></ClockComponent>
        <Buttons>
          <Button
            variant="solid"
            css={buttonStyle}
            onClick={() => {
              handleStartStop(clockIsRunning);
            }}
          >
            {clockIsRunning ? 'Stop' : 'Start'}
          </Button>
          <Button
            variant="solid"
            css={buttonStyle}
            onClick={() => {
              skipClock();
            }}
          >
            Skip
          </Button>
        </Buttons>
      </Container>
    );
  } else {
    return <h1>Loading....</h1>;
  }
}

export default PomodoroPage;
