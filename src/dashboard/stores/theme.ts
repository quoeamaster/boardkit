import { defineStore } from 'pinia'

export type ThemeName = 'default' | 'dark'

// [lesson] the store is a way to store the state of the application
export const useThemeStore = defineStore('theme', {
  state: () => ({
    // current theme label / set
    current: 'default' as ThemeName,
  }),

  actions: {
    setTheme(theme: ThemeName) {
      this.current = theme
    },
  },
})