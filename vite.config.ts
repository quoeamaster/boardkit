import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // alias for the src directory
      // this allows us to use @ in the src directory
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // set the port to 3000 when vite server is running
    port: 3000,
    strictPort: true,
  },
})
