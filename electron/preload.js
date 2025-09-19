const { contextBridge, ipcRenderer } = require('electron')

// 暴露安全的 API 给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 平台信息
  platform: process.platform,
  
  // 版本信息
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron
  },

  // IPC 通信示例
  sendMessage: (message) => ipcRenderer.invoke('send-message', message),
  
  // 文件操作示例
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  saveFile: (content) => ipcRenderer.invoke('dialog:saveFile', content),

  // 窗口控制
  minimize: () => ipcRenderer.invoke('window:minimize'),
  maximize: () => ipcRenderer.invoke('window:maximize'),
  close: () => ipcRenderer.invoke('window:close'),

  // 监听主进程消息
  onMessage: (callback) => {
    ipcRenderer.on('main-message', callback)
  },

  // 移除监听器
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel)
  }
})

// 监听 DOM 加载完成
window.addEventListener('DOMContentLoaded', () => {
  // 可以在这里添加一些初始化逻辑
  console.log('Electron preload script loaded')
})
