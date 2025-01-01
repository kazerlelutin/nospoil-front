import {
  LocationProvider,
  Router,
  Route,
  hydrate,
  prerender as ssr,
} from 'preact-iso'

import { Home } from '@/pages/Home.jsx'
import { NotFound } from '@/pages/_404.jsx'
import { Login } from '@/pages/Auth.js'
import '@unocss/reset/normalize.css'
import 'virtual:uno.css'
import './style.css'
import dayjs from 'dayjs'
import { i18n } from './utils/i18n'

import 'dayjs/locale/en'
import 'dayjs/locale/ko'
import 'dayjs/locale/fr'

import duration from 'dayjs/plugin/duration'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { Watchlist } from './pages/Watchlist'
import { MainLayout } from './components/MainLayout'
import { AuthRoute } from './components/AuthRoute'
import { Media } from './pages/Media'

dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.extend(LocalizedFormat)
dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.locale(i18n.language.split('-')[0])

export function App() {
  return (
    <LocationProvider>
      <MainLayout>
        <Router>
          <Route path="/login" component={Login} />
          <AuthRoute path="/" component={Home} />
          <AuthRoute path="/media/:type/:id" component={Media} />
          <AuthRoute path="/watchlist/:user_id" component={Watchlist} />

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
