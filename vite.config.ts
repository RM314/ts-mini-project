import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      '/iiif': {
        target: 'https://www.artic.edu/iiif/2',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/iiif/, ''),
      },
      '/artapi': {
        target: 'https://api.artic.edu',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/artapi/, ''),
      },
    },
  }
})
