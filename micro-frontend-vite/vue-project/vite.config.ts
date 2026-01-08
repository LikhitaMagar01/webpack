import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  define: {
    __REACT_URL__: JSON.stringify(process.env.REACT_URL || 'http://localhost:5173'),
  },
  server: {
    port: 5174,
    proxy: {
      '/react-app.js': {
        target: process.env.REACT_PREVIEW_URL || 'http://localhost:4173',
        changeOrigin: true
      }
    }
  },
})
