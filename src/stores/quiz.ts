import { defineStore } from "pinia"
import api from "@/services/api"

interface Quiz {
  _id: string
  title: string
  description: string
  duration: number
}

export const useQuizStore = defineStore("quiz", {
  state: () => ({
    quizzes: [] as Quiz[],
    loading: false
  }),

  actions: {
    async fetchQuizzes() {
      this.loading = true
      try {
        const res = await api.get("/quiz")
        this.quizzes = res.data
      } finally {
        this.loading = false
      }
    }
  }
})