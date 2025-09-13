<template>
  <div>
    <!-- Fecha inicio -->
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
          {{ start ? formatDate(start) : 'Escoger fecha inicio' }}
        </v-btn>
      </template>

      <v-date-picker
        :model-value="start"
        @update:modelValue="val => { emit('update:start', val); menuStart = false }"
      />
    </v-menu>

    <!-- Fecha fin -->
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
          {{ end ? formatDate(end) : 'Escoger fecha fin' }}
        </v-btn>
      </template>

      <v-date-picker
        :model-value="end"
        @update:modelValue="val => { emit('update:end', val); menuEnd = false }"
      />
    </v-menu>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  start: Date,
  end: Date,
})


const emit = defineEmits(['update:start', 'update:end'])

const menuStart = ref(false)
const menuEnd = ref(false)

function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
}
</script>
