import { View } from 'react-native'
import { Text } from '@/components/text'

/** Temporary tab content until each screen is built. */
export function PlaceholderScreen({ title }: { title: string }) {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text variant="h2">{title}</Text>
      <Text variant="bodyMd" tone="secondary">
        Coming soon
      </Text>
    </View>
  )
}
