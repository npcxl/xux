# Search 搜索

现代化搜索组件，具有磨砂玻璃效果、流畅动画和优雅交互体验。支持点击展开、嵌入式按钮动画、异步搜索和搜索建议。

## 功能演示

<div style="
  columns: 2;
  column-gap: 24px;
  margin-top: 24px;
">

<div style="break-inside: avoid; margin-bottom: 24px;">
<h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">基础用法</h3>

:::demo

```vue
<template>
  <div>
    <XSearch 
      placeholder="请输入搜索内容..."  
      @search="handleSearch" 
    />
    <div v-if="searchResult" style="margin-top: 12px; padding: 12px; background: rgba(0, 122, 255, 0.06); border-radius: 12px; font-size: 14px; color: #007AFF;">
      搜索内容：{{ searchResult }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchResult = ref('')
const handleSearch = (value) => {
  searchResult.value = value
  console.log('搜索:', value)
}
</script>
```

:::
</div>

<div style="break-inside: avoid; margin-bottom: 24px;">
<h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">点击展开</h3>

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 16px;">
      <div style="font-size: 13px; color: rgba(60, 60, 67, 0.6); margin-bottom: 8px;">按钮从中间滑到左侧</div>
      <XSearch 
        placeholder="点击展开搜索..." 
        :default-expanded="false"
        button-position="left"
      />
    </div>
    
    <div>
      <div style="font-size: 13px; color: rgba(60, 60, 67, 0.6); margin-bottom: 8px;">按钮从中间滑到右侧</div>
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
</div>

<div style="break-inside: avoid; margin-bottom: 24px;">
<h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">按钮位置</h3>

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 16px;">
      <div style="font-size: 13px; color: rgba(60, 60, 67, 0.6); margin-bottom: 8px;">按钮在左侧（默认）</div>
      <XSearch 
        placeholder="搜索..." 
        button-position="left"
      />
    </div>
    
    <div>
      <div style="font-size: 13px; color: rgba(60, 60, 67, 0.6); margin-bottom: 8px;">按钮在右侧</div>
      <XSearch 
        placeholder="搜索..." 
        button-position="right"
      />
    </div>
  </div>
</template>
```

:::
</div>

<div style="break-inside: avoid; margin-bottom: 24px;">
<h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">自定义图标</h3>

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 16px;">
      <div style="font-size: 13px; color: rgba(60, 60, 67, 0.6); margin-bottom: 8px;">使用 iconify 图标</div>
      <XSearch 
        placeholder="搜索..." 
        custom-icon="streamline-stickies-color:search-duo"
        button-position="left"
      />
    </div>
    
    <div>
      <div style="font-size: 13px; color: rgba(60, 60, 67, 0.6); margin-bottom: 8px;">使用插槽自定义图标</div>
      <XSearch placeholder="搜索..." button-position="right">
        <template #icon>
          <span style="font-size: 16px;">🔍</span>
        </template>
      </XSearch>
    </div>
  </div>
</template>
```

:::
</div>

<div style="break-inside: avoid; margin-bottom: 24px;">
<h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">异步搜索</h3>

:::demo

```vue
<template>
  <div>
    <XSearch 
      placeholder="搜索商品..." 
      :on-search="searchProducts"
      @select="handleSelect"
      button-position="left"
    />
    <div v-if="selectedItem" style="margin-top: 12px; padding: 12px; background: linear-gradient(135deg, rgba(255, 149, 0, 0.06) 0%, rgba(255, 59, 48, 0.06) 100%); border-radius: 12px; font-size: 14px; color: rgba(0, 0, 0, 0.8);">
      <span style="font-weight: 500;">已选择：</span> {{ selectedItem }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedItem = ref('')

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
  selectedItem.value = item
  console.log('选中:', item)
}
</script>
```

:::
</div>

<div style="break-inside: avoid; margin-bottom: 24px;">
<h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">自定义搜索结果</h3>

:::demo

```vue
<template>
  <div>
    <XSearch 
      placeholder="搜索用户..." 
      :on-search="searchUsers"
      @select="handleSelect"
      button-position="right"
    >
      <template #result="{ item }">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #007AFF 0%, #0051D5 100%);
                      display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px;
                      box-shadow: 0 4px 12px rgba(0, 122, 255, 0.25);">
            {{ item.name.charAt(0) }}
          </div>
          <div style="flex: 1;">
            <div style="font-weight: 500; font-size: 14px; margin-bottom: 2px; color: #000;">{{ item.name }}</div>
            <div style="font-size: 12px; color: rgba(60, 60, 67, 0.6);">{{ item.email }}</div>
          </div>
          <div style="font-size: 12px; color: #007AFF; font-weight: 500;">{{ item.role }}</div>
        </div>
      </template>
    </XSearch>
  </div>
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
</div>

<div style="break-inside: avoid; margin-bottom: 24px;">
<h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">自定义防抖时间</h3>

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 12px;">
      <div style="font-size: 13px; color: rgba(60, 60, 67, 0.6); margin-bottom: 8px;">默认 300ms</div>
      <XSearch placeholder="输入搜索..." :on-search="search" />
    </div>
    <div style="margin-bottom: 12px;">
      <div style="font-size: 13px; color: rgba(60, 60, 67, 0.6); margin-bottom: 8px;">快速 100ms</div>
      <XSearch placeholder="输入搜索..." :debounce="100" :on-search="search" />
    </div>
    <div>
      <div style="font-size: 13px; color: rgba(60, 60, 67, 0.6); margin-bottom: 8px;">慢速 1000ms</div>
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
</div>

<div style="break-inside: avoid; margin-bottom: 24px;">
<h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">清空按钮控制</h3>

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 12px;">
      <div style="font-size: 13px; color: rgba(60, 60, 67, 0.6); margin-bottom: 8px;">显示清空按钮（默认）</div>
      <XSearch placeholder="有清空按钮" />
    </div>
    <div>
      <div style="font-size: 13px; color: rgba(60, 60, 67, 0.6); margin-bottom: 8px;">隐藏清空按钮</div>
      <XSearch placeholder="无清空按钮" :show-clear="false" />
    </div>
  </div>
</template>
```

:::
</div>

</div>

## 事件监听

支持多种键盘事件和交互事件。

:::demo

```vue
<template>
  <div>
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
    
    <div style="margin-top: 16px; padding: 16px; background: rgba(0, 0, 0, 0.02); border-radius: 12px; font-size: 13px; max-height: 200px; overflow-y: auto; border: 1px solid rgba(0, 0, 0, 0.05);">
      <div style="font-weight: 600; margin-bottom: 8px; color: rgba(0, 0, 0, 0.8);">事件日志：</div>
      <div v-for="(log, index) in logs" :key="index" style="color: rgba(0, 0, 0, 0.6); margin-bottom: 4px; font-family: monospace; font-size: 12px;">
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
