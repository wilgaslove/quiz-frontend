<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { useRoute } from "vue-router"
import api from "@/services/api"
import Footer from "@/components/Footer.vue"
const route = useRoute()

const quiz = ref<any>(null)
const answers = ref<number[]>([])
const score = ref<number | null>(null)

const timeLeft = ref(0)
let timer: any = null

// formatage du temps
const formatTime = (seconds: number) => {

  const hrs = Math.floor(seconds / 3600)

  const mins = Math.floor((seconds % 3600) / 60)

  const secs = seconds % 60

  return [
    hrs.toString().padStart(2, '0'),
    mins.toString().padStart(2, '0'),
    secs.toString().padStart(2, '0')
  ].join(':')

}





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
  <div class="py-[4rem]">
    <div class="mx-auto max-w-2xl my-10 ">
      <div v-if="quiz" class="flex justify-between max-w-2xl  mx-10 ">
        <h2 class="text-xl font-bold mb-2">{{ quiz.title }}</h2>
        <p class=" text-lg font-semibold">Temps restant: {{ formatTime(timeLeft) }} ⏱️</p>
      </div>
    </div>
    <div class="flex justify-center items-center  my-10">
      <div v-if="quiz" class="relative p-4 border-double border-4 border-gray-300 rounded-lg shadow-md w-full max-w-2xl">
        <div v-if="score !== null"
          class="absolute top-0 right-0 mb-4 p-3 bg-green-100 border border-green-400  text-xl text-green-700 rounded w-[12rem] ">
          <h2>Votre Note : {{ score }}/{{ quiz.questions.length }}</h2>
        </div>
        <div v-for="(q, index) in quiz.questions" :key="index" style="margin-bottom:20px">
          <h3 class="text-lg font-semibold">{{ q.question }}</h3>
          <div v-for="(option, i) in q.options" :key="i" class="mt-2">
            <label>
              <!-- <input type="radio" :name="'question' + index" :value="i" -->
              <input type="radio" :name="'question' + index" :value="i" :checked="answers[Number(index)] === i"
                @change="() => selectAnswer(Number(index), Number(i))" />
              {{ option }}
            </label>
          </div>
        </div>
        <div class="flex justify-around">
          <button @click="submitQuiz"
            class="transition ease-in-out delay-150 bg-red-600 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 px-4 py-2 text-white border-double border-4 rounded-lg">
            Soumettre
          </button>
          <button @click="$router.back()"
            class="transition ease-in-out delay-150 bg-blue-600 hover:-translate-y-1 hover:scale-110 hover:bg-gray-600 duration-300 px-4 py-2 text-white border-double border-4 rounded-lg">
            Retour
          </button>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center  my-10">
  </div>

  </div>
  <Footer />
</template>
