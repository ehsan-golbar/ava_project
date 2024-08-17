import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/ava_project/",
  server: {
    proxy: {
      '/api': {
        target: 'https://harf.roshan-ai.ir',  // Replace with your actual API base URL
        changeOrigin: true,  // Needed for virtual hosted sites
        secure: true,       // Set to true if you're using https
        // rewrite: (path) => path.replace(/^\/api/, ''),  // Remove /api prefix if needed
      },
    },
  },
})
