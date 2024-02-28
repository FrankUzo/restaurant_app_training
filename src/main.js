import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import axios from 'axios'

const app = createApp(App).use(router).use(bootstrap)

app.config.globalProperties.axios = axios
app.config.globalProperties.restaurantsBaseURL = 'https://api.elpizodispatch.com/'
app.config.globalProperties.storageURL = 'https://elpizodispatch.com/storage/'

app.mount('#app')
