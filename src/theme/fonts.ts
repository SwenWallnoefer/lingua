import type { FontSource } from 'expo-font'

/** Font family names, as registered with `useFonts` and referenced in tokens.css. */
export const fontFamily = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semibold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
} as const

/** Map for `useFonts`. */
export const fontAssets: Record<string, FontSource> = {
  [fontFamily.regular]: require('../../assets/fonts/Poppins-Regular.ttf'),
  [fontFamily.medium]: require('../../assets/fonts/Poppins-Medium.ttf'),
  [fontFamily.semibold]: require('../../assets/fonts/Poppins-SemiBold.ttf'),
  [fontFamily.bold]: require('../../assets/fonts/Poppins-Bold.ttf'),
}
