import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Allow serving files from outside the project root (for artifact images)
      allow: [
        '.',
        '/Users/anoopshukla0122gmail.com/.gemini/antigravity-ide/brain/7cca71e7-09b4-4c3e-8170-318b8c25ec3a'
      ]
    }
  },
  resolve: {
    alias: {
      '@imgs': '/Users/anoopshukla0122gmail.com/.gemini/antigravity-ide/brain/7cca71e7-09b4-4c3e-8170-318b8c25ec3a'
    }
  }
})
