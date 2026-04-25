<script setup lang="ts">

// 1. 引入 Cloudflare 官方聊天页面组件脚本
import { onMounted } from 'vue';

onMounted(async () => {
  if (typeof window === 'undefined') return;
  // 动态导入，只有在浏览器环境下执行
  await import('@cloudflare/ai-search-snippet');
});

// 2. 从环境变量读取你的 AI Search 实例地址（必须开启 Public Endpoint）
const chatApiUrl = import.meta.env.VITE_CF_AI_SEARCH_URL
</script>

<template>
  <!-- 聊天页面组件：独立页面/路由专用 -->
  <chat-page-snippet
    :api-url="chatApiUrl"
    placeholder="From Himmel..."
    title="Trace"
    theme="light"
    show-history="true"
    :style="{ '--search-snippet-primary-color': '#96c8e6' }"
  />
</template>

<style scoped>
/* 自定义聊天页面容器样式 */
chat-page-snippet {
  width: 100%;
  height: calc(100vh - 60px); /* 适配导航栏高度 */
  display: block;
}
</style>