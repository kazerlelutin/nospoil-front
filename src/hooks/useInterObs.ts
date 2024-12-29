import { InterObsContext } from '@/providers/interObs'
import { useContext } from 'preact/hooks'

export function useInterObs() {
  const ctx = useContext(InterObsContext)
  return ctx
}
