import { useEditor } from '@/hooks/useEditor'
import { renderHook, waitFor } from '@testing-library/preact'
import { describe, it, expect, vi } from 'vitest'
import EditorJS from '@editorjs/editorjs'

// Mock EditorJS
vi.mock('@editorjs/editorjs', () => {
  return {
    default: vi.fn().mockImplementation((config) => {
      const editorInstance = {
        save: vi.fn().mockResolvedValue({ blocks: [] }),
        destroy: vi.fn(),
        triggerOnChange: async (data) => {
          if (config.onChange) {
            await config.onChange(data.blocks)
          }
        },
      }
      return editorInstance
    }),
  }
})

describe('useEditor', () => {
  it('should initialize EditorJS correctly', () => {
    const placeholder = 'Salut'
    const initialValue = JSON.stringify([
      { type: 'paragraph', data: { text: 'Hello' } },
    ])
    const onChange = vi.fn()

    renderHook(() =>
      useEditor({ id: 'test-editor', placeholder, initialValue, onChange })
    )

    expect(EditorJS).toHaveBeenCalledWith(
      expect.objectContaining({
        placeholder,
        data: { blocks: JSON.parse(initialValue) },
        holder: 'test-editor',
      })
    )
  })

  it('should call onChange when content changes', async () => {
    const onChange = vi.fn()

    // Render the hook
    renderHook(() => useEditor({ id: 'test-editor', onChange }))

    // Get the instance of EditorJS
    //@ts-ignore
    const editorInstance = EditorJS.mock.results[0].value
    // Simulate a content change
    const newContent = {
      blocks: [{ type: 'paragraph', data: { text: 'Hello' } }],
    }

    editorInstance.save.mockResolvedValue(newContent)
    editorInstance.triggerOnChange(newContent)

    // Wait for onChange to be called
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith([
        { type: 'paragraph', data: { text: 'Hello' } },
      ])
    })
  })

  it('should log an error if editor.save fails', async () => {
    // On se moque de console.error
    const spyError = vi.spyOn(console, 'error')

    // On rend le hook
    const onChange = vi.fn()
    renderHook(() => useEditor({ id: 'test-editor', onChange }))

    //@ts-ignore
    const editorInstance = EditorJS.mock.results[0].value
    editorInstance.save.mockReturnValue(
      Promise.reject(new Error('Failed to save'))
    )
    editorInstance.triggerOnChange({ blocks: [] })

    await waitFor(() => {
      expect(spyError).toHaveBeenCalledWith('Saving failed:', expect.any(Error))
    })
  })
})
