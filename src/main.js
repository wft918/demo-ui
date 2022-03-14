import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import '@/assets/font/font.css'

const pinia = createPinia()

const app = createApp(App)

app.use(router).use(pinia)

app.mount('#app')
