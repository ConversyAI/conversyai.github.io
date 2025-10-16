import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Change this to '/conversy-app/' if deploying to a subdirectory
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
