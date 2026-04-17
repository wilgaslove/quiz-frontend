<script setup>
import { ref, onMounted } from "vue"
import api from "@/services/api"

const quizzes = ref([])

onMounted(async () => {
  const res = await api.get("/quiz")
  quizzes.value = res.data
})
</script>

<template>
  <div>
    <h1>Quiz disponibles</h1>

    <div v-for="quiz in quizzes" :key="quiz._id">
      <h3>{{ quiz.title }}</h3>
      <router-link :to="`/quiz/${quiz._id}`">Commencer</router-link>
    </div>
  </div>
</template>