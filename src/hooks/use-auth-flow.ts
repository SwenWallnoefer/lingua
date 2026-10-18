import { useSignIn, useSignUp, useSSO } from '@clerk/expo'
import { type Href, useRouter } from 'expo-router'
import { useState } from 'react'
import { Alert } from 'react-native'

export type AuthMode = 'sign-up' | 'sign-in'
export type SocialStrategy = 'oauth_google' | 'oauth_facebook' | 'oauth_apple'

type ClerkErrorLike = { message: string; longMessage?: string }

/** Clerk errors are shown in a native alert so the screen design stays untouched. */
const showError = (error: ClerkErrorLike | null | undefined) => {
  Alert.alert('Something went wrong', error?.longMessage ?? error?.message ?? 'Please try again.')
}

/** Shows the error and returns false, so a failed step can `return fail(error)`. */
const fail = (error: ClerkErrorLike) => {
  showError(error)
  return false
}

/**
 * All Clerk logic for the Sign Up and Sign In screens.
 *
 * Sign Up:  email + password -> Clerk emails a 6-digit code -> verify -> signed in.
 * Sign In:  email -> Clerk emails a 6-digit code -> verify -> signed in.
 * Social:   Google / Facebook / Apple through Clerk's browser SSO.
 */
export function useAuthFlow(mode: AuthMode) {
  const router = useRouter()
  const { signUp } = useSignUp()
  const { signIn } = useSignIn()
  const { startSSOFlow } = useSSO()
  const [busy, setBusy] = useState(false)

  /** Runs after Clerk activates the session. Sends the user to the home route. */
  const goHome = ({
    session,
    decorateUrl,
  }: {
    session?: { currentTask?: unknown } | null
    decorateUrl: (to: string) => string
  }) => {
    // The Clerk instance asks for an extra step (e.g. MFA setup) that this app doesn't handle yet.
    if (session?.currentTask) return
    router.replace(decorateUrl('/') as Href)
  }

  /** Step 1: send the email code. Returns true when the verification modal should open. */
  const sendCode = async (email: string, password: string) => {
    setBusy(true)
    try {
      if (mode === 'sign-up') {
        const { error } = await signUp.password({ emailAddress: email.trim(), password })
        if (error) return fail(error)

        const { error: sendError } = await signUp.verifications.sendEmailCode()
        if (sendError) return fail(sendError)
      } else {
        const { error } = await signIn.emailCode.sendCode({ emailAddress: email.trim() })
        if (error) return fail(error)
      }
      return true
    } finally {
      setBusy(false)
    }
  }

  /** Step 2: check the code the user typed. Returns true when the user is signed in. */
  const verifyCode = async (code: string) => {
    setBusy(true)
    try {
      if (mode === 'sign-up') {
        const { error } = await signUp.verifications.verifyEmailCode({ code })
        if (error) return fail(error)

        if (signUp.status !== 'complete') {
          Alert.alert('Almost there', 'Your account needs more information before you can continue.')
          return false
        }
        const { error: finalizeError } = await signUp.finalize({ navigate: goHome })
        if (finalizeError) return fail(finalizeError)
      } else {
        const { error } = await signIn.emailCode.verifyCode({ code })
        if (error) return fail(error)

        if (signIn.status !== 'complete') {
          Alert.alert('Almost there', 'Your account needs an extra verification step that is not supported yet.')
          return false
        }
        const { error: finalizeError } = await signIn.finalize({ navigate: goHome })
        if (finalizeError) return fail(finalizeError)
      }
      return true
    } finally {
      setBusy(false)
    }
  }

  const signInWithProvider = async (strategy: SocialStrategy) => {
    setBusy(true)
    try {
      const { createdSessionId, setActive, signUp: pendingSignUp } = await startSSOFlow({ strategy })

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId, navigate: goHome })
      } else if (pendingSignUp?.status === 'missing_requirements') {
        Alert.alert('Almost there', 'Your account needs more information before you can continue.')
      }
      // No session and no missing requirements: the user closed the browser, so do nothing.
    } catch (error) {
      showError(error instanceof Error ? error : null)
    } finally {
      setBusy(false)
    }
  }

  return { busy, sendCode, verifyCode, signInWithProvider }
}
