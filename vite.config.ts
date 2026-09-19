import { existsSync, mkdirSync, renameSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
// [lesson] vite's defineConfig does not work with vitest, so we need to use vitest's defineConfig
//import { defineConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import type { Connect, Plugin } from 'vite'
// [lesson] @/ aliases in resolve.alias / tsconfig.app.json apply to the app bundle,
// not to this config file. Vite loads vite.config.ts before those aliases exist.
import MockQueryService from './src/dashboard/api/query/mockQueryService.ts'

const APP_BASE = '/app/'
const MPA_APPS = ['dashboard', 'admin'] as const

function pathnameOf(url: string | undefined): string {
  if (!url) {
    return ''
  }
  return decodeURI(url.split('?')[0] ?? '')
}

function queryOf(url: string | undefined): string {
  if (!url || !url.includes('?')) {
    return ''
  }
  return `?${url.split('?')[1]}`
}

function isViteInternalPath(pathname: string): boolean {
  return (
    pathname.startsWith('/@') ||
    pathname.startsWith('/node_modules') ||
    pathname.includes('/@id/') ||
    pathname.includes('/@fs/')
  )
}

function isHistoryFallbackPath(pathname: string): boolean {
  const last = pathname.split('/').pop() ?? ''
  return last === '' || !last.includes('.')
}

function rewriteAppHtmlUrl(url: string | undefined, htmlRoot: 'src' | 'dist'): string | undefined {
  const pathname = pathnameOf(url)
  if (!pathname || isViteInternalPath(pathname)) {
    return undefined
  }

  const query = queryOf(url)

  for (const app of MPA_APPS) {
    const withBase = `${APP_BASE}${app}`
    const rewritten =
      htmlRoot === 'src'
        ? `${APP_BASE}src/${app}/index.html${query}`
        : `${withBase}/index.html${query}`
    if (
      pathname === withBase ||
      pathname === `${withBase}/` ||
      pathname === `${withBase}/index.html`
    ) {
      return rewritten
    }
    if (pathname.startsWith(`${withBase}/`) && isHistoryFallbackPath(pathname)) {
      return rewritten
    }
  }

  return undefined
}

function relocateBuiltAppHtml(outDir: string) {
  for (const app of MPA_APPS) {
    const from = path.join(outDir, 'src', app, 'index.html')
    const to = path.join(outDir, app, 'index.html')
    if (!existsSync(from)) {
      continue
    }
    mkdirSync(path.dirname(to), { recursive: true })
    renameSync(from, to)
  }

  const leftoverSrc = path.join(outDir, 'src')
  if (existsSync(leftoverSrc)) {
    rmSync(leftoverSrc, { recursive: true, force: true })
  }
}

function mpaAppHtmlPlugin(): Plugin {
  const rewriteMiddleware: Connect.NextHandleFunction = (req, _res, next) => {
    const rewritten = rewriteAppHtmlUrl(req.url, 'src')
    if (rewritten) {
      req.url = rewritten
    }
    next()
  }

  const previewRewriteMiddleware: Connect.NextHandleFunction = (req, _res, next) => {
    const rewritten = rewriteAppHtmlUrl(req.url, 'dist')
    if (rewritten) {
      req.url = rewritten
    }
    next()
  }

  return {
    name: 'mpa-app-html-paths',
    enforce: 'post',
    configureServer(server) {
      server.middlewares.use(rewriteMiddleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(previewRewriteMiddleware)
    },
    writeBundle(outputOptions) {
      const outDir = outputOptions.dir ?? fileURLToPath(new URL('./dist', import.meta.url))
      relocateBuiltAppHtml(outDir)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // [lesson] set the base folder for the app in production
  // e.g. default is '/' which would end up /assets/index-xxx.js
  // but in case you are hosting the app under /app; the it would end up /app/assets/index-xxx.js instead.
  base: APP_BASE,
  appType: 'mpa',
  input: {
    main: fileURLToPath(new URL('./index.html', import.meta.url)),
    dashboard: fileURLToPath(new URL('./src/dashboard/index.html', import.meta.url)),
    admin: fileURLToPath(new URL('./src/admin/index.html', import.meta.url)),
  },
  plugins: [
    vue(),
    tailwindcss(),
    mpaAppHtmlPlugin(),
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
    setupFiles: './src/dashboard/test/setup.ts',
  },
  resolve: {
    alias: {
      // alias for the dashboard app
      // this allows us to use @ in src/dashboard
      '@': fileURLToPath(new URL('./src/dashboard', import.meta.url)),
      '@admin': fileURLToPath(new URL('./src/admin', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
    },
  },
  server: {
    // set the port to 3000 when vite server is running
    port: 3838,
    strictPort: true,
  },
})
