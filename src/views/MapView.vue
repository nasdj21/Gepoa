<template>
  <v-container fluid class="d-flex pa-0" style="height: 100vh">
    <!-- Panel lateral -->
    <LateralBar ref="filters" />

    <!-- Mapa como tal -->
    <div id="map" style="height: 100%; width: 100%"></div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LateralBar from '@/components/LateralBar.vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { AOEService } from '../services/AOEService'
//import { MCService } from '../services/MCService'
//import { OISSTService } from '../services/OISSTService'
import { ERA5Service } from '../services/ERA5Service'


const filters = ref(null) // aquí accedemos a lo expuesto en LateralBar



function style() {
  return {
    color: 'grey',
    weight: 2,
    fillColor: 'blue',
    fillOpacity: 0.3,
  }
}

function toPgDate(date) {
  if (!date) return null
  return new Date(date).toISOString().split('T')[0] // yyyy-mm-dd
}

async function tooltipGepoa(feature, layer) {
  const cod = feature.properties.COD
  const nombre = feature.properties.NOMBRE

  layer.bindTooltip(`<b>${nombre}</b><br>Código: ${cod}`, {
    sticky: true,
    direction: 'top',
    opacity: 0.9,
  })

  layer.on('mouseover', async () => {
    if (filters.value?.selectedVariable) {
      const variable = filters.value.selectedVariable

      if (variable.source === 'ERA5') {
        const avgRow = await ERA5Service.getAveragesByCodAndDate(
          cod,
          toPgDate(filters.value.dateStart),
          toPgDate(filters.value.dateEnd),
        )
        const val = avgRow ? (avgRow[`${variable.value.toLowerCase()}_avg`] ?? 'N/A') : 'N/A'
        layer.setTooltipContent(`<b>${nombre}</b><br>Código: ${cod}<br>${variable.text}: ${val}`)
      }
    }
  })
}

onMounted(async () => {
  const map = L.map('map').setView([-0.747267, -84.735793], 7) // Quito como centro inicial aprox

  // Tile layer de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  const geojson = await AOEService.getAsGeoJson()

  const layer = L.geoJSON(geojson, {
    style,
    onEachFeature: tooltipGepoa,
  }).addTo(map)

  map.fitBounds(layer.getBounds)


})
</script>
