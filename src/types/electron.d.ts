// Electron API 类型定义
export interface ElectronAPI {
  platform: string
  versions: {
    node: string
    chrome: string
    electron: string
  }
  openFile: () => Promise<string | null>
  minimize: () => Promise<void>
  onMessage: (callback: (event: any, data: string) => void) => void
}

// 扩展 Window 接口
declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

export {}
