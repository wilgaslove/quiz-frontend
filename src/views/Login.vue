<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth"

const router = useRouter()
const auth = useAuthStore()

const email = ref("")
const password = ref("")
const error = ref("")

const login = async () => {

  try {

    await auth.login({
      email: email.value,
      password: password.value
    })

    console.log(auth.user)

    router.push(
      auth.user?.role === "admin"
        ? "/admin"
        : "/dashboard"
    )

  } catch (err: any) {

    error.value =
      err.response?.data?.message ||
      "Erreur login"

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