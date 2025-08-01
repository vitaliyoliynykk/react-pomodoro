/** @jsxImportSource @emotion/react */
import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const HeadingContainer = styled('div')(({ theme }) => ({
  width: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: theme.radius.medium,
  marginBottom: theme.spacing.lg,
  padding: `${theme.spacing.sm} 0px`,
  textAlign: 'center',
  height: '120px',
}));

export const Heading = styled.h1`
  font-weight: bold;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.xlg};
`;

export const ClockContainer = styled.div`
  width: 250px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Buttons = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing.xs,
  marginTop: theme.spacing.lg,
  marginBottom: theme.spacing.lg,
}));

export const ControlButton = styled(Button)`
  display: block;
  flex-grow: 1;
  font-size: ${({ theme }) => theme.fontSize.base};
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
  gap: ${({ theme }) => theme.spacing.xs};
`;
