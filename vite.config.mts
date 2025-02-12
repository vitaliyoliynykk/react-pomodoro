import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  // TODO: Add path resolutions
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
