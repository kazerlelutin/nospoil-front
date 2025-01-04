import { defineConfig, loadEnv } from 'vite'
import preact from '@preact/preset-vite'
import UnoCSS from 'unocss/vite'

import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    define: {
      'process.env': {
        ...env, //merge all env
      },
    },
    plugins: [
      UnoCSS(),
      tsconfigPaths(),
      preact({
        prerender: {
          enabled: true,
          renderTarget: '#app',
          additionalPrerenderRoutes: ['/404', '/login'],
          previewMiddlewareEnabled: true,
          previewMiddlewareFallback: '/404',
        },
      }),
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: new URL('./src', import.meta.url).pathname,
        },
      ],
    },
    //@ts-ignore
    test: {
      globals: true,
      pool: 'forks',
      environment: 'jsdom',
      setupFiles: ['./__tests__/units/setupTests.js'],
      exclude: ['node_modules', '__tests__/e2e', '__tests__/step-definitions'],
      server: {},
      coverage: {
        provider: 'istanbul',
        reporter: [
          ['text', { file: 'coverage.txt' }],
          ['text-summary', { file: 'coverage-summary.txt' }],
          'html',
        ],
        reportOnFailure: true,
        reportsDirectory: './coverage',
        include: ['src/'],
        exclude: ['node_modules/', '__tests__/', 'src/types/', 'src/index.tsx'],
      },
    },
  }
})
