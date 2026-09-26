import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base '/' — absolute asset paths so nested routes (/services/devops-cloud) load assets correctly.
// nginx.conf falls back to index.html for client-side routing.
export default defineConfig({
  plugins: [react()],
  base: '/',
  // `npm run dev`: forward chat requests to the assistant (cd server && npm start)
  server: { proxy: { '/api': 'http://localhost:8787' } },
})
