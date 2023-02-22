import { createI18n } from 'vue-i18n'

import en from '../lang/en.json'
import tw from '../lang/tw.json'

const i18n = createI18n({
  locale: 'tw',
  fallbackLocale: 'tw',
  legacy: false,
  messages: {
    tw,
    en
  }
})

export default i18n