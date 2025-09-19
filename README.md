# Electron Vue Template

一个现代化的 Electron + Vue 3 + Vite 桌面应用开发模板，提供完整的开发环境和构建配置。

## ✨ 特性

- 🚀 **Vite** - 极速的构建工具和开发服务器
- 🎯 **Vue 3** - 渐进式 JavaScript 框架，支持 Composition API
- 🖥️ **Electron** - 跨平台桌面应用开发框架
- 📦 **TypeScript** - 可选的类型支持
- 🎨 **现代化 UI** - 响应式设计和美观的界面
- 🔧 **完整配置** - 开发、构建、打包一体化

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发模式

```bash
# 启动开发服务器和 Electron
npm run electron:dev

# 或者分别启动
npm run dev          # 启动 Vite 开发服务器
npm run electron:dev # 启动 Electron（需要先启动 Vite）
```

### 构建应用

```bash
# 构建 Web 应用
npm run build:web

# 构建 Electron 应用
npm run build:electron

# 一键构建
npm run build
```

## 📁 项目结构

```
electron-vue-template/
├── electron/                 # Electron 主进程文件
│   ├── main.js             # 主进程入口
│   └── preload.js          # 预加载脚本
├── src/                    # Vue 应用源码
│   ├── App.vue            # 主应用组件
│   ├── main.js            # Vue 应用入口
│   └── style.css          # 全局样式
├── scripts/               # 构建脚本
│   ├── build.js          # 构建脚本
│   └── dev.js            # 开发脚本
├── index.html             # HTML 模板
├── vite.config.js         # Vite 配置
├── package.json           # 项目配置
└── README.md              # 项目说明
```

## 🛠️ 开发指南

### 添加新功能

1. 在 `src/` 目录下创建 Vue 组件
2. 在 `electron/main.js` 中添加主进程逻辑
3. 在 `electron/preload.js` 中暴露安全的 API

### 自定义配置

- **Vite 配置**: 修改 `vite.config.js`
- **Electron 配置**: 修改 `electron/main.js`
- **构建配置**: 修改 `package.json` 中的 `build` 字段

### 安全最佳实践

- 使用 `contextIsolation: true` 和 `nodeIntegration: false`
- 通过预加载脚本暴露安全的 API
- 验证所有来自渲染进程的输入

## 📦 打包发布

### 构建选项

```bash
# 构建当前平台
npm run build:electron

# 构建所有平台（需要对应平台的构建工具）
npm run build:electron -- --win --mac --linux
```

### 发布配置

在 `package.json` 的 `build` 字段中配置：

```json
{
  "build": {
    "appId": "com.yourcompany.yourapp",
    "productName": "Your App Name",
    "directories": {
      "output": "release"
    },
    "files": [
      "dist/**/*",
      "dist-electron/**/*",
      "node_modules/**/*"
    ]
  }
}
```

## 🔧 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **桌面框架**: Electron
- **开发语言**: JavaScript/TypeScript
- **样式**: CSS3 + 现代布局
- **包管理**: npm/yarn

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件
