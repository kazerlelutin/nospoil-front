import { i18n } from '@/utils/i18n'

const links = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'search' },
  { href: '/notif', label: 'notification' },
  { href: '/notif', label: 'movies' },
  { href: '/notif', label: 'series' },
]

export function Menu() {
  return (
    <nav className="max-w-[240px] p-4 flex flex-col gap-6">
      <ul className="list-none p-0 flex flex-col gap-2">
        {links.map(({ href, label }) => (
          <li key={href} className="">
            <a
              href={href}
              className="text-light-text dark:text-dark-text dark:hover:text-dark-text hover:text-light-text no-underline"
            >
              {i18n.t(label)}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-3 items-start">
        <button>Params</button>
        <button>profil</button>
        <button>Poster</button>
      </div>
    </nav>
  )
}
