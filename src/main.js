import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'

import './assets/main.css'

createApp(App).use(createPinia()).use(router).use(vuetify).mount('#app')
