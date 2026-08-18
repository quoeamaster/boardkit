import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // [lesson] set the base folder for the app in production
  // e.g. default is '/' which would end up /assets/index-xxx.js
  // but in case you are hosting the app under /app; the it would end up /app/assets/index-xxx.js instead.
  base: '/app/',
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
    port: 3838,
    strictPort: true,
  },
})
