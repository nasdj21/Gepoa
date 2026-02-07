import { ref, computed, watch } from 'vue'
import { ERA5Service } from '@/services/ERA5Service'
import { OISSTService } from '@/services/OISSTService'
import { MCService } from '@/services/MCService'
import { TimelineCsvExporter } from '@/utils/TimelineCsvExporter'

const MAX_VISIBLE_LABELS = 12,
  ERA5_VARIABLES = ['T2m', 'SPR', 'PPT', 'MAG', 'DIR'],
  OISST_VARIABLES = ['SST', 'ANOM'],
  MC_VARIABLES = ['so', 'zos', 'Magnitud', 'Direccion']

const createChartData = (labels, data) => ({
  labels,
  datasets: [{ label: 'Media', data, borderColor: '#1976d2', tension: 0.3, fill: false }],
})

const pickService = (variable) => {
  if (ERA5_VARIABLES.includes(variable)) return ERA5Service
  if (OISST_VARIABLES.includes(variable)) return OISSTService
  return MC_VARIABLES.includes(variable) ? MCService : ERA5Service
}

const toISODate = (value) => TimelineCsvExporter.toISODate(value)

export function useTimelineChartData(props) {
  const chartData = ref(createChartData([], []))
  const currentRows = ref([])
  const tickStep = ref(1)
  const hasData = computed(() => chartData.value.datasets?.[0]?.data?.length > 0)
  const resetState = () => {
    currentRows.value = []
    tickStep.value = 1
    chartData.value = createChartData([], [])
  }

  watch(
    () => [props.zone, props.variable, props.dateStart, props.dateEnd],
    async ([zone, variable, start, end]) => {
      if (!zone || !variable) return resetState()
      const rows = await pickService(variable).getValuesByCodAndDate(
        zone,
        variable,
        toISODate(start),
        toISODate(end)
      )
      currentRows.value = rows
      const labels = rows.map((r) => r.fecha)
      tickStep.value = labels.length ? Math.max(1, Math.ceil(labels.length / MAX_VISIBLE_LABELS)) : 1
      chartData.value = createChartData(labels, rows.map((r) => r[variable] ?? null))
    },
    { immediate: true }
  )

  const downloadCsv = () => {
    if (!currentRows.value.length) return
    TimelineCsvExporter.download({
      rows: currentRows.value,
      variable: props.variable,
      zone: props.zone,
      dateStart: props.dateStart,
      dateEnd: props.dateEnd,
    })
  }

  return { chartData, tickStep, hasData, downloadCsv }
}
