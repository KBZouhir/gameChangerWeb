import { defineStore } from 'pinia'
import { useFetch } from '#app'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    loading: false,
    error: null,
  }),
  actions: {
    async register(userData) {
      this.loading = true
      this.error = null
      try {
        const { data, error } = await useFetch('/api/register', {
          method: 'POST',
          body: userData
        })
        if (error.value) {
          throw new Error(error.value.message)
        }
        this.user = data.value.user
        this.token = data.value.token
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async login(credentials) {
      this.loading = true
      this.error = null
      try {
        const { data, error } = await useFetch('/api/login', {
          method: 'POST',
          body: credentials
        })
        if (error.value) {
          throw new Error(error.value.message)
        }
        this.user = data.value.user
        this.token = data.value.token
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    
    logout() {
      this.user = null
      this.token = null
    },
  },
})
