<template>
  <v-container fluid class="pa-0" style="height: 100vh">
    <div id="map" style="height: 100%; width: 100%"></div>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

onMounted(() => {
  const map = L.map('map').setView([0, -78.5], 5) // Quito como centro inicial aprox

  // Tile layer de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  // Marcador de prueba
  L.marker([0, -78.5]).addTo(map).bindPopup('Centro del mapa').openPopup()
})
</script>
