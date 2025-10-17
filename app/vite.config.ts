import { defineConfig } from 'vite'
import singlefile from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [singlefile()],
  build: {
    target: 'es2018',
    outDir: 'dist',
    assetsInlineLimit: 100000000,
    cssCodeSplit: false,
  },
})
