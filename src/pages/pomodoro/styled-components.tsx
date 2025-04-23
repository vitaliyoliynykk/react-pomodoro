/** @jsxImportSource @emotion/react */
import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const HeadingContainer = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-bottom: 24px;
  padding: 12px 0px;
  text-align: center;
`;

export const Heading = styled.h1`
  font-weight: bold;
  width: 100%;
  font-size: 32px;
`;

export const ClockContainer = styled.div`
  width: 250px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const ControlButton = styled(Button)`
  display: block;
  flex-grow: 1;
`;

export const Container = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const TasksContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
`;
