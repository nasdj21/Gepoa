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
import { AOEService } from '../services/AOEService'



const filters = ref(null) // aquí accedemos a lo expuesto en LateralBar
let map
let geoJsonLayer = null

const timelineZone = computed(() => filters.value?.zone ?? null)
const timelineVariable = computed(() => filters.value?.variable ?? null)
const timelineStart = computed(() => filters.value?.dateStart ?? null)
const timelineEnd = computed(() => filters.value?.dateEnd ?? null)

function tooltipGepoa(feature, layer) {
  const cod = feature.properties.COD
  const nombre = feature.properties.NOMBRE

  layer.bindTooltip(`<b>${nombre}</b><br>Código: ${cod}`, {
    sticky: true,
    direction: 'top',
    opacity: 0.9,
  })
}

onMounted(async () => {
  map = L.map('map').setView([-0.747267, -84.735793], 7) // Quito como centro inicial aprox

  const baseLayers = {
    'OpenStreetMap': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }),
    'Google Maps': L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; Google',
    }),
    'Satélite de Google': L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; Google',
    }),
    'National Geographic': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; National Geographic',
    }),
  }

  baseLayers['OpenStreetMap'].addTo(map)
  const layerControl = L.control.layers(baseLayers).addTo(map)

  const geojson = await AOEService.getAsGeoJson()

  geoJsonLayer = L.geoJSON(geojson, {
    style: { color: 'grey', weight: 2, fillColor: 'blue', fillOpacity: 0.3 },
    onEachFeature: tooltipGepoa,
  }).addTo(map)
  layerControl.addOverlay(geoJsonLayer, 'AOE')

  map.fitBounds(geoJsonLayer.getBounds())

  watch(
    timelineZone,
    (cod) => {
      if (!cod || !geoJsonLayer) return

      geoJsonLayer.eachLayer((layer) => {
        if (layer.feature.properties.COD === cod) {
          map.fitBounds(layer.getBounds(), { padding: [40, 40], maxZoom: 12 })
        }
      })
    }
  )

})
</script>
