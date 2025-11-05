<template>
  <v-select
    v-model="variable"
    :items="variables"
    item-title="text"
    item-value="value"
    variant="outlined"
    density="compact"
    hide-details
    placeholder="Seleccionar variable"
    class="filter-select"
    menu-icon="mdi-menu-down"
  />
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

const variable = ref(props.modelValue)

watch(variable, (val) => {
  emit('update:modelValue', val)
})

const variables = [
  { text: 'Temperatura superficial del mar (C)', value: 'SST', source: 'OISST' },
  { text: 'Anomalia temperatura superficial (C)', value: 'ANOM', source: 'OISST' },
  { text: 'Salinidad (psu)', value: 'so', source: 'MC' },
  { text: 'Nivel medio del mar (m)', value: 'zos', source: 'MC' },
  { text: 'Magnitud corriente superficial (m/s)', value: 'Magnitud', source: 'MC' },
  { text: 'Direccion corriente superficial (grados)', value: 'Direccion', source: 'MC' },
  { text: 'Temperatura aire 2m (C)', value: 'T2m', source: 'ERA5' },
  { text: 'Magnitud viento (m/s)', value: 'MAG', source: 'ERA5' },
  { text: 'Direccion viento (grados)', value: 'DIR', source: 'ERA5' },
  { text: 'Presion superficial (hPa)', value: 'SPR', source: 'ERA5' },
  { text: 'Precipitacion (mm)', value: 'PPT', source: 'ERA5' },
]
</script>
