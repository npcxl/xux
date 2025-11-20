# Accordion 手风琴

手风琴组件，用于折叠/展开内容，节省页面空间。

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 32px;">

<div>

## 基础用法

基本的手风琴功能，一次只能展开一个面板。

:::demo

```vue
<template>
  <XAccordion :items="items" />
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  {
    id: 1,
    title: '什么是 Vue.js？',
    content: 'Vue.js 是一套用于构建用户界面的渐进式 JavaScript 框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。'
  },
  {
    id: 2,
    title: '为什么选择 Vue？',
    content: 'Vue 具有易学易用、灵活性强、性能优秀等特点。它采用组件化的开发方式，使得代码更加模块化和可维护。'
  },
  {
    id: 3,
    title: 'Vue 3 有哪些新特性？',
    content: 'Vue 3 引入了 Composition API、更好的 TypeScript 支持、Teleport、Fragments、更快的渲染性能等诸多新特性。'
  }
])
</script>
```

:::

</div>

<div>

## 允许多个展开

设置 `allow-multiple` 属性允许同时展开多个面板。

:::demo

```vue
<template>
  <XAccordion :items="items" allow-multiple />
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  {
    title: '技术栈',
    content: '前端使用 Vue 3 + TypeScript + Vite，后端使用 Node.js + Express，数据库使用 MongoDB。'
  },
  {
    title: '开发工具',
    content: '推荐使用 VS Code 作为代码编辑器，配合 Volar 插件可以获得更好的开发体验。'
  },
  {
    title: '部署方式',
    content: '可以使用 Docker 容器化部署，也可以使用传统的服务器部署方式。建议使用 CI/CD 流程自动化部署。'
  }
])
</script>
```

:::

</div>

</div>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 24px;">

<div>

## 默认展开

使用 `default-open` 属性设置默认展开的面板（索引数组）。

:::demo

```vue
<template>
  <XAccordion :items="items" :default-open="[0, 2]" allow-multiple />
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  {
    title: 'HTML 基础',
    content: 'HTML 是超文本标记语言，用于创建网页的结构。它使用标签来定义页面元素，如标题、段落、链接等。'
  },
  {
    title: 'CSS 样式',
    content: 'CSS 用于控制网页的外观和布局。通过 CSS 可以设置颜色、字体、间距、定位等样式属性。'
  },
  {
    title: 'JavaScript 交互',
    content: 'JavaScript 是一种编程语言，用于为网页添加交互功能。它可以响应用户操作、修改页面内容、发送网络请求等。'
  }
])
</script>
```

:::

## 无边框模式

设置 `:bordered="false"` 移除外边框。

:::demo

```vue
<template>
  <div class="space-y-6">
    <div>
      <div class="text-sm font-medium mb-2">有边框（默认）</div>
      <XAccordion :items="items1" />
    </div>
    <div>
      <div class="text-sm font-medium mb-2">无边框</div>
      <XAccordion :items="items2" :bordered="false" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items1 = ref([
  { title: '选项 1', content: '这是有边框的手风琴组件内容。' },
  { title: '选项 2', content: '边框可以让内容区域更加清晰明确。' }
])

const items2 = ref([
  { title: '选项 1', content: '这是无边框的手风琴组件内容。' },
  { title: '选项 2', content: '无边框样式更加简洁轻量。' }
])
</script>
```

:::

</div>

</div>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 24px;">

<div>

## 禁用状态

通过 `disabled` 属性禁用整个组件，或禁用单个项目。

:::demo

```vue
<template>
  <div class="space-y-6">
    <div>
      <div class="text-sm font-medium mb-2">整体禁用</div>
      <XAccordion :items="items1" disabled />
    </div>
    <div>
      <div class="text-sm font-medium mb-2">部分项禁用</div>
      <XAccordion :items="items2" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items1 = ref([
  { title: '已禁用项 1', content: '整个组件已被禁用，无法展开。' },
  { title: '已禁用项 2', content: '整个组件已被禁用，无法展开。' }
])

const items2 = ref([
  { title: '正常项', content: '这是正常的可展开项。' },
  { title: '禁用项', content: '这个项目被单独禁用了。', disabled: true },
  { title: '正常项', content: '这是正常的可展开项。' }
])
</script>
```

:::

</div>

<div>

## 事件监听

监听手风琴的展开/折叠事件。

:::demo

