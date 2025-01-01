import { render, screen, waitFor } from '@testing-library/preact'
import { InterObsProvider } from '@/providers/interObs'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { useInterObs } from '@/hooks/useInterObs'

// Mock IntersectionObserver
class IntersectionObserverMock {
  callback = null

  constructor(callback) {
    this.callback = callback
    //@ts-ignore
    IntersectionObserverMock.instances.push(this)
  }
  observe = vi.fn()
  disconnect = vi.fn()
  unobserve = vi.fn()
  triggerIntersecting(isIntersecting) {
    this.callback([{ isIntersecting }])
  }
}

//@ts-ignore
IntersectionObserverMock.instances = []

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

describe('InterObsProvider', () => {
  afterEach(() => {
    //@ts-ignore
    IntersectionObserverMock.instances = []
  })

  it('should provide the correct context value', () => {
    const TestComponent = () => {
      const interObs = useInterObs()
      return <div>{interObs ? 'Visible' : 'Not Visible'}</div>
    }

    render(
      <InterObsProvider>
        <TestComponent />
      </InterObsProvider>
    )

    // Initial state should be 'Not Visible'
    expect(screen.getByText('Not Visible')).toBeInTheDocument()

    // Simulate intersection
    //@ts-ignore
    const observerInstance = IntersectionObserverMock.instances[0]
    observerInstance.triggerIntersecting(true)

    waitFor(() => {
      // State should be 'Visible'
      expect(screen.getByText('Visible')).toBeInTheDocument()
    })
  })
})
