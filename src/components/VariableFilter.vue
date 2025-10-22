<template>
  <v-select
    v-model="variable"
    :items="variables"
    item-title="text"
    item-value="value"
    label="Seleccionar variable"
    outlined
    dense
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
  { text: 'Temperatura Superficial del Mar (°C)', value: 'SST', source: 'OISST' },
  { text: 'Anomalía de Temperatura Superficial del Mar (°C)', value: 'ANOM', source: 'OISST' },
  { text: 'Salinidad (psu)', value: 'so', source: 'MC' },
  { text: 'Nivel medio del mar (m)', value: 'zos', source: 'MC' },
  { text: 'Magnitud de la corriente superficial (m/s)', value: 'Magnitud', source: 'MC' },
  { text: 'Dirección de la corriente superficial (°)', value: 'Dirección', source: 'MC' },
  { text: 'Temperatura del Aire a 2m (°C)', value: 'T2m', source: 'ERA5' },
  { text: 'Magnitud Viento (m/s)', value: 'MAG', source: 'ERA5' },
  { text: 'Dirección Viento (°)', value: 'DIR', source: 'ERA5' },
  { text: 'Presión Superficial (hPa)', value: 'SPR', source: 'ERA5' },
  { text: 'Precipitación (mm)', value: 'PPT', source: 'ERA5' },

]
</script>
