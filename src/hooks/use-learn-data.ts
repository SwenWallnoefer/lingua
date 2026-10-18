import { getLanguage } from '@/data/languages'
import { lessons } from '@/data/lessons'
import { demoProgress } from '@/data/progress'
import { getUnitsByLanguage } from '@/data/units'
import { useLanguageStore } from '@/store/language-store'
import type { Lesson } from '@/types/learning'
import { useUser } from '@clerk/expo'

export type LessonStatus = 'completed' | 'in-progress' | 'not-started'

export type LearnLesson = {
  lesson: Lesson
  /** Position in the list, starting at 1. */
  number: number
  status: LessonStatus
}

/** Everything the Learn screen shows: the selected language and its lessons with their status. */
export function useLearnData() {
  const { user } = useUser()
  const selectedLanguage = useLanguageStore((state) =>
    user ? state.languagesByUser[user.id] : undefined,
  )

  const language = selectedLanguage ? getLanguage(selectedLanguage) : undefined
  if (!language) return null

  const languageLessons = lessons.filter(
    (lesson) => lesson.languageCode === language.code,
  )
  // Same rule as the home screen: the first lesson not finished yet is the current one.
  const current =
    languageLessons.find(
      (lesson) => !demoProgress.completedLessonIds.includes(lesson.id),
    ) ?? languageLessons[0]

  if (!current) return { language, current: undefined }

  const items: LearnLesson[] = languageLessons.map((lesson, index) => ({
    lesson,
    number: index + 1,
    status: demoProgress.completedLessonIds.includes(lesson.id)
      ? 'completed'
      : lesson.id === current.id
        ? 'in-progress'
        : 'not-started',
  }))

  const unitNumber =
    getUnitsByLanguage(language.code).findIndex(
      (unit) => unit.id === current.unitId,
    ) + 1

  return { language, current, unitNumber, items }
}
