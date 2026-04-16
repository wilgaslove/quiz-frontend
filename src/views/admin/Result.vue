<script>

export default {

    data() {
        return {
            result: null
        }
    },

    async mounted() {

        const res = await fetch(`http://localhost:5000/api/results/my-results`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })

        const data = await res.json()

        this.result = data[data.length - 1] // dernier quiz

    }

}

</script>

<template>

    <div>

        <h1>Résultat du Quiz</h1>

        <div v-if="result">
            <p>Score : {{ result.score }} / {{ result.total }}</p>
            <p>{{ result.message }}</p>
        </div>

    </div>

</template>
