import { useId } from 'preact/hooks'
import { useEditor } from '@/hooks/useEditor'

type EditorProps = {
  id?: string
  placeholder?: string
  onChange?: (data: any) => void
  initialValue?: any
}

export function Editor({
  id: _id,
  placeholder,
  initialValue = undefined,
  onChange,
}: EditorProps) {
  const id = _id || useId()

  useEditor({ id, placeholder, initialValue, onChange })

  return <div id={id}></div>
}
