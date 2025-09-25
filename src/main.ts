import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import type { ElectronAPI } from './types/electron'
import router from '@/router/index'

const app = createApp(App)

// 全局属性
app.config.globalProperties.$electronAPI = window.electronAPI as ElectronAPI

app.use(router)
app.mount('#app')
