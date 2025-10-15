# DragSort 拖拽排序

通过拖拽的方式对列表项进行排序，支持网格、垂直列表、水平列表等多种布局模式。

## 基础用法

最简单的拖拽排序列表，支持上下左右拖拽。

:::demo

```vue
<template>
  <div>
    <XDragSort 
      v-model="items" 
      @change="handleChange"
    >
      <template #default="{ item, index }">
        <div class="p-2">
          <div class="font-medium">{{ item.label }}</div>
          <div class="text-sm text-gray-500">索引: {{ index }}</div>
        </div>
      </template>
    </XDragSort>
    
    <div class="mt-4 p-3 bg-gray-50 rounded">
      <div class="text-sm font-medium mb-2">当前排序：</div>
      <div class="text-sm text-gray-600">
        {{ items.map(i => i.label).join(' → ') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, label: '项目 1' },
  { id: 2, label: '项目 2' },
  { id: 3, label: '项目 3' },
  { id: 4, label: '项目 4' },
  { id: 5, label: '项目 5' },
  { id: 6, label: '项目 6' },
  { id: 7, label: '项目 7' },
  { id: 8, label: '项目 8' }
])

const handleChange = (e) => {
  console.log('排序变化:', e)
}
</script>
```

:::

## 垂直列表

使用 `layout="vertical"` 设置为垂直列表布局，适合单列的拖拽排序。

:::demo

```vue
<template>
  <XDragSort 
    v-model="tasks" 
    layout="vertical"
    gap="12px"
  >
    <template #default="{ item }">
      <div class="flex items-center gap-3">
        <div 
          class="w-3 h-3 rounded-full"
          :class="{
            'bg-green-500': item.status === 'completed',
            'bg-yellow-500': item.status === 'pending',
            'bg-red-500': item.status === 'overdue'
          }"
        ></div>
        <div class="flex-1">
          <div class="font-medium">{{ item.title }}</div>
          <div class="text-sm text-gray-500">{{ item.description }}</div>
        </div>
        <div class="text-xs text-gray-400">{{ item.time }}</div>
      </div>
    </template>
  </XDragSort>
</template>

<script setup>
import { ref } from 'vue'

const tasks = ref([
  { id: 1, title: '完成项目文档', description: '编写项目的使用说明', status: 'completed', time: '2小时前' },
  { id: 2, title: '代码审查', description: '审查团队成员的代码', status: 'pending', time: '4小时前' },
  { id: 3, title: '修复 Bug', description: '修复用户反馈的问题', status: 'pending', time: '1天前' },
  { id: 4, title: '性能优化', description: '优化页面加载速度', status: 'overdue', time: '2天前' }
])
</script>
```

:::

## 水平列表

使用 `layout="horizontal"` 设置为水平列表布局，适合横向滚动的场景。

:::demo

```vue
<template>
  <XDragSort 
    v-model="categories" 
    layout="horizontal"
    gap="16px"
    item-width="200px"
  >
    <template #default="{ item }">
      <div class="text-center">
        <div class="text-4xl mb-2">{{ item.icon }}</div>
        <div class="font-medium">{{ item.name }}</div>
        <div class="text-sm text-gray-500 mt-1">{{ item.count }} 项</div>
      </div>
    </template>
  </XDragSort>
</template>

<script setup>
import { ref } from 'vue'

const categories = ref([
  { id: 1, name: '工作', icon: '💼', count: 12 },
  { id: 2, name: '学习', icon: '📚', count: 8 },
  { id: 3, name: '运动', icon: '⚽', count: 5 },
  { id: 4, name: '娱乐', icon: '🎮', count: 15 },
  { id: 5, name: '购物', icon: '🛒', count: 3 }
])
</script>
```

:::

## 自定义列数

通过 `cols` 属性自定义网格列数。

:::demo

```vue
<template>
  <div>
    <div class="mb-4 flex items-center gap-4">
      <label class="text-sm font-medium">列数：</label>
      <div class="flex gap-2">
        <button 
          v-for="n in [2, 3, 4, 5, 6]" 
          :key="n"
          @click="cols = n"
          class="px-3 py-1 rounded text-sm transition-colors"
          :class="cols === n ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'"
        >
          {{ n }} 列
        </button>
      </div>
    </div>
    
    <XDragSort 
      v-model="gridItems" 
      :cols="cols"
      gap="12px"
    >
      <template #default="{ item }">
        <div class="text-center py-4">
          <div class="text-2xl mb-1">{{ item.emoji }}</div>
          <div class="text-sm font-medium">{{ item.name }}</div>
        </div>
      </template>
    </XDragSort>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const cols = ref(4)

const gridItems = ref([
  { id: 1, emoji: '🍎', name: '苹果' },
  { id: 2, emoji: '🍌', name: '香蕉' },
  { id: 3, emoji: '🍇', name: '葡萄' },
  { id: 4, emoji: '🍓', name: '草莓' },
  { id: 5, emoji: '🍊', name: '橙子' },
  { id: 6, emoji: '🍉', name: '西瓜' },
  { id: 7, emoji: '🍑', name: '桃子' },
  { id: 8, emoji: '🥝', name: '猕猴桃' },
  { id: 9, emoji: '🍒', name: '樱桃' },
  { id: 10, emoji: '🍍', name: '菠萝' },
  { id: 11, emoji: '🥭', name: '芒果' },
  { id: 12, emoji: '🍈', name: '哈密瓜' }
])
</script>
```

