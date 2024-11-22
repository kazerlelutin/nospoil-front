import {
  LocationProvider,
  Router,
  Route,
  hydrate,
  prerender as ssr,
} from 'preact-iso'

import { Home } from '@/pages/Home.jsx'
import { NotFound } from '@/pages/_404.jsx'
import { Search } from '@/pages/Search.js'
import { Login } from '@/pages/Auth.js'
import '@unocss/reset/normalize.css'
import 'virtual:uno.css'
import './style.css'
import { MainLayout } from './components/MainLayout.js'
import { AuthRoute } from './components/AuthRoute.js'
import { Media } from './pages/Media.js'

export function App() {
  return (
    <LocationProvider>
      <MainLayout>
        <Router>
          <Route path="/login" component={Login} />
          <AuthRoute path="/" component={Home} />
          <AuthRoute path="/media/:type/:id" component={Media} />

          <AuthRoute path="/search" component={Search} />

          <AuthRoute default component={NotFound} />
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
