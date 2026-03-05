<script setup lang="ts">
import { useRoute } from "vue-router"

const route = useRoute()

const quizId = route.params.id

console.log("Quiz ID :", quizId)
</script>

<template>
  <div>
    <h2>Quiz</h2>
    <p>ID du quiz : {{ quizId }}</p>
  </div>
</template>