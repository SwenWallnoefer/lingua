import { useUser } from '@clerk/expo'
import { getLanguage } from '@/data/languages'
import { lessons } from '@/data/lessons'
import { dailyGoalXp, demoProgress } from '@/data/progress'
import { getUnitsByLanguage } from '@/data/units'
import { useLanguageStore } from '@/store/language-store'
import type { LessonLevel } from '@/types/learning'

export type PlanItemId = 'lesson' | 'conversation' | 'words'

export type PlanItemData = {
  id: PlanItemId
  title: string
  subtitle: string
  done: boolean
}

const levelLabels: Record<LessonLevel, string> = {
  beginner: 'A1',
  intermediate: 'A2',
}

/** Everything the home screen shows: Clerk user, selected language, and the learning data. */
export function useHomeData() {
  const { user } = useUser()
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage)

  const language = selectedLanguage ? getLanguage(selectedLanguage) : undefined
  if (!language) return null

  const languageLessons = lessons.filter((lesson) => lesson.languageCode === language.code)
  const lesson =
    languageLessons.find((item) => !demoProgress.completedLessonIds.includes(item.id)) ??
    languageLessons[0]
  if (!lesson) return null

  const unitNumber = getUnitsByLanguage(language.code).findIndex((unit) => unit.id === lesson.unitId) + 1
  const conversation = lesson.activities.find((activity) => activity.type === 'conversation')
  const { todayDone } = demoProgress

  const plan: PlanItemData[] = [
    { id: 'lesson', title: 'Lesson', subtitle: lesson.title, done: todayDone.includes('lesson') },
    {
      id: 'conversation',
      title: 'AI Conversation',
      subtitle: conversation?.scenario ?? lesson.description,
      done: todayDone.includes('conversation'),
    },
    {
      id: 'words',
      title: 'New words',
      subtitle: `${lesson.vocabulary.length} words`,
      done: todayDone.includes('words'),
    },
  ]

  return {
    firstName: user?.firstName ?? user?.username ?? 'there',
    language,
    lesson,
    levelLabel: levelLabels[lesson.level],
    unitNumber,
    plan,
    streak: demoProgress.streak,
    todayXp: demoProgress.todayXp,
    dailyGoalXp,
  }
}
