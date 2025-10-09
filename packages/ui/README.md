# @xlui/xux-ui

Vue3 电商组件库 - 专为电商平台打造的现代化 UI 组件库

## 在线文档 [xux.xlcig.cn](https://xux.xlcig.cn)

## 📦 安装

```bash
npm install @xlui/xux-ui
# 或
pnpm add @xlui/xux-ui
# 或
yarn add @xlui/xux-ui
```

## 🚀 快速开始

### 按需引入（推荐）

```vue
<template>
  <div>
    <XButton type="primary">主要按钮</XButton>
    <XCard title="商品卡片">
      <p>卡片内容</p>
    </XCard>
  </div>
</template>

<script setup lang="ts">
import { XButton, XCard } from '@xlui/xux-ui'
import '@xlui/xux-ui/dist/index.css'
// 或者使用别名
// import '@xlui/xux-ui/style.css'
</script>
```

### 全局注册

如果不想每次都引入，可以在 `main.ts` 中全局注册：

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
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

注册后即可直接使用：

```vue
<template>
  <XButton type="primary">按钮</XButton>
</template>

<script setup>
// 无需导入
</script>
```

## 组件列表

- [x] Button 按钮
- [ ] Card 卡片
- [ ] Input 输入框
- [ ] ... 更多组件开发中

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build
```

## 在线文档

访问 [在线 Demo](https://your-demo-url.com) 查看组件示例

## License

MIT


