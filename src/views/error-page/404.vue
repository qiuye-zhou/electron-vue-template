<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1 class="error-code">404</h1>
      <h2 class="error-title">页面未找到</h2>
      <p class="error-description">抱歉，您访问的页面不存在或已被移除</p>
      <div class="error-actions">
        <button @click="goBack">返回</button>
        <button @click="goHome">首页</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f7fa;

  .not-found-content {
    text-align: center;
    padding: 30px;

    .error-code {
      font-size: 72px;
      font-weight: 700;
      color: #409eff;
      margin-bottom: 20px;
    }

    .error-title {
      font-size: 24px;
      color: #303133;
      margin-bottom: 15px;
    }

    .error-description {
      font-size: 16px;
      color: #606266;
      margin-bottom: 30px;
    }

    .error-actions {
      button {
        margin: 0 10px;
      }
    }
  }
}

@media (max-width: 768px) {
  .not-found-container {
    flex-direction: column;

    .not-found-content {
      .error-code {
        font-size: 48px;
      }
    }
  }
}
</style>
