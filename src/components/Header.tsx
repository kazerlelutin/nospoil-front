import { Hamburger } from './Hamburger'
import { JSX } from 'preact/jsx-runtime'
import { Logo } from '@/components/Logo'
import { i18n } from '@/utils/i18n'
import { Profile } from './Profile'

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
    <header class="flex gap-2 items-center px-2 justify-between">
      <div class="flex">
        <div class="md:hidden md:m-0 mr-2">
          <Hamburger />
        </div>
        <Logo />
      </div>
      <div class="flex items-center py-1">
        <Profile />
      </div>
    </header>
  )
}
