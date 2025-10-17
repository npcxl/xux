# Skeleton 骨架屏

骨架屏组件，用于在内容加载时显示占位符，提升用户体验。

<div style="columns: 2; column-gap: 32px; margin-top: 32px;">

<div style="break-inside: avoid; margin-bottom: 24px;">

## 基础用法

显示基本的骨架屏占位符。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <XSkeleton width="200px" height="20px" />
    <XSkeleton width="300px" height="20px" />
    <XSkeleton width="250px" height="20px" />
  </XFlex>
</template>

<script setup>
import { XFlex, XSkeleton } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 不同形状

支持矩形、圆角和圆形三种形状。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <div>
      <div style="font-size: 14px; margin-bottom: 8px; color: #666">矩形（默认）</div>
      <XSkeleton width="300px" height="40px" shape="rectangle" />
    </div>
    <div>
      <div style="font-size: 14px; margin-bottom: 8px; color: #666">圆角</div>
      <XSkeleton width="300px" height="40px" shape="rounded" />
    </div>
    <div>
      <div style="font-size: 14px; margin-bottom: 8px; color: #666">圆形</div>
      <XSkeleton width="60px" height="60px" shape="circle" />
    </div>
  </XFlex>
</template>

<script setup>
import { XFlex, XSkeleton } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 加载状态控制

通过 `loading` 属性控制显示骨架屏还是实际内容。

:::demo

```vue
<template>
  <div>
    <XButton @click="loading = !loading" style="margin-bottom: 16px">
      {{ loading ? '加载完成' : '重新加载' }}
    </XButton>
    <XFlex vertical gap="12">
      <XSkeleton :loading="loading" width="100%" height="24px">
        <h3 style="font-size: 18px; font-weight: 600">这是标题内容</h3>
      </XSkeleton>
      <XSkeleton :loading="loading" width="100%" height="60px">
        <p style="color: #666">
          这是实际的内容文本。当 loading 为 false 时，会显示这段文字而不是骨架屏。
          骨架屏组件可以很好地提升用户体验。
        </p>
      </XSkeleton>
    </XFlex>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XButton, XSkeleton } from '@xlui/xux-ui'

const loading = ref(true)
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 取消动画

设置 `:animated="false"` 可以禁用脉冲动画效果。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <div>
      <div style="font-size: 14px; margin-bottom: 8px; color: #666">有动画（默认）</div>
      <XSkeleton width="300px" height="40px" :animated="true" />
    </div>
    <div>
      <div style="font-size: 14px; margin-bottom: 8px; color: #666">无动画</div>
      <XSkeleton width="300px" height="40px" :animated="false" />
    </div>
  </XFlex>
</template>

<script setup>
import { XFlex, XSkeleton } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 组合使用

组合多个骨架屏创建复杂的加载布局。

:::demo

```vue
<template>
  <div>
    <XButton @click="loading = !loading" style="margin-bottom: 16px">
      {{ loading ? '加载完成' : '重新加载' }}
    </XButton>
    
    <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px">
      <!-- 用户卡片 -->
      <XFlex align="center" gap="16" style="margin-bottom: 16px">
        <XSkeleton :loading="loading" width="60px" height="60px" shape="circle">
          <img src="https://i.pravatar.cc/60" style="width: 60px; height: 60px; border-radius: 50%" />
        </XSkeleton>
        <XFlex vertical gap="8" style="flex: 1">
          <XSkeleton :loading="loading" width="120px" height="20px">
            <div style="font-weight: 600">张三</div>
          </XSkeleton>
          <XSkeleton :loading="loading" width="200px" height="16px">
            <div style="font-size: 14px; color: #666">前端开发工程师</div>
          </XSkeleton>
        </XFlex>
      </XFlex>
      
      <!-- 内容区 -->
      <XFlex vertical gap="8">
        <XSkeleton :loading="loading" width="100%" height="16px">
          <p style="color: #333">个人简介：热爱编程，专注于前端技术...</p>
        </XSkeleton>
        <XSkeleton :loading="loading" width="80%" height="16px">
          <p style="color: #333">擅长 Vue.js、React、TypeScript 等技术栈。</p>
        </XSkeleton>
      </XFlex>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XButton, XSkeleton } from '@xlui/xux-ui'

const loading = ref(true)
</script>
```

:::

</div>

</div>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| loading | 是否显示骨架屏 | `boolean` | `true` |
| width | 宽度 | `string` | `'100%'` |
| height | 高度 | `string` | `'20px'` |
| shape | 形状 | `'rectangle' \| 'rounded' \| 'circle'` | `'rectangle'` |
| animated | 是否显示动画 | `boolean` | `true` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | loading 为 false 时显示的实际内容 |
