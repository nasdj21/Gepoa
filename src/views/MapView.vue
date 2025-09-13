<template>
  <v-container fluid class="d-flex pa-0" style="height: 100vh">
    <!-- Panel lateral -->
    <LateralBar ref="filters" />

    <!-- Mapa como tal -->
    <div id="map" style="height: 100%; width: 100%"></div>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import L from 'leaflet'
import LateralBar from '@/components/LateralBar.vue'
import 'leaflet/dist/leaflet.css'
import { AOEService } from '../services/AOEService'
//import { MCService } from '../services/MCService'
//import { OISSTService } from '../services/OISSTService'



const filters = ref(null) // aquí accedemos a lo expuesto en LateralBar
let map
let geoJsonLayer = null

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

  // Tile layer de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  const geojson = await AOEService.getAsGeoJson()

  geoJsonLayer = L.geoJSON(geojson, {
    style: { color: 'grey', weight: 2, fillColor: 'blue', fillOpacity: 0.3 },
    onEachFeature: tooltipGepoa,
  }).addTo(map)

  map.fitBounds(geoJsonLayer.getBounds())

  watch(
  () => filters.value?.zone,
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
