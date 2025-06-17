import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    user: {
      attributes: {
        email: '',
        first_name: '',
        is_admin: false,
        last_name: '',
        permissions: [],
      },
      id: null,
      type: 'user',
    },
  }),
  actions: {
    setAuthenticated(value) {
      this.authenticated = value
    },
    setUser(value) {
      this.user = value
    },
  },
  persist: true,
})
