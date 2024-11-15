import { JSX } from 'preact/jsx-runtime'

type ButtonProps = {
  children: JSX.Element | string
  onClick?: () => void
}

export function Button({ children, onClick, ...rest }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      {...rest}
      class="border-solid border-1 border-dark-text text-dark-text bg-dark-bg rounded-sm px-2 py-1 cursor-pointer hover:bg-dark-text hover:text-dark-bg"
    >
      {children}
    </button>
  )
}
