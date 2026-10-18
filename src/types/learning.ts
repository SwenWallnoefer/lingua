/** Language codes the app can teach. Add a new code here when you add a language. */
export type LanguageCode = 'es' | 'fr' | 'ja' | 'ko' | 'de' | 'zh'

export type Language = {
  code: LanguageCode
  name: string
  nativeName: string
  /** Flag image URL shown on language cards. */
  flag: string
  /** Display-only learner count, e.g. '28.4M'. */
  learners: string
  /** Locale for speech, e.g. 'es-ES'. Used later by the audio lessons. */
  speechLocale: string
}

export type Unit = {
  id: string
  languageCode: LanguageCode
  title: string
  description: string
  emoji: string
}

/** A single word the learner studies. */
export type VocabularyItem = {
  id: string
  word: string
  translation: string
  /** Helps with scripts like Japanese, or tricky sounds. */
  pronunciation?: string
  emoji?: string
}

/** A short sentence the learner can say in real life. */
export type Phrase = {
  id: string
  text: string
  translation: string
  pronunciation?: string
}

type ActivityBase = {
  id: string
}

/** The teacher says the phrase, the learner repeats it. */
export type ListenAndRepeatActivity = ActivityBase & {
  type: 'listen-and-repeat'
  text: string
  translation: string
}

/** The learner picks the right answer. */
export type MultipleChoiceActivity = ActivityBase & {
  type: 'multiple-choice'
  question: string
  options: string[]
  correctAnswer: string
}

/** A short role-play with the AI teacher. */
export type ConversationActivity = ActivityBase & {
  type: 'conversation'
  scenario: string
  goal: string
}

export type Activity =
  | ListenAndRepeatActivity
  | MultipleChoiceActivity
  | ConversationActivity

/** What the AI teacher says and how it behaves in a Vision Agent audio lesson. */
export type TeacherPrompt = {
  /** First thing the teacher says when the lesson starts. */
  openingLine: string
  /** System instructions sent to the agent on the server. */
  instructions: string
}

export type LessonLevel = 'beginner' | 'intermediate'

export type Lesson = {
  id: string
  unitId: string
  languageCode: LanguageCode
  title: string
  description: string
  level: LessonLevel
  xpReward: number
  estimatedMinutes: number
  /** What the learner can do after finishing the lesson. */
  goals: string[]
  vocabulary: VocabularyItem[]
  phrases: Phrase[]
  activities: Activity[]
  teacherPrompt: TeacherPrompt
}
