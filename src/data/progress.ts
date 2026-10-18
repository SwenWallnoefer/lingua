/**
 * Demo progress until real tracking is built (Zustand store for XP, streak and completed lessons).
 * The home screen reads from here, so swapping in a store later only touches one place.
 */
export const dailyGoalXp = 20

export const demoProgress = {
  todayXp: 15,
  streak: 12,
  /** Lessons the learner already finished. The first lesson not in this list is "current". */
  completedLessonIds: ['es-basics-greetings', 'es-basics-introductions'],
  /** Which of today's plan items are done. */
  todayDone: ['lesson'] as string[],
}
