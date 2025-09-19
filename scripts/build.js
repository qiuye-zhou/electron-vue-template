import { build } from 'vite'
import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function buildApp() {
  try {
    console.log('🚀 开始构建应用...')

    // 构建 Web 应用
    console.log('📦 构建 Web 应用...')
    await build({
      configFile: path.resolve(__dirname, '../vite.config.js')
    })

    console.log('✅ Web 应用构建完成')

    // 构建 Electron 主进程
    console.log('⚡ 构建 Electron 主进程...')
    await buildElectronMain()

    console.log('✅ Electron 主进程构建完成')

    // 构建 Electron 应用
    console.log('📱 构建 Electron 应用...')
    const electronBuilder = spawn('npx', ['electron-builder'], {
      stdio: 'inherit',
      shell: true
    })

    electronBuilder.on('close', (code) => {
      // 恢复 package.json 的 main 字段
      restorePackageJson()

      if (code === 0) {
        console.log('🎉 应用构建完成！')
      } else {
        console.error('❌ 构建失败')
        process.exit(1)
      }
    })

  } catch (error) {
    console.error('❌ 构建过程中出现错误:', error)
    process.exit(1)
  }
}

async function buildElectronMain() {
  // 创建 dist-electron 目录
  const distElectronDir = path.resolve(__dirname, '../dist-electron')
  if (!fs.existsSync(distElectronDir)) {
    fs.mkdirSync(distElectronDir, { recursive: true })
  }
  
  // 复制 Electron 主进程文件
  const electronMainPath = path.resolve(__dirname, '../electron/main.cjs')
  const electronPreloadPath = path.resolve(__dirname, '../electron/preload.js')
  const distMainPath = path.resolve(distElectronDir, 'main.cjs')
  const distPreloadPath = path.resolve(distElectronDir, 'preload.js')
  
  if (fs.existsSync(electronMainPath)) {
    fs.copyFileSync(electronMainPath, distMainPath)
    console.log('📄 复制 main.cjs 到 dist-electron')
  }
  
  if (fs.existsSync(electronPreloadPath)) {
    fs.copyFileSync(electronPreloadPath, distPreloadPath)
    console.log('📄 复制 preload.js 到 dist-electron')
  }
  
  // 更新 package.json 的 main 字段用于构建
  const packageJsonPath = path.resolve(__dirname, '../package.json')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  packageJson.main = 'dist-electron/main.cjs'
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  console.log('📝 更新 package.json main 字段为 dist-electron/main.cjs')
}

function restorePackageJson() {
  const packageJsonPath = path.resolve(__dirname, '../package.json')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  packageJson.main = 'electron/main.cjs'
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  console.log('🔄 恢复 package.json main 字段为 electron/main.cjs')
}

buildApp()
