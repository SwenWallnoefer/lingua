import type { LanguageCode } from '@/types/learning'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type LanguageState = {
  /** Language preferences are kept separate for each signed-in account. */
  languagesByUser: Record<string, LanguageCode>
  setSelectedLanguage: (userId: string, code: LanguageCode) => void
  /** AsyncStorage is async, so this is false until the saved value has been read. */
  hasHydrated: boolean
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      languagesByUser: {},
      setSelectedLanguage: (userId, code) =>
        set((state) => ({
          languagesByUser: { ...state.languagesByUser, [userId]: code },
        })),
      hasHydrated: false,
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Save account-scoped preferences. hasHydrated is runtime-only.
      partialize: (state) => ({ languagesByUser: state.languagesByUser }),
      onRehydrateStorage: () => () =>
        useLanguageStore.setState({ hasHydrated: true }),
    },
  ),
)
