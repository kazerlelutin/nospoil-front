import { Hamburger } from './Hamburger'
import { JSX } from 'preact/jsx-runtime'
import { Logo } from '@/components/Logo'
import { i18n } from '@/utils/i18n'

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
      <a
        href="https://ko-fi.com/kazerlelutin"
        target="_blank"
        rel="noreferrer"
        aria-description={i18n.t('buyMeACoffee')}
        class="no-underline  flex gap-2 items-center text-sm"
      >
        {i18n.t('buyMeACoffee')}
        <img
          src="/kofi_logo.svg"
          alt="NoSpoil"
          class="h-[20px] w-[25px]"
          width={25}
          height={20}
        />
      </a>
    </header>
  )
}
