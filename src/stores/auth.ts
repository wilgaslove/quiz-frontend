import { defineStore } from 'pinia'
import api from '@/services/api'

interface LoginData {
  email: string
  password: string
}

interface RegisterData {
  nom: string
  email: string
  password: string
}

interface User {
  id: string
  nom: string
  email: string
  role: string
}

export const useAuthStore = defineStore('auth', {

  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
    token: localStorage.getItem('token') as string | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {

    // =========================
    // LOGIN
    // =========================
    async login(data: LoginData) {

      const res = await api.post('/auth/login', data)

      this.token = res.data.token
      this.user = res.data.user

      if (this.token) {
        localStorage.setItem('token', this.token)
      }

      localStorage.setItem('user', JSON.stringify(this.user))
    },

    // =========================
    // REGISTER
    // =========================
    async register(data: RegisterData) {

      const res = await api.post('/auth/register', data)

      this.token = res.data.token

      this.user = {
        id: res.data._id,
        nom: res.data.nom,
        email: res.data.email,
        role: res.data.role,
      }

      if (this.token) {
        localStorage.setItem('token', this.token)
      }

      localStorage.setItem('user', JSON.stringify(this.user))
    },

    // =========================
    // INIT
    // =========================
    init() {

      const user = localStorage.getItem('user')

      if (user) {
        this.user = JSON.parse(user)
      }

    },

    // =========================
    // LOGOUT
    // =========================
    logout() {

      this.user = null
      this.token = null

      localStorage.removeItem('token')
      localStorage.removeItem('user')

    },
  },
})