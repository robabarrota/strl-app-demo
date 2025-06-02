import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { resolve } from 'path';

export default defineConfig(() => {
  return {
    base: '/',
    plugins: [react(), eslint()],
    resolve: {
      alias: [
        { find: '@', replacement: resolve(__dirname, 'src') },
      ],
    },
  };
});