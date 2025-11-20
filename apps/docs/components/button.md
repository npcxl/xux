# Button 按钮

按钮用于触发一个操作，是用户和系统交互的基础组件。采用 iOS 17 设计语言，提供精致的视觉效果和流畅的交互体验。

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 32px;">

<div>

## 基础用法

标准按钮，采用系统色彩和圆润的圆角设计。

:::demo

```vue
<template>
  <XFlex gap="12" wrap="wrap">
    <XButton>默认按钮</XButton>
    <XButton type="primary">系统蓝</XButton>
    <XButton type="success">系统绿</XButton>
    <XButton type="warning">系统橙</XButton>
    <XButton type="danger">系统红</XButton>
  </XFlex>
</template>

<script setup>
import { XFlex, XButton } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 带图标的按钮

使用 [Iconify](https://icones.js.org/) 图标库，支持 10万+ 图标。

:::demo

```vue
<template>
  <XFlex gap="12" wrap="wrap">
    <XButton type="primary" icon="mdi:cart">加入购物车</XButton>
    <XButton type="success" icon="mdi:check-circle">确认</XButton>
    <XButton type="warning" icon="mdi:alert-circle">提醒</XButton>
    <XButton type="danger" icon="mdi:delete">删除</XButton>
    <XButton icon="mdi:magnify">搜索</XButton>
  </XFlex>
</template>

<script setup>
import { XFlex, XButton } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 幽灵按钮

透明背景边框按钮，轻柔的悬停效果。

:::demo

```vue
<template>
  <XFlex gap="12" wrap="wrap">
    <XButton ghost>默认</XButton>
    <XButton type="primary" ghost>系统蓝</XButton>
    <XButton type="success" ghost>系统绿</XButton>
    <XButton type="warning" ghost>系统橙</XButton>
    <XButton type="danger" ghost>系统红</XButton>
  </XFlex>
</template>

<script setup>
import { XFlex, XButton } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 右侧图标

图标也可以放在右侧。

:::demo

```vue
<template>
  <XFlex gap="12" wrap="wrap">
    <XButton type="primary" icon-right="mdi:arrow-right">下一步</XButton>
    <XButton type="primary" icon-right="mdi:download">下载</XButton>
    <XButton icon-right="mdi:chevron-down">展开</XButton>
  </XFlex>
</template>

<script setup>
import { XFlex, XButton } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 文字按钮

无边框，点击时轻微的背景色变化。

:::demo

```vue
<template>
  <XFlex gap="16">
    <XButton type="text">文字按钮</XButton>
    <XButton type="text" icon="mdi:link-variant">查看详情</XButton>
    <XButton type="text" disabled>禁用状态</XButton>
  </XFlex>
</template>

<script setup>
import { XFlex, XButton } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 链接按钮

悬停时显示下划线，适用于导航和轻量级操作。

:::demo

```vue
<template>
  <XFlex gap="16">
    <XButton type="link">查看更多</XButton>
    <XButton type="link" icon="mdi:open-in-new">打开链接</XButton>
    <XButton type="link" disabled>禁用链接</XButton>
  </XFlex>
</template>

<script setup>
import { XFlex, XButton } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 圆角按钮

完全圆角按钮，更加圆润可爱。

:::demo

```vue
<template>
  <XFlex gap="12" wrap="wrap">
    <XButton type="primary" round icon="mdi:heart">收藏</XButton>
    <XButton type="success" round icon="mdi:check">完成</XButton>
    <XButton type="warning" round icon="mdi:alert">注意</XButton>
    <XButton type="danger" round icon="mdi:close">取消</XButton>
  </XFlex>
</template>

<script setup>
import { XFlex, XButton } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 禁用状态

降低不透明度和饱和度。

:::demo

```vue
<template>
  <XFlex gap="12" wrap="wrap">
    <XButton disabled>默认</XButton>
    <XButton type="primary" disabled>系统蓝</XButton>
    <XButton type="success" disabled>系统绿</XButton>
    <XButton type="warning" disabled>系统橙</XButton>
    <XButton type="danger" disabled>系统红</XButton>
  </XFlex>
</template>

<script setup>
import { XFlex, XButton } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 加载状态

优雅的旋转动画。

:::demo

```vue
<template>
  <XFlex gap="12" wrap="wrap">
    <XButton type="primary" loading>处理中</XButton>
    <XButton type="success" loading>保存中</XButton>
    <XButton type="warning" loading>提交中</XButton>
  </XFlex>
</template>

<script setup>
import { XFlex, XButton } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 不同尺寸

提供三种尺寸，适配不同场景。

:::demo

```vue
<template>
  <XFlex gap="12" align="center">
    <XButton type="primary" size="small" icon="mdi:cart">小号按钮</XButton>
    <XButton type="primary" icon="mdi:cart">中号按钮</XButton>
    <XButton type="primary" size="large" icon="mdi:cart">大号按钮</XButton>
  </XFlex>
</template>

<script setup>
import { XFlex, XButton } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 块级按钮

全宽按钮，适用于移动端和表单场景。

:::demo

```vue
<template>
  <XFlex vertical gap="12">
    <XButton type="primary" block icon="mdi:cart">立即购买</XButton>
    <XButton type="success" block icon="mdi:check-circle">确认订单</XButton>
    <XButton block ghost>取消</XButton>
  </XFlex>
</template>

<script setup>
import { XFlex, XButton } from '@xlui/xux-ui'
</script>
```

:::

</div>

</div>

## 应用场景

在实际应用中的使用效果。

:::demo

```vue
<template>
  <XFlex vertical gap="16" style="max-width: 400px;">
    <!-- 商品操作 -->
    <div style="padding: 16px; background: #F2F2F7; border-radius: 12px;">
      <XFlex gap="12">
        <XButton type="primary" icon="mdi:cart" style="flex: 1;">加入购物车</XButton>
        <XButton type="danger" ghost icon="mdi:heart-outline"></XButton>
      </XFlex>
    </div>
    
    <!-- 购买按钮 -->
    <XButton type="primary" size="large" block icon="mdi:shopping">立即购买</XButton>
    
    <!-- 确认操作 -->
    <XFlex gap="12">
      <XButton type="success" icon="mdi:check-circle" style="flex: 1;">确认</XButton>
      <XButton ghost icon="mdi:close" style="flex: 1;">取消</XButton>
    </XFlex>
  </XFlex>
</template>

<script setup>
import { XFlex, XButton } from '@xlui/xux-ui'
</script>
```

:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型 | `default` \| `primary` \| `success` \| `warning` \| `danger` \| `text` \| `link` | `default` |
| size | 按钮尺寸 | `small` \| `medium` \| `large` | `medium` |
| icon | 左侧图标（使用 iconify 图标名） | `string` | - |
| iconRight | 右侧图标（使用 iconify 图标名） | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| block | 是否为块级按钮 | `boolean` | `false` |
| round | 是否为完全圆角按钮 | `boolean` | `false` |
| ghost | 是否为幽灵按钮（边框样式） | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击按钮时触发 | `(event: MouseEvent)` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 按钮内容 |
