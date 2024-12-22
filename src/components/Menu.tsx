import { i18n } from '@/utils/i18n'

const links = [
  { href: '/', label: 'home' },
  // { href: '/notif', label: 'notifications' },
  //{ href: '/settings', label: 'settings' },
  // { href: '/profile', label: 'profile' },
]

export function Menu() {
  //reset mobile menu
  const handleClick = () => {
    document.querySelector('[data-menu]')?.setAttribute('data-menu', 'false')
  }

  return (
    <nav
      data-menu="false"
      className="md:w-[150px] md:data-[menu=true]:w-[150px] md:data-[menu=false]:w-[150px] h-full p-4 md:flex hidden flex-col gap-6 md:data-[menu=true]:flex data-[menu=true]:flex md:data-[menu=false]:flex data-[menu=false]:hidden data-[menu=true]:bg-dark-bg data-[menu=true]:w-[100dvw] data-[menu=true]:max-w-inherit"
    >
      <ul className="list-none p-0 flex flex-col gap-5 md:gap-3">
        {links.map(({ href, label }) => (
          <li key={href} className="">
            <a
              href={href}
              onClick={handleClick}
              className="text-light-text dark:text-dark-text dark:hover:text-dark-text hover:text-light-text no-underline"
            >
              {i18n.t(label)}
            </a>
          </li>
        ))}
        <div class="flex gap-2 items-center">
          {/* <img
            src="/kofi_logo.svg"
            class="object-contain"
            alt="Ko-fi logo"
            width={15}
            height={10}
          />*/}
          <a
            href="https://ko-fi.com/kazerlelutin"
            target="_blank"
            rel="noreferrer"
            aria-description={i18n.t('buyMeACoffee')}
            class="no-underline flex gap-2 items-center text-xs"
          >
            {i18n.t('buyMeACoffee')}
          </a>
        </div>
      </ul>
    </nav>
  )
}
