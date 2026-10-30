import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' keeps asset paths valid on GitHub Pages / sub-path hosting as well as at the domain root.
export default defineConfig({
  base: './',
  plugins: [react()],
});
