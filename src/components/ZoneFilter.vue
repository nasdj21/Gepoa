<template>
  <v-select
    v-model="zone"
    :items="zones"
    item-title="nombre"
    item-value="cod"
    label="Seleccionar zona"
    outlined
    dense
  />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { AOEService } from '@/services/AOEService'

const props = defineProps({
  modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

const zone = ref(props.modelValue)
const zones = ref([])

onMounted(async () => {
  zones.value = await AOEService.getAllZones()
})

watch(zone, (val) => {
  emit('update:modelValue', val)
})

watch(
  () => props.modelValue,
  (val) => {
    if (val !== zone.value) {
      zone.value = val
    }
  }
)
</script>
