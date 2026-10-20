import { getSessionUser } from '@/lib/clerk-server'
import { getStreamServerClient } from '@/lib/stream-server'

const TOKEN_LIFETIME_SECONDS = 60 * 60 * 4

/** POST /api/stream/token: returns a Stream user token for the signed-in Clerk user. */
export async function POST(request: Request) {
  try {
    const user = await getSessionUser(request)
    if (!user) {
      return Response.json({ error: 'Please sign in again.' }, { status: 401 })
    }

    const token = getStreamServerClient().generateUserToken({
      user_id: user.id,
      validity_in_seconds: TOKEN_LIFETIME_SECONDS,
    })

    return Response.json({ token })
  } catch (error) {
    console.error('Stream token error:', error)
    return Response.json(
      { error: 'Could not create a Stream token.' },
      { status: 500 },
    )
  }
}
