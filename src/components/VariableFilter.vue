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
  { text: 'Salinidad (so)', value: 'so', source: 'MC' },
  { text: 'Temperatura Superficial del Mar (SST)', value: 'SST', source: 'OISST' },
  { text: 'Anomalía SST (ANOM)', value: 'ANOM', source: 'OISST' },
  { text: 'Temperatura Aire a 2m (T2m)', value: 'T2m', source: 'ERA5' },
  { text: 'Presión Superficial (SPR)', value: 'SPR', source: 'ERA5' },
  { text: 'Precipitación (PPT)', value: 'PPT', source: 'ERA5' },
  { text: 'Magnitud Viento (MAG)', value: 'MAG', source: 'ERA5' },
  { text: 'Dirección Viento (DIR)', value: 'DIR', source: 'ERA5' },
]
</script>
