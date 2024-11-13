import { createContext } from 'preact'
import { Context } from 'preact'

const Contexts: { [key: string]: Context<any> } = {}

/**
 * @description
 * Use this function to get or create a context. It's useful when you want to use the same context in multiple components.
 * Actually, it's a wrapper around `preact`'s `createContext` function.
 * For more information, see the [CRUD Documentation](../../DOCS/crud.md).
 * @see {@link [TESTS](../../__tests__/useCrud.test.tsx)}
 * @param {String} name - The name of the context
 * @returns {Context} The context
 */
export function getOrCreateContext(name: string): Context<any> {
  if (!Contexts[name]) {
    Contexts[name] = createContext({})
  }
  return Contexts[name]
}
