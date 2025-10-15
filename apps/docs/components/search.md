# Search 搜索

带动画的搜索组件，支持点击展开、异步搜索和搜索建议。

## 基础用法

点击图标展开搜索框。

:::demo

```vue
<template>
  <XSearch placeholder="搜索内容..." @search="handleSearch" />
</template>

<script setup>
const handleSearch = (value) => {
  console.log('搜索:', value)
}
</script>
```

:::

## 异步搜索

支持异步搜索，自动处理加载状态。

:::demo

```vue
<template>
  <XSearch 
    placeholder="搜索商品..." 
    :on-search="searchProducts"
    @select="handleSelect"
  />
</template>

<script setup>
import { ref } from 'vue'

const searchProducts = async (keyword) => {
  // 模拟 API 请求
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return [
    `${keyword} - 商品 1`,
    `${keyword} - 商品 2`,
    `${keyword} - 商品 3`,
    `${keyword} - 热门商品`,
    `${keyword} - 推荐商品`
  ]
}

const handleSelect = (item) => {
  console.log('选中:', item)
}
</script>
```

:::

## 自定义搜索结果

使用 `result` 插槽自定义搜索结果的显示。

:::demo

```vue
<template>
  <XSearch 
    placeholder="搜索用户..." 
    :on-search="searchUsers"
    @select="handleSelect"
  >
    <template #result="{ item }">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
          {{ item.name.charAt(0) }}
        </div>
        <div>
          <div style="font-weight: 500;">{{ item.name }}</div>
          <div style="font-size: 12px; color: #6b7280;">{{ item.email }}</div>
        </div>
      </div>
    </template>
  </XSearch>
</template>

<script setup>
const searchUsers = async (keyword) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  return [
    { name: `${keyword} User 1`, email: 'user1@example.com' },
    { name: `${keyword} User 2`, email: 'user2@example.com' },
    { name: `${keyword} User 3`, email: 'user3@example.com' }
  ]
}

const handleSelect = (user) => {
  console.log('选中用户:', user)
}
</script>
```

:::

## 自定义防抖时间

通过 `debounce` 属性设置防抖延迟。

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <XSearch placeholder="默认 300ms" :on-search="search" />
    <XSearch placeholder="快速 100ms" :debounce="100" :on-search="search" />
    <XSearch placeholder="慢速 1000ms" :debounce="1000" :on-search="search" />
  </div>
</template>

<script setup>
const search = async (value) => {
  console.log('搜索:', value)
  return [`结果: ${value}`]
}
</script>
```

:::

## 不自动关闭

设置 `close-on-blur` 为 `false`，失焦时不自动收起。

:::demo

```vue
<template>
  <XSearch 
    placeholder="失焦不关闭..." 
    :close-on-blur="false"
    :on-search="search"
  />
</template>

<script setup>
const search = async (value) => {
  return [`搜索: ${value}`]
}
</script>
```

:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| placeholder | 输入框占位符 | `string` | `'搜索...'` |
| debounce | 防抖延迟（毫秒） | `number` | `300` |
| show-results | 是否显示搜索结果 | `boolean` | `true` |
| on-search | 异步搜索函数 | `(value: string) => Promise<any[]>` / `any[]` | - |
| close-on-blur | 失焦时是否收起 | `boolean` | `true` |

### Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| result | 自定义搜索结果项 | `{ item: any }` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| search | 搜索时触发 | `(value: string)` |
| select | 选择结果时触发 | `(item: any)` |
| expand | 展开时触发 | - |
| collapse | 收起时触发 | - |

### Exposes

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| expand | 展开搜索框 | `() => void` |
| collapse | 收起搜索框 | `() => void` |
| focus | 聚焦输入框 | `() => void` |
| clear | 清空搜索 | `() => void` |

