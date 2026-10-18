import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { LanguageCode } from '@/types/learning'

type LanguageState = {
  /** The language the learner picked. null until they choose one. */
  selectedLanguage: LanguageCode | null
  setSelectedLanguage: (code: LanguageCode) => void
  /** AsyncStorage is async, so this is false until the saved value has been read. */
  hasHydrated: boolean
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguage: null,
      setSelectedLanguage: (code) => set({ selectedLanguage: code }),
      hasHydrated: false,
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Only the language is saved. hasHydrated is runtime-only.
      partialize: (state) => ({ selectedLanguage: state.selectedLanguage }),
      onRehydrateStorage: () => () => useLanguageStore.setState({ hasHydrated: true }),
    },
  ),
)
