/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    exclude: ['e2e/*'],
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}']
  }
})
