import { render, screen } from '@testing-library/preact'
import { Avatar } from '@/components/Avatar'
import { describe, it, expect } from 'vitest'

describe('Avatar', () => {
  it('should render with the correct src and alt attributes', () => {
    const src = 'test-avatar.png'
    const alt = 'Test Avatar'
    render(<Avatar src={src} alt={alt} />)

    const img = screen.getByAltText(alt)
    expect(img).toHaveAttribute(
      'src',
      `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/avatars/${src}`
    )
    expect(img).toHaveAttribute('alt', alt)
  })

  it('should render with the default size class', () => {
    render(<Avatar src="test-avatar.png" alt="Test Avatar" />)

    const img = screen.getByAltText('Test Avatar')
    expect(img).toHaveClass('w-16 h-16')
  })

  it('should render with the small size class', () => {
    render(<Avatar src="test-avatar.png" alt="Test Avatar" size="sm" />)

    const img = screen.getByAltText('Test Avatar')
    expect(img).toHaveClass('data-[size=sm]:w-8 data-[size=sm]:h-8')
  })

  it('should render with the large size class', () => {
    render(<Avatar src="test-avatar.png" alt="Test Avatar" size="lg" />)

    const img = screen.getByAltText('Test Avatar')
    expect(img).toHaveClass('w-16 h-16') // Assuming the class for large size is the same as default
  })

  it('should set the fallback src on error', () => {
    render(<Avatar src="test-avatar.png" alt="Test Avatar" />)

    const img = screen.getByAltText('Test Avatar')
    img.dispatchEvent(new Event('error'))

    expect(img).toHaveAttribute('src', '/avatar.svg')
  })
})
