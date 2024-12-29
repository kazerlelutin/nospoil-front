import { useId, useMemo } from 'preact/hooks'
import EditorJS from '@editorjs/editorjs'
import underline from '@editorjs/underline'
import delimiter from '@editorjs/delimiter'
import Header from '@editorjs/header'

type UseEditorReadOnlyProps = {
  blocks: string
  id: string
}

export function useEditorReadOnly({ blocks, id: _id }: UseEditorReadOnlyProps) {
  const id = _id || useId()

  const editorId = useMemo(() => {
    new EditorJS({
      readOnly: true,
      //@ts-ignore
      data: {
        blocks: JSON.parse(blocks || '[]'),
      },

      tools: {
        // --- BLOCKS ---
        header: {
          class: Header,
          config: {
            placeholder: 'Enter a header',
            levels: [2, 3, 4],
            defaultLevel: 2,
          },
        },
        delimiter,
        // --- INLINE ---
        underline,
      },
      holder: id,
      minHeight: 0,
    })
    return id
  }, [blocks])

  return editorId
}
