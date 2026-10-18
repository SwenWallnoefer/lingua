import { SymbolView, type SymbolViewProps } from 'expo-symbols'
import type { BottomTabBarProps } from 'expo-router/js-tabs'
import { useEffect, useRef, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Text } from '@/components/text'

const ROW_HEIGHT = 64 // keep in sync with .tab-bar__row in global.css
const CIRCLE_SIZE = 48
const ACTIVE_COLOR = '#5B3BF6'
const INACTIVE_COLOR = '#6B7280'

/** Icon per tab, keyed by route name. Each has an iOS, Android and web name. */
const icons: Record<string, SymbolViewProps['name']> = {
  index: { ios: 'house.fill', android: 'home', web: 'home' },
  learn: { ios: 'book', android: 'menu_book', web: 'menu_book' },
  'ai-teacher': { ios: 'face.smiling', android: 'face', web: 'face' },
  chat: { ios: 'bubble.left', android: 'chat_bubble_outline', web: 'chat_bubble_outline' },
  profile: { ios: 'person', android: 'person', web: 'person' },
}

/**
 * Custom bottom tab bar, docked full width to the bottom edge. The selected tab sits inside a circle that slides
 * between tabs. It shows only the icon; the other tabs show icon + label.
 */
export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets()
  const [rowWidth, setRowWidth] = useState(0)
  const circleX = useSharedValue(0)
  const hasPlacedCircle = useRef(false)

  const tabWidth = rowWidth / state.routes.length

  // Move the circle to the center of the selected tab.
  useEffect(() => {
    if (!tabWidth) return
    const target = state.index * tabWidth + (tabWidth - CIRCLE_SIZE) / 2
    if (hasPlacedCircle.current) {
      circleX.value = withTiming(target, { duration: 250, easing: Easing.out(Easing.cubic) })
    } else {
      // First layout: jump straight to the tab instead of sliding in from the left.
      circleX.value = target
      hasPlacedCircle.current = true
    }
  }, [state.index, tabWidth, circleX])

  const circleStyle = useAnimatedStyle(() => ({ transform: [{ translateX: circleX.value }] }))

  return (
    <View className="tab-bar border-border" style={{ paddingBottom: Math.max(insets.bottom - 10, 8) }}>
      <View
        className="tab-bar__row"
        onLayout={(event) => setRowWidth(event.nativeEvent.layout.width)}>
        {tabWidth > 0 && <Animated.View style={[styles.circle, circleStyle]} />}

        {state.routes.map((route, index) => {
          const focused = state.index === index
          const label = descriptors[route.key].options.title ?? route.name
          const color = focused ? '#FFFFFF' : INACTIVE_COLOR

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true })
            if (!focused && !event.defaultPrevented) navigation.navigate(route.name, route.params)
          }

          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityLabel={label}
              accessibilityState={{ selected: focused }}
              onPress={onPress}
              className="tab-bar__item">
              <SymbolView name={icons[route.name]} size={22} tintColor={color} />
              {!focused && (
                <Text variant="caption" tone="secondary" numberOfLines={1}>
                  {label}
                </Text>
              )}
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    top: (ROW_HEIGHT - CIRCLE_SIZE) / 2,
    left: 0,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: ACTIVE_COLOR,
  },
})
