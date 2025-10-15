<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const systemInfo = ref<string>('')
const message = ref<string>('')

// 显示系统信息
const showSystemInfo = (): void => {
  if (window.electronAPI) {
    const info = {
      平台: window.electronAPI.platform,
      Node版本: window.electronAPI.versions.node,
      Chrome版本: window.electronAPI.versions.chrome,
      Electron版本: window.electronAPI.versions.electron,
    }
    systemInfo.value = JSON.stringify(info, null, 2)
  } else {
    message.value = 'Electron API 不可用（当前在浏览器环境中运行）'
  }
}

// 打开文件
const openFile = async (): Promise<void> => {
  if (window.electronAPI) {
    try {
      const result = await window.electronAPI.openFile()
      console.log('🚀 ~ openFile ~ result:', result)
      message.value = result ? `已选择文件: ${result}` : '未选择文件'
    } catch (error) {
      message.value = `打开文件失败: ${(error as Error).message}`
    }
  } else {
    message.value = '文件操作功能仅在 Electron 环境中可用'
  }
}

// 最小化窗口
const minimizeWindow = async (): Promise<void> => {
  if (window.electronAPI) {
    try {
      await window.electronAPI.minimize()
      message.value = '窗口已最小化'
    } catch (error) {
      message.value = `操作失败: ${(error as Error).message}`
    }
  } else {
    message.value = '窗口控制功能仅在 Electron 环境中可用'
  }
}

// 组件挂载时的初始化
onMounted(() => {
  // 监听来自主进程的消息
  if (window.electronAPI && window.electronAPI.onMessage) {
    window.electronAPI.onMessage((_event: any, data: string) => {
      message.value = `收到主进程消息: ${data}`
    })
  }
})
</script>
<template>
  <header class="app-header">
    <h1>🚀 Electron + Vue 3 + Vite</h1>
    <p>现代化的桌面应用开发模板</p>
  </header>

  <main class="app-main">
    <div class="feature-grid">
      <div class="feature-card">
        <h3>⚡ Vite</h3>
        <p>极速的构建工具和开发服务器</p>
      </div>
      <div class="feature-card">
        <h3>🎯 Vue 3</h3>
        <p>渐进式 JavaScript 框架</p>
      </div>
      <div class="feature-card">
        <h3>🖥️ Electron</h3>
        <p>跨平台桌面应用开发</p>
      </div>
    </div>

    <div class="demo-section">
      <h2>功能演示</h2>

      <div class="demo-buttons">
        <button @click="showSystemInfo" class="demo-btn">显示系统信息</button>
        <button @click="openFile" class="demo-btn">打开文件</button>
        <button @click="minimizeWindow" class="demo-btn">最小化窗口</button>
        <button
          @click="
            () =>
              router.push({
                path: '/404',
              })
          "
          class="demo-btn"
        >
          Go 404
        </button>
      </div>

      <div v-if="systemInfo" class="info-display">
        <h3>系统信息</h3>
        <pre>{{ systemInfo }}</pre>
      </div>

      <div v-if="message" class="message-display">
        <p>{{ message }}</p>
      </div>
    </div>
  </main>

  <footer class="app-footer">
    <p>© 2025 Electron Vue Template - 基于 MIT 许可证</p>
  </footer>
</template>

<style scoped>
.app-header {
  text-align: center;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #66dbea 0%, #4ba28c 100%);
  color: white;
  margin-bottom: 2rem;
}

.app-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  font-weight: 700;
}

.app-header p {
  margin: 0;
  font-size: 1.2rem;
  opacity: 0.9;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
  padding: 0 1rem;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.feature-card h3 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: #333;
}

.feature-card p {
  margin: 0;
  color: #666;
  line-height: 1.6;
}

.demo-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.demo-section h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.demo-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.demo-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.demo-btn:hover {
  background: #5a6fd8;
}

.demo-btn:active {
  transform: translateY(1px);
}

.info-display,
.message-display {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
}

.info-display h3 {
  margin: 0 0 1rem 0;
  color: #333;
}

.info-display pre {
  background: #e9ecef;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  margin: 0;
  font-family: 'Courier New', monospace;
}

.message-display p {
  margin: 0;
  color: #666;
  font-style: italic;
}

.app-footer {
  text-align: center;
  padding: 2rem 1rem;
  margin-top: 3rem;
  background: #f8f9fa;
  color: #666;
}

.app-footer p {
  margin: 0;
}
</style>
