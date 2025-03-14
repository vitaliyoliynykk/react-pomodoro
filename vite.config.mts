import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import { VitePWA } from 'vite-plugin-pwa';

import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Flow Track - productivity timer',
        short_name: 'Flow Track',
        description: 'Productivity timer',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/pomodoro.svg',
            sizes: '192x192',
            type: 'image/svg',
          },
          {
            src: '/pomodoro.svg',
            sizes: '512x512',
            type: 'image/svg',
          },
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts', // Файл для ініціалізації тестів
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
