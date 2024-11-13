import {
  LocationProvider,
  Router,
  Route,
  hydrate,
  prerender as ssr,
} from 'preact-iso'

import { Header } from './components/Header.jsx'
import { Home } from './pages/Home/index.jsx'
import { NotFound } from './pages/_404.jsx'
import '@unocss/reset/normalize.css'
import 'virtual:uno.css'
import './style.css'
import { Menu } from './components/Menu.js'

export function App() {
  return (
    <LocationProvider>
      <div className="grid grid-rows-[auto_1fr] text-light-text dark:text-dark-text dark:bg-dark-bg bg-light-bg h-lvh">
        <Header />
        <div className="text-light-text dark:text-dark-text dark:bg-dark-bg bg-light-bg h-full relative">
          <div className="absolute inset-0">
            <Menu />
          </div>
          <main className="relative h-full">
            <div className="absolute inset-0">
              <Router>
                <Route path="/" component={Home} />
                <Route default component={NotFound} />
              </Router>
            </div>
          </main>
        </div>
      </div>
    </LocationProvider>
  )
}

if (typeof window !== 'undefined') {
  hydrate(<App />, document.getElementById('app'))
}

export async function prerender(data) {
  return await ssr(<App {...data} />)
}
