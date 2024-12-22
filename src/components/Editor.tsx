import EditorJS from '@editorjs/editorjs'
import underline from '@editorjs/underline'
import delimiter from '@editorjs/delimiter'
import Header from '@editorjs/header'
import { useId, useMemo } from 'preact/hooks'

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

  const editorId = useMemo(() => {
    const ed = new EditorJS({
      /**
       * Id of Element that should contain Editor instance
       */
      autofocus: true,
      placeholder,
      data: {
        blocks: JSON.parse(initialValue || '[]'),
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
      onChange: () => {
        ed.save()
          .then((outputData) => {
            onChange?.(outputData.blocks)
          })
          .catch((error) => {
            console.log('Saving failed: ', error)
          })
      },
    })
    return id
  }, [])

  return <div id={editorId}></div>
}
