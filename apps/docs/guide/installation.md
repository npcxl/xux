# 安装

## 环境要求

- Node.js >= 18
- pnpm >= 8 (推荐)
- Vue >= 3.3.0

## 安装组件库

::: code-group

```bash [pnpm]
pnpm add @xlui/xux-ui
```

```bash [npm]
npm install @xlui/xux-ui
```

```bash [yarn]
yarn add @xlui/xux-ui
```

:::

## 基础使用

### 按需引入

在 Vue 3 项目中直接导入使用：

```vue
<template>
  <XButton type="primary">按钮</XButton>
</template>

<script setup lang="ts">
import { XButton } from '@xlui/xux-ui'
</script>
```

### 引入样式（可选）

组件样式已内置，但如果需要使用主题变量，可以引入：

```ts
// main.ts
import '@xlui/xux-ui/dist/index.css'
```

## 全局注册（可选）

如果不想每次都引入组件，可以在 `main.ts` 中全局注册所有组件：

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

// 导入所有组件
import * as XUXComponents from '@xlui/xux-ui'
import '@xlui/xux-ui/dist/index.css'

const app = createApp(App)

// 全局注册所有组件
Object.entries(XUXComponents).forEach(([name, component]) => {
  if (name.startsWith('X')) {
    app.component(name, component)
  }
})

app.mount('#app')
```

注册后即可直接在模板中使用，无需导入：

```vue
<template>
  <div>
    <XButton type="primary">按钮</XButton>
    <XCard title="卡片">内容</XCard>
  </div>
</template>

<script setup lang="ts">
// 无需导入，直接使用
</script>
```
