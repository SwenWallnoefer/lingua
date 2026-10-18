import { SymbolView, type SymbolViewProps } from 'expo-symbols'
import { Pressable, Text, View } from 'react-native'

type CallControlProps = {
  label: string
  icon: SymbolViewProps['name']
  onPress: () => void
  /** Highlights the button, e.g. while subtitles are on. */
  active?: boolean
  /** Red button used for ending the call. */
  danger?: boolean
}

/** Round button with a label underneath. Used in the audio lesson control row. */
export function CallControl({ label, icon, onPress, active, danger }: CallControlProps) {
  const style = danger ? 'call__control-end' : active ? 'call__control-active' : ''

  return (
    <View className="items-center gap-2">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={active === undefined ? undefined : { selected: active }}
        onPress={onPress}
        className={`call__control active:opacity-80 ${style}`}>
        <SymbolView name={icon} size={24} tintColor={danger ? '#FFFFFF' : '#0D132B'} />
      </Pressable>
      <Text className="call__control-label">{label}</Text>
    </View>
  )
}
