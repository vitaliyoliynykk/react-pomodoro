/** @jsxImportSource @emotion/react */
import { Button } from '@chakra-ui/react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

import ClockComponent from '../../components/clock/clock-component';

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
  const [currentTime, setCurrentTime] = useState<number>(10);
  const [clockIsRunning, setClockIsRunning] = useState<boolean>(false);

  const intervalDuration = 1000;

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (currentTime === 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
      setClockIsRunning(false);
    }
  }, [currentTime]);

  const startClock = () => {
    intervalRef.current = setInterval(() => {
      setCurrentTime((prevTime) => prevTime - 1);
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

  const handleStartStop = (clockIsRunning: boolean) => {
    if (clockIsRunning) {
      stopClock();
      return;
    }

    startClock();
  };

  return (
    <Container>
      <ClockComponent currentTime={currentTime} maxTime={10}></ClockComponent>
      <Buttons>
        <Button
          variant="solid"
          css={buttonStyle}
          onClick={() => handleStartStop(clockIsRunning)}
        >
          {clockIsRunning ? 'Stop' : 'Start'}
        </Button>
        <Button variant="solid" css={buttonStyle}>
          Skip
        </Button>
      </Buttons>
    </Container>
  );
}

export default PomodoroPage;
