<template>
   <v-card class="filter-card">
    <header class="filter-card__header">
      <h2 class="filter-card__title">Filtros de navegación</h2>
      <p class="filter-card__subtitle">
        Define el rango de fechas, variable y zona para explorar los datos.
      </p>
    </header>


    <div class="filter-card__body">
      <section class="filter-card__group filter-card__group--dates">
        <DateFilter
          v-model:start="dateStart"
          v-model:end="dateEnd"
          class="filter-card__control"
        />
      </section>

    <section class="filter-card__group">
        <span class="filter-card__label">Variable</span>
        <VariableFilter v-model="selectedVariable" class="filter-card__control" />
      </section>

    <section class="filter-card__group">
        <span class="filter-card__label">Zona</span>
        <ZoneFilter v-model="selectedZone" class="filter-card__control" />
      </section>
    </div>

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
  setZone(value) {
    selectedZone.value = value
  },
  setVariable(value) {
    selectedVariable.value = value
  },
})
</script>

