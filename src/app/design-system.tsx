import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from '@/components/text'
import { colors, typography, type ColorToken, type TypographyToken } from '@/theme'

const swatches: { title: string; items: { label: string; token: ColorToken; className: string }[] }[] = [
  {
    title: 'Primary',
    items: [
      { label: 'Lingua Purple', token: 'linguaPurple', className: 'bg-lingua-purple' },
      { label: 'Lingua Deep Purple', token: 'linguaDeepPurple', className: 'bg-lingua-deep-purple' },
      { label: 'Lingua Blue', token: 'linguaBlue', className: 'bg-lingua-blue' },
      { label: 'Lingua Green', token: 'linguaGreen', className: 'bg-lingua-green' },
    ],
  },
  {
    title: 'Semantic',
    items: [
      { label: 'Success', token: 'success', className: 'bg-success' },
      { label: 'Warning', token: 'warning', className: 'bg-warning' },
      { label: 'Streak', token: 'streak', className: 'bg-streak' },
      { label: 'Error', token: 'error', className: 'bg-error' },
      { label: 'Info', token: 'info', className: 'bg-info' },
    ],
  },
  {
    title: 'Neutrals',
    items: [
      { label: 'Text / Primary', token: 'textPrimary', className: 'bg-ink' },
      { label: 'Text / Secondary', token: 'textSecondary', className: 'bg-ink-secondary' },
      { label: 'Border', token: 'border', className: 'bg-border' },
      { label: 'Surface', token: 'surface', className: 'bg-surface border border-border' },
      { label: 'Background', token: 'background', className: 'bg-background border border-border' },
    ],
  },
]

const typeSpecimens: { label: string; token: TypographyToken; weight: string }[] = [
  { label: 'H1', token: 'h1', weight: 'Bold' },
  { label: 'H2', token: 'h2', weight: 'SemiBold' },
  { label: 'H3', token: 'h3', weight: 'SemiBold' },
  { label: 'H4', token: 'h4', weight: 'Medium' },
  { label: 'Body Large', token: 'bodyLg', weight: 'Regular' },
  { label: 'Body Medium', token: 'bodyMd', weight: 'Regular' },
  { label: 'Body Small', token: 'bodySm', weight: 'Regular' },
  { label: 'Caption', token: 'caption', weight: 'Regular' },
]

const variantFor = (token: TypographyToken) => token

export default function DesignSystem() {
  return (
    <SafeAreaView className="screen" edges={['top', 'bottom']}>
      <ScrollView contentContainerClassName="gap-4 p-4">
        <View className="card gap-3 p-5">
          <Text variant="h4" tone="brand" className="uppercase">
            Brand
          </Text>
          <Text variant="h1">lingua</Text>
        </View>

        <View className="card gap-5 p-5">
          <Text variant="h4" tone="brand" className="uppercase">
            Colors
          </Text>
          {swatches.map((group) => (
            <View key={group.title} className="gap-3">
              <Text variant="bodySm" tone="secondary" className="uppercase">
                {group.title}
              </Text>
              <View className="flex-row flex-wrap gap-4">
                {group.items.map((item) => (
                  <View key={item.token} className="w-24 gap-1">
                    <View className={`h-16 w-16 rounded-md ${item.className}`} />
                    <Text variant="caption" tone="secondary" className="uppercase">
                      {item.label}
                    </Text>
                    <Text variant="caption" tone="secondary">
                      {colors[item.token]}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View className="card gap-4 p-5">
          <Text variant="h4" tone="brand" className="uppercase">
            Typography
          </Text>
          <Text variant="bodySm" tone="secondary" className="uppercase">
            Font family
          </Text>
          <Text variant="h1">Poppins</Text>
          {typeSpecimens.map(({ label, token, weight }) => {
            const t = typography[token]
            return (
              <View key={token} className="gap-1 border-t border-border pt-3">
                <Text variant={variantFor(token)}>{label}</Text>
                <Text variant="caption" tone="secondary">
                  {t.usage} · {t.fontSize}px · {weight} · {t.lineHeight}
                </Text>
              </View>
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
