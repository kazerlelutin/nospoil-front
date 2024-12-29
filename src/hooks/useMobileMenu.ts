import { useEffect } from 'preact/hooks'

export function useMobileMenu() {
  const handleClick = () => {
    document.querySelector('[data-menu]')?.setAttribute('data-menu', 'false')
  }

  useEffect(() => {
    const menu = document.querySelector('[data-menu]')
    if (menu) {
      menu.addEventListener('click', handleClick)
    }
    return () => {
      if (menu) {
        menu.removeEventListener('click', handleClick)
      }
    }
  }, [])

  return handleClick
}
