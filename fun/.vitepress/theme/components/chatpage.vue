<script setup lang="ts">
// 1. 引入 Cloudflare 官方聊天页面组件脚本 & Vue API
import { onMounted, onUnmounted, ref } from 'vue';

const chatPageRef = ref<HTMLElement | null>(null);
const chatApiUrl = import.meta.env.VITE_CF_AI_SEARCH_URL;

let keyHandler: ((e: KeyboardEvent) => void) | null = null;

onMounted(async () => {
  if (typeof window === 'undefined') return;
  await import('@cloudflare/ai-search-snippet');

  keyHandler = (e: KeyboardEvent) => {
    const isCmdK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'q';
    const isSlash = e.key === '/';
    const active = document.activeElement as HTMLElement | null;
    const editable =
      !!active &&
      (active.tagName === 'INPUT' ||
        active.tagName === 'TEXTAREA' ||
        active.isContentEditable);

    if (!editable && (isCmdK || isSlash)) {
      e.preventDefault();
      const el = chatPageRef.value;
      if (!el) return;
      const input =
        (el.shadowRoot && el.shadowRoot.querySelector('input, textarea')) ||
        el.querySelector('input, textarea');
      if (input && (input as HTMLElement).focus) {
        (input as HTMLElement).focus();
      } else {
        (el as HTMLElement).focus();
      }
    }
  };

  window.addEventListener('keydown', keyHandler);
});

onUnmounted(() => {
  if (keyHandler) window.removeEventListener('keydown', keyHandler);
});
</script>

<template>
  <!-- 聊天页面组件：独立页面/路由专用 -->
  <chat-page-snippet
    ref="chatPageRef"
    tabindex="-1"
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
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  height: calc(100vh - 60px);
  width: 100%;
  box-sizing: border-box;
  z-index: 20;
}
</style>