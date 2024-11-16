import { useLocation } from 'preact-iso'
import { Header } from './Header'
import { Menu } from './Menu'

export function MainLayout({ children }) {
  const { path } = useLocation()

  if (path === '/login') {
    return children
  }

  return (
    <div className="grid grid-rows-[auto_1fr] text-light-text dark:text-dark-text dark:bg-dark-bg bg-light-bg h-lvh">
      <Header />
      <div className="text-light-text dark:text-dark-text dark:bg-dark-bg bg-light-bg h-full relative">
        <main className="relative h-full">
          <div className="absolute inset-0 md:w-lg m-auto h-full grid grid-rows-[auto_1fr] gap-3 p-4 md:p-0">
            {children}
          </div>
        </main>
        <div className="absolute left-0 bottom-0 top-0">
          <Menu />
        </div>
      </div>
    </div>
  )
}
