import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import UnoCSS from 'unocss/vite'

import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS(),
    tsconfigPaths(),
    preact({
      prerender: {
        enabled: true,
        renderTarget: '#app',
        additionalPrerenderRoutes: ['/404'],
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
    setupFiles: ['./__tests__/setupTests.js'],
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
      exclude: ['node_modules/', '__tests__/'],
    },
  },
})
