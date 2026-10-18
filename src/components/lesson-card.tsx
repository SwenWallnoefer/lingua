import type { LearnLesson } from '@/hooks/use-learn-data'
import { Image } from 'expo-image'
import { SymbolView } from 'expo-symbols'
import { Pressable, StyleSheet, Text, View } from 'react-native'

type LessonCardProps = {
  item: LearnLesson
  onPress: () => void
}

/** One row of the Learn list. Shows the lesson number and title, plus its status on the right. */
export function LessonCard({ item, onPress }: LessonCardProps) {
  const { lesson, number, status } = item
  const active = status === 'in-progress'

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Lesson ${number}, ${lesson.title}, ${status.replace('-', ' ')}`}
      onPress={onPress}
      className={`learn__card active:opacity-90 ${
        active ? 'learn__card-active border-primary' : 'border-[#ECEAF4]'
      }`}>
      <View className="flex-1">
        <Text className="learn__lesson-label">Lesson {number}</Text>
        <Text numberOfLines={1} className="learn__lesson-title">
          {lesson.title}
        </Text>
        {active && <Text className="learn__lesson-progress">In progress</Text>}
        {status === 'not-started' && (
          <Text className="learn__lesson-status">
            {lesson.estimatedMinutes} min • {lesson.xpReward} XP
          </Text>
        )}
      </View>

      {status === 'completed' && (
        <View className="learn__check">
          <SymbolView
            name={{ ios: 'checkmark', android: 'check', web: 'check' }}
            size={13}
            weight="bold"
            tintColor="#FFFFFF"
          />
        </View>
      )}
      {active && (
        <Image
          source={{ uri: lesson.image }}
          contentFit="cover"
          style={styles.thumbnail}
        />
      )}
      {status === 'not-started' && (
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

// expo-image ignores className, so the thumbnail is sized with a style.
const styles = StyleSheet.create({
  thumbnail: { width: 44, height: 44, borderRadius: 12 },
})
