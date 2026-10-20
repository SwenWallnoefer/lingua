type GetToken = () => Promise<string | null>

/**
 * POSTs JSON to one of our Expo API routes with the Clerk session token attached.
 * The server reads the token to find out which user is calling.
 */
export async function apiPost<T>(
  path: string,
  getToken: GetToken,
  body?: unknown,
): Promise<T> {
  const sessionToken = await getToken()
  if (!sessionToken) throw new Error('Please sign in again.')

  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionToken}`,
    },
    body: JSON.stringify(body ?? {}),
  })

  const data = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(data?.error ?? 'Something went wrong. Please try again.')
  }

  return data as T
}
