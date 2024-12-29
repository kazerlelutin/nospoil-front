import { render } from '@testing-library/preact'
import { describe, it, expect, vi } from 'vitest'
import EditorJS from '@editorjs/editorjs'
import { EditorReadOnly } from '@/components/EditorReadOnly'

// Mock EditorJS
vi.mock('@editorjs/editorjs', () => {
  return {
    default: vi.fn().mockImplementation(() => {
      return {
        destroy: vi.fn(),
      }
    }),
  }
})

describe('EditorReadOnly', () => {
  it('should render the editor container with the correct id', () => {
    const { container } = render(
      <EditorReadOnly blocks="[]" id="test-editor" />
    )
    const editorDiv = container.querySelector('#test-editor')
    expect(editorDiv).toBeInTheDocument()
  })

  it('should initialize EditorJS with the correct parameters', () => {
    const blocks = JSON.stringify([
      { type: 'paragraph', data: { text: 'Hello' } },
    ])
    render(<EditorReadOnly blocks={blocks} id="test-editor" />)

    expect(EditorJS).toHaveBeenCalledWith(
      expect.objectContaining({
        readOnly: true,
        data: { blocks: JSON.parse(blocks) },
        holder: 'test-editor',
        minHeight: 0,
      })
    )
  })
})
