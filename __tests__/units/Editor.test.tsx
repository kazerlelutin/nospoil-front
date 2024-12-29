import { render } from '@testing-library/preact'
import { Editor } from '@/components/Editor'
import { describe, it, expect, vi } from 'vitest'
import EditorJS from '@editorjs/editorjs'

// Mock EditorJS
vi.mock('@editorjs/editorjs', () => {
  return {
    default: vi.fn().mockImplementation(() => {
      return {
        destroy: vi.fn(),
        save: vi.fn().mockResolvedValue({ blocks: [] }),
        onChange: vi.fn(),
      }
    }),
  }
})

describe('Editor', () => {
  it('should render the editor container with the correct id', () => {
    const { container } = render(<Editor id="test-editor" />)
    const editorDiv = container.querySelector('#test-editor')
    expect(editorDiv).toBeInTheDocument()
  })

  it('should call useEditor with the correct parameters', () => {
    const placeholder = 'Enter text here...'
    const initialValue = JSON.stringify([
      { type: 'paragraph', data: { text: 'Hello' } },
    ])
    const onChange = vi.fn()

    render(
      <Editor
        id="test-editor"
        placeholder={placeholder}
        initialValue={initialValue}
        onChange={onChange}
      />
    )

    expect(EditorJS).toHaveBeenCalledWith(
      expect.objectContaining({
        placeholder,
        data: { blocks: JSON.parse(initialValue) },
        holder: 'test-editor',
      })
    )
  })
})
