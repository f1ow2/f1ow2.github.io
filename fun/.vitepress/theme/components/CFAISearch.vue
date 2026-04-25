<script setup lang="ts">
import { onMounted, onBeforeUnmount, computed, watch, ref } from 'vue';
import { useData } from 'vitepress';

function onChatMessage(event: CustomEvent) {
  console.log('Chat message:', event.detail);
}

const apiUrl = import.meta.env.VITE_CF_AI_SEARCH_URL;
const { page } = useData();

// 根据 page.frontmatter.hideChat 决定是否显示气泡
const showBubble = computed(() => !page.value.frontmatter?.hideChat);

// 按需动态导入第三方脚本
const scriptLoaded = ref(false);
async function ensureScript() {
  if (typeof window === 'undefined' || scriptLoaded.value) return;
  await import('@cloudflare/ai-search-snippet');
  scriptLoaded.value = true;
}

// 切换打开/关闭并聚焦输入（已打开则点击切换关闭；关闭则打开并聚焦）
async function openAndFocusChat() {
  await ensureScript();
  const host = document.querySelector('chat-bubble-snippet');
  if (!host) return;

  const inputSelector = 'input, textarea, [contenteditable="true"]';
  const existingInput =
    host.shadowRoot?.querySelector(inputSelector) ||
    host.querySelector(inputSelector);

  const toggleButton =
    host.shadowRoot?.querySelector('button, [role="button"]') ||
    host.querySelector('button, [role="button"]');

  // 若已打开（存在输入），则点击切换按钮关闭
  if (existingInput) {
    if (toggleButton) (toggleButton as HTMLElement).click();
    return;
  }

  // 否则尝试打开并聚焦输入
  if (toggleButton) (toggleButton as HTMLElement).click();
  setTimeout(() => {
    const input =
      host.shadowRoot?.querySelector(inputSelector) ||
      host.querySelector(inputSelector);
    if (input) (input as HTMLElement).focus();
  }, 200);
}

// 只尝试聚焦 chat-bubble 的输入，不触发打开/关闭
async function focusChatInput() {
  await ensureScript();
  const host = document.querySelector('chat-bubble-snippet');
  if (!host) return;
  const input =
    host.shadowRoot?.querySelector('input, textarea, [contenteditable="true"]') ||
    host.querySelector('input, textarea, [contenteditable="true"]');
  if (input) (input as HTMLElement).focus();
}

// 键盘快捷键处理：'/' 只聚焦输入；Ctrl/Cmd+. 或 Ctrl/Cmd+K 切换气泡并聚焦/关闭
function onKeydown(e: KeyboardEvent) {
  const active = document.activeElement as HTMLElement | null;
  const editable =
    !!active &&
    (active.tagName === 'INPUT' ||
      active.tagName === 'TEXTAREA' ||
      active.isContentEditable);

  // 单按 '/' 时仅聚焦（仅当不在可编辑元素中）
  if (!editable && e.key === '/') {
    e.preventDefault();
    if (showBubble.value) focusChatInput();
    return;
  }

  const isMod = e.ctrlKey || e.metaKey;
  if (!isMod) return;
  const k = e.key.toLowerCase();
  if (k === '.' || k === 'q') {
    e.preventDefault();
    if (showBubble.value) openAndFocusChat();
  }
}

onMounted(() => {
  if (showBubble.value) ensureScript();
  window.addEventListener('keydown', onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown);
});

// 当路由/页面变化导致 showBubble 从 false->true 时，按需加载脚本
watch(showBubble, (val) => {
  if (val) ensureScript();
});
</script>

<template>
  <div>
    <chat-bubble-snippet
      v-if="showBubble"
      :api-url="apiUrl"
      placeholder="From Himmel..."
      @chat-message="onChatMessage"
    />

    <search-modal-snippet
      :api-url="apiUrl"
      placeholder="Search documentation..."
      shortcut="k"
      show-url="true"
      show-date="true"
    />
  </div>
</template>

<style>
chat-bubble-snippet {
  --search-snippet-primary-color: #96C8E6;
  --chat-bubble-border-radius: 16px;
}
</style>