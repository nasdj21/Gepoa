<template>
  <header class="app-header">
    <nav class="navbar" aria-label="Navegacion principal">
      <div class="navbar__brand">
        <img src="@/assets/Logo_gepoa.jpeg" alt="Geoportal logo" class="navbar__logo" />
      </div>

      <ul class="navbar__links" role="tablist">
        <li class="navbar__item" role="presentation">
          <button
            class="navbar__link"
            :class="{ 'navbar__link--active': activeTab === 'mapa' }"
            type="button"
            role="tab"
            aria-controls="tab-mapa"
            :aria-selected="activeTab === 'mapa'"
            id="tab-mapa-btn"
            @click="setTab('mapa')"
          >
            Mapa
          </button>
        </li>
        <li class="navbar__item" role="presentation">
          <button
            class="navbar__link"
            :class="{ 'navbar__link--active': activeTab === 'ayuda' }"
            type="button"
            role="tab"
            aria-controls="tab-ayuda"
            :aria-selected="activeTab === 'ayuda'"
            id="tab-ayuda-btn"
            @click="setTab('ayuda')"
          >
            Como usar el geoportal
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
const props = defineProps({
  activeTab: {
    type: String,
    default: 'mapa',
  },
})

const emit = defineEmits(['update:activeTab'])

function setTab(tab) {
  if (tab !== props.activeTab) {
    emit('update:activeTab', tab)
  }
}
</script>
