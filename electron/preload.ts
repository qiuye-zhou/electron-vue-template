import { contextBridge, ipcRenderer } from 'electron'

// 定义 electronAPI 的类型
interface ElectronAPI {
  platform: string
  versions: {
    node: string
    chrome: string
    electron: string
  }
  sendMessage: (message: string) => Promise<string>
  openFile: () => Promise<string | null>
  saveFile: (content: string) => Promise<string | null>
  minimize: () => Promise<void>
  maximize: () => Promise<void>
  close: () => Promise<void>
  onMessage: (callback: (event: any, ...args: any[]) => void) => void
  removeAllListeners: (channel: string) => void
}

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
  sendMessage: (message: string): Promise<string> => ipcRenderer.invoke('send-message', message),

  // 文件操作示例
  openFile: (): Promise<string | null> => ipcRenderer.invoke('dialog:openFile'),
  saveFile: (content: string): Promise<string | null> => ipcRenderer.invoke('dialog:saveFile', content),

  // 窗口控制
  minimize: (): Promise<void> => ipcRenderer.invoke('window:minimize'),
  maximize: (): Promise<void> => ipcRenderer.invoke('window:maximize'),
  close: (): Promise<void> => ipcRenderer.invoke('window:close'),

  // 监听主进程消息
  onMessage: (callback: (event: any, ...args: any[]) => void): void => {
    ipcRenderer.on('main-message', callback)
  },

  // 移除监听器
  removeAllListeners: (channel: string): void => {
    ipcRenderer.removeAllListeners(channel)
  }
} as ElectronAPI)

// 监听 DOM 加载完成
window.addEventListener('DOMContentLoaded', () => {
  // 可以在这里添加一些初始化逻辑
  console.log('Electron preload script loaded')
})
