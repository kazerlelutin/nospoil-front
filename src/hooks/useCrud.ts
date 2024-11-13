// src/hooks/useCrud.tsx
import { useContext } from 'preact/hooks'
import { getOrCreateContext } from '@/utils/getOrCreateContext'
import { CrudActions } from '@/types/crud'

export function useCrud<T>(name: string): CrudActions<T> {
  const Ctx = getOrCreateContext(name)
  const ctx = useContext(Ctx)

  if (ctx === undefined || typeof ctx !== 'function') {
    throw new Error(
      `useCrud must be used within a Provider for context named ${name}`
    )
  }
  return ctx()
}
