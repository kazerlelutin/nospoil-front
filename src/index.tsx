import {
  LocationProvider,
  Router,
  Route,
  hydrate,
  prerender as ssr,
} from 'preact-iso'

import { Home } from './pages/Home/index.jsx'
import { NotFound } from './pages/_404.jsx'
import { Search } from './pages/Search/index.js'
import { Login } from './pages/Auth/index.js'
import '@unocss/reset/normalize.css'
import 'virtual:uno.css'
import './style.css'
import { MainLayout } from './components/MainLayout.js'

export function App() {
  return (
    <LocationProvider>
      <MainLayout>
        <Router>
          {/* PUBLIC*/}
          <Route path="/login" component={Login} />

          {/* AUTH */}
          <Route path="/" component={Home} />
          <Route path="/search" component={Search} />
          <Route default component={NotFound} />
        </Router>
      </MainLayout>
    </LocationProvider>
  )
}

if (typeof window !== 'undefined') {
  hydrate(<App />, document.getElementById('app'))
}

export async function prerender(data) {
  return await ssr(<App {...data} />)
}
