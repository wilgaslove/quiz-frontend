<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import api from "@/services/api"

const router = useRouter()

const email = ref("")
const password = ref("")
const error = ref("")
const loading = ref(false)

const login = async () => {
  error.value = ""
  loading.value = true

  try {
    const res = await api.post("/auth/login", {
      email: email.value,
      password: password.value
    })

    const { token, user } = res.data

    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))

    router.push("/")
  } catch (err: any) {
    error.value = err.response?.data?.message || "Erreur connexion"
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <h2>Connexion</h2>

    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Mot de passe" required />

      <button :disabled="loading">
        {{ loading ? "Connexion..." : "Se connecter" }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 300px;
  margin: 80px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 10px;
}

button {
  padding: 10px;
  background: black;
  color: white;
  border: none;
}

.error {
  color: red;
}
</style>