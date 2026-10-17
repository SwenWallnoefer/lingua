import { Text } from '@/components/text'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { View } from 'react-native'

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background px-6">
      <Image
        source={require('@/assets/images/moscot-logo.png')}
        style={{ width: 160, height: 160 }}
      />
      <Text variant="h1" className="text-success">
        lingua
      </Text>
      <Link href="/design-system">
        <Text variant="h4" tone="brand">
          View design system
        </Text>
      </Link>
    </View>
  )
}
