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

//la visialisation du password
const showPassword = ref(false)

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
        <input v-if="!isLogin" v-model="nom" type="text" placeholder="Nom prénoms" required />

        <!-- EMAIL -->
        <input v-model="email" type="email" placeholder="Email" required />

        <!-- PASSWORD -->
        <div class="password-field">

          <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="xxxxxxx" required />

          <span class="eye" @click="showPassword = !showPassword">
            {{ showPassword ? '👁' : '👁️' }}
          </span>

        </div>

        <button type="submit" :disabled="loading"
          class=" w-[10rem] mx-auto bg-blue-500  text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">

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
          class="link-btn font-bold ml-2 border-double border-4 border-gray-500 rounded-lg px-2 py-1  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 duration-300  "
          @click="isLogin = !isLogin">
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

.password-field {
  position: relative;
  display: flex;
  align-items: center;
}

.password-field input {
  width: 100%;
  padding-right: 45px;
}

.eye {
  position: absolute;
  right: 15px;
  cursor: pointer;
  user-select: none;
  font-size: 18px;
}


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
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
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



.error {
  color: red;
  margin-top: 10px;
  text-align: center;
}

.switch {
  margin-top: 20px;
  text-align: center;
}
</style>