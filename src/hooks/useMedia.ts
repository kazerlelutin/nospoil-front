import { MediaCtx } from '@/providers/media'
import { useContext } from 'preact/hooks'

export function useMedia() {
  const ctx = useContext(MediaCtx)
  return ctx
}
