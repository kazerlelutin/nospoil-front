import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { Profile } from '@/components/Profile'
import { describe, it, expect, vi } from 'vitest'
import { useProfile } from '@/hooks/useProfile'

// Mock des dépendances
vi.mock('@/utils/i18n', () => ({
  i18n: {
    t: vi.fn((key) => key),
  },
}))

vi.mock('@/hooks/useProfile', () => ({
  useProfile: vi.fn(),
}))

describe('Profile', () => {
  it('should render profile button', () => {
    //@ts-ignore
    useProfile.mockReturnValue({
      isInit: true,
      profile: { username: 'testuser', avatar: 'avatar.png' },
      avatarRef: { current: null },
      canvasRef: { current: null },
      alreadyExist: false,
      setProfile: vi.fn(),
      updateAvatar: vi.fn(),
      updateProfile: vi.fn(),
    })

    render(<Profile />)
    expect(screen.getByText('testuser')).toBeInTheDocument()
  })

  it('should open the modal when button is clicked', async () => {
    const openMock = vi.fn((cb) => cb())
    //@ts-ignore
    useProfile.mockReturnValue({
      isInit: true,
      profile: { username: 'testuser', avatar: 'avatar.png' },
      avatarRef: { current: null },
      canvasRef: { current: null },
      alreadyExist: false,
      setProfile: vi.fn(),
      updateAvatar: vi.fn(),
      updateProfile: vi.fn(),
    })

    render(<Profile />)
    fireEvent.click(screen.getByText('testuser'))

    await waitFor(() => {
      expect(screen.getByText('profile')).toBeInTheDocument()
    })
  })

  it('should update profile when save button is clicked', async () => {
    const updateProfileMock = vi.fn()
    //@ts-ignore
    useProfile.mockReturnValue({
      isInit: true,
      profile: { username: 'testuser', avatar: 'avatar.png' },
      avatarRef: { current: null },
      canvasRef: { current: null },
      alreadyExist: false,
      setProfile: vi.fn(),
      updateAvatar: vi.fn(),
      updateProfile: updateProfileMock,
    })

    render(<Profile />)
    fireEvent.click(screen.getByText('testuser'))
    fireEvent.change(screen.getByPlaceholderText('username'), {
      target: { value: 'newuser' },
    })
    fireEvent.click(screen.getByText('save'))

    await waitFor(() => {
      expect(updateProfileMock).toHaveBeenCalled()
    })
  })

  it('should handle username already exists error', async () => {
    //@ts-ignore
    useProfile.mockReturnValue({
      isInit: true,
      profile: { username: 'testuser', avatar: 'avatar.png' },
      avatarRef: { current: null },
      canvasRef: { current: null },
      alreadyExist: true,
      setProfile: vi.fn(),
      updateAvatar: vi.fn(),
      updateProfile: vi.fn(),
    })

    render(<Profile />)
    fireEvent.click(screen.getByText('testuser'))

    await waitFor(() => {
      expect(screen.getByText('usernameAlreadyExists')).toBeInTheDocument()
    })
  })
})
