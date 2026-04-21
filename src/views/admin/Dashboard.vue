<script setup lang="ts">
import { ref, onMounted } from "vue"
import api from "@/services/api"

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
  <div class="p-6">
    <h1>📊 Dashboard Admin</h1>

    <!-- STATS -->
    <div v-if="stats" class="grid">
      <div class="card">
        <h3>Quiz</h3>
        <p>{{ stats.totalQuizzes }}</p>
      </div>

      <div class="card">
        <h3>Utilisateurs</h3>
        <p>{{ stats.totalUsers }}</p>
      </div>

      <div class="card">
        <h3>Participations</h3>
        <p>{{ stats.totalResults }}</p>
      </div>

      <div class="card">
        <h3>Score moyen</h3>
        <p>{{ stats.avgScore.toFixed(2) }}</p>
      </div>
    </div>

    <!-- LEADERBOARD -->
    <h2 style="margin-top:30px">🏆 Top joueurs</h2>

    <table border="1" cellpadding="10">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Score total</th>
          <th>Quiz passés</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in leaderboard" :key="user.userId">
          <td>{{ user.nom }}</td>
          <td>{{ user.totalScore }}</td>
          <td>{{ user.totalQuizzes }}</td>
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