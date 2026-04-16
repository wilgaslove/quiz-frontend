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



// const loadQuiz = async () => {
//   try {

//     const res = await api.get(`/quiz/${route.params.id}`)
//     quiz.value = res.data

//     // démarrer la session quiz
//     await api.post(`/results/quiz/${route.params.id}/start`)

//     // timeLeft.value = quiz.value.duration || 60
//     // const startRes = await api.post(`/results/quiz/${route.params.id}/start`)
//     const startRes = await api.post(`/results/quiz/${route.params.id}/start`)
//     quiz.value = res.data

//     // 🔥 récupérer réponses sauvegardées
//     answers.value = startRes.data.answers || []

//     const endTime = new Date(startRes.data.endTime).getTime()

//     startTimer(endTime)





//     // startTimer()

//   } catch (err) {
//     console.error(err)
//   }
// }

const loadQuiz = async () => {
  try {
    const res = await api.get(`/quiz/${route.params.id}`)
    quiz.value = res.data

    const startRes = await api.post(`/results/quiz/${route.params.id}/start`)

    // récupérer réponses sauvegardées
    answers.value = startRes.data.answers || []

    const endTime = new Date(startRes.data.endTime).getTime()

    startTimer(endTime)

  } catch (err) {
    console.error(err)
  }
}

// Timer
// const startTimer = (endTime: number) => {
//   timer = setInterval(() => {
//     if (timeLeft.value > 0) {
//       timeLeft.value--
//     } else {
//       clearInterval(timer)
//       submitQuiz()
//     }
//   }, 1000)
// }

const startTimer = (endTime: number) => {
  timer = setInterval(() => {
    const now = Date.now()
    const remaining = Math.floor((endTime - now) / 1000)

    if (remaining > 0) {
      timeLeft.value = remaining
    } else {
      timeLeft.value = 0
      clearInterval(timer)
      submitQuiz()
    }
  }, 1000)
}

// Auto-save des réponses
let saveTimeout: any = null

const autoSave = () => {
  if (saveTimeout) clearTimeout(saveTimeout)

  saveTimeout = setTimeout(async () => {
    try {
      await api.post(`/results/quiz/${route.params.id}/save`, {
        answers: answers.value
      })
    } catch (err) {
      console.error("Auto-save error", err)
    }
  }, 500) // attend 500ms après dernière action
}

// Sélection d'une réponse
const selectAnswer = (questionIndex: number, optionIndex: number) => {
  answers.value[questionIndex] = optionIndex
  autoSave()
}



// Soumission du quiz
// const submitQuiz = async () => {

//   clearInterval(timer)

//   try {
//     const res = await api.post(`/results/quiz/${route.params.id}/submit`, {
//       answers: answers.value
//     })

//     score.value = res.data.score

//   } catch (err: any) {

//     alert(err.response?.data?.message || "Erreur")

//   }
// }


const isSubmitting = ref(false);

const submitQuiz = async () => {
  if (isSubmitting.value) return
  isSubmitting.value = true

  clearInterval(timer)

  try {
    const res = await api.post(`/results/quiz/${route.params.id}/submit`, {
      answers: answers.value
    })

    score.value = res.data.score

  } catch (err: any) {
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


    <p>Temps restant en seconde: {{ timeLeft }} s ⏱️</p>

    <div v-for="(q, index) in quiz.questions" :key="index" style="margin-bottom:20px">
      <h3>{{ q.question }}</h3>

      <div v-for="(option, i) in q.options" :key="i">
        <label>
          <!-- <input type="radio" :name="'question' + index" :value="i" -->
          <input 
          type="radio" 
          :name="'question' + index" 
          :value="i" 
          :checked="answers[Number(index)] === i"
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
