import type { LanguageCode, Unit } from '@/types/learning'

/** Units are listed in learning order. */
export const units: Unit[] = [
  {
    id: 'es-basics',
    languageCode: 'es',
    title: 'Basics',
    description: 'Greet people and introduce yourself',
    emoji: '👋',
  },
  {
    id: 'es-food',
    languageCode: 'es',
    title: 'Food & Drink',
    description: 'Order something at a café',
    emoji: '☕',
  },
  {
    id: 'fr-basics',
    languageCode: 'fr',
    title: 'Basics',
    description: 'Greet people and introduce yourself',
    emoji: '👋',
  },
  {
    id: 'ja-basics',
    languageCode: 'ja',
    title: 'Basics',
    description: 'Greet people and introduce yourself',
    emoji: '👋',
  },
]

export const getUnitsByLanguage = (languageCode: LanguageCode) =>
  units.filter((unit) => unit.languageCode === languageCode)
