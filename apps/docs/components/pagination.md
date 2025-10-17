# Pagination 分页

分页组件。

## 基础用法

基本的分页功能。

:::demo

```vue
<template>
  <XPagination 
    v-model:current="current"
    v-model:pageSize="pageSize"
    :total="100"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const current = ref(1)
const pageSize = ref(10)

const handleChange = (page, size) => {
  console.log('当前页:', page, '每页条数:', size)
}
</script>
```

:::

## 快速跳转

显示快速跳转输入框，输入页码后点击跳转按钮或按回车键即可跳转。

:::demo

```vue
<template>
  <XPagination 
    v-model:current="current"
    :total="200"
    show-quick-jumper
  />
</template>

<script setup>
import { ref } from 'vue'

const current = ref(1)
</script>
```

:::

## 自定义每页条数

自定义每页显示的条数选项。

:::demo

```vue
<template>
  <XPagination 
    v-model:current="current"
    v-model:pageSize="pageSize"
    :total="500"
    :page-size-options="[20, 50, 100, 200]"
  />
</template>

<script setup>
import { ref } from 'vue'

const current = ref(1)
const pageSize = ref(20)
</script>
```

:::

## 完整功能

展示所有功能的完整示例。

:::demo

```vue
<template>
  <div class="space-y-4">
    <XPagination 
      v-model:current="current"
      v-model:pageSize="pageSize"
      :total="10000"
      :page-size-options="[10, 20, 50, 100, 200]"
      show-quick-jumper
      @change="handleChange"
    />
    
    <div class="text-sm text-gray-600">
      当前显示第 {{ (current - 1) * pageSize + 1 }} - {{ Math.min(current * pageSize, 10000) }} 条，
      共 10000 条数据
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const current = ref(1)
const pageSize = ref(50)

const handleChange = (page, size) => {
  console.log('页码变化:', page, '每页条数:', size)
  xlMsg.success(`跳转到第 ${page} 页，每页 ${size} 条`)
}
</script>
```

:::

## 自定义信息

通过插槽自定义分页信息展示。

:::demo

```vue
<template>
  <XPagination 
    v-model:current="current"
    v-model:pageSize="pageSize"
    :total="328"
  >
    <template #info>
      <div class="flex items-center gap-2">
        <XBadge :content="total" color="primary">
          <span class="text-sm text-gray-600">总数据</span>
        </XBadge>
        <span class="text-sm text-gray-500">|</span>
        <span class="text-sm text-gray-600">
          显示 {{ (current - 1) * pageSize + 1 }}-{{ Math.min(current * pageSize, total) }} 条
        </span>
      </div>
    </template>
  </XPagination>
</template>

<script setup>
import { ref } from 'vue'

const current = ref(1)
const pageSize = ref(20)
const total = ref(328)
</script>
```

:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current / v-model:current | 当前页码 | `number` | `1` |
| pageSize / v-model:pageSize | 每页条数 | `number` | `10` |
| total | 数据总数 | `number` | `0` |
| pageSizeOptions | 每页条数选项 | `number[]` | `[10, 20, 50, 100]` |
| showQuickJumper | 是否显示快速跳转 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:current | 当前页改变时触发 | `(current: number)` |
| update:pageSize | 每页条数改变时触发 | `(pageSize: number)` |
| change | 页码或每页条数改变时触发 | `(current: number, pageSize: number)` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| info | 自定义分页信息 | - |
