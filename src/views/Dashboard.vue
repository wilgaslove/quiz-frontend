<script setup lang="ts">
import { onMounted } from "vue"
import { useQuizStore } from "@/stores/quiz"
import { useRouter } from "vue-router"


const quizStore = useQuizStore()

// Démarrer les quiz
const router = useRouter()
const startQuiz = (id: string) => {
  router.push(`/quiz/${id}`)
}


onMounted(() => {
  quizStore.fetchQuizzes()
})
</script>

<template>
  <div class="dashboard">
    <h2>Liste des Quiz</h2>

    <p v-if="quizStore.loading">Chargement...</p>

    <div v-for="quiz in quizStore.quizzes" :key="quiz._id" class="quiz-card">
      <h3>{{ quiz.title }}</h3>
      <p>{{ quiz.description }}</p>
      <p>Durée : {{ quiz.duration }} secondes</p>

      <button>Démarrer</button>
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