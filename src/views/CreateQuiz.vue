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
    questions: questions.value
  })

  router.push("/admin")
}

const questions = ref([
  {
    question: "",
    options: ["", ""],
    correctAnswer: 0
  }
])

const addQuestion = () => {
  questions.value.push({
    question: "",
    options: ["", ""],
    correctAnswer: 0
  })
}

 //const addOption = (qIndex: number) => {
 // questions.value[qIndex].options.push("")
//}

const addOption = (qIndex: number) => {
  if (questions.value[qIndex]) {
    questions.value[qIndex].options.push("")
  }
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

  <div v-for="(q, qIndex) in questions" :key="qIndex">

    <input v-model="q.question" placeholder="Question" />

    <div v-for="(opt, oIndex) in q.options" :key="oIndex">
      <input v-model="q.options[oIndex]" placeholder="Option" />

      <input type="radio" :name="'correct' + qIndex" :value="oIndex" v-model="q.correctAnswer" />
      Bonne réponse
    </div>

    <button @click="addOption(qIndex)">+ Option</button>

  </div>

  <button @click="addQuestion">+ Question</button>
</template>