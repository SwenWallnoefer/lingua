import { createClerkClient, verifyToken } from '@clerk/backend'

export type SessionUser = {
  id: string
  name: string
  image?: string
}

/**
 * Server only. Used by the API routes in `app/api`.
 * Reads the Clerk session token sent as `Authorization: Bearer <token>` and returns who is calling.
 * The user id always comes from the verified token, never from the request body.
 */
export async function getSessionUser(
  request: Request,
): Promise<SessionUser | null> {
  const secretKey = process.env.CLERK_SECRET_KEY
  if (!secretKey) {
    throw new Error('Add CLERK_SECRET_KEY to the .env file')
  }

  const token = request.headers.get('Authorization')?.replace('Bearer ', '')
  if (!token) return null

  try {
    const { sub } = await verifyToken(token, { secretKey })
    const user = await createClerkClient({ secretKey }).users.getUser(sub)

    return {
      id: user.id,
      name: user.fullName ?? user.username ?? 'Learner',
      image: user.imageUrl,
    }
  } catch (error) {
    // Expired or forged token, or a secret key from a different Clerk instance.
    console.error('Clerk token check failed:', error)
    return null
  }
}
