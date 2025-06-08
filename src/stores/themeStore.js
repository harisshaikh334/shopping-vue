import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: 'dark',
  }),

  actions: {
    setTheme(newTheme) {
      this.theme = newTheme
      const bodyEle = document.body
      bodyEle.setAttribute('data-bs-theme', newTheme)
    },
  },
})
