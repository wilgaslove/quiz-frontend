import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    dark: localStorage.getItem('darkMode') === 'true'
  }),

  actions: {
    toggleTheme() {
      this.dark = !this.dark

      localStorage.setItem(
        'darkMode',
        String(this.dark)
      )

      document.documentElement.classList.toggle(
        'dark',
        this.dark
      )
    },

    initTheme() {
      document.documentElement.classList.toggle(
        'dark',
        this.dark
      )
    }
  }
})