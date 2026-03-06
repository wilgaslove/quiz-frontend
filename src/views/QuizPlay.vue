<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { useRoute } from "vue-router"
import api from "@/services/api"

const route = useRoute()

const quiz = ref<any>(null)
const answers = ref<number[]>([])
const score = ref<number | null>(null)

const loadQuiz = async () => {
  const res = await api.get(`/quiz/${route.params.id}`)
  quiz.value = res.data
}

const selectAnswer = (questionIndex: number, optionIndex: number) => {
  answers.value[questionIndex] = optionIndex
}

const submitQuiz = async () => {
  const res = await api.post(`/quiz/${route.params.id}/submit`, {
    answers: answers.value
  })

  score.value = res.data.score
}

onMounted(loadQuiz)
</script>

<template>
  <div v-if="quiz">

    <h2>{{ quiz.title }}</h2>

    <div
      v-for="(q, index) in quiz.questions"
      :key="index"
      style="margin-bottom:20px"
    >
      <h3>{{ q.question }}</h3>

      <div
        v-for="(option, i) in q.options"
        :key="i"
      >
        <label>
          <input
            type="radio"
            :name="'question'+index"
            :value="i"
            @change="selectAnswer(index,i)"
          />
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