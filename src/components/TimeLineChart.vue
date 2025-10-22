<template>
  <v-card class="pa-3 d-flex flex-column timeline-card">

    <v-card-title class="d-flex align-center justify-space-between">
      <span>Línea de tiempo</span>
      <v-btn
        v-if="hasData"
        size="small"
        variant="text"
        color="primary"
        @click="downloadCsv"
      >
        Descargar CSV
      </v-btn>
    </v-card-title>

    <Line
      v-if="chartData.datasets[0].data.length"
      :data="chartData"
      :options="chartOptions"
      :style="{ flex: 1, minHeight: '0px' }"

    />

    <div v-else class="text-caption">No hay datos disponibles.</div>
  </v-card>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

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
import { ERA5Service } from '@/services/ERA5Service'
import { OISSTService } from '@/services/OISSTService'
import { MCService } from '@/services/MCService'



// Registrar componentes de Chart.js
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

const props = defineProps({
  zone: String,
  variable: String,
  dateStart: String,
  dateEnd: String,
})

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Valores',
      data: [],
      borderColor: '#1976d2',
      tension: 0.3,
      fill: false,
    },
  ],
})

const currentRows = ref([])

const MAX_VISIBLE_LABELS = 12
const tickStep = ref(1)
const tickRotation = ref(90) // Ajustar este valor si quieres otro ángulo

const chartOptions = computed(() => {
  const step = tickStep.value || 1
  const rotation = tickRotation.value ?? 45
  const labels = chartData.value.labels || []

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: rotation,
          minRotation: rotation,
          callback(value, index) {
            if (index % step !== 0) return ''
            return labels[index] ?? ''
          },
        },
      },
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 0,
      },
    },
  }
})

const hasData = computed(() => chartData.value.datasets?.[0]?.data?.length > 0)

function buildFilename() {
  const zonePart = props.zone ? `_${props.zone}` : ''
  const variablePart = props.variable ? `_${props.variable}` : ''
  const datePart = [props.dateStart, props.dateEnd]
    .filter(Boolean)
    .map((d) => toISODate(d))
    .join('-')
  const dateSuffix = datePart ? `_${datePart}` : ''
  return `gepoa${zonePart}${variablePart}${dateSuffix}.csv`
}

function downloadCsv() {
  if (!currentRows.value.length) return

  const header = ['fecha', props.variable || 'valor']
  const rows = currentRows.value.map((row) => [row.fecha, row[props.variable] ?? ''])
  const csvLines = [header, ...rows].map((line) => line.join(','))
  const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = buildFilename()
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function toISODate(val) {
  if (!val) return null
  const d = typeof val === 'string' ? new Date(val) : val
  if (Number.isNaN(d?.getTime?.())) return null
  return d.toISOString().slice(0, 10)
}

function pickService(variable) {
  if (!variable) return null
  const era5Vars = ['T2m', 'SPR', 'PPT', 'MAG', 'DIR']
  const oisstVars = ['SST', 'ANOM']
  const mcVars = ['so', 'zos', 'Magnitud', 'Dirección']

  if (era5Vars.includes(variable)) return ERA5Service
  if (oisstVars.includes(variable)) return OISSTService
  if (mcVars.includes(variable)) return MCService
  return ERA5Service
}



watch(
  () => [props.zone, props.variable, props.dateStart, props.dateEnd],
  async ([zone, variable, start, end]) => {
    if (!zone || !variable) {
      chartData.value.labels = []
      chartData.value.datasets[0].data = []
      currentRows.value = []
      tickStep.value = 1
      return
    }

    const s = toISODate(start)
    const e = toISODate(end)
    const service = pickService(variable)

    const rows = await service.getValuesByCodAndDate(zone, variable, s, e)
    currentRows.value = rows
    const labels = rows.map((r) => r.fecha)
    tickStep.value = labels.length ? Math.max(1, Math.ceil(labels.length / MAX_VISIBLE_LABELS)) : 1

    // Reemplazar el objeto completo para asegurar reactividad del chart
    chartData.value = {
      labels,
      datasets: [
        {
          label: 'Valores',
          data: rows.map((r) => r[variable] ?? null),
          borderColor: '#1976d2',
          tension: 0.3,
          fill: false,
        },
      ],
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.timeline-card {
  width: 100%;
  max-height: 280px;
}
</style>
