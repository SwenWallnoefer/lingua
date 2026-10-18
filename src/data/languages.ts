import type { Language, LanguageCode } from '@/types/learning'

/** Listed in the order shown on the language selection screen. */
export const languages: Language[] = [
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: 'https://flagcdn.com/w320/es.png',
    learners: '28.4M',
    speechLocale: 'es-ES',
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: 'https://flagcdn.com/w320/fr.png',
    learners: '19.4M',
    speechLocale: 'fr-FR',
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: 'https://flagcdn.com/w320/jp.png',
    learners: '12.7M',
    speechLocale: 'ja-JP',
  },
  // {
  //   code: 'ko',
  //   name: 'Korean',
  //   nativeName: '한국어',
  //   flag: 'https://flagcdn.com/w320/kr.png',
  //   learners: '9.3M',
  //   speechLocale: 'ko-KR',
  // },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: 'https://flagcdn.com/w320/de.png',
    learners: '8.1M',
    speechLocale: 'de-DE',
  },
  // {
  //   code: 'zh',
  //   name: 'Chinese',
  //   nativeName: '中文',
  //   flag: 'https://flagcdn.com/w320/cn.png',
  //   learners: '7.4M',
  //   speechLocale: 'zh-CN',
  // },
]

export const getLanguage = (code: LanguageCode) =>
  languages.find((language) => language.code === code)
