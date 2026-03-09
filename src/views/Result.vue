<script setup>
import { ref, onMounted } from "vue"
import api from "@/services/api"

const results = ref([])

const loadResults = async () => {
  const res = await api.get("/results/my")
  results.value = res.data
}

onMounted(loadResults)
</script>

<div v-for="r in results" :key="r._id" class="p-4 border mb-2">
  <h3 class="font-bold">{{ r.quiz.title }}</h3>
  <p>Score : {{ r.score }} / {{ r.total }}</p>
</div>
