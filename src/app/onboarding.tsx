import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants/images'

export default function Onboarding() {
  const router = useRouter()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Logo */}
      <View className="mt-1 flex-row items-center self-center">
        <Image source={images.mascotLogo} style={{ width: 78, height: 78 }} contentFit="contain" />
        <Text className="onboarding__brand -ml-2">lingua</Text>
      </View>

      {/* Headline */}
      <View className="mt-8 px-9">
        <Text className="onboarding__title">Your AI language</Text>
        <Text className="onboarding__title text-primary-deep">
          teacher<Text className="text-ink">.</Text>
        </Text>
        <Text className="onboarding__subtitle mt-2">
          Real conversations, personalized lessons, anytime, anywhere.
        </Text>
      </View>

      {/* Mascot + speech bubbles */}
      <View className="mt-4 flex-1" pointerEvents="none">
        <View className="absolute inset-y-0 -left-3 right-3 items-center">
          <View className="absolute bottom-[2%] h-6 w-[220px] rounded-full bg-[#E9E9F1]" />
          <Image
            source={images.mascotWelcome}
            style={{ position: 'absolute', top: '1.5%', height: '111%', aspectRatio: 1 }}
            contentFit="contain"
          />
        </View>

        <View className="onboarding__bubble absolute left-9 top-[6%] -rotate-6 bg-[#EAF3FF]">
          <Text className="onboarding__bubble-text text-ink">Hello!</Text>
          <View className="absolute -bottom-1 right-6 h-4 w-4 rotate-45 rounded-sm bg-[#EAF3FF]" />
        </View>

        <View className="onboarding__bubble absolute right-12 top-0 -rotate-6 bg-[#F1F1FF]">
          <Text className="onboarding__bubble-text text-[#3A2BE0]">¡Hola!</Text>
          <View className="absolute -bottom-1 left-6 h-4 w-4 rotate-45 rounded-sm bg-[#F1F1FF]" />
        </View>

        <View className="onboarding__bubble absolute right-6 top-[24%] -rotate-6 bg-[#FDEEEA]">
          <Text className="onboarding__bubble-text text-[#E5483C]">你好!</Text>
          <View className="absolute -bottom-1 left-6 h-4 w-4 rotate-45 rounded-sm bg-[#FDEEEA]" />
        </View>
      </View>

      {/* Call to action */}
      <View className="mb-6 mt-4 px-6">
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/sign-up')}
          className="onboarding__button flex-row items-center justify-center active:opacity-90">
          <Text className="onboarding__button-label mr-9">Get Started</Text>
          <View className="absolute right-6 h-3 w-3 rotate-45 border-r-2 border-t-2 border-white" />
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
