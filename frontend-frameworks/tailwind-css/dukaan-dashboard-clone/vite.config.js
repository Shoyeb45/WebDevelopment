import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      '315d-2409-408a-489-6db9-5160-723d-69d0-5ce8.ngrok-free.app'
    ]
  }
})
