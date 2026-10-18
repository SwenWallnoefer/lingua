import { Image } from 'expo-image'
import { useRouter, type Href } from 'expo-router'
import { SymbolView } from 'expo-symbols'
import { useState } from 'react'
import { type ImageSourcePropType, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { VerificationModal } from '@/components/verification-modal'
import { images } from '@/constants/images'
import { type AuthMode, type SocialStrategy, useAuthFlow } from '@/hooks/use-auth-flow'

const copy: Record<
  AuthMode,
  { title: string; subtitle: string; button: string; footerText: string; footerLink: string; footerHref: Href }
> = {
  'sign-up': {
    title: 'Create your account',
    subtitle: 'Start your language journey today ✨',
    button: 'Sign Up',
    footerText: 'Already have an account?',
    footerLink: 'Log in',
    footerHref: '/sign-in',
  },
  'sign-in': {
    title: 'Welcome back',
    subtitle: 'Continue your language journey ✨',
    button: 'Sign In',
    footerText: "Don't have an account?",
    footerLink: 'Sign up',
    footerHref: '/sign-up',
  },
}

const socialProviders: { label: string; icon: ImageSourcePropType; strategy: SocialStrategy }[] = [
  { label: 'Continue with Google', icon: images.googleLogo, strategy: 'oauth_google' },
  { label: 'Continue with Facebook', icon: images.facebookLogo, strategy: 'oauth_facebook' },
  { label: 'Continue with Apple', icon: images.appleLogo, strategy: 'oauth_apple' },
]

const inputStyle = {
  fontFamily: 'Poppins-Regular',
  fontSize: 16,
  lineHeight: 22,
  color: '#0D132B',
  padding: 0,
} as const

/** Shared layout for the Sign Up and Sign In screens. Sign In has no password field. */
export function AuthScreen({ mode }: { mode: AuthMode }) {
  const router = useRouter()
  const content = copy[mode]
  const hasPassword = mode === 'sign-up'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const { busy, sendCode, verifyCode, signInWithProvider } = useAuthFlow(mode)

  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/onboarding'))

  // Clerk emails a code, then the modal asks for it.
  const handleSubmit = async () => {
    if (await sendCode(email, password)) setVerifying(true)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
        showsVerticalScrollIndicator={false}>
        <View className="flex-1 px-8">
          {/* Back */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={goBack}
            className="mt-1 h-11 w-11 justify-center">
            <SymbolView
              name={{ ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' }}
              size={24}
              weight="semibold"
              tintColor="#0D132B"
            />
          </Pressable>

          {/* Heading */}
          <Text className="auth__title mt-5">{content.title}</Text>
          <Text className="auth__subtitle mt-3">{content.subtitle}</Text>

          {/* Mascot peeking over the first field */}
          <View className="mt-6 h-[124px]">
            <View className="h-[124px] items-center overflow-hidden">
              <Image
                source={images.mascotAuth}
                contentFit="contain"
                style={{ width: 230, height: 230, marginTop: -41, transform: [{ scaleX: -1 }] }}
              />
            </View>
            <View className="absolute inset-0 items-center" pointerEvents="none">
              <Text className="absolute left-1/2 top-[26px] -ml-[100px] text-[18px] text-[#F5A623]">✦</Text>
              <Text className="absolute left-1/2 top-[26px] ml-[88px] text-[16px] text-[#6BA6FF]">✦</Text>
              <Text className="absolute left-1/2 top-[62px] ml-[78px] text-[18px] text-[#FFD84D]">✦</Text>
            </View>
          </View>

          {/* Form */}
          <View className="auth__field border-border">
            <Text className="auth__label">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="alex@gmail.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              style={inputStyle}
            />
          </View>

          {/* Invisible mount point for Clerk's bot protection on sign-up */}
          {hasPassword && <View nativeID="clerk-captcha" />}

          {hasPassword && (
            <View className="auth__field mt-3.5 border-border">
              <Text className="auth__label">Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="new-password"
                autoCorrect={false}
                style={inputStyle}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                onPress={() => setShowPassword((value) => !value)}
                hitSlop={12}
                className="absolute right-[18px] top-0 bottom-0 justify-center">
                <SymbolView
                  name={
                    showPassword
                      ? { ios: 'eye.slash', android: 'visibility_off', web: 'visibility_off' }
                      : { ios: 'eye', android: 'visibility', web: 'visibility' }
                  }
                  size={24}
                  tintColor="#5B6280"
                />
              </Pressable>
            </View>
          )}

          <Pressable
            accessibilityRole="button"
            onPress={handleSubmit}
            disabled={busy}
            className="auth__button mt-5 active:opacity-90">
            <Text className="auth__button-label">{content.button}</Text>
          </Pressable>

          {/* Social */}
          <View className="mt-[26px] flex-row items-center">
            <View className="h-px flex-1 bg-border" />
            <Text className="auth__divider-text mx-4">or continue with</Text>
            <View className="h-px flex-1 bg-border" />
          </View>

          <View className="mt-3.5 gap-2.5">
            {socialProviders.map(({ label, icon, strategy }) => (
              <Pressable
                key={label}
                accessibilityRole="button"
                onPress={() => signInWithProvider(strategy)}
                disabled={busy}
                className="auth__social border-border active:opacity-80">
                <View className="w-7 items-center">
                  <Image source={icon} contentFit="contain" style={{ width: 26, height: 26 }} />
                </View>
                <Text className="auth__social-label ml-[15px]">{label}</Text>
              </Pressable>
            ))}
          </View>

          {/* Footer */}
          <View className="mt-auto flex-row items-center justify-center pb-8 pt-8">
            <Text className="auth__footer">{content.footerText} </Text>
            <Pressable
              accessibilityRole="link"
              hitSlop={12}
              onPress={() => router.replace(content.footerHref)}>
              <Text className="auth__footer-link">{content.footerLink}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <VerificationModal visible={verifying} onClose={() => setVerifying(false)} onSubmit={verifyCode} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  content: { flexGrow: 1 },
})
