import { fileURLToPath, URL } from 'node:url'
// [lesson] vite's defineConfig does not work with vitest, so we need to use vitest's defineConfig
//import { defineConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
// [lesson] @/ aliases in resolve.alias / tsconfig.app.json apply to the app bundle,
// not to this config file. Vite loads vite.config.ts before those aliases exist.
import MockQueryService from './src/api/query/mockQueryService.ts'

// https://vite.dev/config/
export default defineConfig({
  // [lesson] set the base folder for the app in production
  // e.g. default is '/' which would end up /assets/index-xxx.js
  // but in case you are hosting the app under /app; the it would end up /app/assets/index-xxx.js instead.
  base: '/app/',
  plugins: [
    vue(),
    tailwindcss(),
    {
      name: 'mock-query-service',
      configureServer(server) {
        const mockQueryService = new MockQueryService()
        // [test]
        // curl http://localhost:3838/api/query -X POST
        server.middlewares.use(`/api/query`, (req, res, next) => {
          if (req.method !== 'POST') {
            next()
            return
          }

          void mockQueryService
            .executeQuery({ query: '' })
            .then((result) => {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(result))
            })
            .catch(next)
        })
      },
    },
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
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
