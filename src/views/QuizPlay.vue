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

  // charger durée du quiz
  timeLeft.value = quiz.value.duration || 60

  startTimer()
}

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

  const res = await api.post(`/quiz/${route.params.id}/submit`, {
    answers: answers.value
  })

  score.value = res.data.score
}

onMounted(loadQuiz)

onUnmounted(() => {
  clearInterval(timer)
})
</script>