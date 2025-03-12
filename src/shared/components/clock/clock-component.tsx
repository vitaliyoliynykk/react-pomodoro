import { FC, useEffect, useState } from 'react';

import { formatTime } from '@/utils';

import { ClockComponentPropsType } from './clock-component-props.type';
import { Clock, ClockBackground, Container, Time } from './styled-components';

const ClockComponent: FC<ClockComponentPropsType> = ({
  currentTime,
  maxTime,
  color = 'rgb(163, 21, 59)',
}) => {
  const [formattedTime, setFormattedTime] = useState('00:00');
  const [circleFill, setCircleFill] = useState(50);

  useEffect(() => {
    setFormattedTime(formatTime(currentTime));
    setCircleFill(calculateCircleFillPercentage(currentTime, maxTime));
  }, [currentTime, maxTime]);

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
