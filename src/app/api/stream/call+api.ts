import { getLanguage } from '@/data/languages'
import { getLesson } from '@/data/lessons'
import { getSessionUser } from '@/lib/clerk-server'
import { getStreamServerClient } from '@/lib/stream-server'

const CALL_TYPE = 'default'

/** POST /api/stream/call: creates an audio call for one lesson and the signed-in user. */
export async function POST(request: Request) {
  try {
    const user = await getSessionUser(request)
    if (!user) {
      return Response.json({ error: 'Please sign in again.' }, { status: 401 })
    }

    const { lessonId } = (await request.json()) as { lessonId?: string }
    const lesson = lessonId ? getLesson(lessonId) : undefined
    if (!lesson) {
      return Response.json({ error: 'Lesson not found.' }, { status: 404 })
    }
    const language = getLanguage(lesson.languageCode)

    const streamClient = getStreamServerClient()

    // Members must exist in Stream before the call can reference them.
    await streamClient.upsertUsers([
      { id: user.id, name: user.name, image: user.image },
    ])

    // A new id for every session, so each lesson attempt is its own call.
    const callId = `${lesson.id}-${crypto.randomUUID()}`

    await streamClient.video.call(CALL_TYPE, callId).getOrCreate({
      data: {
        created_by_id: user.id,
        members: [{ user_id: user.id }],
        // Audio only: nobody turns a camera on in a lesson.
        video: false,
        custom: {
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          languageCode: lesson.languageCode,
          languageName: language?.name,
          learnerName: user.name,
        },
      },
    })

    return Response.json({ callType: CALL_TYPE, callId })
  } catch (error) {
    console.error('Stream call error:', error)
    return Response.json(
      { error: 'Could not start the call. Please try again.' },
      { status: 500 },
    )
  }
}
