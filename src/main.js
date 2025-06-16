import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import api from './plugins/api'
import { createPinia } from 'pinia'

const app = createApp(App)

app.config.globalProperties.$api = api
app.use(router)

const pinia = createPinia()
app.use(pinia)

app.mount('#app')
