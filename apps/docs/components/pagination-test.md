# 分页测试

测试跳转功能

:::demo

```vue
<template>
  <div class="space-y-4">
    <div class="text-sm">
      当前页: {{ current }}
    </div>
    
    <XPagination 
      v-model:current="current"
      v-model:pageSize="pageSize"
      :total="200"
      show-quick-jumper
      @change="handleChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const current = ref(1)
const pageSize = ref(10)

const handleChange = (page, size) => {
  console.log('页面变化事件:', page, size)
  xlMsg.success(`跳转到第 ${page} 页`)
}
</script>
```

:::

