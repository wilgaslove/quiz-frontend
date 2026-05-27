<script setup lang="ts">
import { ref, onMounted } from "vue"
import api from "@/services/api"
import navbar from "@/components/navbar.vue"

const stats = ref<any>(null)
const leaderboard = ref<any[]>([])

const loadStats = async () => {
  try {
    const res = await api.get("/results/admin/stats")
    stats.value = res.data

    const lb = await api.get("/results/leaderboard/global")
    leaderboard.value = lb.data

  } catch (err) {
    console.error(err)
  }
}

onMounted(loadStats)
</script>

<template>
  <navbar />
  <div class="p-6 max-w-4xl mx-auto">

    <!-- STATS -->
    <div v-if="stats" class="grid">
      <div class="card ">
        <h3 class="text-lg font-semibold">Quiz</h3>
        <p>{{ stats.totalQuizzes }}</p>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold">Utilisateurs</h3>
        <p>{{ stats.totalUsers }}</p>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold">Participations</h3>
        <p>{{ stats.totalResults }}</p>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold">Score moyen</h3>
        <p>{{ stats.avgScore.toFixed(2) }}</p>
      </div>
    </div>

    <!-- LEADERBOARD -->
    <h2 style="margin-top:30px">🏆 Top joueurs</h2>

    <table border="1" cellpadding="10" class="w-full mt-4 text-left"  style="border-collapse: collapse;">
      <thead>
        <tr>
          <th class="border px-4 py-2">Nom</th>
          <th class="border px-4 py-2">Score total</th>
          <th class="border px-4 py-2">Quiz passés</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in leaderboard" :key="user.userId">
          <td class="border px-4 py-2">{{ user.nom }}</td>
          <td class="border px-4 py-2 text-right">{{ user.totalScore }}</td>
          <td class="border px-4 py-2 text-right">{{ user.totalQuizzes }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>



<style scoped>
.grid {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.card {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  width: 150px;
  text-align: center;
}
</style>