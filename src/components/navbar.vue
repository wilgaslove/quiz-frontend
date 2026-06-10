<script setup>
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
</script>
<template>
    <nav class="relative ">
       
        <div
            class="flex justify-center fixed top-0 gap-[80px] p-4 border-double border-4 border-gray-300 rounded-lg shadow-md w-full bg-gray-800 text-white ">
            <router-link to="/"
                class="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 px-4 py-2 rounded-lg">Liste
                des Quiz</router-link>
            <router-link to="/admin/create"
                class="transition ease-in-out delay-150 bg-green-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-600 duration-300 px-4 py-2 rounded-lg">Créer
                un Quiz</router-link>
            <router-link to="/admin"
                class="transition ease-in-out delay-150 bg-yellow-500 hover:-translate-y-1 hover:scale-110 hover:bg-yellow-600 duration-300 px-4 py-2 rounded-lg">Admin</router-link>
            <router-link to="/login"
                class="transition ease-in-out delay-150 bg-red-500 hover:-translate-y-1 hover:scale-110 hover:bg-red-600 duration-300 px-4 py-2 rounded-lg">Déconnexion</router-link>
            <div class="absolute top-4 right-4">
                <button @click="themeStore.toggleTheme()" class="px-3 py-2 rounded-lg border">
                    {{ themeStore.dark ? '☀️' : '🌙' }}
                </button>
            </div>

        </div>
    </nav>

</template>