<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import api from "@/services/api"

const route = useRoute()
const router = useRouter()

const quiz = ref<any>(null)

const loadQuiz = async () => {
  const res = await api.get(`/quiz/${route.params.id}`)
  quiz.value = res.data
}

const updateQuiz = async () => {
  await api.put(`/quiz/${route.params.id}`, quiz.value)
  router.push("/admin")
}

onMounted(loadQuiz)
</script>

<template>
  <div v-if="quiz">
    <h1>Modifier Quiz</h1>

    <input v-model="quiz.title" />
    <input v-model="quiz.description" />
    <input v-model="quiz.duration" type="number" />

    <button @click="updateQuiz">Mettre à jour</button>
  </div>
</template>

