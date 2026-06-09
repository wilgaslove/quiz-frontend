<script setup lang="ts">
import { onMounted } from "vue"
import { useQuizStore } from "@/stores/quiz"
import { useRouter } from "vue-router"
import navbar from "@/components/navbar.vue"
import { useAuthStore } from "@/stores/auth"
import { useThemeStore } from "@/stores/theme"


const quizStore = useQuizStore()
const authStore = useAuthStore()
const themeStore = useThemeStore()

// Démarrer les quiz
const router = useRouter()
const startQuiz = (id: string) => {
  router.push(`/quiz/${id}`)
}


const formatDuration = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  return `${hrs.toString().padStart(2, '0')}h ${mins
    .toString()
    .padStart(2, '0')}m ${secs
      .toString()
      .padStart(2, '0')}s`
}


onMounted(() => {
  quizStore.fetchQuizzes()
})
</script>



<template>

  <div class="" v-if="authStore.user?.role === 'admin'">
    <navbar />
  </div>


  <div class="relative" v-if="authStore.user?.role !== 'admin'">
    <img src="@/assets/images/off.jpg" alt="image logout" class="fixed size-[5rem] cursor-pointer  top-0 right-3  "
      @click="authStore.logout(); router.push('/login')" />

    <div class="absolute top-4 right-4">
      <button @click="themeStore.toggleTheme()" class="px-3 py-2 rounded-lg border">
        {{ themeStore.dark ? '☀️' : '🌙' }}
      </button>
    </div>

  </div>

  <div class="reletive">
    <p class="fixed top-3 left-3 text-3xl font-bold"> Welcom {{ authStore.user?.nom }} </p>
  </div>

  
  <div class="dashboard">
    <h1 class="text-2xl font-bold mb-4">Liste des Quiz</h1>

    <p v-if="quizStore.loading">Chargement...</p>

    <div v-for="quiz in quizStore.quizzes" :key="quiz._id" class="quiz-card rounded-lg">
      <h3 class="text-lg font-semibold">{{ quiz.title }}</h3>
      <p class="text-gray-600">{{ quiz.description }}</p>
      <p class="text-lg font-semibold">Durée : {{ formatDuration(quiz.duration) }} </p>

      <button @click="startQuiz(quiz._id)"
        class="transition ease-in-out delay-150 bg-green-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-600 duration-300 px-4 py-2 text-white border-double border-4 rounded-lg">Démarrer</button>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 600px;
  margin: 40px auto;
}

.quiz-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
}
</style>