import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base './' keeps asset paths relative, so the build works on GitHub Pages
// (fasih1712.github.io/aftrsolutions/), a custom domain, or any static host.
export default defineConfig({
  plugins: [react()],
  base: './',
})
