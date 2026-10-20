import { createLessonCall } from '@/lib/stream'
import { useAuth } from '@clerk/expo'
import {
  callManager,
  CallingState,
  useStreamVideoClient,
  type Call,
} from '@stream-io/video-react-native-sdk'
import { useFocusEffect } from 'expo-router'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * idle: nothing started yet · loading: our API route is creating the call
 * connecting: joining Stream (also while reconnecting) · joined: live
 * ended: the call is over · error: something failed, see `error`
 */
export type CallPhase =
  | 'idle'
  | 'loading'
  | 'connecting'
  | 'joined'
  | 'ended'
  | 'error'

/** Leaving twice throws, so only leave a call that is still active. */
async function leaveCall(call?: Call) {
  if (call && call.state.callingState !== CallingState.LEFT) {
    await call.leave().catch(console.error)
  }
}

/** Starts, mutes and ends the audio-only Stream call for one lesson. Needs <StreamProvider> above it. */
export function useLessonCall(lessonId: string) {
  const client = useStreamVideoClient()
  const { getToken } = useAuth()

  const [call, setCall] = useState<Call>()
  const callRef = useRef<Call>(undefined)
  // Counts start attempts. Hanging up bumps it, so a start that is still loading or
  // joining notices it was cancelled and stops instead of reporting an error.
  const attemptRef = useRef(0)
  const [phase, setPhase] = useState<CallPhase>('idle')
  const [error, setError] = useState<string>()
  const [micOn, setMicOn] = useState(false)
  const [speakerOn, setSpeakerOn] = useState(true)

  // Follow the call's own state, so reconnects and remote hang-ups show up on screen.
  useEffect(() => {
    if (!call) return

    const callingState = call.state.callingState$.subscribe((state) => {
      if (state === CallingState.JOINED) {
        setPhase('joined')
      } else if (
        state === CallingState.RECONNECTING ||
        state === CallingState.OFFLINE
      ) {
        setPhase('connecting')
      } else if (state === CallingState.LEFT) {
        setPhase((current) => (current === 'error' ? current : 'ended'))
      }
    })
    const microphone = call.microphone.state.status$.subscribe((status) =>
      setMicOn(status === 'enabled'),
    )

    return () => {
      callingState.unsubscribe()
      microphone.unsubscribe()
    }
  }, [call])

  // Hang up without ending the call for everyone. Also cancels a start that is still in progress.
  const hangUp = useCallback(async () => {
    attemptRef.current += 1
    const activeCall = callRef.current
    callRef.current = undefined
    setPhase((current) => (current === 'loading' ? 'idle' : current))
    await leaveCall(activeCall)
  }, [])

  // The lesson screen is a hidden tab, so it stays mounted when you leave it.
  // Hang up when it loses focus (or unmounts), otherwise the microphone keeps streaming.
  useFocusEffect(
    useCallback(() => {
      return () => {
        hangUp()
      }
    }, [hangUp]),
  )

  const startCall = async () => {
    if (!client || phase === 'loading' || phase === 'connecting') return
    if (phase === 'joined') return

    attemptRef.current += 1
    const attempt = attemptRef.current
    const isCancelled = () => attempt !== attemptRef.current

    setError(undefined)
    setSpeakerOn(true)
    setPhase('loading')

    let session
    try {
      session = await createLessonCall(getToken, lessonId)
    } catch (err) {
      if (isCancelled()) return
      setError(
        err instanceof Error ? err.message : 'Could not start the call.',
      )
      setPhase('error')
      return
    }
    if (isCancelled()) return

    setPhase('connecting')
    const newCall = client.call(session.callType, session.callId, {
      reuseInstance: true,
    })
    callRef.current = newCall
    setCall(newCall)

    try {
      // Audio only. Disabling the camera before joining stops the call type's
      // "camera on by default" setting from publishing video.
      await newCall.camera.disable()
      await newCall.join()
      // Asks for the microphone permission the first time.
      await newCall.microphone.enable()
      // Hung up while we were joining: make sure nothing stays connected.
      if (isCancelled()) await leaveCall(newCall)
    } catch (err) {
      await leaveCall(newCall)
      if (isCancelled()) return

      console.error('Could not join the call', err)
      callRef.current = undefined
      setCall(undefined)
      setError(
        'Could not connect to your teacher. Check your internet and microphone permission, then try again.',
      )
      setPhase('error')
    }
  }

  const endCall = async () => {
    const activeCall = callRef.current

    // Not live yet (still starting or reconnecting): just cancel. Ending it here
    // would close the call for everyone before the join finished.
    if (phase !== 'joined' || !activeCall) {
      await hangUp()
      return
    }

    setPhase('ended')
    attemptRef.current += 1
    callRef.current = undefined
    // endCall closes it for everyone. If we are not allowed to, just leave.
    await activeCall.endCall().catch(() => undefined)
    await leaveCall(activeCall)
  }

  const toggleMic = () => {
    call?.microphone.toggle().catch(console.error)
  }

  const toggleSpeaker = () => {
    const next = !speakerOn
    setSpeakerOn(next)
    callManager.speaker.setMute(!next)
  }

  return {
    phase,
    error,
    micOn,
    speakerOn,
    startCall,
    endCall,
    toggleMic,
    toggleSpeaker,
  }
}
