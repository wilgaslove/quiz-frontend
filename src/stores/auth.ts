import { defineStore } from 'pinia'
import api from '@/services/api'

interface LoginData {
  email: string
  password: string
}

interface User {
  id: string
  name: string
  email: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token') as string | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    // async login(data: LoginData) {
    //   const res = await api.post("/auth/login", data);

    //   this.token = res.data.token;
    //   this.user = res.data.user;

    //   if (this.token) {
    //     localStorage.setItem("token", this.token);
    //   }
    // },

    async login(data: LoginData) {
      const res = await api.post('/auth/login', data)

      this.token = res.data.token
      this.user = res.data.user

      if (this.token) {
        localStorage.setItem('token', this.token)
      }

      if (this.user) {
        localStorage.setItem('user', JSON.stringify(this.user))
      }
    },
    
    init() {
      const user = localStorage.getItem('user')
      if (user) {
        this.user = JSON.parse(user)
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})
