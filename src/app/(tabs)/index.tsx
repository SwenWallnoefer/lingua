import { useAuth } from '@clerk/expo'
import { Text } from '@/components/text'
import { Image } from 'expo-image'
import { images } from '@/constants/images'
import { Link } from 'expo-router'
import { View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getLanguage } from '@/data/languages'
import { useLanguageStore } from '@/store/language-store'

/** Testing helper: forget the saved language, then wipe AsyncStorage. */
const clearStorage = async () => {
  // Reset the in-memory value first. Otherwise the store would write it back to storage.
  useLanguageStore.setState({ selectedLanguage: null })
  await AsyncStorage.clear()
}

export default function Index() {
  const { signOut } = useAuth()
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage)

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background px-6">
      <Image
        source={images.mascotLogo}
        style={{ width: 160, height: 160 }}
      />
      <Text variant="h1" className="text-success">
        lingua
      </Text>
      {/* Testing only: remove once the home screen is built. */}
      <Text variant="bodyMd" tone="secondary">
        Selected language: {selectedLanguage && getLanguage(selectedLanguage)?.name}
      </Text>
      <Link href="/language">
        <Text variant="h4" tone="brand">
          Choose a language
        </Text>
      </Link>
      <Link href="/design-system">
        <Text variant="h4" tone="brand">
          View design system
        </Text>
      </Link>
      <Text variant="h4" tone="brand" onPress={() => signOut()}>
        Sign out
      </Text>
      <Text variant="h4" className="text-streak" onPress={clearStorage}>
        Clear storage (testing)
      </Text>
    </View>
  )
}
