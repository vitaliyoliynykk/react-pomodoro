import './index.css';

import { ThemeProvider } from '@emotion/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import { Provider as ChakraProvider } from '@/components/ui/provider';

import App from './App.tsx';
import { store } from './store/store.ts';
import { theme } from './utils/theme.ts';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <BrowserRouter>
        <ChakraProvider>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </Provider>
        </ChakraProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
