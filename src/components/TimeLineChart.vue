<template>
  <v-card
  class="pa-4 mt-4 d-flex flex-column flex-grow-1"
  style="min-height: 0;"
  >

    <v-card-title>Línea de tiempo</v-card-title>

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
import { ref, watch } from 'vue'

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

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true },
  },
  scales: {
    x: { ticks: { maxRotation: 90, minRotation: 45 } },
  },
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
  const mcVars = ['so']

  if (era5Vars.includes(variable)) return ERA5Service
  if (oisstVars.includes(variable)) return OISSTService
  if (mcVars.includes(variable)) return MCService
  return ERA5Service
}

// 🔹 Actualizar datos cuando cambie zona/variable/fechas
watch(
  () => [props.zone, props.variable, props.dateStart, props.dateEnd],
  async ([zone, variable, start, end]) => {
    if (!zone || !variable) {
      chartData.value.labels = []
      chartData.value.datasets[0].data = []
      return
    }

    const s = toISODate(start)
    const e = toISODate(end)
    const service = pickService(variable)

    const rows = await service.getValuesByCodAndDate(zone, variable, s, e)

    // Reemplazar el objeto completo para asegurar reactividad del chart
    chartData.value = {
      labels: rows.map((r) => r.fecha),
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
