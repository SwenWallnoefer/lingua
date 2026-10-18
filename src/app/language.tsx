import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { SymbolView } from 'expo-symbols'
import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LanguageCard } from '@/components/language-card'
import { images } from '@/constants/images'
import { languages } from '@/data/languages'
import { posthogLogs } from '@/lib/posthog-logs'
import { posthog } from '@/lib/posthog'
import { useLanguageStore } from '@/store/language-store'
import type { LanguageCode } from '@/types/learning'

export default function LanguageSelection() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const savedLanguage = useLanguageStore((state) => state.selectedLanguage)
  const setSelectedLanguage = useLanguageStore((state) => state.setSelectedLanguage)
  const [selected, setSelected] = useState<LanguageCode>(savedLanguage ?? 'es')

  const search = query.trim().toLowerCase()
  const visibleLanguages = languages.filter(
    ({ name, nativeName }) =>
      name.toLowerCase().includes(search) || nativeName.toLowerCase().includes(search),
  )

  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/'))

  // Save the choice, then go home. Home only opens once a language is saved.
  const confirm = () => {
    posthog?.capture('language_selected', { language_code: selected })
    posthogLogs.info('language selected', { language_code: selected })
    setSelectedLanguage(selected)
    router.replace('/')
  }

  return (
    // No bottom edge, so the earth illustration can sit flush with the bottom of the screen.
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View className="px-4">
          {/* Header */}
          <View className="mt-1 h-12 justify-center">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              onPress={goBack}
              hitSlop={8}
              className="h-11 w-11 justify-center">
              <SymbolView
                name={{ ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' }}
                size={22}
                weight="semibold"
                tintColor="#0D132B"
              />
            </Pressable>
            <View className="absolute inset-0 items-center justify-center" pointerEvents="none">
              <Text className="language__title">Choose a language</Text>
            </View>
          </View>

          {/* Search */}
          <View className="language__search mt-3.5 border-border">
            <SymbolView
              name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
              size={20}
              tintColor="#5B6280"
            />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search languages"
              placeholderTextColor="#6B7280"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="search"
              style={styles.searchInput}
            />
          </View>

          {/* Languages */}
          <Text className="language__section mt-6">Popular</Text>
          <View className="mt-4 gap-1">
            {visibleLanguages.map((language) => (
              <LanguageCard
                key={language.code}
                language={language}
                selected={language.code === selected}
                onPress={() => setSelected(language.code)}
              />
            ))}
            {visibleLanguages.length === 0 && (
              <Text className="language__empty py-6">No languages found for “{query.trim()}”</Text>
            )}
          </View>

          {/* Confirm */}
          <Pressable
            accessibilityRole="button"
            onPress={confirm}
            className="language__button mt-5 active:opacity-90">
            <Text className="language__button-label">Continue</Text>
          </Pressable>
        </View>

        {/* Earth illustration: crop the image's empty top and bottom padding */}
        <View className="mt-auto h-[190px] overflow-hidden" pointerEvents="none">
          <Image
            source={images.earth}
            contentFit="contain"
            style={{ width: '100%', aspectRatio: 1, marginTop: '-17%' }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  content: { flexGrow: 1 },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    padding: 0,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    lineHeight: 22,
    color: '#0D132B',
  },
})
