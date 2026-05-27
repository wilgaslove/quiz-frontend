<script setup>

</script>
<template>
    <nav >
        <!-- <h1>Quiz App</h1> -->

        <div  class="flex justify-center gap-[80px] p-4 bg-gray-800 text-white ">
            <router-link to="/" class="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 px-4 py-2 rounded-lg">Accueil</router-link>
            <router-link to="/admin/create" class="transition ease-in-out delay-150 bg-green-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-600 duration-300 px-4 py-2 rounded-lg">Créer un Quiz</router-link>
            <router-link to="/admin" class="transition ease-in-out delay-150 bg-red-500 hover:-translate-y-1 hover:scale-110 hover:bg-red-600 duration-300 px-4 py-2 rounded-lg">Admin</router-link>
        </div>
    </nav>
</template>