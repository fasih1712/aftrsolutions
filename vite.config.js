import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base '/' — absolute asset paths so nested routes (/services/devops-cloud) load assets correctly.
// nginx.conf falls back to index.html for client-side routing.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
