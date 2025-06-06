import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { stateMock } from '@/pages/pomodoro/__mocks__/state-mock';
import PomodoroPage from '@/pages/pomodoro/pomodoro-page';
import { renderWithProviders } from '@/utils/unit-tests';

vi.stubGlobal(
  'Worker',
  class {
    postMessage = vi.fn();
    terminate = vi.fn();
  }
);

vi.stubGlobal(
  'Audio',
  class {
    play = vi.fn();
    pause = vi.fn();
    currentTime = 0;
  }
);

describe('PomodoroPage', () => {
  it('WHEN user clicks start button THEN clock should be started', async () => {
    const { dispatchSpy } = renderWithProviders(<PomodoroPage />, stateMock);

    const startButton = screen.getByText('Start');

    await userEvent.click(startButton);

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'pomodoro/startClock' })
    );
  });

  it('WHEN user starts the cloclk AND clicks the "Stop" button THEN clock should be stoped', async () => {
    const { dispatchSpy } = renderWithProviders(<PomodoroPage />, stateMock);

    const startButton = screen.getByText('Start');

    await userEvent.click(startButton);

    await waitFor(
      () => {
        expect(dispatchSpy).toHaveBeenCalledWith(
          expect.objectContaining({ type: 'pomodoro/startClock' })
        );
      },
      { timeout: 5000 }
    );

    const stopButton = screen.getByText('Stop');
    await userEvent.click(stopButton);

    await waitFor(
      () => {
        expect(dispatchSpy).toHaveBeenCalledWith(
          expect.objectContaining({ type: 'pomodoro/stopClock' })
        );
      },
      { timeout: 5000 }
    );
  });
});
