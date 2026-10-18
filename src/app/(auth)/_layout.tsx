import { useAuth } from '@clerk/expo'
import { Redirect, Stack } from 'expo-router'

/** Sign Up and Sign In are only for signed-out users. */
export default function AuthLayout() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) return <Redirect href="/" />

  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#FFFFFF' } }} />
}
