<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import api from "@/services/api"
import navbar from "@/components/navbar.vue"

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

<navbar />

  <div class=" shadow-2xl mx-auto max-w-2xl my-8 border-solid border-2 border-gray-300 p-6 rounded-lg">
    <h1 class="text-2xl font-bold mb-4">Créer un Quiz</h1>
    <div class="grid grid-rows-2 grid-flow-col  gap-4">
      <input v-model="title" placeholder="Titre" class="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input v-model="description" placeholder="Description" class="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input v-model="duration" type="number" placeholder="Durée" class="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button @click="createQuiz" class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Créer</button>
    </div>
    <div v-for="(q, qIndex) in questions" :key="qIndex" class="mt-6 p-4 border border-gray-300 rounded-md">
      <input v-model="q.question" placeholder="Question"  class="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <div v-for="(opt, oIndex) in q.options" :key="oIndex">
        <input v-model="q.options[oIndex]" placeholder="Option" class="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="radio" :name="'correct' + qIndex" :value="oIndex" v-model="q.correctAnswer" />
        Bonne réponse
      </div>
      <button @click="addOption(qIndex)" class="bg-blue-500 text-white my-2 py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">+ Option</button>
    </div>
    <button @click="addQuestion" class="bg-green-500 text-white my-2 py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500  ">+ Question
    
    </button>
  </div>
</template>

<style scoped>

</style>