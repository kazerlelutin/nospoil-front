import { useEditorReadOnly } from '@/hooks/useEditorReadOnly'

type EditorProps = {
  blocks: string
  id?: string
}

export function EditorReadOnly({ blocks, id }: EditorProps) {
  const editorId = useEditorReadOnly({ blocks, id })
  return <div id={editorId}></div>
}
