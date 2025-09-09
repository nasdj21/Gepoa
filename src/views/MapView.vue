<template>
  <v-container fluid class="d-flex pa-0" style="height: 100vh">
    <!-- Panel lateral -->
    <v-card class="pa-4" width="300">
      <v-card-title>Filtros de Navegación</v-card-title>

      <v-divider></v-divider>

      <v-menu
        v-model="menuStart"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template #activator="{ props }">
          <v-btn v-bind="props" outlined block class="mb-3">
            {{ dateStart ? formatDate(dateStart) : 'Escoger fecha inicio' }}
          </v-btn>
        </template>

        <v-date-picker v-model="dateStart" @update:modelValue="menuStart = false" />
      </v-menu>

      <v-divider></v-divider>

      <v-menu
        v-model="menuEnd"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template #activator="{ props }">
          <v-btn v-bind="props" outlined block class="mb-3">
            {{ dateEnd ? formatDate(dateEnd) : 'Escoger fecha de fin' }}
          </v-btn>
        </template>

        <v-date-picker v-model="dateEnd" @update:modelValue="menuEnd = false" />
      </v-menu>

      <v-select
        v-model="selectedVariable"
        :items="variables"
        item-title="text"
        item-value="value"
        label="Seleccionar variable"
        outlined
        dense
      />
      <div class="mt-4 text-caption">Pase el cursor sobre un poligono para ver el valor.</div>
    </v-card>

    <!-- Mapa como tal -->
    <div id="map" style="height: 100%; width: 100%"></div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { AOEService } from '../services/AOEService'
//import { MCService } from '../services/MCService'
//import { OISSTService } from '../services/OISSTService'
import { ERA5Service } from '../services/ERA5Service'

const selectedVariable = ref(null)
const dateStart = ref(null)
const dateEnd = ref(null)

const menuStart = ref(false)
const menuEnd = ref(false)

function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

const variables = [
  { text: 'Salinidad (so)', value: 'so', source: 'MC' },
  { text: 'Temperatura Superficial del Mar (SST)', value: 'SST', source: 'OISST' },
  { text: 'Anomalía SST (ANOM)', value: 'ANOM', source: 'OISST' },
  { text: 'Temperatura Aire a 2m (T2m)', value: 'T2m', source: 'ERA5' },
  { text: 'Viento U10', value: 'U10', source: 'ERA5' },
  { text: 'Viento V10', value: 'V10', source: 'ERA5' },
  { text: 'Presión Superficial (SPR)', value: 'SPR', source: 'ERA5' },
  { text: 'Precipitación (PPT)', value: 'PPT', source: 'ERA5' },
  { text: 'Magnitud Viento (MAG)', value: 'MAG', source: 'ERA5' },
  { text: 'Dirección Viento (DIR)', value: 'DIR', source: 'ERA5' },
]

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

  layer.on('mouseover', async () => {
    let content = `<b>${feature.properties.NOMBRE}</b><br>Código: ${cod}`

    if (selectedVariable.value) {
      const variable = variables.find((v) => v.value === selectedVariable.value)

      if (variable.source === 'ERA5') {
        const avgRow = await ERA5Service.getAveragesByCodAndDate(
          cod,
          toPgDate(dateStart.value),
          toPgDate(dateEnd.value),
        )
        if (avgRow) {
          const key = `${variable.value.toLowerCase()}_avg`
          content += `<br>${variable.text}: ${avgRow[key] ?? 'N/A'}`
        } else {
          content += `<br>${variable.text}: N/A`
        }
      }
    }

    layer.bindTooltip(content, { sticky: true }).openTooltip()
  })

  layer.on('mouseout', () => {
    layer.closeTooltip()
  })
}

onMounted(async () => {
  const map = L.map('map').setView([-0.747267, -84.735793], 7) // Quito como centro inicial aprox

  // Tile layer de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  const geojson = await AOEService.getAsGeoJson()

  console.log('GeoJSON:', geojson)

  const layer = L.geoJSON(geojson, {
    style,
    onEachFeature: tooltipGepoa,
  }).addTo(map)

  map.fitBounds(layer.getBounds)
})
</script>
