import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import FR from '@/locales/fr.json'
import EN from '@/locales/en.json'
import KR from '@/locales/kr.json'

i18n.use(LanguageDetector).init({
  fallbackLng: 'en',
  debug: true,

  resources: {
    en: {
      translation: EN,
    },
    fr: {
      translation: FR,
    },
    kr: {
      translation: KR,
    },
  },
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
})

export { i18n }
