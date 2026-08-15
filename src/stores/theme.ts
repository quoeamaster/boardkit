import { defineStore } from 'pinia'

// [lesson] the store is a way to store the state of the application
export const useThemeStore = defineStore('theme', {
  state: () => ({
    // current theme label / set
    current: 'default',
  }),

  actions: {
    setTheme(theme: string) {
      this.current = theme
    },
  },
})