// src/plugins/vuetify.js
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// Tema base (puedes ajustar colores)
const light = {
  dark: false,
  colors: {
    primary: '#0066CC',
    secondary: '#00A3A3',
    accent: '#FFC107',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: { light },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
})
