import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ThemeProvider } from '@emotion/react';
import { render } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';

import { RootState, setupStore } from '@/store/store';
import { theme } from '@/utils/theme';

export const renderWithProviders = (
  ui: React.ReactElement,
  preloadedState?: Partial<RootState>
) => {
  const store = setupStore(preloadedState);
  const dispatchSpy = vi.spyOn(store, 'dispatch');

  const Providers = ({ children }: PropsWithChildren) => {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
        </ThemeProvider>
      </Provider>
    );
  };

  return {
    ...render(ui, { wrapper: Providers }),
    store,
    dispatchSpy,
  };
};
