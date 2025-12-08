import { ref, watch } from 'vue'
import { ZoneInfoService } from '@/services/ZoneInfoService'

const cache = new Map()

export function useZoneInformation(zoneRef) {
  const info = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const reset = () => {
    info.value = null
    error.value = null
  }

  const fetchInfo = async (cod) => {
    if (!cod) {
      reset()
      return
    }

    if (cache.has(cod)) {
      info.value = cache.get(cod)
      error.value = null
      return
    }

    loading.value = true
    error.value = null
    try {
      const result = await ZoneInfoService.getByCod(cod)
      info.value = result
      cache.set(cod, result)
    } catch (err) {
      console.error('Fallo al obtener información de la zona:', err)
      error.value = 'No se pudo cargar la información.'
      info.value = null
    } finally {
      loading.value = false
    }
  }

  watch(zoneRef, fetchInfo, { immediate: true })

  return {
    info,
    loading,
    error,
  }
}
