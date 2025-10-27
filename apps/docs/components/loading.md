# Loading 加载

用于页面和区块的加载状态展示。

## 基础用法

全屏加载，带默认加载图标。

:::demo

```vue
<template>
  <XButton type="primary" @click="showLoading">显示全屏加载</XButton>
</template>

<script setup>
import { useLoading } from '@xlui/xux-ui'

const loading = useLoading()

const showLoading = () => {
  const instance = loading.show({
    text: '加载中...',
    fullscreen: true
  })
  
  // 3秒后关闭
  setTimeout(() => {
    instance.close()
  }, 3000)
}
</script>
```

:::

## 区域加载

在指定区域显示加载状态。

:::demo

```vue
<template>
  <div>
    <XButton type="primary" @click="showAreaLoading">显示区域加载</XButton>
    
    <div ref="loadingArea" style="margin-top: 20px; padding: 40px; border: 1px solid #ddd; border-radius: 8px; min-height: 200px; background: #f9fafb;">
      <p>这是一个需要加载的区域</p>
      <p>点击按钮后会在这个区域显示加载状态</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLoading } from '@xlui/xux-ui'

const loading = useLoading()
const loadingArea = ref()

const showAreaLoading = () => {
  const instance = loading.show({
    text: '数据加载中...',
    fullscreen: false,
    target: loadingArea.value
  })
  
  // 2秒后关闭
  setTimeout(() => {
    instance.close()
  }, 2000)
}
</script>
```

:::

## 自定义图标

使用不同的加载图标样式。

:::demo

```vue
<template>
  <XFlex gap="12" wrap="wrap">
    <XButton @click="showLoading('loading')">默认加载</XButton>
    <XButton @click="showLoading('loading-2')">波浪柱状</XButton>
    <XButton @click="showLoading('loading-3')">三角变形</XButton>
    <XButton @click="showLoading('loading-4')">圆点追逐</XButton>
    <XButton @click="showLoading('loading-5')">三层交错</XButton>
    <XButton @click="showLoading('loading-6')">方块翻转</XButton>
  </XFlex>
</template>

<script setup>
import { useLoading } from '@xlui/xux-ui'

const loading = useLoading()

const showLoading = (icon) => {
  const instance = loading.show({
    text: '加载中...',
    icon: icon,
    fullscreen: true
  })
  
  setTimeout(() => {
    instance.close()
  }, 2000)
}
</script>
```

:::

## 自定义图片加载

使用自定义图片作为加载动画。

:::demo

```vue
<template>
  <XButton type="primary" @click="showImageLoading">图片加载效果</XButton>
</template>

<script setup>
import { useLoading } from '@xlui/xux-ui'

const loading = useLoading()

const showImageLoading = () => {
  const instance = loading.show({
    text: '正在处理您的请求...',
    image: './img/logo.png',
    fullscreen: true
  })
  
  setTimeout(() => {
    instance.close()
  }, 3000)
}
</script>
```

:::

## 无背景遮罩

不显示背景遮罩，仅显示加载动画。

:::demo

```vue
<template>
  <XFlex gap="12">
    <XButton type="primary" @click="showWithBg">带背景</XButton>
    <XButton @click="showNoBg">无背景</XButton>
  </XFlex>
</template>

<script setup>
import { useLoading } from '@xlui/xux-ui'

const loading = useLoading()

const showWithBg = () => {
  const instance = loading.show({
    text: '带背景遮罩',
    background: true,
    fullscreen: true
  })
  
  setTimeout(() => {
    instance.close()
  }, 2000)
}

const showNoBg = () => {
  const instance = loading.show({
    text: '无背景遮罩',
    background: false,
    fullscreen: true
  })
  
  setTimeout(() => {
    instance.close()
  }, 2000)
}
</script>
```

:::

## 自定义透明度

调整背景遮罩的透明度。

:::demo

```vue
<template>
  <XFlex gap="12" wrap="wrap">
    <XButton @click="showLoading(0.3)">透明度 0.3</XButton>
    <XButton @click="showLoading(0.5)">透明度 0.5</XButton>
    <XButton @click="showLoading(0.7)">透明度 0.7</XButton>
    <XButton @click="showLoading(0.9)">透明度 0.9</XButton>
  </XFlex>
</template>

<script setup>
import { useLoading } from '@xlui/xux-ui'

const loading = useLoading()

const showLoading = (opacity) => {
  const instance = loading.show({
    text: `背景透明度: ${opacity}`,
    opacity: opacity,
    fullscreen: true
  })
  
  setTimeout(() => {
    instance.close()
  }, 2000)
}
</script>
```

:::

## 服务方式调用

使用预初始化的 Loading 实例。

:::demo

```vue
<template>
  <XFlex gap="12">
    <XButton type="primary" @click="loadData">模拟加载数据</XButton>
    <XButton type="success" @click="asyncOperation">异步操作</XButton>
  </XFlex>
</template>

<script setup>
import { Loading } from '@xlui/xux-ui'

const loadData = () => {
  const instance = Loading.show({ text: '正在加载数据...' })
  
  // 模拟异步请求
  setTimeout(() => {
    instance.close()
  }, 2000)
}

const asyncOperation = async () => {
  const instance = Loading.show({ 
    text: '处理中，请稍候...',
    icon: 'loading-3'
  })
  
  try {
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 2500))
  } finally {
    instance.close()
  }
}
</script>
```

:::

## API

### LoadingOptions

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| text | 加载文本 | `string` | `'加载中...'` |
| fullscreen | 是否全屏加载 | `boolean` | `true` |
| icon | 加载图标名称 | `string` | `'loading'` |
| image | 自定义图片 URL | `string` | - |
| opacity | 背景遮罩透明度 (0-1) | `number` | `0.7` |
| background | 是否显示背景遮罩 | `boolean` | `true` |
| target | 目标元素（区域加载时） | `HTMLElement \| string` | - |
| customClass | 自定义类名 | `string` | - |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| show | 显示加载 | `(options: LoadingOptions)` | `{ close: () => void }` |
| close | 关闭当前加载 | - | - |

## 使用示例

```vue
<script setup>
import { useLoading, Loading } from '@xlui/xux-ui'

// 方式1: 使用 composable
const loading = useLoading()
const instance = loading.show({ text: '加载中...' })
instance.close()

// 方式2: 使用预初始化实例
const instance2 = Loading.show({ 
  text: '处理中...',
  fullscreen: false,
  target: '#myElement'
})
Loading.close()

// 方式3: 异步操作自动管理
async function fetchData() {
  const instance = Loading.show({ text: '获取数据中...' })
  try {
    const data = await fetch('/api/data')
    return data
  } finally {
    instance.close()
  }
}
</script>
```

