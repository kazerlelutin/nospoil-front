import { JSX } from 'preact/jsx-runtime'

export function Hamburger(): JSX.Element {
  const handleClick = () => {
    const nav = document.querySelector('[data-menu]')

    const isOpen = nav?.getAttribute('data-menu') === 'true'
    const strOpen = String(!isOpen)
    nav?.setAttribute('data-menu', strOpen)
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
