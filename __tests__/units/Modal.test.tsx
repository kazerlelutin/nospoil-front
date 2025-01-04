import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { Modal } from '@/components/Modal'
import { describe, it, expect, vi } from 'vitest'

describe('Modal', () => {
  it('should render the button to open the modal', () => {
    render(
      <Modal
        button={(open) => <button onClick={open}>Open Modal</button>}
        children={() => <div>Modal Content</div>}
      />
    )

    expect(screen.getByText('Open Modal')).toBeInTheDocument()
  })

  it('should open the modal when the button is clicked', () => {
    render(
      <Modal
        button={(open) => <button onClick={open}>Open Modal</button>}
        children={() => <div>Modal Content</div>}
      />
    )

    fireEvent.click(screen.getByText('Open Modal'))
    expect(screen.getByText('Modal Content')).toBeInTheDocument()
  })

  it('should close the modal when close function is called', () => {
    render(
      <Modal
        defaultOpen={true}
        button={(open) => <button onClick={open}>Open Modal</button>}
        children={(close) => (
          <div>
            Modal Content
            <button onClick={() => close()}>Close Modal</button>
          </div>
        )}
      />
    )

    expect(screen.getByText('Modal Content')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Close Modal'))
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument()
  })

  it('should call the callback function when close function is called', async () => {
    const callback = vi.fn()

    render(
      <Modal
        defaultOpen={true}
        button={(open) => <button onClick={open}>Open Modal</button>}
        children={(close) => (
          <div>
            Modal Content
            <button onClick={() => close(callback)}>Close Modal</button>
          </div>
        )}
      />
    )

    expect(screen.getByText('Modal Content')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Close Modal'))
    await waitFor(() => {
      expect(callback).toHaveBeenCalled()
      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument()
    })
  })
})
