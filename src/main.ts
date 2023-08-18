
// import Vue from 'vue'
// import { createApp } from 'vue'
// import App from './App.vue'
// import Vuetify from 'vuetify'
// import './assets/main.css'
// import 'vuetify/dist/vuetify.min.css' 

// createApp(App).mount('#app')
// App.use(Vuetify)



import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(vuetify).mount('#app')