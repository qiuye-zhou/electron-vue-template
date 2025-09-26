import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"

export default [
  // JavaScript 推荐规则
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    ...js.configs.recommended,
  },
  // 全局变量设置
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    }
  },
  // TypeScript 推荐规则
  ...tseslint.configs.recommended,
  // Vue 推荐规则
  ...pluginVue.configs["flat/essential"],
  // Vue 文件解析器设置
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    }
  },
  // 自定义规则
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // 允许使用 any
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }], // 允许以下划线开头的未使用变量
      "vue/multi-word-component-names": "off", // 关闭组件名必须多个单词的规则
      "vue/no-unused-vars": "error", // 检查未使用的变量
      "semi": ["error", "never"], // 禁止使用分号
    }
  },
  // 忽略的文件和目录
  {
    ignores: ["dist/", "out/", "release/"]
  }
]