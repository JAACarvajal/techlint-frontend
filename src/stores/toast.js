import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [],
  }),
  actions: {
    showToast(message, type = 'info', duration = 5000) {
      const id = Date.now() + Math.random()
      this.toasts.push({ id, message, type })

      setTimeout(() => {
        this.toasts = this.toasts.filter((t) => t.id !== id)
      }, duration)
    },
    closeToast(id) {
      this.toasts = this.toasts.filter((t) => t.id !== id)
    },
  },
})
