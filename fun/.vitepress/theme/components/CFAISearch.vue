<script setup lang="ts">
import { onMounted } from 'vue';

function onChatMessage(event: CustomEvent) {
  console.log('Chat message:', event.detail);
}
const apiUrl = import.meta.env.VITE_CF_AI_SEARCH_URL;

onMounted(async () => {
  if (typeof window === 'undefined') return;
  // 动态导入，只有在浏览器环境下执行
  await import('@cloudflare/ai-search-snippet');
});
</script>


<template>
  <div>

    <!-- Chat Bubble Widget -->
    <chat-bubble-snippet
      :api-url="apiUrl"
      placeholder="From Himmel..."
      @chat-message="onChatMessage"
    />

    <!-- Search Modal (Cmd/Ctrl+K) -->
    <search-modal-snippet
      :api-url="apiUrl"
      placeholder="Search documentation..."
      shortcut="f"
      show-url="true"
      show-date="true"
    />

  </div>
</template>

<style>
/* Customize with CSS Variables */
chat-bubble-snippet {
  --search-snippet-primary-color: #96C8E6;
  /* 气泡圆角 */
  --chat-bubble-border-radius: 16px;
}

.chat-container {
  height: 500px;
}
</style>

<!-- vite.config.ts - Configure Vue to recognize custom elements -->
<!--
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('-snippet')
        }
      }
    })
  ]
});
-->