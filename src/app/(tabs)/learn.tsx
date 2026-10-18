import { LessonCard } from '@/components/lesson-card'
import { images } from '@/constants/images'
import { useLearnData } from '@/hooks/use-learn-data'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { SymbolView } from 'expo-symbols'
import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type LearnTab = 'lessons' | 'practice'

const tabs: { id: LearnTab; label: string }[] = [
  { id: 'lessons', label: 'Lessons' },
  { id: 'practice', label: 'Practice' },
]

export default function LearnScreen() {
  const learn = useLearnData()
  const router = useRouter()
  const [tab, setTab] = useState<LearnTab>('lessons')

  if (!learn) return null

  if (!learn.current) {
    return (
      <SafeAreaView edges={['top']} style={styles.screen}>
        <View className="flex-1 justify-center px-5">
          <View className="card items-center px-6 py-8">
            <Text className="auth__title text-center">
              {learn.language.name} lessons are coming soon
            </Text>
            <Text className="language__empty mt-3">
              We&apos;re preparing your first lesson. Choose another language to
              start learning now.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  const { current, unitNumber, items } = learn

  const currentNumber =
    items.findIndex((item) => item.lesson.id === current.id) + 1
  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/'))

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero picture with the header on top of it */}
        <View style={styles.hero}>
          <Image
            source={{ uri: current.image }}
            contentFit="cover"
            style={StyleSheet.absoluteFill}
          />
          <View className="learn__fade-top absolute inset-x-0 top-0 h-28" />
          <View className="learn__fade-bottom absolute inset-x-0 bottom-0 h-20" />
          <Image
            source={images.mascotWelcome}
            contentFit="contain"
            style={styles.mascot}
          />

          <View className="absolute inset-x-0 top-0 h-[72px] flex-row items-center px-5">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              hitSlop={12}
              onPress={goBack}
            >
              <SymbolView
                name={{
                  ios: 'chevron.left',
                  android: 'chevron_left',
                  web: 'chevron_left',
                }}
                size={22}
                weight="semibold"
                tintColor="#0D132B"
              />
            </Pressable>
            <View className="ml-5 flex-1">
              <Text numberOfLines={1} className="learn__title">
                {current.title}
              </Text>
              <Text className="learn__subtitle">
                Unit {unitNumber} • {currentNumber} / {items.length} lessons
              </Text>
            </View>
            {/* Icon only for now. Make it a Pressable once bookmarks exist. */}
            <SymbolView
              name={{
                ios: 'bookmark.fill',
                android: 'bookmark',
                web: 'bookmark',
              }}
              size={26}
              tintColor="#F5A524"
            />
          </View>
        </View>

        {/* Lessons / Practice switch */}
        <View className="learn__tabs -mt-9 mx-3">
          {tabs.map(({ id, label }) => {
            const selected = tab === id
            return (
              <Pressable
                key={id}
                accessibilityRole="tab"
                accessibilityState={{ selected }}
                onPress={() => setTab(id)}
                className={`learn__tab ${selected ? 'learn__tab-active' : ''}`}
              >
                <Text
                  className={`learn__tab-label ${selected ? 'text-primary-deep' : ''}`}
                >
                  {label}
                </Text>
                {selected && <View className="learn__tab-underline" />}
              </Pressable>
            )
          })}
        </View>

        {tab === 'lessons' ? (
          <View className="mt-4 gap-2 px-5">
            {items.map((item) => (
              <LessonCard
                key={item.lesson.id}
                item={item}
                onPress={() =>
                  router.push({
                    pathname: '/lesson/[id]',
                    params: { id: item.lesson.id },
                  })
                }
              />
            ))}
          </View>
        ) : (
          <View className="mt-10 items-center px-8">
            <Text className="language__section text-center">
              Practice is coming soon
            </Text>
            <Text className="language__empty mt-2">
              Review the words you have learned here once practice sessions are
              ready.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

// expo-image ignores className, so images are sized with styles.
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { paddingBottom: 24 },
  hero: { height: 270 },
  mascot: { position: 'absolute', left: 110, bottom: 0, width: 170, height: 170 },
})
