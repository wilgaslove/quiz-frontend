<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth"

const router = useRouter()
const auth = useAuthStore()

const isLogin = ref(true)

const nom = ref("")
const email = ref("")
const password = ref("")

const error = ref("")
const loading = ref(false)

const submit = async () => {

  error.value = ""

  try {

    loading.value = true

    if (isLogin.value) {

      // LOGIN
      await auth.login({
        email: email.value,
        password: password.value
      })

    } else {

      // REGISTER
      await auth.register({
        nom: nom.value,
        email: email.value,
        password: password.value
      })

    }

    router.push(
      auth.user?.role === "admin"
        ? "/admin"
        : "/dashboard"
    )

  } catch (err: any) {

    error.value =
      err.response?.data?.message ||
      "Une erreur est survenue"

  } finally {

    loading.value = false

  }

}
</script>

<template>
  <div class="login-container">

    <div class="card">

      <h2>
        {{ isLogin ? "Connexion" : "Créer un compte" }}
      </h2>

      <form @submit.prevent="submit">

        <!-- NOM -->
        <input
          v-if="!isLogin"
          v-model="nom"
          type="text"
          placeholder="Nom"
          required
        />

        <!-- EMAIL -->
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
        />

        <!-- PASSWORD -->
        <input
          v-model="password"
          type="password"
          placeholder="Mot de passe"
          required
        />

        <button type="submit" :disabled="loading">

          {{
            loading
              ? "Chargement..."
              : isLogin
                ? "Se connecter"
                : "Créer un compte"
          }}

        </button>

      </form>

      <p v-if="error" class="error">
        {{ error }}
      </p>

      <!-- SWITCH -->
      <p class="switch">

        <span v-if="isLogin">
          Pas encore de compte ?
        </span>

        <span v-else>
          Déjà un compte ?
        </span>

        <button
          class="link-btn"
          @click="isLogin = !isLogin"
        >
          {{
            isLogin
              ? "S'inscrire"
              : "Se connecter"
          }}
        </button>

      </p>

    </div>

  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.card {
  width: 350px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0,0,0,0.08);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

button {
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 10px;
  text-align: center;
}

.switch {
  margin-top: 20px;
  text-align: center;
}

.link-btn {
  background: none;
  color: blue;
  cursor: pointer;
  margin-left: 5px;
}
</style>