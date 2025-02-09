/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { FC, useEffect, useState } from 'react';

import { ClockComponentPropsType } from './clock-component-props.type';

const Container = styled.div`
  width: 250px;
  height: 250px;
  position: relative;
`;

const Clock = styled.div<{ circle: number }>`
  background-color: hotpink;
  border-radius: 50%;
  width: 250px;
  height: 250px;
  clip-path: circle(${(props) => props.circle}%);
  position: absolute;
`;

const ClockBackground = styled.div`
  background-color: hotpink;
  border-radius: 50%;
  width: 250px;
  height: 250px;
  opacity: 0.3;
  position: absolute;
`;

const Time = styled.div`
  position: absolute;
  top: calc(50% - 24px);
  width: 100%;
  font-size: 32px;
`;

const ClockComponent: FC<ClockComponentPropsType> = ({
  currentTime,
  maxTime,
}) => {
  const [formattedTime, setFormattedTime] = useState<string>('00:00');
  const [circleFill, setCircleFill] = useState<number>(50);

  useEffect(() => {
    setFormattedTime(formatTime(currentTime));
    setCircleFill(calculateCircleFillPercentage(currentTime, maxTime));
  }, [currentTime]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secondsFormated = (seconds % 60).toString().padStart(2, '0');

    return `${minutes}:${secondsFormated}`;
  };

  const calculateCircleFillPercentage = (
    currentTime: number,
    maxTime: number
  ) => currentTime / (maxTime / 100) / 2;

  return (
    <Container>
      <ClockBackground />
      <Clock circle={circleFill} />
      <Time> {formattedTime}</Time>
    </Container>
  );
};

export default ClockComponent;
