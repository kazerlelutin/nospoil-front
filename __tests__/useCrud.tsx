import { renderHook } from '@testing-library/preact'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { afterAll, afterEach, beforeAll, expect, test } from 'vitest'
import { CrudProvider } from '@/providers/crud'
import { useCrud } from '@/hooks/useCrud'

interface TestEntity {
  id: number
  name: string
}

const server = setupServer(
  http.get('/api/test', () => {
    return HttpResponse.json([{ id: 1, name: 'Test Entity' }])
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const wrapper = ({ children }: any) => (
  <CrudProvider<TestEntity>
    name="test"
    crud={{
      getList: {
        data: [],
        loading: false,
        error: null,
        action: async () => {
          return []
        },
      },
      getItem: {
        data: null,
        loading: false,
        error: null,
        action: async () => {
          return null
        },
      },
      create: {
        data: null,
        loading: false,
        error: null,
        action: async () => {
          return null
        },
      },
      update: {
        data: null,
        loading: false,
        error: null,
        action: async () => {
          return null
        },
      },
      delete: {
        data: null,
        loading: false,
        error: null,
        action: async () => {
          return null
        },
      },
    }}
  >
    {children}
  </CrudProvider>
)

const crudActions = ['getList', 'getItem', 'create', 'update', 'delete'] as const

test.each(crudActions)('useCrud retourne l\'action %s', (action) => {
  const { result } = renderHook(() => useCrud<TestEntity>('test'), { wrapper })
  expect(result.current).toHaveProperty(action)
})
