import { fetchStreamToken, streamApiKey } from '@/lib/stream'
import { useAuth, useUser } from '@clerk/expo'
import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-native-sdk'
import { useEffect, useRef, useState, type ReactNode } from 'react'

/** Resolves once the last client has fully disconnected. */
let previousDisconnect: Promise<unknown> = Promise.resolve()

/** Connects the signed-in Clerk user to Stream while its children are on screen. */
export function StreamProvider({ children }: { children: ReactNode }) {
  const { getToken } = useAuth()
  const { user } = useUser()
  const [client, setClient] = useState<StreamVideoClient>()

  // Keep the latest getToken in a ref so a new function identity never reconnects the client.
  const getTokenRef = useRef(getToken)
  useEffect(() => {
    getTokenRef.current = getToken
  }, [getToken])

  const userId = user?.id
  const userName = user?.fullName ?? user?.username ?? 'Learner'
  const userImage = user?.imageUrl

  useEffect(() => {
    if (!userId) return

    let cancelled = false
    let streamClient: StreamVideoClient | undefined

    // Wait for the previous client to finish disconnecting. Otherwise getOrCreateInstance
    // can hand back that same client while it is shutting down (e.g. after a fast refresh).
    previousDisconnect.then(() => {
      if (cancelled) return

      // getOrCreateInstance reuses one client per user. Never use `new StreamVideoClient`.
      streamClient = StreamVideoClient.getOrCreateInstance({
        apiKey: streamApiKey,
        user: { id: userId, name: userName, image: userImage },
        tokenProvider: () => fetchStreamToken(() => getTokenRef.current()),
      })
      setClient(streamClient)
    })

    return () => {
      cancelled = true
      setClient(undefined)
      if (streamClient) {
        previousDisconnect = streamClient.disconnectUser().catch(console.error)
      }
    }
  }, [userId, userName, userImage])

  if (!client) return null

  return <StreamVideo client={client}>{children}</StreamVideo>
}
