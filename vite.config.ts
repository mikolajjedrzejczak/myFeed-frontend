import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://13.40.130.1:80',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
