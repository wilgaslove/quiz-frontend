<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import api from "@/services/api"

const quizzes = ref([])
const router = useRouter()

const loadQuizzes = async () => {
  const res = await api.get("/quiz")
  quizzes.value = res.data
}

const deleteQuiz = async (id: string) => {
  if (!confirm("Supprimer ce quiz ?")) return

  await api.delete(`/quiz/${id}`)
  loadQuizzes()
}

const goToCreate = () => {
  router.push("/admin/create")
}

const goToEdit = (id: string) => {
  router.push(`/admin/edit/${id}`)
}

onMounted(loadQuizzes)
</script>

<template>
  <div>
    <h1>Admin Quiz</h1>

    <button @click="goToCreate">Créer un quiz</button>

    <div v-for="quiz in quizzes" :key="quiz._id">
      <h3>{{ quiz.title }}</h3>

      <button @click="goToEdit(quiz._id)">Modifier</button>
      <button @click="deleteQuiz(quiz._id)">Supprimer</button>
    </div>
  </div>
</template>