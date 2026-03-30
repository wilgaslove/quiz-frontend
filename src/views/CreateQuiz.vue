<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import api from "@/services/api"

const router = useRouter()

const title = ref("")
const description = ref("")
const duration = ref(60)

const createQuiz = async () => {
  await api.post("/quiz", {
    title: title.value,
    description: description.value,
    duration: duration.value,
    questions: []
  })

  router.push("/admin")
}
</script>

<template>
  <div>
    <h1>Créer un Quiz</h1>

    <input v-model="title" placeholder="Titre" />
    <input v-model="description" placeholder="Description" />
    <input v-model="duration" type="number" placeholder="Durée" />

    <button @click="createQuiz">Créer</button>
  </div>
</template>