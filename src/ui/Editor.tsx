import EditorJS from '@editorjs/editorjs'
import underline from '@editorjs/underline'
import delimiter from '@editorjs/delimiter'
import Header from '@editorjs/header'
import { useId } from 'preact/hooks'

export function Editor({ id: _id }) {
  const id = _id || useId()

  const editor = new EditorJS({
    /**
     * Id of Element that should contain Editor instance
     */
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
  })

  return <div id={id}></div>
}
