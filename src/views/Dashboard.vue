<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()

const user = localStorage.getItem("user")

const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  router.push("/login")
}
</script>

<template>
  <div class="dashboard">
    <h2>Dashboard</h2>

    <p v-if="user">
      Connecté en tant que :
      <strong>{{ JSON.parse(user).email }}</strong>
    </p>

    <button @click="logout">Déconnexion</button>
  </div>
</template>

<style scoped>

.dashboard {
  max-width: 400px;
  margin: 80px auto;
}
button {
  padding: 10px;
  background: black;
  color: white;
  border: none;
}
</style>