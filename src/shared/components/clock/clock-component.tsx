import { FC, useEffect, useState } from 'react';

import { ClockComponentPropsType } from './clock-component-props.type';
import { Clock, ClockBackground, Container, Time } from './styled-components';

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
