# Search 搜索

现代化的搜索组件，支持点击展开、嵌入式按钮动画、异步搜索和搜索建议。

## 基础用法

默认展开状态，搜索按钮嵌入在输入框左侧。

:::demo

```vue
<template>
  <XSearch placeholder="请输入搜索内容..."  @search="handleSearch" />
</template>

<script setup>
const handleSearch = (value) => {
  console.log('搜索:', value)
}
</script>
```

:::

## 点击展开

设置 `default-expanded` 为 `false`，点击输入框时按钮从中间动画滑出。

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div>
      <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #6b7280;">点击输入框，按钮从中间滑到左侧</h4>
      <XSearch 
        placeholder="点击展开搜索..." 
        :default-expanded="false"
        button-position="left"
      />
    </div>
    
    <div>
      <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #6b7280;">点击输入框，按钮从中间滑到右侧</h4>
      <XSearch 
        placeholder="点击展开搜索..." 
        :default-expanded="false"
        button-position="right"
      />
    </div>
  </div>
</template>
```

:::

## 按钮位置

通过 `button-position` 属性设置搜索按钮在左侧或右侧。

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div>
      <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #6b7280;">按钮在左侧（默认）</h4>
      <XSearch 
        placeholder="搜索..." 
        button-position="left"
      />
    </div>
    
    <div>
      <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #6b7280;">按钮在右侧</h4>
      <XSearch 
        placeholder="搜索..." 
        button-position="right"
      />
    </div>
  </div>
</template>
```

:::

## 自定义图标

使用 `custom-icon` 属性传入 iconify 图标类名，或使用 `icon` 插槽完全自定义。

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div>
      <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #6b7280;">使用 iconify 图标</h4>
      <XSearch 
        placeholder="搜索..." 
        custom-icon="streamline-stickies-color:search-duo"
        button-position="left"
      />
    </div>
    
    <div>
      <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #6b7280;">使用插槽自定义图标</h4>
      <XSearch placeholder="搜索..." button-position="right">
        <template #icon>
          <span style="font-size: 14px;">🔍</span>
        </template>
      </XSearch>
    </div>
  </div>
</template>
```

:::

## 异步搜索

支持异步搜索，自动处理加载状态和搜索结果。

:::demo

```vue
<template>
  <XSearch 
    placeholder="搜索商品..." 
    :on-search="searchProducts"
    @select="handleSelect"
    button-position="left"
  />
</template>