:::

## 禁用拖拽

通过 `disabled` 属性禁用整个列表的拖拽，或者在数据项中设置 `disabled: true` 禁用单个项。

:::demo

```vue
<template>
  <div>
    <div class="mb-4">
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" v-model="globalDisabled" class="rounded">
        <span class="text-sm">全局禁用拖拽</span>
      </label>
    </div>
    
    <XDragSort 
      v-model="itemsWithDisabled" 
      :disabled="globalDisabled"
      layout="vertical"
    >
      <template #default="{ item }">
        <div class="flex items-center justify-between">
          <span>{{ item.label }}</span>
          <span 
            v-if="item.disabled" 
            class="text-xs bg-gray-200 px-2 py-1 rounded"
          >
            已锁定
          </span>
        </div>
      </template>
    </XDragSort>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const globalDisabled = ref(false)

const itemsWithDisabled = ref([
  { id: 1, label: '可拖拽项目 1', disabled: false },
  { id: 2, label: '锁定项目（不可拖拽）', disabled: true },
  { id: 3, label: '可拖拽项目 2', disabled: false },
  { id: 4, label: '可拖拽项目 3', disabled: false },
  { id: 5, label: '锁定项目（不可拖拽）', disabled: true }
])
</script>
```

:::

## 隐藏拖拽手柄

通过 `show-handle="false"` 隐藏拖拽手柄图标。

:::demo

```vue
<template>
  <div class="space-y-4">
    <div>
      <div class="text-sm font-medium mb-2">显示手柄（默认）</div>
      <XDragSort 
        v-model="items1" 
        layout="vertical"
        :show-handle="true"
      >
        <template #default="{ item }">
          {{ item.label }}
        </template>
      </XDragSort>
    </div>
    
    <div>
      <div class="text-sm font-medium mb-2">隐藏手柄</div>
      <XDragSort 
        v-model="items2" 
        layout="vertical"
        :show-handle="false"
      >
        <template #default="{ item }">
          {{ item.label }}
        </template>
      </XDragSort>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items1 = ref([
  { id: 1, label: '项目 A' },
  { id: 2, label: '项目 B' },
  { id: 3, label: '项目 C' }
])

const items2 = ref([
  { id: 1, label: '项目 A' },
  { id: 2, label: '项目 B' },
  { id: 3, label: '项目 C' }
])
</script>
```

:::

## 自定义尺寸

通过 `item-width`、`item-height` 和 `gap` 属性自定义项目的尺寸和间距。

:::demo

```vue
<template>
  <XDragSort 
    v-model="cards" 
    :cols="3"
    item-width="auto"
    item-height="150px"
    gap="20px"
  >
    <template #default="{ item }">
      <div class="h-full flex flex-col justify-center items-center">
        <div class="text-3xl mb-2">{{ item.icon }}</div>
        <div class="font-medium mb-1">{{ item.title }}</div>
        <div class="text-xs text-gray-500 text-center px-2">{{ item.desc }}</div>
      </div>
    </template>
  </XDragSort>
</template>

<script setup>
import { ref } from 'vue'

const cards = ref([
  { id: 1, icon: '🚀', title: '快速', desc: '极致的性能体验' },
  { id: 2, icon: '🎨', title: '美观', desc: '现代化的设计风格' },
  { id: 3, icon: '🛠️', title: '灵活', desc: '高度可定制化' },
  { id: 4, icon: '📱', title: '响应式', desc: '适配各种屏幕' },
  { id: 5, icon: '🔒', title: '安全', desc: '数据加密保护' },
  { id: 6, icon: '⚡', title: '高效', desc: '优化的工作流' }
])
</script>
```

:::

## 事件监听

监听拖拽过程中的各种事件。

:::demo

```vue
<template>
  <div>
    <XDragSort 
      v-model="eventItems" 
      layout="vertical"
      @drag-start="onDragStart"
      @drag-end="onDragEnd"
      @change="onChange"
    >
      <template #default="{ item }">
        {{ item.label }}
      </template>
    </XDragSort>
    
    <div class="mt-4 p-3 bg-gray-50 rounded text-sm">
      <div class="font-medium mb-2">事件日志：</div>
      <div class="space-y-1 max-h-40 overflow-y-auto">
        <div 
          v-for="(log, idx) in logs" 
          :key="idx"
          class="text-gray-600"
        >
          {{ log }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const eventItems = ref([
  { id: 1, label: '拖动我试试 A' },
  { id: 2, label: '拖动我试试 B' },
  { id: 3, label: '拖动我试试 C' },
  { id: 4, label: '拖动我试试 D' }
])

const logs = ref([])

const addLog = (message) => {
  const time = new Date().toLocaleTimeString()
  logs.value.unshift(`[${time}] ${message}`)
  if (logs.value.length > 10) logs.value.pop()
}

const onDragStart = (e) => {
  addLog(`开始拖拽: ${e.item.label} (索引 ${e.index})`)
}

const onDragEnd = () => {
  addLog('结束拖拽')
}

const onChange = (e) => {
  addLog(`位置变化: 从索引 ${e.from} 移动到 ${e.to}`)
}
</script>
```

