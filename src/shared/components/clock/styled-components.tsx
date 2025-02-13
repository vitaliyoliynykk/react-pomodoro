/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

export const Container = styled.div`
  width: 250px;
  height: 250px;
  position: relative;
`;

export const Clock = styled.div<{ circle: number; color: string }>`
  background-color: ${(props) => props.color};
  border-radius: 50%;
  width: 250px;
  height: 250px;
  clip-path: circle(${(props) => props.circle}%);
  transition: clip-path 0.5s ease-in-out;
  position: absolute;
`;

export const ClockBackground = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  border-radius: 50%;
  width: 250px;
  height: 250px;
  opacity: 0.3;
  position: absolute;
`;

export const Time = styled.div`
  position: absolute;
  top: calc(50% - 24px);
  width: 100%;
  font-size: 32px;
  text-align: center;
`;
