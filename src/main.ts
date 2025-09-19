import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import type { ElectronAPI } from './types/electron'

const app = createApp(App)

// 全局属性
app.config.globalProperties.$electronAPI = window.electronAPI as ElectronAPI

app.mount('#app')
