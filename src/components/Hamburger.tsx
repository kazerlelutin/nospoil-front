import { LS_KEYS } from '@/utils/constants'
import { JSX } from 'preact/jsx-runtime'

/**
 * @description
 *
 * Hamburger button to toggle menu
 *
 * ---
 *
 * @example ```tsx
 * <Hamburger />
 * ```
 *
 * ---
 * @see {@link [Tests](../../__tests__/Hamburger.test.tsx)}
 *
 * @returns {JSX.Element} Hamburger button
 */
export function Hamburger(): JSX.Element {
  const handleClick = () => {
    const main = document.querySelector('main')

    const isOpen = main?.getAttribute('data-menu') === 'true'
    const strOpen = String(!isOpen)
    main?.setAttribute('data-menu', strOpen)
    localStorage.setItem(LS_KEYS.MENU_OPEN, strOpen)
  }

  return (
    <button
      className="cursor-pointer bg-light-bg dark:bg-dark-bg p-1 outline-none border-none flex flex-col gap-1"
      onClick={handleClick}
      aria-label="Menu"
    >
      <div className="w-6 h-1 bg-light-text dark:bg-dark-text" />
      <div className="w-6 h-1 bg-light-text dark:bg-dark-text" />
      <div className="w-6 h-1 bg-light-text dark:bg-dark-text" />
    </button>
  )
}
