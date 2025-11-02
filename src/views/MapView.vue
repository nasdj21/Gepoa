<template>
  <v-container fluid class="pa-0 map-view-wrapper">
    <div class="map-view-wrapper__inner">
      <div id="map" class="map-view-wrapper__map"></div>

      <LateralBar ref="filters" class="map-view-wrapper__filters" />

      <TimeLineChart
        class="map-view-wrapper__timeline"
        :zone="timelineZone"
        :variable="timelineVariable"
        :date-start="timelineStart"
        :date-end="timelineEnd"
      />
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import L from 'leaflet'
import LateralBar from '@/components/LateralBar.vue'
import TimeLineChart from '@/components/TimeLineChart.vue'
import 'leaflet/dist/leaflet.css'
import { AOEService } from '@/services/AOEService'
import { useMapInteractions } from '@/composables/useMapInteractions'

const filters = ref(null)
let map = null
let geoJsonLayer = null
let pendingZoneSelection = null

const readFilterValue = (key) => {
  const exposed = filters.value?.[key]
  if (exposed && typeof exposed === 'object' && 'value' in exposed) {
    return exposed.value
  }
  return exposed ?? null
}

const writeFilterValue = (key, val) => {
  const exposed = filters.value?.[key]
  if (!exposed) return
  if (typeof exposed === 'object' && 'value' in exposed) {
    exposed.value = val
  } else {
    filters.value[key] = val
  }
}

const timelineZone = computed(() => readFilterValue('zone'))
const timelineVariable = computed(() => readFilterValue('variable'))
const timelineStart = computed(() => readFilterValue('dateStart'))
const timelineEnd = computed(() => readFilterValue('dateEnd'))

const { bindZoneInteractions } = useMapInteractions({
  onZoneSelect: (cod) => {
    handleZoneSelection(cod)
  },
})

const createBaseLayers = () => ({
  OpenStreetMap: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }),

  'Satelite de Google': L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: '&copy; Google',
  }),

})

function handleZoneSelection(cod) {
  if (!cod) return

  const currentFilters = filters.value
  if (!currentFilters) {
    pendingZoneSelection = cod
    return
  }

  if (typeof currentFilters.setZone === 'function') {
    currentFilters.setZone(cod)
  } else {
    writeFilterValue('zone', cod)
  }

  fitZone(cod)
  pendingZoneSelection = null
}

const defaultStyle = { color: 'grey', weight: 2, fillColor: 'blue', fillOpacity: 0.3 }
const activeStyle   = { color: 'darkred',  weight: 2, fillColor: 'darkred',  fillOpacity: 0.40 }


onMounted(async () => {
  map = L.map('map').setView([-0.747267, -84.735793], 7)

  const baseLayers = createBaseLayers()
  baseLayers.OpenStreetMap.addTo(map)
  L.control.layers(baseLayers).addTo(map)

  const geojson = await AOEService.getAsGeoJson()
  geoJsonLayer = L.geoJSON(geojson, {
    style: defaultStyle,
    onEachFeature: (feature, layer) => bindZoneInteractions({ feature, layer }),
  }).addTo(map)


  map.fitBounds(geoJsonLayer.getBounds())

  if (timelineZone.value) {
    fitZone(timelineZone.value)
  }
})

const fitZone = (cod) => {
  if (!cod || !geoJsonLayer || !map) return

  geoJsonLayer.eachLayer((layer) => {
    const isActive = layer.feature?.properties?.COD === cod
    layer.setStyle(isActive ? activeStyle : defaultStyle)
    if (isActive) {
      map.fitBounds(layer.getBounds(), {
      maxZoom: 10
    })
    }
  })
}


watch(timelineZone, (cod) => {
  fitZone(cod)
})

watch(
  () => filters.value,
  (current) => {
    if (!pendingZoneSelection || !current) return

    if (typeof current.setZone === 'function') {
      current.setZone(pendingZoneSelection)
    } else {
      writeFilterValue('zone', pendingZoneSelection)
    }

    fitZone(pendingZoneSelection)
    pendingZoneSelection = null
  }
)
</script>
