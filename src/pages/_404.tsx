import { Spoiler } from '@/components/Spoiler'
import { i18n } from '@/utils/i18n'

export function NotFound() {
  return (
    <section>
      <h1>{i18n.t('404')}</h1>
      <Spoiler>
        <p class="p-3">{i18n.t('404_message')}</p>
      </Spoiler>
    </section>
  )
}
