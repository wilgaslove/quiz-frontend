<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import api from "@/services/api"

const router = useRouter()

const email = ref("")
const password = ref("")
const error = ref("")

const login = async () => {
  try {
    const res = await api.post("/auth/login", {
      email: email.value,
      password: password.value
    })

    // 🔐 stocker
    localStorage.setItem("token", res.data.token)
    localStorage.setItem("user", JSON.stringify(res.data.user))

    const role = res.data.user.role

    // 🚀 redirection selon rôle
    if (role === "admin") {
      router.push("/admin")
    } else {
      router.push("/dashboard")
    }

  } catch (err: any) {
    error.value = err.response?.data?.message || "Erreur login"
  }
}
</script>

<template>
  <div class="login">
    <h2>Connexion</h2>

    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Mot de passe" required />

      <button type="submit">Se connecter</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>



<style scoped>
.login {
  max-width: 300px;
  margin: auto;
  margin-top: 100px;
}
.error {
  color: red;
}
</style>