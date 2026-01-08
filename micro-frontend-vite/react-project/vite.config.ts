import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}
  },
  build: {
    lib: {
      entry: 'src/main.tsx',
      name: 'ReactApp',
      fileName: 'react-app',
      formats: ['es']
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  },
  server: {
    port: 5173,
  },
})
