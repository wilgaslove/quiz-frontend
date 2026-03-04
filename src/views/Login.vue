<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref("");

const auth = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  try {
    await auth.login({
      email: email.value,
      password: password.value
    });

    router.push("/dashboard"); // redirection après login
  } catch (err) {
    error.value = err.response?.data?.message || "Erreur connexion";
  }
};
</script>

<template>
  <div class="login">
    <h2>Connexion</h2>

    <form @submit.prevent="handleLogin">
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