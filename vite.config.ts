import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { copyFileSync, cpSync } from 'fs'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-assets',
      closeBundle() {
        // Copy core folder
        cpSync('www/core', 'www/dist/core', { recursive: true })
        // Copy other necessary files
        copyFileSync('www/sw.js', 'www/dist/sw.js')
        copyFileSync('www/app.js', 'www/dist/app.js')
      },
    },
  ],
  base: './',
  root: 'www',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './www/app'),
    },
  },
  server: {
    open: true,
  },
})
