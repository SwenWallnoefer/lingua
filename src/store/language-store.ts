import type { LanguageCode } from '@/types/learning'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type LanguageState = {
  /** Language preferences are kept separate for each signed-in account. */
  languagesByUser: Record<string, LanguageCode>
  /** Kept until the signed-in account is known, then migrated into its entry. */
  legacySelectedLanguage: LanguageCode | null
  migratedUserId: string | null
  setSelectedLanguage: (userId: string, code: LanguageCode) => void
  migrateLegacyLanguage: (userId: string) => void
  /** AsyncStorage is async, so this is false until the saved value has been read. */
  hasHydrated: boolean
}

type PersistedLanguageState = Pick<
  LanguageState,
  'languagesByUser' | 'legacySelectedLanguage'
> & { selectedLanguage?: LanguageCode | null }

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      languagesByUser: {},
      legacySelectedLanguage: null,
      migratedUserId: null,
      setSelectedLanguage: (userId, code) =>
        set((state) => ({
          languagesByUser: { ...state.languagesByUser, [userId]: code },
        })),
      migrateLegacyLanguage: (userId) =>
        set((state) => {
          if (state.migratedUserId === userId) return state

          const languagesByUser = { ...state.languagesByUser }
          if (state.legacySelectedLanguage && !languagesByUser[userId]) {
            languagesByUser[userId] = state.legacySelectedLanguage
          }

          return {
            ...state,
            languagesByUser,
            legacySelectedLanguage: null,
            migratedUserId: userId,
          }
        }),
      hasHydrated: false,
    }),
    {
      name: 'language-storage',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      // Preserve the legacy choice until Clerk identifies which account owns it.
      partialize: (state) => ({
        languagesByUser: state.languagesByUser,
        legacySelectedLanguage: state.legacySelectedLanguage,
      }),
      migrate: (persistedState, version) => {
        const persisted = persistedState as Partial<PersistedLanguageState>
        if (version === 0) {
          return {
            languagesByUser: persisted.languagesByUser ?? {},
            legacySelectedLanguage:
              persisted.legacySelectedLanguage ??
              persisted.selectedLanguage ??
              null,
          }
        }
        return persisted as PersistedLanguageState
      },
      onRehydrateStorage: () => () =>
        useLanguageStore.setState({ hasHydrated: true }),
    },
  ),
)
