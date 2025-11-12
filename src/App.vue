<template>
  <v-app>
    <GeoportalNavbar v-model:active-tab="activeTab" />
    <main class="app-layout">
      <section
        id="tab-mapa"
        role="tabpanel"
        aria-labelledby="tab-mapa-btn"
        v-show="activeTab === 'mapa'"
        class="app-layout__panel"
      >
        <MapView />
      </section>
      <section
        id="tab-ayuda"
        role="tabpanel"
        aria-labelledby="tab-ayuda-btn"
        v-show="activeTab === 'ayuda'"
        class="app-layout__panel app-layout__panel--help"
      >
        <HelpPanel />
      </section>
    </main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import GeoportalNavbar from '@/components/GeoportalNavbar.vue'
import MapView from '@/views/MapView.vue'
import HelpPanel from '@/components/HelpPanel.vue'

const activeTab = ref('mapa')
</script>

<style scoped>
.app-layout {
  height: 100%;
}

.app-layout__panel {
  height: 100%;
}

.app-layout__panel--help {
  padding-top: 60px;
}
</style>
