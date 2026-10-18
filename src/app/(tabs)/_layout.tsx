import { TabBar } from '@/components/tab-bar'
import { useLanguageStore } from '@/store/language-store'
import { useAuth, useUser } from '@clerk/expo'
import { Redirect } from 'expo-router'
import { Tabs } from 'expo-router/js-tabs'

/** The five main tabs. Only for signed-in users who have picked a language. */
export default function TabsLayout() {
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  const selectedLanguage = useLanguageStore((state) =>
    user ? state.languagesByUser[user.id] : undefined,
  )

  if (!isSignedIn) return <Redirect href="/onboarding" />
  // Signed in but no language yet: pick one before seeing the tabs.
  if (!selectedLanguage) return <Redirect href="/language" />

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="learn" options={{ title: 'Learn' }} />
      <Tabs.Screen name="ai-teacher" options={{ title: 'AI Teacher' }} />
      <Tabs.Screen name="chat" options={{ title: 'Chat' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  )
}
