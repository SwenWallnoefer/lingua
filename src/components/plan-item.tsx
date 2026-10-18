import { SymbolView, type SymbolViewProps } from 'expo-symbols'
import { Text, View } from 'react-native'
import type { PlanItemData, PlanItemId } from '@/hooks/use-home-data'

const icons: Record<PlanItemId, { symbol: SymbolViewProps['name']; tile: string }> = {
  lesson: { symbol: { ios: 'book.fill', android: 'menu_book', web: 'menu_book' }, tile: 'bg-primary-deep' },
  conversation: { symbol: { ios: 'headphones', android: 'headphones', web: 'headphones' }, tile: 'bg-primary-deep' },
  words: { symbol: { ios: 'text.bubble.fill', android: 'chat', web: 'chat' }, tile: 'bg-[#EF6F6C]' },
}

/** One row of today's plan: icon tile, title + subtitle, and a done / not done circle. */
export function PlanItem({ item }: { item: PlanItemData }) {
  const { symbol, tile } = icons[item.id]

  return (
    <View
      accessibilityLabel={`${item.title}, ${item.subtitle}, ${item.done ? 'done' : 'not done'}`}
      className="h-[68px] flex-row items-center">
      <View className={`home__plan-icon ${tile}`}>
        <SymbolView name={symbol} size={20} tintColor="#FFFFFF" />
      </View>

      <View className="ml-4 flex-1">
        <Text className="home__plan-title">{item.title}</Text>
        <Text numberOfLines={1} className="home__plan-subtitle">
          {item.subtitle}
        </Text>
      </View>

      <View
        className={`home__plan-check ${item.done ? 'border-primary-deep bg-primary-deep' : 'border-[#9CA3AF]'}`}>
        {item.done && (
          <SymbolView
            name={{ ios: 'checkmark', android: 'check', web: 'check' }}
            size={13}
            weight="bold"
            tintColor="#FFFFFF"
          />
        )}
      </View>
    </View>
  )
}
