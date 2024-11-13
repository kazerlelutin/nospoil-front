import fc from 'fast-check'
import { renderHook, waitFor } from '@testing-library/preact'

import { describe, expect, it } from 'vitest'
import { CrudProvider } from '@/providers/crud'
import { useCrud } from '@/hooks/useCrud'
import { BASE_CRUD } from '@/utils/baseCrud'

describe('Property-Based Testing for CrudProvider and useCrud hook', () => {
  it('should handle multiple CRUD operations in a robust manner', () => {
    fc.assert(
      fc.property(
        // Définition de différentes séquences d'opérations CRUD
        fc.array(
          fc.record({
            type: fc.constantFrom('create', 'read', 'update', 'delete'),
            payload: fc.option(fc.string(), { nil: undefined }), // Génère des valeurs ou `undefined` pour tester différentes entrées
            id: fc.option(fc.string(), { nil: undefined }), // Pour les opérations `read`, `update`, `delete`
          })
        ),
        (operations) => {
          const wrapper = ({ children }) => (
            <CrudProvider<{ id: string; name: '' }>
              crud={{
                getItem: {
                  data: { id: '', name: '' },
                  loading: false,
                  error: null,
                  action: async () => {
                    return { id: '', name: '' }
                  },
                },
                create: {
                  data: { id: '', name: '' },
                  loading: false,
                  error: null,
                  action: async () => {
                    return { id: '', name: '' }
                  },
                },
                update: {
                  data: { id: '', name: '' },
                  loading: false,
                  error: null,
                  action: async () => {
                    return { id: '', name: '' }
                  },
                },
                delete: {
                  data: null,
                  loading: false,
                  error: null,
                  action: async () => {},
                },
                getList: {
                  data: [{ id: '', name: '' }],
                  loading: false,
                  error: null,
                  action: async () => {
                    return [{ id: '', name: '' }]
                  },
                },
              }}
              name="test-crud"
            >
              {children}
            </CrudProvider>
          )

          const { result } = renderHook(
            () => useCrud<{ id: string; name: string }>('test-crud'),
            { wrapper }
          )

          operations.forEach((operation) => {
            waitFor(() => {
              const { type, payload, id } = operation

              switch (type) {
                case 'create':
                  result.current.create.action(payload)
                  break
                case 'read':
                  result.current.getItem.action(id)
                  break
                case 'update':
                  if (id !== undefined && payload !== undefined) {
                    result.current.update.action({
                      id,
                      data: payload,
                    })
                  }
                  break
                case 'delete':
                  if (id !== undefined) {
                    result.current.delete.action(id)
                  }
                  break
              }
              // Vérifier des propriétés de cohérence
              // Par exemple, s'assurer que `read` renvoie quelque chose après `create`
              if (type === 'create' && payload !== undefined) {
                const createdItem = result.current.getItem.action(payload)
                expect(createdItem).toBeDefined()
              }
            })
          })
        }
      ),
      {
        numRuns: 100,
      }
    )
  })

  it('A undefined Action should throw an error', () => {
    const wrapper = ({ children }) => (
      <CrudProvider<{ id: string; name: '' }>
        crud={{
          getItem: {
            data: { id: '', name: '' },
            loading: false,
            error: null,
            action: async () => {
              return { id: '', name: '' }
            },
          },

          update: {
            data: { id: '', name: '' },
            loading: false,
            error: null,
            action: async () => {
              return { id: '', name: '' }
            },
          },
          delete: {
            data: null,
            loading: false,
            error: null,
            action: async () => {},
          },
          getList: {
            data: [{ id: '', name: '' }],
            loading: false,
            error: null,
            action: async () => {
              return [{ id: '', name: '' }]
            },
          },
        }}
        name="test-crud"
      >
        {children}
      </CrudProvider>
    )

    renderHook(() => useCrud<{ id: string; name: string }>('test-crud'), {
      wrapper,
    })
  })

  it('should throw an error if not used within the correct Provider context', () => {
    const wrapper = ({ children }) => (
      <CrudProvider<{ id: number; name: string }>
        crud={BASE_CRUD}
        name="test-crud"
      >
        {children}
      </CrudProvider>
    )

    try {
      const { result } = renderHook(
        () => useCrud<{ id: string; name: string }>('test-not-crud'),
        { wrapper }
      )
      result.current
    } catch (e) {
      expect(e).toEqual(
        new Error(
          'useCrud must be used within a Provider for context named test-not-crud'
        )
      )
    }
  })

  it('should throw an error when calling a non-implemented action', async () => {
    const wrapper = ({ children }) => (
      <CrudProvider<{ id: number; name: string }>
        crud={BASE_CRUD}
        name="test-crud"
      >
        {children}
      </CrudProvider>
    )

    const { result } = renderHook(
      () => useCrud<{ id: string; name: string }>('test-crud'),
      { wrapper }
    )

    await expect(result.current.create.action({})).rejects.toThrow(
      'Not implemented'
    )
  })

  it('should throw an error when calling a non-implemented action', async () => {
    const wrapper = ({ children }) => (
      <CrudProvider<{ id: number; name: string }>
        crud={{
          getItem: {
            data: { id: 1, name: 'test-name' },
            loading: false,
            error: null,
            action: async () => {
              return { id: 1, name: 'test-name' }
            },
          },
        }}
        name="test-crud"
      >
        {children}
      </CrudProvider>
    )

    const { result } = renderHook(
      () => useCrud<{ id: string; name: string }>('test-crud'),
      { wrapper }
    )
    expect(await result.current.getItem.action(3)).toEqual({
      id: 1,
      name: 'test-name',
    })
  })
})
