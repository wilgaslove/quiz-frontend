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

// const updateQuiz = async () => {
//   await api.put(`/quiz/${route.params.id}`, quiz.value)
//   router.push("/admin")
// }

const updateQuiz = async () => {
  try {

    await api.put(`/quiz/${route.params.id}`, {
      title: quiz.value.title,
      description: quiz.value.description,
      duration: quiz.value.duration,
      questions: quiz.value.questions
    })

    alert("Quiz modifié ✅")

    router.push("/admin")

  } catch (err) {
    console.error(err)
  }
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

// Supprimer une question
const removeQuestion = (qIndex: number) => {
  if (quiz.value.questions.length <= 1) {
    alert("Au moins une question requise")
    return
  }

  quiz.value.questions.splice(qIndex, 1)
}

// Supprimer une option
const removeOption = (qIndex: number, oIndex: number) => {
  const options = quiz.value.questions[qIndex].options

  if (options.length <= 2) {
    alert("Au moins 2 options requises")
    return
  }

  options.splice(oIndex, 1)

  // Corriger la bonne réponse si nécessaire
  if (quiz.value.questions[qIndex].correctAnswer === oIndex) {
    quiz.value.questions[qIndex].correctAnswer = 0
  }
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

      <!-- <h3>Question {{ qIndex + 1 }}</h3> -->

      <h3>Question {{ Number(qIndex) + 1 }}</h3>
      <button @click="removeQuestion(Number(qIndex))">
        ❌Supprimer question
      </button>


      <input v-model="q.question" placeholder="Question" />


      <div v-for="(opt, oIndex) in q.options" :key="oIndex">

        <input v-model="q.options[oIndex]" placeholder="Option" />

        <input type="radio" :name="'correct' + qIndex" :value="oIndex" v-model="q.correctAnswer" />

        <button @click="removeOption(Number(qIndex), Number(oIndex))">
          ❌
        </button>

      </div>

      <button @click="addOption(Number(qIndex))">+ Option</button>


    </div>

    <button @click="addQuestion">+ Question</button>

    <br /><br />

    <button @click="updateQuiz">Mettre à jour</button>

  </div>
</template>
