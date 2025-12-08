<template>
  <v-card class="zone-card">
    <v-card-title class="d-flex align-center justify-space-between">
      <span>Informacion de la zona</span>
    </v-card-title>
    <v-divider />

    <v-card-text class="zone-card__body">
      <div v-if="!hasZone" class="text-caption">Selecciona una zona para ver sus datos.</div>

      <div v-else-if="loading" class="text-caption">Cargando informacion…</div>

      <div v-else-if="error" class="text-caption text-error">No se pudo cargar la informacion.</div>

      <template v-else-if="info">
        <h3 class="zone-card__title">{{ info.name || zone }}</h3>
        <p v-if="info.summary" class="zone-card__summary">{{ info.summary }}</p>
        <p v-else class="text-caption">No hay descripcion disponible para esta zona.</p>
      </template>

      <div v-else class="text-caption">Sin informacion disponible para esta zona.</div>
    </v-card-text>

    <v-divider class="zone-card__divider" />

    <v-card-text class="zone-card__timeline">
      <TimeLineChart
        :zone="zone"
        :variable="variable"
        :date-start="dateStart"
        :date-end="dateEnd"
        class="zone-card__timeline-card"
      />
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'
import { useZoneInformation } from '@/composables/useZoneInformation'
import TimeLineChart from '@/components/TimeLineChart.vue'

const props = defineProps({
  zone: String,
  variable: String,
  dateStart: String,
  dateEnd: String,
})

const zone = computed(() => props.zone)
const { info, loading, error } = useZoneInformation(zone)
const hasZone = computed(() => Boolean(props.zone))
</script>
