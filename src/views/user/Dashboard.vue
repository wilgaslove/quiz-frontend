<script setup lang="ts">
import { onMounted } from "vue"
import { useQuizStore } from "@/stores/quiz"
import { useRouter } from "vue-router"
import navbar from "@/components/navbar.vue"
import { useAuthStore } from "@/stores/auth"


const quizStore = useQuizStore()
const authStore = useAuthStore()

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

  <div class="" v-if="authStore.user?.role === 'admin'">
    <navbar />
  </div>


  <div class="relative">
    <input type="image" src="src\assets\images\off.jpg" alt="logo" class="">
  </div>

  <!-- <router-link to="/login"
                class=" rounded-full transition ease-in-out delay-150 bg-red-500 hover:-translate-y-1 hover:scale-110 hover:bg-red-600 duration-300 p-2 rounded-full">X</router-link> -->

  <div class="dashboard">
    <h1 class="text-2xl font-bold mb-4">Liste des Quiz</h1>

    <p v-if="quizStore.loading">Chargement...</p>

    <div v-for="quiz in quizStore.quizzes" :key="quiz._id" class="quiz-card rounded-lg">
      <h3 class="text-lg font-semibold">{{ quiz.title }}</h3>
      <p class="text-gray-600">{{ quiz.description }}</p>
      <p class="text-lg font-semibold">Durée : {{ quiz.duration }} secondes</p>

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