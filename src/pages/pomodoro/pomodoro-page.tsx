/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import ClockComponent from '../../components/clock/clock-component';
import { Button } from '@chakra-ui/react';

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
`;

const buttonStyle = css`
  width: 50%;

  &:first-child {
    margin-right: 8px;
  }
`;

function PomodoroPage() {
  return (
    <Container>
      <ClockComponent currentTime={86} maxTime={120}></ClockComponent>
      <Buttons>
        <Button variant="solid" css={buttonStyle}>
          Start
        </Button>
        <Button variant="solid" css={buttonStyle}>
          Skip
        </Button>
      </Buttons>
    </Container>
  );
}

export default PomodoroPage;