```vue
<template>
  <div>
    <XAccordion 
      :items="items" 
      allow-multiple
      @change="handleChange"
      @item-click="handleItemClick"
    />
    <div class="mt-4 p-3 bg-gray-100 rounded text-sm space-y-1">
      <div><strong>事件日志：</strong></div>
      <div v-for="(log, index) in logs" :key="index" class="text-xs">
        {{ log }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { title: '项目 A', content: '这是项目 A 的内容。' },
  { title: '项目 B', content: '这是项目 B 的内容。' },
  { title: '项目 C', content: '这是项目 C 的内容。' }
])

const logs = ref([])

const handleChange = (openItems) => {
  const time = new Date().toLocaleTimeString()
  logs.value.unshift(`[${time}] 展开的项: [${openItems.join(', ')}]`)
  if (logs.value.length > 5) {
    logs.value.pop()
  }
}

const handleItemClick = (index, isOpen) => {
  const time = new Date().toLocaleTimeString()
  const action = isOpen ? '展开' : '折叠'
  logs.value.unshift(`[${time}] 项 ${index} 被${action}`)
  if (logs.value.length > 5) {
    logs.value.pop()
  }
}
</script>
```

:::

</div>

</div>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 24px;">

<div>

## 暴露的方法

使用 ref 调用组件的方法进行编程控制。

:::demo

```vue
<template>
  <div>
    <XAccordion 
      ref="accordionRef"
      :items="items" 
      allow-multiple
    />
    <div class="mt-4 flex flex-wrap gap-2">
      <button 
        @click="openFirst"
        class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 text-sm"
      >
        展开第一项
      </button>
      <button 
        @click="closeFirst"
        class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
      >
        折叠第一项
      </button>
      <button 
        @click="openAll"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
      >
        全部展开
      </button>
      <button 
        @click="closeAll"
        class="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 text-sm"
      >
        全部折叠
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const accordionRef = ref(null)

const items = ref([
  { title: '功能特性', content: '本组件支持单选、多选、默认展开、禁用等多种模式。' },
  { title: '使用方法', content: '通过 props 配置组件行为，通过 ref 调用方法进行控制。' },
  { title: '注意事项', content: '注意区分单选和多选模式下的不同行为表现。' }
])

const openFirst = () => {
  accordionRef.value?.openItem(0)
}

const closeFirst = () => {
  accordionRef.value?.closeItem(0)
}

const openAll = () => {
  accordionRef.value?.openAll()
}

const closeAll = () => {
  accordionRef.value?.closeAll()
}
</script>
```

:::

</div>

</div>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| items | 手风琴项数据 | `AccordionItem[]` | `[]` |
| allowMultiple | 是否允许同时展开多个项 | `boolean` | `false` |
| defaultOpen | 默认展开的项索引数组 | `number[]` | `[]` |
| bordered | 是否显示边框 | `boolean` | `true` |
| disabled | 是否禁用 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 展开项变化时触发 | `(openItems: number[])` |
| item-click | 点击项时触发 | `(index: number, isOpen: boolean)` |

### Exposed Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| openItem | 展开指定项 | `(index: number)` |
| closeItem | 折叠指定项 | `(index: number)` |
| toggle | 切换指定项状态 | `(index: number)` |
| openAll | 展开所有项（仅多选模式） | `()` |
| closeAll | 折叠所有项 | `()` |

### AccordionItem 接口

```typescript
interface AccordionItem {
  id?: string | number    // 唯一标识（可选）
  title: string          // 标题
  content: string        // 内容
  disabled?: boolean     // 是否禁用（可选）
}
```

## 贡献者

<div class="contributors">
  <div class="contributor-item">
    <a href="https://gitee.com/leheya" target="_blank" rel="noopener noreferrer">
      <img 
        src="https://foruda.gitee.com/avatar/1751620424517657404/10604783_leheya_1751620424.png!avatar200" 
        alt="leheya"
        class="contributor-avatar"
      />
      <span class="contributor-name">无敌暴龙神</span>
    </a>
  </div>
  <!-- <div class="contributor-item">
    <a href="https://gitee.com/haijun-li" target="_blank" rel="noopener noreferrer">
      <img 
        src="https://p3.itc.cn/images01/20230307/e9d72e3788844ed1a9259e442899e1bd.png" 
        alt="lihaijun"
        class="contributor-avatar"
      />
      <span class="contributor-name">lihaijun</span>
    </a>
  </div> -->
</div>

<style scoped>
.contributors {
  display: flex;
  gap: 24px;
  margin: 24px 0;
  flex-wrap: wrap;
}

.contributor-item a {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease;
}

.contributor-item a:hover {
  transform: translateY(-2px);
}

.contributor-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid var(--vp-c-border);
  transition: border-color 0.2s ease;
  object-fit: cover;
}

.contributor-item a:hover .contributor-avatar {
  border-color: var(--vp-c-brand-1);
}

.contributor-name {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color 0.2s ease;
}

.contributor-item a:hover .contributor-name {
  color: var(--vp-c-brand-1);
}

@media (max-width: 768px) {
  .contributors {
    gap: 16px;
  }
  
  .contributor-avatar {
    width: 60px;
    height: 60px;
  }
  
  .contributor-name {
    font-size: 12px;
  }
}
</style>
