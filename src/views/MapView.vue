<template>
  <v-container fluid class="pa-0" style="height: 100vh">
    <div id="map" style="height: 100%; width: 100%"></div>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { AOEService } from '../services/AOEService'

function style() {
  return {
    color: 'grey',
    weight: 2,
    fillColor: 'blue',
    fillOpacity: 0.3,
  }
}

function tooltipGepoa(feature, layer) {
  if (feature.properties) {
    layer.bindPopup(`
      <b>${feature.properties.NOMBRE}</b><br>
      Código: ${feature.properties.COD}
    `)
  }
}

onMounted(async () => {
  const map = L.map('map').setView([-0.747267, -84.735793], 7) // Quito como centro inicial aprox

  // Tile layer de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  try {
    const geojson = await AOEService.getAsGeoJson()

    L.geoJSON(geojson, {
      style,
      onEachFeature: tooltipGepoa,
    }).addTo(map)
  } catch (err) {
    console.error('Error cargando poligonos GEPOA_AOE:', err)
  }
})
</script>
