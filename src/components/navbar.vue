<script setup>

</script>
<template>
    <nav>
        <!-- <h1>Quiz App</h1> -->

        <div class="bg-red-500" style="gap: 20px">
            <router-link to="/" class="btn btn-primary text-red-500">Accueil</router-link>
            <router-link to="/admin/create" class="btn btn-secondary">Créer un quiz</router-link>
            <router-link to="/admin" class="btn btn-danger">Admin</router-link>
        </div>
    </nav>
</template>