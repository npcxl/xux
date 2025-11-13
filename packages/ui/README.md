# 快速开始

本指南将帮助您快速上手 XUX-UI 组件库，从安装到使用，让您在几分钟内就能开始构建现代化的电商应用。

在线文档：[https://xux.xlcig.cn](https://xux.xlcig.cn)

## 📌 版本说明

当前版本：**1.3.22**

::: tip 重要提示
- ✅ 推荐使用最新版本，旧版本可能存在 Bug 和样式问题
- ✅ 完整支持 Vue 3 项目和 UniApp 项目
- ✅ 部分复杂组件基于 Element Plus 的 `ElPopover` 优化性能
- ✅ 问题反馈：18569795073@163.com
:::

### 版本检查

查看当前已安装版本：

::: code-group

```bash [pnpm]
pnpm list @xlui/xux-ui
```

```bash [npm]
npm list @xlui/xux-ui
```

:::

### 版本更新

如果已安装旧版本，使用以下命令更新：

::: code-group

```bash [pnpm]
pnpm update @xlui/xux-ui
```

```bash [npm]
npm update @xlui/xux-ui
```

```bash [yarn]
yarn upgrade @xlui/xux-ui
```

:::

## 📦 安装

### 使用包管理器安装

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

组件样式已内置，但推荐在项目入口引入完整样式以获得更好的主题支持：

```ts
// main.ts
import '@xlui/xux-ui/dist/index.css'
```

::: tip 主题定制
XUX-UI 支持完整的主题定制和深色/浅色模式切换。  
📖 查看 [主题化配置](/components/theme-config) 了解详细的主题定制方案。
:::

## 🔧 Vue 3 项目配置

### 方式一：全局注册所有组件

如果不想每次都引入组件，可以在项目入口文件中全局注册所有组件：

::: code-group

```ts [main.ts]
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

```js [main.js]
// main.js
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

:::

### 方式二：全局注册常用组件

::: code-group

```ts [main.ts]
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { XButton, XCard, XInput, XModal, XBadge, XSelect } from '@xlui/xux-ui'
import '@xlui/xux-ui/dist/index.css'

const app = createApp(App)

// 只注册常用组件
app.component('XButton', XButton)
app.component('XCard', XCard)
app.component('XInput', XInput)
app.component('XModal', XModal)
app.component('XBadge', XBadge)
app.component('XSelect', XSelect)

app.mount('#app')
```

```js [main.js]
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import { XButton, XCard, XInput, XModal, XBadge, XSelect } from '@xlui/xux-ui'
import '@xlui/xux-ui/dist/index.css'

const app = createApp(App)

// 只注册常用组件
app.component('XButton', XButton)
app.component('XCard', XCard)
app.component('XInput', XInput)
app.component('XModal', XModal)
app.component('XBadge', XBadge)
app.component('XSelect', XSelect)

app.mount('#app')
```

:::

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

### 方式三：自动导入（推荐！最佳实践）

使用 `unplugin-vue-components` 实现自动按需导入：

**1. 安装依赖**

::: code-group

```bash [pnpm]
pnpm add -D unplugin-vue-components
```

```bash [npm]
npm install -D unplugin-vue-components
```

```bash [yarn]
yarn add -D unplugin-vue-components
```

:::

**2. 配置 vite.config.ts**

::: code-group

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        // 自定义解析器，自动导入 XUX 组件
        (componentName) => {
          if (componentName.startsWith('X')) {
            return {
              name: componentName,
              from: '@xlui/xux-ui'
            }
          }
        }
      ],
      dts: true // 自动生成类型声明文件
    })
  ]
})
```

```js [vite.config.js]
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        // 自定义解析器，自动导入 XUX 组件
        (componentName) => {
          if (componentName.startsWith('X')) {
            return {
              name: componentName,
              from: '@xlui/xux-ui'
            }
          }
        }
      ],
      dts: true // 自动生成类型声明文件
    })
  ]
})
```

:::

**3. 在项目入口文件中引入样式**

::: code-group

```ts [main.ts]
import { createApp } from 'vue'
import App from './App.vue'
import '@xlui/xux-ui/dist/index.css'

createApp(App).mount('#app')
```

```js [main.js]
import { createApp } from 'vue'
import App from './App.vue'
import '@xlui/xux-ui/dist/index.css'

createApp(App).mount('#app')
```

:::

**4. 直接使用（无需导入）**

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

// 无需导入组件，自动识别并导入
const name = ref('')
</script>
```

::: tip 最佳实践
**推荐使用自动导入方式**，它结合了便利性和性能优势：
- ✅ 无需手动导入，开发体验最佳
- ✅ 按需打包，体积最小（Tree Shaking）
- ✅ 自动生成 TypeScript 类型声明
- ✅ 更清晰的依赖关系
:::

