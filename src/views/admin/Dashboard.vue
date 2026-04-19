<script setup>
import { onMounted, ref } from "vue"
import api from "@/services/api"
import navbar from "@/components/navbar.vue"

const stats = ref(null)


onMounted(async () => {
  // const res = await api.get("/results/all")
  // stats.value = res.data
})
</script>

<template>
  <navbar />
  <div>
    <h1>Admin Dashboard</h1>

    <button @click="$router.push('/admin/create')">Créer un quiz</button>

    <div v-if="stats">
      <p>Total résultats: {{ stats.length }}</p>
    </div>
  </div>
</template>