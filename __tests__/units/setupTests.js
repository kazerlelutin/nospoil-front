import '@testing-library/jest-dom'
import 'vitest-axe/extend-expect'
import * as matchers from 'vitest-axe/matchers'
import { expect, afterAll, afterEach, beforeAll, vi } from 'vitest'
import { setupServer } from 'msw/node'
import { handlers } from './mocks/handler'
import { cleanup } from '@testing-library/preact'

expect.extend(matchers)

process.env.TZ = 'Etc/UTC'

export function createFetchResponse(data) {
  return { json: () => new Promise((resolve) => resolve(data)) }
}

// Configurez le serveur avec les handlers
export const server = setupServer(...handlers)

vi.mock('preact-iso', async (importOriginal) => {
  const mod = await importOriginal()

  return {
    //@ts-ignore
    ...mod,
    lazy: (loader) => {
      const Component = loader
      return () => <Component />
    },
  }
})

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  vi.clearAllMocks()
  cleanup()
})
afterAll(() => server.close())
