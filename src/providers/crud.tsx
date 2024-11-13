import { getOrCreateContext } from '@/utils/getOrCreateContext'
import { CrudActions } from '@/types/crud'
import { JSX } from 'preact/jsx-runtime'
import { BASE_CRUD } from '@/utils/baseCrud'

interface CrudProviderProps<T> {
  name: string
  crud: Partial<CrudActions<T>>
  children: JSX.Element
}

/**
 * @description
 *
 * The `CrudProvider` component is a wrapper around the `Context.Provider` component. It provides the CRUD actions to the children components.
 *
 * @see {@link [Tests](../../__tests__/CrudProvider.test.tsx)}
 * @see {@link [CRUD Documentation](../../DOCS/crud.md)}
 * @see {@link CrudProviderProps }
 * @param {CrudProviderProps} { children, name, crud }
 * @returns {JSX.Element} The `Context.Provider` component
 */
export function CrudProvider<T>({
  children,
  name,
  crud,
}: CrudProviderProps<T>): JSX.Element {
  const Ctx = getOrCreateContext(name)
  return (
    <Ctx.Provider
      value={() =>
        Object.keys(BASE_CRUD).reduce((acc, obj) => {
          acc[obj] = {
            ...BASE_CRUD[obj],
            ...crud[obj],
          }
          return acc
        }, {})
      }
    >
      {children}
    </Ctx.Provider>
  )
}
