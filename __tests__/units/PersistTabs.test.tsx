import { render, screen, fireEvent } from '@testing-library/preact'
import { PersistTabs } from '@/components/PersistTabs'
import { describe, it, expect, vi } from 'vitest'

// Mock des dépendances
vi.mock('window', () => ({
  location: {
    hash: '',
  },
}))

describe('PersistTabs', () => {
  const tabs = [
    { id: 'tab1', title: 'Tab 1', content: <div>Content 1</div> },
    { id: 'tab2', title: 'Tab 2', content: <div>Content 2</div> },
  ]

  it('should render the default tab', () => {
    render(<PersistTabs tabs={tabs} defaultTab="tab1" />)
    expect(screen.getByText('Tab 1')).toBeInTheDocument()
    expect(screen.getByText('Content 1')).toBeInTheDocument()
  })

  it('should switch to the selected tab', () => {
    render(<PersistTabs tabs={tabs} defaultTab="tab1" />)
    fireEvent.click(screen.getByText('Tab 2'))
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  it('should render the tab based on the URL hash', () => {
    window.location.hash = '#tab2'
    render(<PersistTabs tabs={tabs} />)
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  it('should render the first tab if no hash or defaultTab is provided', () => {
    window.location.hash = ''
    render(<PersistTabs tabs={tabs} />)
    expect(screen.getByText('Tab 1')).toBeInTheDocument()
    expect(screen.getByText('Content 1')).toBeInTheDocument()
  })

  it('should render the default tab if hash is empty and defaultTab is provided', () => {
    window.location.hash = ''
    render(<PersistTabs tabs={tabs} defaultTab="tab2" />)
    expect(screen.getByText('Tab 2')).toBeInTheDocument()
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })
})
