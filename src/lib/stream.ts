import { apiPost } from './api'

export const streamApiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY!

if (!streamApiKey) {
  throw new Error('Add EXPO_PUBLIC_STREAM_API_KEY to the .env file')
}

type GetToken = () => Promise<string | null>

/** Asks our API route for a fresh Stream user token. Stream calls this again when the token expires. */
export async function fetchStreamToken(getToken: GetToken) {
  const { token } = await apiPost<{ token: string }>(
    '/api/stream/token',
    getToken,
  )
  return token
}

export type LessonCallSession = {
  callType: string
  callId: string
}

/** Asks our API route to create the audio call for a lesson. */
export function createLessonCall(getToken: GetToken, lessonId: string) {
  return apiPost<LessonCallSession>('/api/stream/call', getToken, { lessonId })
}
