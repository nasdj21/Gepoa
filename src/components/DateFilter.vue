<template>
  <div class="date-filter">
    <div class="date-filter__field">
      <span class="date-filter__label">Fecha inicio</span>
      <v-menu
        v-model="menuStart"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="320px"
        min-width="320px"
      >
        <template #activator="{ props }">
          <v-text-field
            v-bind="props"
            readonly
            variant="outlined"
            density="comfortable"
            hide-details
            :model-value="formattedStart"
            placeholder="Seleccionar fecha inicio"
            class="date-filter__input"
            prepend-inner-icon="mdi-calendar"
          />
        </template>

        <v-date-picker
          :model-value="start"
          @update:modelValue="val => { emit('update:start', val); menuStart = false }"
        />
      </v-menu>
    </div>

    <div class="date-filter__field">
      <span class="date-filter__label">Fecha fin</span>
      <v-menu
        v-model="menuEnd"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="320px"
        min-width="320px"
      >
        <template #activator="{ props }">
          <v-text-field
            v-bind="props"
            readonly
            variant="outlined"
            density="comfortable"
            hide-details
            :model-value="formattedEnd"
            placeholder="Seleccionar fecha fin"
            class="date-filter__input"
            prepend-inner-icon="mdi-calendar"
          />
        </template>

        <v-date-picker
          :model-value="end"
          @update:modelValue="val => { emit('update:end', val); menuEnd = false }"
        />
      </v-menu>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  start: Date,
  end: Date,
})

const emit = defineEmits(['update:start', 'update:end'])

const menuStart = ref(false)
const menuEnd = ref(false)

const formattedStart = computed(() => formatDate(props.start))
const formattedEnd = computed(() => formatDate(props.end))

function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
}
</script>
