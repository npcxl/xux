# 快速开始

本指南将帮助您快速上手 XUX 组件库。

## 📦 安装

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

::: tip 提示
推荐使用 pnpm 作为包管理器，它更快且更节省磁盘空间。
:::

## 🚀 基础使用

### 按需引入（推荐）

在 Vue 3 项目中按需导入组件：

```vue
<template>
  <div class="demo-container">
    <XButton type="primary">主要按钮</XButton>
    <XButton type="success">成功按钮</XButton>
    <XButton type="warning">警告按钮</XButton>
    <XButton type="danger">危险按钮</XButton>
  </div>
</template>

<script setup lang="ts">
import { XButton } from '@xlui/xux-ui'
</script>

<style scoped>
.demo-container {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
```

### 多个组件引入

```vue
<template>
  <div>
    <XCard title="商品信息">
      <XInput v-model="productName" placeholder="请输入商品名称" />
      <XButton type="primary" @click="handleSubmit">提交</XButton>
    </XCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { XButton, XCard, XInput } from '@xlui/xux-ui'

const productName = ref('')

const handleSubmit = () => {
  console.log('商品名称:', productName.value)
}
</script>
```

### 引入样式

XUX 的样式已经内置在组件中，无需单独引入。但如果您想使用主题变量，可以在项目中引入：

```ts
// main.ts
import '@xlui/xux-ui/dist/index.css'
```

## 🎨 主题定制

XUX 使用 CSS 变量来实现主题定制，您可以在项目中覆盖这些变量：

```css
/* styles/custom-theme.css */
:root {
  /* 主色调 */
  --x-color-primary: #1a1a1a;
  --x-color-primary-light: #3a3a3a;
  --x-color-primary-dark: #0d0d0d;
  
  /* 成功色 */
  --x-color-success: #10b981;
  
  /* 警告色 */
  --x-color-warning: #f59e0b;
  
  /* 危险色 */
  --x-color-danger: #ef4444;
  
  /* 圆角 */
  --x-radius: 6px;
  --x-radius-lg: 12px;
  
  /* 阴影 */
  --x-shadow: 0 2px 8px rgba(26, 26, 26, 0.1);
}
```

然后在 `main.ts` 中引入：

```ts
import './styles/custom-theme.css'
```

## 🔧 全局注册

如果不想每次都引入组件，可以在 `main.ts` 中全局注册：

### 方式一：注册所有组件

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

### 方式二：只注册常用组件

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { XButton, XCard, XInput, XModal } from '@xlui/xux-ui'
import '@xlui/xux-ui/dist/index.css'

const app = createApp(App)

// 只注册常用组件
app.component('XButton', XButton)
app.component('XCard', XCard)
app.component('XInput', XInput)
app.component('XModal', XModal)

app.mount('#app')
```

### 使用全局组件

注册后即可直接在模板中使用，无需导入：

```vue
<template>
  <div>
    <XButton type="primary">按钮</XButton>
    <XCard title="商品卡片">
      <XInput v-model="name" placeholder="请输入" />
    </XCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 无需导入组件，直接使用
const name = ref('')
</script>
```

::: tip 建议
推荐使用**按需引入**而不是全局注册，这样可以：
- 减小打包体积（Tree Shaking）
- 更清晰的依赖关系
- 更好的 TypeScript 类型提示
:::



## 🎯 完整示例

这是一个完整的电商商品卡片示例：

```vue
<template>
  <div class="product-demo">
    <XCard class="product-card">
      <template #header>
        <h3>商品信息</h3>
      </template>
      
      <XThumbnailContainer :images="productImages" />
      
      <div class="product-info">
        <XInput 
          v-model="product.name" 
          placeholder="商品名称"
          label="名称"
        />
        
        <XInput 
          v-model="product.price" 
          type="number"
          placeholder="商品价格"
          label="价格"
        />
        
        <XSelect 
          v-model="product.category"
          :options="categories"
          placeholder="选择分类"
          label="分类"
        />
        
        <XCheckboxes
          v-model="product.tags"
          :options="tagOptions"
          label="标签"
        />
      </div>
      
      <template #footer>
        <div class="actions">
          <XButton @click="handleReset">重置</XButton>
          <XButton type="primary" @click="handleSave">保存</XButton>
        </div>
      </template>
    </XCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  XButton, 
  XCard, 
  XInput, 
  XSelect, 
  XCheckboxes,
  XThumbnailContainer,
  useMsg 
} from '@xlui/xux-ui'

const msg = useMsg()

const product = ref({
  name: '',
  price: '',
  category: '',
  tags: []
})

const productImages = ref([
  'https://via.placeholder.com/400x300',
  'https://via.placeholder.com/400x300',
])

const categories = ref([
  { label: '电子产品', value: 'electronics' },
  { label: '服装', value: 'clothing' },
  { label: '食品', value: 'food' },
])

const tagOptions = ref([
  { label: '热销', value: 'hot' },
  { label: '新品', value: 'new' },
  { label: '折扣', value: 'discount' },
])

const handleSave = () => {
  msg.success('保存成功！')
  console.log('商品信息:', product.value)
}

const handleReset = () => {
  product.value = {
    name: '',
    price: '',
    category: '',
    tags: []
  }
  msg.info('已重置')
}
</script>

<style scoped>
.product-demo {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 20px 0;
}

.actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
</style>
```

## 📚 组件列表

XUX 提供了丰富的组件，涵盖电商场景的各种需求：

### 基础组件
- [Button 按钮](/components/button) - 常用的操作按钮
- [Card 卡片](/components/card) - 信息展示卡片
- [Input 输入框](/components/input) - 表单输入组件

### 表单组件
- [Select 选择器](/components/select) - 下拉选择
- [Checkboxes 多选框](/components/checkboxes) - 多项选择
- [CountrySelect 国家选择](/components/country-select) - 国家/地区选择

### 展示组件
- [Accordion 手风琴](/components/accordion) - 折叠面板
- [Modal 弹窗](/components/modal) - 对话框
- [Skeleton 骨架屏](/components/skeleton) - 加载占位
- [ThumbnailContainer 缩略图容器](/components/thumbnail-container) - 图片展示

### 反馈组件
- [Msg 消息提示](/components/msg) - 全局提示

## 🔗 相关链接

- [Gitee 仓库](https://gitee.com/leheya/xux)
- [组件文档](/components/button)
- [安装指南](/guide/installation)

## ❓ 常见问题

### 为什么组件没有显示？

1. 确认已正确安装依赖
2. 检查导入路径是否正确
3. 确保 Vue 版本 >= 3.3.0

### 如何自定义组件样式？

所有组件都支持传入 `class` 和 `style` 属性，您可以：

```vue
<XButton class="custom-button" style="width: 200px">
  自定义按钮
</XButton>
```

或者使用 CSS 变量覆盖主题：

```css
.custom-button {
  --x-color-primary: #ff6b6b;
}
```

### TypeScript 支持

XUX 完全支持 TypeScript，所有组件都有完整的类型定义：

```vue
<script setup lang="ts">
import { XButton } from '@xlui/xux-ui'
import type { ButtonProps } from '@xlui/xux-ui'

const buttonProps: ButtonProps = {
  type: 'primary',
  size: 'large',
  disabled: false
}
</script>
```

## 💡 下一步

- 浏览[组件文档](/components/button)了解更多组件用法
- 查看上面的[主题定制](#主题定制)章节学习如何自定义主题
- 访问 [Gitee 仓库](https://gitee.com/leheya/xux)反馈问题和建议

开始使用 XUX，打造您的电商应用！🎉

