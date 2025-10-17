import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import singlefile from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [react(), singlefile()],
  server: {
    port: 3000,
    host: true
  },
  build: {
    target: 'es2018',
    outDir: 'dist',
    assetsInlineLimit: 100000000,
    cssCodeSplit: false,
  },
})
