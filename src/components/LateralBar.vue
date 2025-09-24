<template>
  <v-card
  class="pa-4 d-flex flex-column"
  width="300"
  style="height: 100vh; overflow: hidden;"
  >
    <v-card-title>Filtros de Navegación</v-card-title>
    <v-divider class="mb-4"></v-divider>

    <!-- Aquí irán los subcomponentes -->
    <DateFilter v-model:start="dateStart" v-model:end="dateEnd" />

    <VariableFilter v-model="selectedVariable" />

    <ZoneFilter v-model="selectedZone" class="mt-3" />

    <TimeLineChart
    :zone="selectedZone"
    :variable="selectedVariable"
    :date-start="dateStart"
    :date-end="dateEnd"
    class="flex-grow-1 d-flex flex-column"
    style="min-height: 0;"
    />




    <div class="mt-4 text-caption">
      Pase el cursor sobre un polígono para ver el valor.
    </div>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import DateFilter from './DateFilter.vue'
import VariableFilter from './VariableFilter.vue'
import ZoneFilter from './ZoneFilter.vue'
import TimeLineChart from './TimeLineChart.vue'

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
