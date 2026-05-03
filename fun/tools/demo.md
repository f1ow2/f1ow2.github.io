# 交互示例

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<button @click="count++" style="border: 1px solid #ccc; padding: 5px;">
  点击次数: {{ count }}
</button>

<script>
  console.log('此代码在页面加载时执行');
</script>
