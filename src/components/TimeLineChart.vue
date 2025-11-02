<template>
  <v-card class="pa-3 d-flex flex-column timeline-card">
    <v-card-title class="d-flex align-center justify-space-between">
      <span>Linea de tiempo</span>
      <v-btn
        v-if="shouldShowChart"
        size="small"
        variant="text"
        color="primary"
        @click="downloadCsv"
      >
        Descargar Datos
      </v-btn>
    </v-card-title>

    <Line
      v-if="shouldShowChart"
      :data="chartData"
      :options="chartOptions"
      :style="{ flex: 1, minHeight: '0px' }"
    />

    <div v-else-if="shouldShowNoData" class="text-caption">No hay datos disponibles.</div>
    <div v-else-if="shouldShowPrompt" class="text-caption">
      Selecciona una zona y variable para ver los datos.
    </div>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { useTimelineChartData } from '@/composables/useTimelineChartData'
import { useTimelineChartOptions } from '@/composables/useTimelineChartOptions'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

const props = defineProps({
  zone: String,
  variable: String,
  dateStart: String,
  dateEnd: String,
})

const { chartData, hasData, downloadCsv, tickStep } = useTimelineChartData(props)
const { chartOptions } = useTimelineChartOptions(chartData, tickStep)

const hasSelection = computed(() => Boolean(props.zone && props.variable))
const shouldShowChart = computed(() => hasSelection.value && hasData.value)
const shouldShowNoData = computed(() => hasSelection.value && !hasData.value)
const shouldShowPrompt = computed(() => !hasSelection.value)
</script>
