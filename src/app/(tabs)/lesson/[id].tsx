import { CallControl } from '@/components/call-control'
import { Text } from '@/components/text'
import { images } from '@/constants/images'
import { getLanguage } from '@/data/languages'
import { getLesson } from '@/data/lessons'
import { Image } from 'expo-image'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { SymbolView } from 'expo-symbols'
import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text as RNText, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

/** Placeholder scores. Real feedback arrives once the AI teacher is connected. */
const demoFeedback = [
  { label: 'Speaking', value: 'Excellent', color: '#4CB33A' },
  { label: 'Pronunciation', value: 'Great', color: '#3B7BFF' },
  { label: 'Grammar', value: 'Good', color: '#5B3BF6' },
]

/** Audio-only lesson with the AI teacher. The lesson id comes from the route. */
export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const lesson = getLesson(id)
  const language = lesson ? getLanguage(lesson.languageCode) : undefined

  const [micOn, setMicOn] = useState(true)
  const [speakerOn, setSpeakerOn] = useState(true)
  const [subtitlesOn, setSubtitlesOn] = useState(true)

  // The lesson screen is a hidden tab, so go to Learn explicitly instead of router.back().
  const leaveLesson = () => router.navigate('/learn')

  if (!lesson) {
    return (
      <SafeAreaView edges={['top']} style={styles.screen}>
        <View className="flex-1 items-center justify-center px-8">
          <Text variant="h2" className="text-center">
            Lesson not found
          </Text>
          <Text variant="bodyMd" tone="secondary" className="mt-2 text-center">
            Go back and pick another lesson.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={leaveLesson}
            className="language__button mt-6 w-full">
            <RNText className="language__button-label">Back to lessons</RNText>
          </Pressable>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <View className="call__background absolute inset-0" />

      {/* Header: back, lesson title, session status and XP */}
      <View className="h-[72px] flex-row items-center px-5">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Leave lesson"
          hitSlop={12}
          onPress={leaveLesson}>
          <SymbolView
            name={{ ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' }}
            size={22}
            weight="semibold"
            tintColor="#0D132B"
          />
        </Pressable>
        <View className="ml-5 flex-1">
          <RNText numberOfLines={1} className="call__title">
            {lesson.title}
          </RNText>
          <View className="flex-row items-center gap-2">
            <View className="h-2.5 w-2.5 rounded-full bg-success" />
            <RNText className="call__status">Online</RNText>
          </View>
        </View>
        <View className="call__pill" accessibilityLabel={`${lesson.xpReward} XP reward`}>
          <SymbolView
            name={{ ios: 'bolt.fill', android: 'bolt', web: 'bolt' }}
            size={16}
            tintColor="#F5A524"
          />
          <RNText className="call__pill-label">{lesson.xpReward} XP</RNText>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {/* Teacher preview. The blurred lesson picture stands in for the room behind the teacher. */}
        <View className="mx-4">
          <View className="call__hero">
            <Image
              source={{ uri: lesson.image }}
              contentFit="cover"
              blurRadius={25}
              style={StyleSheet.absoluteFill}
            />
            <View className="absolute inset-0 bg-white/40" />

            <View className="absolute inset-x-0 top-5 items-center">
              <Image source={images.mascotAuth} contentFit="contain" style={styles.mascot} />
            </View>

            <View className="absolute inset-x-0 top-4 flex-row justify-between px-4">
              <View className="call__chip">
                {language && (
                  <Image
                    source={{ uri: language.flag }}
                    contentFit="cover"
                    style={styles.flag}
                  />
                )}
                <RNText className="call__chip-label">{language?.name}</RNText>
              </View>
              <View className="call__chip">
                <View
                  className={`h-2 w-2 rounded-full ${micOn ? 'bg-success' : 'bg-error'}`}
                />
                <RNText className="call__chip-label">
                  {micOn ? 'Listening' : 'Mic muted'}
                </RNText>
              </View>
            </View>
          </View>

          {/* Teacher response bubble. It overlaps the bottom of the preview. */}
          {subtitlesOn && (
            <View className="-mt-[88px] px-14">
              <View className="call__bubble">
                <RNText className="call__bubble-text flex-1">
                  {lesson.teacherPrompt.openingLine}
                </RNText>
                <SymbolView
                  name={{
                    ios: 'speaker.wave.2.fill',
                    android: 'volume_up',
                    web: 'volume_up',
                  }}
                  size={22}
                  tintColor="#5B3BF6"
                />
                <View className="call__bubble-tail" />
              </View>
            </View>
          )}
        </View>

        {/* Call controls */}
        <View className="mt-6 flex-row justify-between px-8">
          <CallControl
            label="Speaker"
            active={speakerOn}
            onPress={() => setSpeakerOn((on) => !on)}
            icon={
              speakerOn
                ? { ios: 'speaker.wave.2.fill', android: 'volume_up', web: 'volume_up' }
                : { ios: 'speaker.slash.fill', android: 'volume_off', web: 'volume_off' }
            }
          />
          <CallControl
            label="Mic"
            active={micOn}
            onPress={() => setMicOn((on) => !on)}
            icon={
              micOn
                ? { ios: 'mic.fill', android: 'mic', web: 'mic' }
                : { ios: 'mic.slash.fill', android: 'mic_off', web: 'mic_off' }
            }
          />
          <CallControl
            label="Subtitles"
            active={subtitlesOn}
            onPress={() => setSubtitlesOn((on) => !on)}
            icon={{
              ios: 'captions.bubble.fill',
              android: 'closed_caption',
              web: 'closed_caption',
            }}
          />
          <CallControl
            label="End Call"
            danger
            onPress={leaveLesson}
            icon={{ ios: 'phone.down.fill', android: 'call_end', web: 'call_end' }}
          />
        </View>

        {/* Lesson feedback */}
        <View className="call__feedback mx-5 mt-6">
          {demoFeedback.map(({ label, value, color }, index) => (
            <View key={label} className="flex-row flex-1">
              {index > 0 && <View className="call__feedback-divider" />}
              <View className="call__feedback-item">
                <RNText className="call__feedback-label">{label}</RNText>
                <RNText className="call__feedback-value" style={{ color }}>
                  {value}
                </RNText>
              </View>
            </View>
          ))}
        </View>

        {/* What this lesson teaches */}
        <View className="card mx-5 mt-4 px-5 py-5">
          <RNText className="home__section-title">Lesson goal</RNText>
          <View className="mt-3 gap-2">
            {lesson.goals.map((goal) => (
              <View key={goal} className="flex-row items-start gap-3">
                <View className="mt-2 h-2 w-2 rounded-full bg-primary" />
                <RNText className="call__goal-text">{goal}</RNText>
              </View>
            ))}
          </View>

          <RNText className="home__section-title mt-5">Phrases to practice</RNText>
          <View className="mt-3 gap-3">
            {lesson.phrases.map((phrase) => (
              <View key={phrase.id}>
                <RNText className="call__phrase">{phrase.text}</RNText>
                <RNText className="call__phrase-translation">{phrase.translation}</RNText>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

// expo-image ignores className, so images are sized with styles.
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { paddingBottom: 24 },
  mascot: { width: 380, height: 380 },
  flag: { width: 20, height: 14, borderRadius: 3 },
})
