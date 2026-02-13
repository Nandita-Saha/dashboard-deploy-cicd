import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: true, // Listen on all local IPs
    port: 5173,
    watch: {
      usePolling: true, // Necessary for Docker on Windows/macOS to detect file changes
    },
    hmr: {
      clientPort: 80, // Map HMR websocket to port 80 (where the user is viewing the app)
    }
  }
})
