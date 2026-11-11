import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the build also works under a GitHub Pages subpath
  base: './',
  plugins: [react()],
  server: {
    host: true, // listen on 0.0.0.0 so external hosts / port forwards can reach it
    allowedHosts: true, // allow requests through forwarded domains
  },
  preview: {
    host: true,
    allowedHosts: true,
  },
})