<script setup>
const searchProducts = async (keyword) => {
  // 模拟 API 请求
  await new Promise(resolve => setTimeout(resolve, 500))
  
  if (!keyword) return []
  
  return [
    `${keyword} - 热门商品`,
    `${keyword} - 推荐商品`,
    `${keyword} - 新品`,
    `${keyword} - 特价商品`,
    `${keyword} - 限时抢购`
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
    button-position="right"
  >
    <template #result="{ item }">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px;">
          {{ item.name.charAt(0) }}
        </div>
        <div style="flex: 1;">
          <div style="font-weight: 500; font-size: 14px; margin-bottom: 2px;">{{ item.name }}</div>
          <div style="font-size: 12px; color: #6b7280;">{{ item.email }}</div>
        </div>
        <div style="font-size: 12px; color: #3b82f6;">{{ item.role }}</div>
      </div>
    </template>
  </XSearch>
</template>

<script setup>
const searchUsers = async (keyword) => {
  await new Promise(resolve => setTimeout(resolve, 400))
  
  if (!keyword) return []
  
  return [
    { name: `张${keyword}`, email: 'zhang@example.com', role: '管理员' },
    { name: `李${keyword}`, email: 'li@example.com', role: '编辑' },
    { name: `王${keyword}`, email: 'wang@example.com', role: '用户' }
  ]
}

const handleSelect = (user) => {
  console.log('选中用户:', user)
}
</script>
```

:::

## 自定义防抖时间

通过 `debounce` 属性设置防抖延迟（毫秒）。

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <span style="color: #6b7280; font-size: 13px; margin-right: 8px;">默认 300ms：</span>
      <XSearch placeholder="输入搜索..." :on-search="search" />
    </div>
    <div>
      <span style="color: #6b7280; font-size: 13px; margin-right: 8px;">快速 100ms：</span>
      <XSearch placeholder="输入搜索..." :debounce="100" :on-search="search" />
    </div>
    <div>
      <span style="color: #6b7280; font-size: 13px; margin-right: 8px;">慢速 1000ms：</span>
      <XSearch placeholder="输入搜索..." :debounce="1000" :on-search="search" />
    </div>
  </div>
</template>

<script setup>
const search = async (value) => {
  console.log('搜索:', value, new Date().toLocaleTimeString())
  return [`结果: ${value}`]
}
</script>
```

:::

## 禁用清空按钮

设置 `show-clear` 为 `false` 隐藏清空按钮。

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <XSearch placeholder="有清空按钮" />
    <XSearch placeholder="无清空按钮" :show-clear="false" />
  </div>
</template>
```

:::

## 事件监听

支持多种键盘事件和交互事件。

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <XSearch 
      placeholder="按回车搜索，按 ESC 关闭..." 
      :default-expanded="false"
      @enter="handleEnter"
      @esc="handleEsc"
      @button-click="handleButtonClick"
      @expand="handleExpand"
      @collapse="handleCollapse"
      @keydown="handleKeydown"
    />
    
    <div style="padding: 16px; background: #f9fafb; border-radius: 8px; font-size: 13px; max-height: 200px; overflow-y: auto;">
      <div style="font-weight: 600; margin-bottom: 8px; color: #374151;">事件日志：</div>
      <div v-for="(log, index) in logs" :key="index" style="color: #6b7280; margin-bottom: 4px;">
        {{ log }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const logs = ref([])

const addLog = (message) => {
  logs.value.unshift(`[${new Date().toLocaleTimeString()}] ${message}`)
  if (logs.value.length > 10) logs.value.pop()
}

const handleEnter = (value) => {
  addLog(`✅ 回车搜索: "${value}"`)
}

const handleEsc = () => {
  addLog(`❌ 按下 ESC 键`)
}

const handleButtonClick = () => {
  addLog(`🔍 点击搜索按钮`)
}

const handleExpand = () => {
  addLog(`📖 搜索框展开`)
}

const handleCollapse = () => {
  addLog(`📕 搜索框收起`)
}

const handleKeydown = (event) => {
  if (!['Enter', 'Escape'].includes(event.key)) {
    addLog(`⌨️ 按键: ${event.key}`)
  }
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
| on-search | 异步搜索函数 | `(value: string) => Promise<any[]> / any[]` | - |
| default-expanded | 默认是否展开（显示按钮） | `boolean` | `true` |
| button-position | 搜索按钮位置 | `'left' / 'right'` | `'left'` |
| custom-icon | 自定义图标类名（iconify 图标） | `string` | `''` |
| show-clear | 是否显示清空按钮 | `boolean` | `true` |

### Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| icon | 自定义搜索图标 | - |
| result | 自定义搜索结果项 | `{ item: any }` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| search | 搜索时触发 | `(value: string)` |
| select | 选择结果时触发 | `(item: any)` |
| button-click | 点击搜索按钮时触发 | - |
| expand | 展开时触发 | - |
| collapse | 收起时触发 | - |
| enter | 按下回车键时触发 | `(value: string)` |
| esc | 按下 ESC 键时触发 | - |
| keydown | 键盘按下时触发 | `(event: KeyboardEvent)` |
| keyup | 键盘抬起时触发 | `(event: KeyboardEvent)` |
| input-focus | 输入框获得焦点时触发 | `(event: FocusEvent)` |
| input-blur | 输入框失去焦点时触发 | `(event: FocusEvent)` |

### Exposes

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| expand | 展开搜索框 | `() => void` |
| collapse | 收起搜索框 | `() => void` |
| focus | 聚焦输入框 | `() => void` |
| clear | 清空搜索 | `() => void` |
