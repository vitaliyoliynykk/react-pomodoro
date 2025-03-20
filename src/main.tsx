import './index.css';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import App from './App.tsx';
import { store } from './store/store.ts';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <BrowserRouter>
        <ChakraProvider value={defaultSystem}>
          <Provider store={store}>
            <App />
          </Provider>
        </ChakraProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
