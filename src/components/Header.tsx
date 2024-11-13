import { Hamburger } from './Hamburger'
import { Breadcrumb } from './Breadcrumb'
import { JSX } from 'preact/jsx-runtime'
import { Logo } from '@/ui/Logo'

/**
 * @description
 *
 * Header component. Contains the Hamburger button and the Breadcrumb.
 *
 * ---
 *
 * @example ```tsx
 * <Header />
 * ```
 *
 * ---
 * @see {@link [Tests](../../__tests__/Header.test.tsx)}
 *
 * @returns {JSX.Element} Header component
 */
export function Header(): JSX.Element {
  return (
    <header class="flex gap-2 items-center px-2">
      <Logo />
    </header>
  )
}
