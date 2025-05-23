import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';

import { pomodoroReducer } from '../../store/slices/pomodoro-slice';
import PomodoroPage from './pomodoro-page';

const createTestStore = () => {
  return configureStore({
    reducer: { pomodoro: pomodoroReducer },
  });
};

vi.stubGlobal(
  'Worker',
  class {
    postMessage = vi.fn();
    terminate = vi.fn();
  }
);

// TODO: Add mocks for indexDB
describe('PomodoroPage', () => {
  it('WHEN user clicks start button THEN clock should be started', async () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <ChakraProvider value={defaultSystem}>
          <PomodoroPage />
        </ChakraProvider>
      </Provider>
    );

    const dispatchSpy = vi.spyOn(store, 'dispatch');

    await waitFor(() => {
      const startButton = screen.getByText('Start');
      void userEvent.click(startButton);

      expect(dispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'pomodoro/startClock' })
      );
    });
  });

  it('WHEN user starts the cloclk AND clicks the "Stop" button THEN clock should be stoped', async () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <ChakraProvider value={defaultSystem}>
          <PomodoroPage />
        </ChakraProvider>
      </Provider>
    );

    const dispatchSpy = vi.spyOn(store, 'dispatch');

    await waitFor(
      () => {
        const startButton = screen.getByText('Start');
        void userEvent.click(startButton);

        expect(dispatchSpy).toHaveBeenCalledWith(
          expect.objectContaining({ type: 'pomodoro/startClock' })
        );
      },
      { timeout: 5000 }
    );

    await waitFor(
      () => {
        const startButton = screen.getByText('Stop');
        void userEvent.click(startButton);

        expect(dispatchSpy).toHaveBeenCalledWith(
          expect.objectContaining({ type: 'pomodoro/stopClock' })
        );
      },
      { timeout: 5000 }
    );
  });
});
