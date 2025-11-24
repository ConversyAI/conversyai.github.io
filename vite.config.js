import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    headers: {
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apis.google.com https://www.googletagmanager.com https://*.googleapis.com https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https:; font-src 'self' data: https: https://fonts.gstatic.com; connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.firebase.com https://www.google-analytics.com https://analytics.google.com https://*.google-analytics.com wss://*.firebaseio.com https://prod.spline.design https://fonts.gstatic.com; frame-src 'self' https://*.firebaseapp.com https://accounts.google.com;",
    },
  },
})
