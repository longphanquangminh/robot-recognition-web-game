import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  preview: {
    host: true, // allow serving externally
    allowedHosts: true, // allow any host
  },
});
