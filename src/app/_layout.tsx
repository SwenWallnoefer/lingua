import { ClerkProvider, useAuth } from '@clerk/expo'
import { tokenCache } from '@clerk/expo/token-cache'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import { useLanguageStore } from '@/store/language-store'
import { fontAssets } from '@/theme'
import '../../global.css'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env file')
}

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <RootNavigator />
    </ClerkProvider>
  )
}

function RootNavigator() {
  const [fontsLoaded, fontError] = useFonts(fontAssets)
  // Clerk restores the saved session on launch. Wait for it so we never flash the wrong screen.
  const { isLoaded: authLoaded } = useAuth()
  // The saved language is read from AsyncStorage. Wait for it too, so we never flash the wrong screen.
  const languageLoaded = useLanguageStore((state) => state.hasHydrated)
  const ready = (fontsLoaded || fontError) && authLoaded && languageLoaded

  useEffect(() => {
    if (ready) SplashScreen.hideAsync()
  }, [ready])

  if (!ready) return null

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#FFFFFF' } }} />
    </>
  )
}