:::

## 复杂示例 - 图片画廊

一个实际的图片画廊排序示例。

:::demo

```vue
<template>
  <XDragSort 
    v-model="gallery" 
    :cols="4"
    gap="12px"
    item-height="200px"
  >
    <template #default="{ item, index }">
      <div class="relative h-full group">
        <div 
          class="h-full rounded-lg bg-gradient-to-br flex items-center justify-center text-white text-2xl font-bold"
        >
          <div class="text-center">
            <div class="text-5xl mb-2">
                <img src="https://picsum.photos/200/200?random=1" class="w-full h-full rounded">
            </div>
            <div class="text-sm opacity-75">图片 {{ index + 1 }}</div>
          </div>
        </div>

        <div class="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          拖动排序
        </div>
      </div>
    </template>
  </XDragSort>
</template>

<script setup>
import { ref } from 'vue'

const gallery = ref([
  { id: 1, icon: 'https://picsum.photos/200/200?random=1', color1: '#ff6b6b', color2: '#ee5a6f' },
  { id: 2, icon: 'https://picsum.photos/200/200?random=2', color1: '#4ecdc4', color2: '#44a08d' },
  { id: 3, icon: 'https://picsum.photos/200/200?random=3', color1: '#a8edea', color2: '#fed6e3' },
  { id: 4, icon: 'https://picsum.photos/200/200?random=4', color1: '#667eea', color2: '#764ba2' },
  { id: 5, icon: 'https://picsum.photos/200/200?random=5', color1: '#f093fb', color2: '#f5576c' },
  { id: 6, icon: 'https://picsum.photos/200/200?random=6', color1: '#ffecd2', color2: '#fcb69f' },
  { id: 7, icon: 'https://picsum.photos/200/200?random=7', color1: '#4facfe', color2: '#00f2fe' },
  { id: 8, icon: 'https://picsum.photos/200/200?random=8', color1: '#fa709a', color2: '#fee140' }
])
</script>
```

:::

## 属性

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| v-model / model-value | 绑定的数据列表 | `Array` | `[]` |
| layout | 布局模式 | `'grid' \| 'vertical' \| 'horizontal'` | `'grid'` |
| cols | 网格列数（仅 grid 布局生效） | `number` | `4` |
| item-width | 项目宽度 | `string` | `'auto'` |
| item-height | 项目高度 | `string` | `'auto'` |
| gap | 项目间距 | `string` | `'16px'` |
| show-handle | 显示拖拽手柄 | `boolean` | `true` |
| disabled | 禁用拖拽 | `boolean` | `false` |
| item-key | 获取项目唯一键 | `string \| Function` | `null` |
| animation-duration | 动画持续时间（ms） | `number` | `300` |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 排序改变时触发 | `{ items, from, to, item }` |
| drag-start | 开始拖拽时触发 | `{ index, item }` |
| drag-end | 结束拖拽时触发 | `{ items }` |

## 插槽

| 插槽名 | 说明 | 作用域参数 |
|--------|------|------------|
| default | 自定义项目内容 | `{ item, index }` |

## 数据项格式

每个数据项支持以下字段：

```typescript
interface DragSortItem {
  id?: string | number        // 唯一标识
  label?: string              // 显示文本
  disabled?: boolean          // 是否禁用拖拽
  [key: string]: any          // 其他自定义字段
}
```

## 方法

通过 ref 可以调用组件的方法：

| 方法名 | 说明 | 参数 |
|--------|------|------|
| reset | 重置为初始数据 | - |

```vue
<template>
  <XDragSort ref="dragSortRef" v-model="items" />
  <button @click="reset">重置</button>
</template>

<script setup>
import { ref } from 'vue'

const dragSortRef = ref()
const items = ref([...])

const reset = () => {
  dragSortRef.value.reset()
}
</script>
```

## 样式变量

组件使用了以下 CSS 变量，可以通过覆盖这些变量来自定义样式：

```css
.drag-sort-container {
  --animation-duration: 300ms;  /* 动画时长 */
  --item-width: auto;           /* 项目宽度 */
  --item-height: auto;          /* 项目高度 */
}
```

## 注意事项

1. **唯一键**: 为了更好的性能，建议为每个数据项提供唯一的 `id` 字段
2. **数据响应**: 组件会自动同步外部数据变化，无需手动更新
3. **浏览器支持**: 使用了 HTML5 Drag and Drop API，支持现代浏览器
4. **移动端**: 目前主要支持桌面端拖拽，移动端支持需要额外的触摸事件处理
5. **性能**: 对于大量数据（>100项），建议使用虚拟滚动优化性能

