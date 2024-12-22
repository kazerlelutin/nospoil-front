import EditorJS from '@editorjs/editorjs'
import underline from '@editorjs/underline'
import delimiter from '@editorjs/delimiter'
import Header from '@editorjs/header'
import { useId, useMemo } from 'preact/hooks'

type EditorProps = {
  blocks: string
  id?: string
}

export function EditorRead({ blocks, id: _id }: EditorProps) {
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

        // TextSpolier,
      },
      holder: id,
      minHeight: 0,
    })
    return id
  }, [blocks])

  return <div id={editorId}></div>
}
