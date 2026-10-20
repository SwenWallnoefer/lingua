import { StreamClient } from '@stream-io/node-sdk'

/** Server only. The API secret must never be imported into app screens. */
export function getStreamServerClient() {
  const apiKey = process.env.STREAM_API_KEY
  const apiSecret = process.env.STREAM_API_SECRET

  if (!apiKey || !apiSecret) {
    throw new Error('Add STREAM_API_KEY and STREAM_API_SECRET to the .env file')
  }

  return new StreamClient(apiKey, apiSecret)
}
