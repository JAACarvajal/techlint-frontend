import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})

pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(pinia)

app.mount('#app')
