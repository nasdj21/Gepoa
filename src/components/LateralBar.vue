<template>
  <v-card
    class="pa-4 d-flex flex-column filter-card"
    width="300"

  >
    <v-card-title>Filtros de Navegación</v-card-title>
    <v-divider class="mb-4"></v-divider>

    <!-- Aquí irán los subcomponentes -->
    <DateFilter v-model:start="dateStart" v-model:end="dateEnd" />

    <VariableFilter v-model="selectedVariable" />

    <ZoneFilter v-model="selectedZone" class="mt-3" />

  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import DateFilter from './DateFilter.vue'
import VariableFilter from './VariableFilter.vue'
import ZoneFilter from './ZoneFilter.vue'

const selectedVariable = ref(null)
const selectedZone = ref(null)
const dateStart = ref(null)
const dateEnd = ref(null)

defineExpose({
  variable: selectedVariable,
  zone: selectedZone,
  dateStart,
  dateEnd,
})
</script>

<style scoped>
.filter-card {
  max-width: 320px;
  max-height: calc(100vh - 32px);
  overflow-y: auto;
}
</style>
