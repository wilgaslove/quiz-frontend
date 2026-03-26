<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { useRoute } from "vue-router"
import api from "@/services/api"

const route = useRoute()

const quiz = ref<any>(null)
const answers = ref<number[]>([])
const score = ref<number | null>(null)

const timeLeft = ref(0)
let timer: any = null

// Charger le quiz
const loadQuiz = async () => {
  const res = await api.get(`/quiz/${route.params.id}`)
  quiz.value = res.data

  // démarrer une session quiz
  await api.post(`/quiz/${route.params.id}/start`)

  // charger durée du quiz
  timeLeft.value = quiz.value.duration || 60

  startTimer()
}

// const loadQuiz = async () => {
//   try {

//     const res = await api.get(`/quiz/${route.params.id}`)
//     quiz.value = res.data

//     // démarrer la session quiz
//     await api.post(`/results/quiz/${route.params.id}/start`)

//     timeLeft.value = quiz.value.duration || 60

//     startTimer()

//   } catch (err) {
//     console.error(err)
//   }
// }
// Timer
const startTimer = () => {
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(timer)
      submitQuiz()
    }
  }, 1000)
}

const selectAnswer = (questionIndex: number, optionIndex: number) => {
  answers.value[questionIndex] = optionIndex
}

// Soumission du quiz
const submitQuiz = async () => {

  clearInterval(timer)

  try {

    const res = await api.post(`/results/quiz/${route.params.id}/submit`, {
      answers: answers.value
    })

    score.value = res.data.score

  } catch (err:any) {

    alert(err.response?.data?.message || "Erreur")

  }
}
onMounted(loadQuiz)

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div v-if="quiz">

    <h2>{{ quiz.title }}</h2>


    <p>Temps restant : {{ timeLeft }} s ⏱️</p>

    <div v-for="(q, index) in quiz.questions" :key="index" style="margin-bottom:20px">
      <h3>{{ q.question }}</h3>

      <div v-for="(option, i) in q.options" :key="i">
        <label>
          <input type="radio" :name="'question' + index" :value="i"
            @change="() => selectAnswer(Number(index), Number(i))" />
          {{ option }}
        </label>
      </div>

    </div>

    <button @click="submitQuiz">
      Soumettre
    </button>

    <div v-if="score !== null">
      <h2>Votre score : {{ score }}/{{ quiz.questions.length }}</h2>
    </div>

  </div>
</template>
