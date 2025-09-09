<template>
  <v-row>
    <v-col cols="12" md="8">
      <v-card elevation="2">
        <v-card-title class="text-h6">Bienvenido</v-card-title>
        <v-card-subtitle>Base limpia para tu dashboard GEPOA</v-card-subtitle>
        <v-card-text>
          Este proyecto está listo con Vue 3 + Vuetify 3, Router y Pinia. Incluye layout con App Bar
          y Drawer. Desde aquí podrás integrar tu backend y los módulos de visualización (mapa,
          cuadros, etc.).
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="4">
      <v-card elevation="2">
        <v-card-title class="text-h6">Accesos rápidos</v-card-title>
        <v-card-text class="d-flex flex-column ga-2">
          <v-btn color="primary" variant="flat" :to="{ name: 'Map' }" prepend-icon="mdi-map"
            >Ir al Mapa</v-btn
          >
          <v-btn
            color="secondary"
            variant="flat"
            :to="{ name: 'About' }"
            prepend-icon="mdi-information-outline"
            >Acerca de</v-btn
          >
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
