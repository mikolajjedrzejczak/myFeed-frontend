import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.test-domain.ovh',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
