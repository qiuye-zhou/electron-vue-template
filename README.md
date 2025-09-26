# Electron Vue Template

一个现代化的 Electron + Vue 3 + Vite + TypeScript 桌面应用开发模板，提供完整的开发环境和构建配置。

## ✨ 特性

- 🚀 **Vite 7.x** - 极速的构建工具和开发服务器
- 🎯 **Vue 3** - 渐进式 JavaScript 框架，支持 Composition API
- 🛣️ **Vue Router 4** - 官方路由管理器，支持动态路由
- 🖥️ **Electron 28.x** - 跨平台桌面应用开发框架
- 📦 **TypeScript 5.x** - 完整的类型支持和类型安全
- 🔧 **完整配置** - 开发、构建、打包一体化
- 📱 **跨平台支持** - Windows、macOS、Linux 一键打包

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0 或 pnpm >= 7.0.0

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 开发模式

```bash
# 一键启动开发环境（推荐）
npm run electron:dev

# 仅启动 Web 开发服务器
npm run dev

# 预览构建后的 Web 应用
npm run preview
```

### 构建应用

```bash
# 构建 Web 应用
npm run build:web

# 构建 Electron 主进程
npm run build:electron

# 构建 Windows 安装包
npm run build:win

# 类型检查
npm run type-check

# 代码格式修复
npm run lint:fix
```

## 📁 项目结构

```
electron-vue-template/
├── electron/                 # Electron 主进程文件
│   ├── main.ts             # 主进程入口（TypeScript）
│   └── preload.ts          # 预加载脚本（TypeScript）
├── src/                    # Vue 应用源码
│   ├── App.vue            # 主应用组件
│   ├── main.ts            # Vue 应用入口（TypeScript）
│   ├── assets/            # 静态资源文件
│   ├── router/            # Vue Router 路由配置
│   │   ├── index.ts       # 路由实例
│   │   └── routes.ts      # 路由定义
│   ├── styles/            # 样式文件
│   │   └── style.css      # 全局样式
│   ├── types/             # TypeScript 类型定义
│   │   ├── electron.d.ts  # Electron API 类型
│   │   └── vue-shim.d.ts  # Vue 类型声明
│   ├── utils/             # 工具函数
│   └── views/             # 页面组件
│       ├── error-page/    # 错误页面
│       │   └── 404.vue    # 404 页面
│       └── home/          # 首页
│           └── index.vue  # 首页组件
├── static/                # 静态资源
│   └── logo.png           # 应用图标
├── index.html             # HTML 模板
├── vite.config.ts         # Vite 配置（TypeScript）
├── tsconfig.json          # TypeScript 配置
├── tsconfig.electron.json # Electron TypeScript 配置
├── tsconfig.node.json     # Node.js TypeScript 配置
├── electron-builder.json  # Electron Builder 配置
├── package.json           # 项目配置
└── README.md              # 项目说明
```

## 🛠️ 开发指南

### 添加新功能

1. 在 `src/views/` 目录下创建新的页面组件（支持 TypeScript）
2. 在 `src/router/routes.ts` 中添加路由配置
3. 在 `electron/main.ts` 中添加主进程逻辑
4. 在 `electron/preload.ts` 中暴露安全的 API
5. 在 `src/types/electron.d.ts` 中定义类型接口
6. 在 `src/utils/` 中添加工具函数

### 自定义配置

- **Vite 配置**: 修改 `vite.config.ts`（包含路径别名 `@/` 指向 `src/`）
- **TypeScript 配置**: 修改 `tsconfig.json`、`tsconfig.electron.json`、`tsconfig.node.json`
- **Electron 配置**: 修改 `electron/main.ts`
- **构建配置**: 修改 `electron-builder.json`
- **路由配置**: 修改 `src/router/routes.ts`

### TypeScript 支持

- 完整的类型检查和智能提示
- Vue 3 Composition API 类型支持
- Vue Router 类型支持
- Electron API 类型定义
- 路径别名 `@/` 指向 `src/` 目录
- 多环境 TypeScript 配置（主应用、Electron、Node.js）

### 安全最佳实践

- 使用 `contextIsolation: true` 和 `nodeIntegration: false`
- 通过预加载脚本暴露安全的 API
- 验证所有来自渲染进程的输入
- IPC 通信使用类型安全的接口

## 📦 打包发布

### 构建选项

```bash
# 构建 Windows 安装包
npm run build:win

# 使用 electron-builder 构建其他平台
npx electron-builder --win    # Windows
npx electron-builder --mac    # macOS
npx electron-builder --linux  # Linux
```

### 发布配置

在 `electron-builder.json` 中配置：

```json
{
  "appId": "com.electron.app",
  "productName": "electronApp",
  "copyright": "Copyright © 2025 electronApp",
  "directories": {
    "output": "release"
  },
  "artifactName": "${productName}-${version}-setup.${ext}",
  "nsis": {
    "oneClick": false,
    "perMachine": false,
    "allowToChangeInstallationDirectory": true
  },
  "win": {
    "icon": "static/logo.png",
    "target": "nsis",
    "signAndEditExecutable": false,
    "forceCodeSigning": false
  },
  "forceCodeSigning": false,
  "mac": {
    "icon": "static/logo.png",
    "target": "dmg"
  },
  "linux": {
    "icon": "static/logo.png",
    "target": ["snap"]
  },
  "files": [
    "out/**/*"
  ],
  "extraMetadata": {
    "main": "out/electron/main.js"
  }
}
```

## 🔧 技术栈

- **前端框架**: Vue 3.5.x (Composition API)
- **路由管理**: Vue Router 4.5.x
- **构建工具**: Vite 7.1.x
- **桌面框架**: Electron 28.0.x
- **开发语言**: TypeScript 5.9.x
- **样式**: CSS3 + 现代布局
- **包管理**: npm/yarn/pnpm
- **打包工具**: electron-builder 24.9.x
- **类型检查**: vue-tsc 3.0.x

## 📋 主要依赖

### 开发依赖
- `@vitejs/plugin-vue` ^6.0.1 - Vite Vue 插件
- `@types/node` ^24.5.2 - Node.js 类型定义
- `concurrently` ^9.2.1 - 并发执行命令
- `cross-env` ^10.0.0 - 跨平台环境变量
- `electron` ^28.0.0 - Electron 框架
- `electron-builder` ^24.9.1 - 应用打包工具
- `rollup-plugin-copy` ^3.5.0 - 文件复制插件
- `typescript` ^5.9.2 - TypeScript 编译器
- `vite` ^7.1.7 - 构建工具
- `vue-tsc` ^3.0.8 - Vue TypeScript 类型检查
- `wait-on` ^9.0.0 - 等待服务启动

### 生产依赖
- `vue` ^3.5.17 - Vue 3 框架
- `vue-router` ^4.5.1 - Vue Router 路由管理器

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件
