/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { FC, useEffect, useState } from 'react';

import { ClockComponentPropsType } from './clock-component-props.type';

const Container = styled.div`
  width: 250px;
  height: 250px;
  position: relative;
`;

const Clock = styled.div<{ circle: number; color: string }>`
  background-color: ${(props) => props.color};
  border-radius: 50%;
  width: 250px;
  height: 250px;
  clip-path: circle(${(props) => props.circle}%);
  transition: clip-path 0.5s ease-in-out;
  position: absolute;
`;

const ClockBackground = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
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
  color = 'rgb(163, 21, 59)',
}) => {
  const [formattedTime, setFormattedTime] = useState<string>('00:00');
  const [circleFill, setCircleFill] = useState<number>(50);

  useEffect(() => {
    setFormattedTime(formatTime(currentTime));
    setCircleFill(calculateCircleFillPercentage(currentTime, maxTime));
  }, [currentTime, maxTime]);

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
      <ClockBackground color={color} />
      <Clock circle={circleFill} color={color} />
      <Time> {formattedTime}</Time>
    </Container>
  );
};

export default ClockComponent;
