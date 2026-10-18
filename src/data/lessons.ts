import type { Lesson, TeacherPrompt } from '@/types/learning'

/** Rules every AI teacher follows. Each lesson adds its own plan on top. */
const teacherRules = `You are a friendly, patient voice teacher in a language learning app.
The learner is a complete beginner and is talking to you out loud.
- Speak mostly in English. Use the target language only for the words and phrases in the plan.
- Keep every reply to one or two short sentences.
- Teach one word or phrase at a time. Say it slowly, then ask the learner to repeat it.
- Praise good attempts. If the learner makes a mistake, gently say the correct version and let them try again.
- Never read the whole plan at once. Wait for the learner after every step.
- Stay on the lesson topic. At the end, congratulate the learner and recap what they learned.`

const createTeacherPrompt = (openingLine: string, lessonPlan: string): TeacherPrompt => ({
  openingLine,
  instructions: `${teacherRules}\n\nLesson plan:\n${lessonPlan}`,
})

/** Lessons are listed in learning order inside each unit. */
export const lessons: Lesson[] = [
  // ───────── Spanish · Basics ─────────
  {
    id: 'es-basics-greetings',
    unitId: 'es-basics',
    languageCode: 'es',
    title: 'Greetings',
    description: 'Say hello, goodbye and thank you',
    level: 'beginner',
    xpReward: 10,
    estimatedMinutes: 5,
    goals: ['Greet someone in Spanish', 'Say goodbye', 'Be polite with "por favor" and "gracias"'],
    vocabulary: [
      { id: 'es-hola', word: 'hola', translation: 'hello', pronunciation: 'OH-lah' },
      { id: 'es-adios', word: 'adiós', translation: 'goodbye', pronunciation: 'ah-DYOHS' },
      { id: 'es-por-favor', word: 'por favor', translation: 'please', pronunciation: 'por fah-VOR' },
      { id: 'es-gracias', word: 'gracias', translation: 'thank you', pronunciation: 'GRAH-syahs' },
    ],
    phrases: [
      { id: 'es-buenos-dias', text: 'Buenos días', translation: 'Good morning' },
      { id: 'es-como-estas', text: '¿Cómo estás?', translation: 'How are you?' },
      { id: 'es-muy-bien', text: 'Muy bien, gracias', translation: 'Very well, thank you' },
    ],
    activities: [
      { id: 'es-greetings-1', type: 'listen-and-repeat', text: 'Hola', translation: 'Hello' },
      {
        id: 'es-greetings-2',
        type: 'multiple-choice',
        question: 'How do you say "thank you" in Spanish?',
        options: ['hola', 'gracias', 'adiós'],
        correctAnswer: 'gracias',
      },
      {
        id: 'es-greetings-3',
        type: 'conversation',
        scenario: 'You meet a neighbor in the morning.',
        goal: 'Greet them, ask how they are and say goodbye.',
      },
    ],
    teacherPrompt: createTeacherPrompt(
      '¡Hola! I am your Spanish teacher. Today we learn how to say hello. Are you ready?',
      `1. Teach: hola, adiós, por favor, gracias (one at a time).
2. Teach the phrases: "Buenos días", "¿Cómo estás?", "Muy bien, gracias".
3. Role-play: you are a neighbor, greet the learner in the morning and let them answer.`,
    ),
  },
  {
    id: 'es-basics-introductions',
    unitId: 'es-basics',
    languageCode: 'es',
    title: 'Introductions',
    description: 'Tell people your name',
    level: 'beginner',
    xpReward: 15,
    estimatedMinutes: 6,
    goals: ['Say your name', 'Ask for someone\'s name', 'Say "nice to meet you"'],
    vocabulary: [
      { id: 'es-yo', word: 'yo', translation: 'I', pronunciation: 'yoh' },
      { id: 'es-tu', word: 'tú', translation: 'you', pronunciation: 'too' },
      { id: 'es-nombre', word: 'nombre', translation: 'name', pronunciation: 'NOM-breh' },
      { id: 'es-amigo', word: 'amigo', translation: 'friend', pronunciation: 'ah-MEE-goh' },
    ],
    phrases: [
      { id: 'es-me-llamo', text: 'Me llamo Maya', translation: 'My name is Maya' },
      { id: 'es-como-te-llamas', text: '¿Cómo te llamas?', translation: 'What is your name?' },
      { id: 'es-mucho-gusto', text: 'Mucho gusto', translation: 'Nice to meet you' },
    ],
    activities: [
      {
        id: 'es-intro-1',
        type: 'listen-and-repeat',
        text: 'Me llamo Maya',
        translation: 'My name is Maya',
      },
      {
        id: 'es-intro-2',
        type: 'multiple-choice',
        question: 'What does "¿Cómo te llamas?" mean?',
        options: ['How are you?', 'What is your name?', 'Where are you from?'],
        correctAnswer: 'What is your name?',
      },
      {
        id: 'es-intro-3',
        type: 'conversation',
        scenario: 'You meet a new friend at a party.',
        goal: 'Say your name, ask theirs and say it is nice to meet them.',
      },
    ],
    teacherPrompt: createTeacherPrompt(
      '¡Hola otra vez! Today we learn how to introduce ourselves. Ready to start?',
      `1. Teach: yo, tú, nombre, amigo (one at a time).
2. Teach the phrases: "Me llamo ...", "¿Cómo te llamas?", "Mucho gusto".
3. Role-play: you are a new friend at a party. Ask the learner's name and let them answer in Spanish.`,
    ),
  },

  // ───────── Spanish · Food & Drink ─────────
  {
    id: 'es-food-cafe',
    unitId: 'es-food',
    languageCode: 'es',
    title: 'At the Café',
    description: 'Order a drink and ask for the bill',
    level: 'beginner',
    xpReward: 15,
    estimatedMinutes: 6,
    goals: ['Name a few drinks and foods', 'Order politely', 'Ask for the bill'],
    vocabulary: [
      { id: 'es-agua', word: 'agua', translation: 'water', pronunciation: 'AH-gwah' },
      { id: 'es-cafe', word: 'café', translation: 'coffee', pronunciation: 'kah-FEH' },
      { id: 'es-pan', word: 'pan', translation: 'bread', pronunciation: 'pahn' },
      { id: 'es-manzana', word: 'manzana', translation: 'apple', pronunciation: 'mahn-SAH-nah' },
    ],
    phrases: [
      { id: 'es-quiero-cafe', text: 'Quiero un café, por favor', translation: 'I would like a coffee, please' },
      { id: 'es-la-cuenta', text: 'La cuenta, por favor', translation: 'The bill, please' },
      { id: 'es-delicioso', text: 'Está delicioso', translation: 'It is delicious' },
    ],
    activities: [
      {
        id: 'es-cafe-1',
        type: 'listen-and-repeat',
        text: 'Quiero un café, por favor',
        translation: 'I would like a coffee, please',
      },
      {
        id: 'es-cafe-2',
        type: 'multiple-choice',
        question: 'What is "pan" in English?',
        options: ['bread', 'water', 'apple'],
        correctAnswer: 'bread',
      },
      {
        id: 'es-cafe-3',
        type: 'conversation',
        scenario: 'You sit down at a café in Madrid.',
        goal: 'Order a coffee and bread, then ask for the bill.',
      },
    ],
    teacherPrompt: createTeacherPrompt(
      '¡Hola! Welcome to the café. Today you will learn to order food and drinks in Spanish.',
      `1. Teach: agua, café, pan, manzana (one at a time).
2. Teach the phrases: "Quiero un café, por favor", "La cuenta, por favor", "Está delicioso".
3. Role-play: you are the waiter. Take the learner's order and bring the bill at the end.`,
    ),
  },

  // ───────── French · Basics ─────────
  {
    id: 'fr-basics-greetings',
    unitId: 'fr-basics',
    languageCode: 'fr',
    title: 'Greetings',
    description: 'Say hello, goodbye and thank you',
    level: 'beginner',
    xpReward: 10,
    estimatedMinutes: 5,
    goals: ['Greet someone in French', 'Say goodbye', 'Be polite with "s\'il vous plaît" and "merci"'],
    vocabulary: [
      { id: 'fr-bonjour', word: 'bonjour', translation: 'hello', pronunciation: 'bon-ZHOOR' },
      { id: 'fr-au-revoir', word: 'au revoir', translation: 'goodbye', pronunciation: 'oh ruh-VWAR' },
      { id: 'fr-sil-vous-plait', word: "s'il vous plaît", translation: 'please', pronunciation: 'seel voo PLEH' },
      { id: 'fr-merci', word: 'merci', translation: 'thank you', pronunciation: 'mehr-SEE' },
    ],
    phrases: [
      { id: 'fr-bonsoir', text: 'Bonsoir', translation: 'Good evening' },
      { id: 'fr-comment-allez-vous', text: 'Comment allez-vous ?', translation: 'How are you? (formal)' },
      { id: 'fr-tres-bien', text: 'Très bien, merci', translation: 'Very well, thank you' },
    ],
    activities: [
      { id: 'fr-greetings-1', type: 'listen-and-repeat', text: 'Bonjour', translation: 'Hello' },
      {
        id: 'fr-greetings-2',
        type: 'multiple-choice',
        question: 'How do you say "thank you" in French?',
        options: ['bonjour', 'au revoir', 'merci'],
        correctAnswer: 'merci',
      },
      {
        id: 'fr-greetings-3',
        type: 'conversation',
        scenario: 'You walk into a bakery in Paris.',
        goal: 'Greet the baker, ask how they are and say goodbye.',
      },
    ],
    teacherPrompt: createTeacherPrompt(
      'Bonjour! I am your French teacher. Today we learn how to say hello. Are you ready?',
      `1. Teach: bonjour, au revoir, s'il vous plaît, merci (one at a time).
2. Teach the phrases: "Bonsoir", "Comment allez-vous ?", "Très bien, merci".
3. Role-play: you are a baker in Paris, greet the learner and let them answer.`,
    ),
  },
  {
    id: 'fr-basics-introductions',
    unitId: 'fr-basics',
    languageCode: 'fr',
    title: 'Introductions',
    description: 'Tell people your name',
    level: 'beginner',
    xpReward: 15,
    estimatedMinutes: 6,
    goals: ['Say your name', "Ask for someone's name", 'Say "nice to meet you"'],
    vocabulary: [
      { id: 'fr-je', word: 'je', translation: 'I', pronunciation: 'zhuh' },
      { id: 'fr-vous', word: 'vous', translation: 'you (formal)', pronunciation: 'voo' },
      { id: 'fr-nom', word: 'nom', translation: 'name', pronunciation: 'nohm' },
      { id: 'fr-ami', word: 'ami', translation: 'friend', pronunciation: 'ah-MEE' },
    ],
    phrases: [
      { id: 'fr-je-mappelle', text: "Je m'appelle Maya", translation: 'My name is Maya' },
      { id: 'fr-comment-vous-appelez-vous', text: 'Comment vous appelez-vous ?', translation: 'What is your name?' },
      { id: 'fr-enchante', text: 'Enchanté', translation: 'Nice to meet you' },
    ],
    activities: [
      {
        id: 'fr-intro-1',
        type: 'listen-and-repeat',
        text: "Je m'appelle Maya",
        translation: 'My name is Maya',
      },
      {
        id: 'fr-intro-2',
        type: 'multiple-choice',
        question: 'What does "Enchanté" mean?',
        options: ['Goodbye', 'Nice to meet you', 'Thank you'],
        correctAnswer: 'Nice to meet you',
      },
      {
        id: 'fr-intro-3',
        type: 'conversation',
        scenario: 'You meet a new colleague on your first day of work.',
        goal: 'Say your name, ask theirs and say it is nice to meet them.',
      },
    ],
    teacherPrompt: createTeacherPrompt(
      'Re-bonjour! Today we learn how to introduce ourselves in French. Ready to start?',
      `1. Teach: je, vous, nom, ami (one at a time).
2. Teach the phrases: "Je m'appelle ...", "Comment vous appelez-vous ?", "Enchanté".
3. Role-play: you are a new colleague. Ask the learner's name and let them answer in French.`,
    ),
  },

  // ───────── Japanese · Basics ─────────
  {
    id: 'ja-basics-greetings',
    unitId: 'ja-basics',
    languageCode: 'ja',
    title: 'Greetings',
    description: 'Say hello, goodbye and thank you',
    level: 'beginner',
    xpReward: 10,
    estimatedMinutes: 5,
    goals: ['Greet someone in Japanese', 'Say goodbye', 'Say thank you'],
    vocabulary: [
      { id: 'ja-konnichiwa', word: 'こんにちは', translation: 'hello', pronunciation: 'konnichiwa' },
      { id: 'ja-sayounara', word: 'さようなら', translation: 'goodbye', pronunciation: 'sayounara' },
      { id: 'ja-arigatou', word: 'ありがとう', translation: 'thank you', pronunciation: 'arigatou' },
      { id: 'ja-hai', word: 'はい', translation: 'yes', pronunciation: 'hai' },
    ],
    phrases: [
      { id: 'ja-ohayou', text: 'おはようございます', translation: 'Good morning', pronunciation: 'ohayou gozaimasu' },
      { id: 'ja-ogenki', text: 'お元気ですか', translation: 'How are you?', pronunciation: 'ogenki desu ka' },
      { id: 'ja-genki', text: '元気です', translation: "I'm fine", pronunciation: 'genki desu' },
    ],
    activities: [
      {
        id: 'ja-greetings-1',
        type: 'listen-and-repeat',
        text: 'こんにちは',
        translation: 'Hello',
      },
      {
        id: 'ja-greetings-2',
        type: 'multiple-choice',
        question: 'How do you say "thank you" in Japanese?',
        options: ['こんにちは', 'ありがとう', 'さようなら'],
        correctAnswer: 'ありがとう',
      },
      {
        id: 'ja-greetings-3',
        type: 'conversation',
        scenario: 'You meet your host family in the morning.',
        goal: 'Greet them, ask how they are and say thank you.',
      },
    ],
    teacherPrompt: createTeacherPrompt(
      'こんにちは! I am your Japanese teacher. Today we learn how to say hello. Are you ready?',
      `1. Teach: こんにちは (konnichiwa), さようなら (sayounara), ありがとう (arigatou), はい (hai). Always give the romaji too.
2. Teach the phrases: "おはようございます", "お元気ですか", "元気です".
3. Role-play: you are the host family. Greet the learner in the morning and let them answer.`,
    ),
  },
  {
    id: 'ja-basics-introductions',
    unitId: 'ja-basics',
    languageCode: 'ja',
    title: 'Introductions',
    description: 'Tell people your name',
    level: 'beginner',
    xpReward: 15,
    estimatedMinutes: 6,
    goals: ['Say your name', 'Say "nice to meet you"', 'Say who you are'],
    vocabulary: [
      { id: 'ja-watashi', word: 'わたし', translation: 'I', pronunciation: 'watashi' },
      { id: 'ja-namae', word: 'なまえ', translation: 'name', pronunciation: 'namae' },
      { id: 'ja-tomodachi', word: 'ともだち', translation: 'friend', pronunciation: 'tomodachi' },
      { id: 'ja-sensei', word: 'せんせい', translation: 'teacher', pronunciation: 'sensei' },
    ],
    phrases: [
      { id: 'ja-hajimemashite', text: 'はじめまして', translation: 'Nice to meet you', pronunciation: 'hajimemashite' },
      { id: 'ja-watashi-wa', text: 'わたしは マヤです', translation: 'I am Maya', pronunciation: 'watashi wa Maya desu' },
      { id: 'ja-yoroshiku', text: 'よろしくおねがいします', translation: 'Please treat me well', pronunciation: 'yoroshiku onegaishimasu' },
    ],
    activities: [
      {
        id: 'ja-intro-1',
        type: 'listen-and-repeat',
        text: 'はじめまして',
        translation: 'Nice to meet you',
      },
      {
        id: 'ja-intro-2',
        type: 'multiple-choice',
        question: 'What does "ともだち" mean?',
        options: ['friend', 'teacher', 'name'],
        correctAnswer: 'friend',
      },
      {
        id: 'ja-intro-3',
        type: 'conversation',
        scenario: 'You meet a new classmate on your first day of school.',
        goal: 'Say nice to meet you and tell them your name.',
      },
    ],
    teacherPrompt: createTeacherPrompt(
      'またこんにちは! Today we learn how to introduce ourselves in Japanese. Ready to start?',
      `1. Teach: わたし (watashi), なまえ (namae), ともだち (tomodachi), せんせい (sensei). Always give the romaji too.
2. Teach the phrases: "はじめまして", "わたしは ... です", "よろしくおねがいします".
3. Role-play: you are a new classmate. Introduce yourself and let the learner introduce themselves in Japanese.`,
    ),
  },
]

export const getLessonsByUnit = (unitId: string) =>
  lessons.filter((lesson) => lesson.unitId === unitId)

export const getLesson = (lessonId: string) =>
  lessons.find((lesson) => lesson.id === lessonId)
