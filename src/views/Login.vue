<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth"
import { useThemeStore } from '@/stores/theme'

const router = useRouter()
const auth = useAuthStore()
const themeStore = useThemeStore()

const isLogin = ref(true)

const nom = ref("")
const email = ref("")
const password = ref("")

const error = ref("")
const loading = ref(false)

const showPassword = ref(false)

const submit = async () => {
  error.value = ""

  try {
    loading.value = true

    if (isLogin.value) {
      await auth.login({
        email: email.value,
        password: password.value,
      })
    } else {
      await auth.register({
        nom: nom.value,
        email: email.value,
        password: password.value,
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

  <div class="absolute top-4 right-4">
  <button
    @click="themeStore.toggleTheme()"
    class="px-3 py-2 rounded-lg border"
  >
    {{ themeStore.dark ? '☀️' : '🌙' }}
  </button>
</div>
  <div
    class="min-h-screen flex items-center justify-center
           bg-gray-100 dark:bg-gray-900
           text-gray-900 dark:text-white"
  >
    <div
      class="w-[380px] p-8 rounded-xl shadow-lg
             bg-white dark:bg-gray-800"
    >
      <h2 class="text-2xl font-bold text-center mb-6">
        {{ isLogin ? "Connexion" : "Créer un compte" }}
      </h2>

      <form @submit.prevent="submit" class="flex flex-col gap-4">
        
        <!-- NOM -->
        <input
          v-if="!isLogin"
          v-model="nom"
          type="text"
          placeholder="Nom prénoms"
          required
          class="p-3 rounded-lg border
                 bg-white dark:bg-gray-700
                 dark:text-white
                 border-gray-300 dark:border-gray-600"
        />

        <!-- EMAIL -->
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
          class="p-3 rounded-lg border
                 bg-white dark:bg-gray-700
                 dark:text-white
                 border-gray-300 dark:border-gray-600"
        />

        <!-- PASSWORD -->
        <div class="relative">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Mot de passe"
            required
            class="w-full p-3 pr-12 rounded-lg border
                   bg-white dark:bg-gray-700
                   dark:text-white
                   border-gray-300 dark:border-gray-600"
          />

          <button
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2"
            @click="showPassword = !showPassword"
          >
            {{ showPassword ? "🙈" : "👁️" }}
          </button>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="mx-auto w-40 bg-blue-500 text-white py-2 px-4 rounded-lg
                 hover:bg-blue-600
                 disabled:opacity-50
                 transition duration-300"
        >
          {{
            loading
              ? "Chargement..."
              : isLogin
                ? "Se connecter"
                : "Créer un compte"
          }}
        </button>
      </form>

      <p
        v-if="error"
        class="text-red-500 text-center mt-4"
      >
        {{ error }}
      </p>

      <div class="text-center mt-6">
        <span v-if="isLogin">
          Pas encore de compte ?
        </span>

        <span v-else>
          Déjà un compte ?
        </span>

        <button
          type="button"
          @click="isLogin = !isLogin"
          class="ml-2 px-3 py-1 rounded-lg
                 bg-blue-500 text-white
                 hover:bg-blue-600"
        >
          {{
            isLogin
              ? "S'inscrire"
              : "Se connecter"
          }}
        </button>
      </div>
    </div>
  </div>
</template>