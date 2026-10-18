import { useAuth } from '@clerk/expo'
import { Text } from '@/components/text'
import { Image } from 'expo-image'
import { images } from '@/constants/images'
import { Link, Redirect } from 'expo-router'
import { View } from 'react-native'

export default function Index() {
  const { isSignedIn, signOut } = useAuth()

  if (!isSignedIn) return <Redirect href="/onboarding" />

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background px-6">
      <Image
        source={images.mascotLogo}
        style={{ width: 160, height: 160 }}
      />
      <Text variant="h1" className="text-success">
        lingua
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
    </View>
  )
}
