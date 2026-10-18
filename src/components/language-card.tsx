import { Image } from 'expo-image'
import { SymbolView } from 'expo-symbols'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import type { Language } from '@/types/learning'

type LanguageCardProps = {
  language: Language
  selected: boolean
  onPress: () => void
}

/** One row of the language list. Selected rows get a purple outline and a check mark. */
export function LanguageCard({ language, selected, onPress }: LanguageCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`${language.name}, ${language.learners} learners`}
      onPress={onPress}
      className={`language__card active:opacity-90 ${
        selected ? 'border-primary bg-[#F5F3FF]' : 'border-surface'
      }`}>
      <Image
        source={{ uri: language.flag }}
        contentFit="cover"
        style={styles.flag}
      />

      <View className="ml-[18px] flex-1">
        <Text className="language__name">{language.name}</Text>
        <Text className="language__learners">{language.learners} learners</Text>
      </View>

      {selected ? (
        <View className="h-[27px] w-[27px] items-center justify-center rounded-full bg-primary-deep">
          <SymbolView
            name={{ ios: 'checkmark', android: 'check', web: 'check' }}
            size={14}
            weight="bold"
            tintColor="#FFFFFF"
          />
        </View>
      ) : (
        <SymbolView
          name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
          size={16}
          weight="semibold"
          tintColor="#5B6280"
        />
      )}
    </Pressable>
  )
}

// expo-image ignores className, so the flag is sized with a style.
const styles = StyleSheet.create({
  flag: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
})