## 🚢 Nuxt 4 项目配置

XUX 完美支持 Nuxt 4，提供三种配置方式：

### 方式一：Nuxt 插件全局注册

**1. 创建插件文件 `plugins/xux-ui.ts`**

```ts
// plugins/xux-ui.ts
import * as XUXComponents from '@xlui/xux-ui'
import '@xlui/xux-ui/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  // 全局注册所有组件
  Object.entries(XUXComponents).forEach(([name, component]) => {
    if (name.startsWith('X')) {
      nuxtApp.vueApp.component(name, component as any)
    }
  })
})
```

**2. 直接使用**

```vue
<template>
  <div>
    <XButton type="primary">主要按钮</XButton>
    <XBadge :value="10">
      <XButton>通知</XButton>
    </XBadge>
  </div>
</template>

<script setup lang="ts">
// 无需导入，直接使用
</script>
```

### 方式二：按需引入

**1. 配置 `nuxt.config.ts`**

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: [
    '@xlui/xux-ui/dist/index.css'
  ],
  
  typescript: {
    strict: true
  }
})
```

**2. 在组件中按需导入**

```vue
<template>
  <div>
    <XButton type="primary">主要按钮</XButton>
    <XBadge :value="10">
      <XButton>通知</XButton>
    </XBadge>
  </div>
</template>

<script setup lang="ts">
import { XButton, XBadge } from '@xlui/xux-ui'
</script>
```

### 方式三：自动导入（推荐！）

**1. 安装依赖**

```bash
pnpm add -D unplugin-vue-components
```

**2. 配置 `nuxt.config.ts`**

```ts
// nuxt.config.ts
import Components from 'unplugin-vue-components/vite'

export default defineNuxtConfig({
  css: [
    '@xlui/xux-ui/dist/index.css'
  ],
  
  vite: {
    plugins: [
      Components({
        resolvers: [
          // 自定义解析器，自动导入 XUX 组件
          (componentName) => {
            if (componentName.startsWith('X')) {
              return {
                name: componentName,
                from: '@xlui/xux-ui'
              }
            }
          }
        ],
        dts: true // 自动生成类型声明文件
      })
    ]
  },
  
  typescript: {
    strict: true,
    typeCheck: true
  }
})
```

**3. 直接使用（自动导入）**

```vue
<template>
  <div>
    <XButton type="primary">主要按钮</XButton>
    <XBadge :value="10">
      <XButton>通知</XButton>
    </XBadge>
    <XCard title="商品卡片">
      <p>这是卡片内容</p>
    </XCard>
  </div>
</template>

<script setup lang="ts">
// 无需导入，自动识别并导入
// 自动生成 TypeScript 类型
</script>
```

### Nuxt SSR 注意事项

Nuxt 默认启用 SSR（服务端渲染），大部分组件都能正常工作。但如果遇到某些组件在服务端报错（如使用了 `window`、`document` 等浏览器 API），可以使用 `<ClientOnly>` 包裹：

```vue
<template>
  <div>
    <!-- 正常组件 -->
    <XButton>按钮</XButton>
    
    <!-- 仅客户端渲染的组件 -->
    <ClientOnly>
      <XQrcode value="https://example.com" />
    </ClientOnly>
  </div>
</template>
```

::: tip 推荐配置
**Nuxt 4 推荐使用方式三（自动导入）**，它结合了便利性和性能优势：
- ✅ 无需手动导入，开发体验最佳
- ✅ 自动按需加载，打包体积小
- ✅ 完美支持 SSR
- ✅ 自动生成 TypeScript 类型
:::

## 🎨 使用工具函数

XUX 提供了一些实用工具函数，需要手动导入使用：

### 消息提示

```vue
<script setup lang="ts">
import { Msg } from '@xlui/xux-ui'

// 成功提示
Msg.success('操作成功！')

// 错误提示
Msg.error('操作失败！')

// 警告提示
Msg.warning('警告信息')

// 信息提示
Msg.info('提示信息')
</script>
```

### 对话框

```vue
<script setup lang="ts">
import { Alert } from '@xlui/xux-ui'

// 确认对话框
Alert.confirm({
  title: '确认删除',
  message: '确定要删除这条记录吗？',
  onConfirm: () => {
    console.log('确认删除')
  },
  onCancel: () => {
    console.log('取消操作')
  }
})

// 提示对话框
Alert.show({
  title: '提示',
  message: '这是一条提示信息'
})
</script>
```

### 日期时间工具

```vue
<script setup lang="ts">
import { DateTime } from '@xlui/xux-ui'

// 格式化日期
const formattedDate = DateTime.format(new Date(), 'YYYY-MM-DD HH:mm:ss')

// 解析日期
const date = DateTime.parse('2024-01-01')

// 相对时间
const relative = DateTime.fromNow(new Date())
</script>
```

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

