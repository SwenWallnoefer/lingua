import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { SymbolView } from 'expo-symbols'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PlanItem } from '@/components/plan-item'
import { images } from '@/constants/images'
import { useHomeData } from '@/hooks/use-home-data'

export default function HomeScreen() {
  const home = useHomeData()

  if (!home) return null

  const { firstName, language, lesson, plan, streak, todayXp, dailyGoalXp } = home
  const goalProgress = Math.min(todayXp / dailyGoalXp, 1)

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header: language flag, greeting, streak, notifications */}
        <View className="h-11 flex-row items-center">
          <Link href="/language" asChild>
            <Pressable accessibilityRole="button" accessibilityLabel="Change language">
              <Image source={{ uri: language.flag }} contentFit="cover" style={styles.flag} />
            </Pressable>
          </Link>
          <Text className="home__greeting ml-3 flex-1">
            {language.greeting}, {firstName}! 👋
          </Text>
          <Image source={images.streakFire} contentFit="contain" style={styles.streakIcon} />
          <Text className="home__streak ml-1 mr-5">{streak}</Text>
          {/* Icon only for now. Make it a Link/Pressable once notifications exist. */}
          <SymbolView
            name={{ ios: 'bell', android: 'notifications_none', web: 'notifications_none' }}
            size={26}
            tintColor="#0D132B"
          />
        </View>

        {/* Daily goal */}
        <View className="home__goal mt-5">
          <Text className="home__goal-label">Daily goal</Text>
          <Text className="home__goal-xp mt-1">
            {todayXp} <Text className="home__goal-total">/ {dailyGoalXp} XP</Text>
          </Text>
          <View className="home__goal-track mt-2">
            <View className="home__goal-fill" style={{ width: `${goalProgress * 100}%` }} />
          </View>
          <Image source={images.treasure} contentFit="contain" style={styles.treasure} />
        </View>

        {/* Continue learning */}
        <View className="home__continue mt-5">
          <Image source={images.palace} contentFit="contain" style={styles.palace} />
          <Text className="home__continue-label">Continue learning</Text>
          <Text className="home__continue-title">{language.name}</Text>
          <Text className="home__continue-label mb-3">
            {home.levelLabel} • Unit {home.unitNumber}
          </Text>
          <Link href="/learn" asChild>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Continue ${lesson.title}`}
              className="home__continue-button active:opacity-90">
              <Text className="home__continue-button-label">Continue</Text>
            </Pressable>
          </Link>
        </View>

        {/* Today's plan */}
        <View className="mt-6 flex-row items-center justify-between">
          <Text className="home__section-title">Today&apos;s plan</Text>
          <Link href="/learn" asChild>
            <Pressable accessibilityRole="button">
              <Text className="home__section-link">View all</Text>
            </Pressable>
          </Link>
        </View>
        <View className="mt-1.5">
          {plan.map((item) => (
            <PlanItem key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

// expo-image ignores className, so images are sized with styles.
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 24 },
  flag: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: '#E5E7EB' },
  streakIcon: { width: 32, height: 32 },
  treasure: { position: 'absolute', right: 16, top: 6, width: 110, height: 110 },
  palace: { position: 'absolute', right: -29, top: 3, width: 200, height: 200 },
})
