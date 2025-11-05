import { computed, ref } from 'vue'

export function useTimelineChartOptions(chartData, tickStep) {
  const tickRotation = ref(90)

  const chartOptions = computed(() => {
    const step = tickStep.value || 1
    const rotation = tickRotation.value ?? 45
    const labels = chartData.value.labels || []

    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false,
      },
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
          hoverRadius: 3,
          hitRadius: 8,
        },
      },
    }
  })

  return {
    chartOptions,
    tickRotation,
  }
}
