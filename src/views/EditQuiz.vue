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

const addQuestion = () => {
  quiz.value.questions.push({
    question: "",
    options: ["", ""],
    correctAnswer: 0
  })
}

const addOption = (qIndex: number) => {
  quiz.value.questions[qIndex].options.push("")
}


onMounted(loadQuiz)
</script>

<template>
  <!-- <div v-if="quiz">
    <h1>Modifier Quiz</h1>

    <input v-model="quiz.title" />
    <input v-model="quiz.description" />
    <input v-model="quiz.duration" type="number" />

    <button @click="updateQuiz">Mettre à jour</button>
  </div> -->

<div v-if="quiz">

  <h1>Modifier Quiz</h1>

  <input v-model="quiz.title" placeholder="Titre" />
  <input v-model="quiz.description" placeholder="Description" />
  <input v-model="quiz.duration" type="number" placeholder="Durée" />

  <div v-for="(q, qIndex) in quiz.questions" :key="qIndex">

    <h3>Question {{ qIndex + 1 }}</h3>

    <input v-model="q.question" placeholder="Question" />

    <div v-for="(opt, oIndex) in q.options" :key="oIndex">

      <input v-model="q.options[oIndex]" placeholder="Option" />

      <input 
        type="radio"
        :name="'correct' + qIndex"
        :value="oIndex"
        v-model="q.correctAnswer"
      />
      Bonne réponse

    </div>

    <button @click="addOption(qIndex)">+ Option</button>

  </div>

  <button @click="addQuestion">+ Question</button>

  <br /><br />

  <button @click="updateQuiz">Mettre à jour</button>

</div>
</template>
