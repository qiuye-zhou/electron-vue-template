import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import copy from 'rollup-plugin-copy'

export default defineConfig({
  plugins: [
    vue(),
    copy({
      targets: [
        {
          src: 'static/**/*',
          dest: 'out/static',
        },
      ],
      hook: 'writeBundle', // 在构建完成后执行复制
    }),
  ],
  base: './',
  build: {
    outDir: 'out/dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    port: 5173,
    host: 'localhost',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
