import { useEffect } from 'preact/hooks'
import EditorJS from '@editorjs/editorjs'

type UseEditorProps = {
  id: string
  placeholder?: string
  initialValue?: string
  onChange?: (data: any) => void
}

export function useEditor({
  id,
  placeholder = '',
  initialValue,
  onChange,
}: UseEditorProps) {
  useEffect(() => {
    const editor = new EditorJS({
      autofocus: true,
      placeholder,
      data: {
        blocks: JSON.parse(initialValue || '[]'),
      },
      holder: id,
      onChange: async () => {
        try {
          const outputData = await editor.save()
          onChange?.(outputData.blocks)
        } catch (error) {
          console.error('Saving failed:', error)
        }
      },
    })

    return () => {
      editor.destroy()
    }
  }, [id, placeholder, initialValue, onChange])
}
