import { defineStore } from 'pinia'

export const useAuthStore = defineStore('alerts', {
  state: () => ({
    authenticated: false,
    user: null,
  }),
  actions: {
    setAuthenticated(value) {
      this.authenticated = value
    },
    setUser(value) {
      this.user = value
    },
  },
})
