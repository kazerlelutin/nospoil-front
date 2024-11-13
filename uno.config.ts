import { defineConfig, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        Hahmlet: ['200', '400', '500', '600', '700', '900'],
      },
    }),
  ],
  rules: [
    //exemple
    //['m-1', { margin: '1px' }]
  ],
  theme: {
    colors: {
      dark: {
        bg: '#000000',
        text: '#adacaa',
      },
      light: {
        bg: '#ffffff',
        text: '#000000',
      },
      sepia: {
        100: '#c09771',
        200: '#a87f5a',
        300: '#956f4c',
        400: '#6f4b2c',
        500: '#301d0d',
        grey_one: '#ffffff',
        grey_two: '#bcb9b9',
        grey_three: '#908e8e',
        grey_four: '#000000',
        blood_one: '#9a1313',
        blood_two: '#570808',
      },
      tag: {
        unknown: 'var(--color-unknown)',
        recognized: 'var(--color-recognized)',
        known: 'var(--color-known)',
        learning: 'var(--color-learning)',
      },
    },
  },
})
