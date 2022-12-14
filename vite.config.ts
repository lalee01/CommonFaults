import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host:'192.168.0.112',
  },
  resolve:{
    alias:{
      '@src' : path.resolve(__dirname, './src')
    },
  },
})
