# Button 按钮

按钮用于触发一个操作，是用户和系统交互的基础组件。

<div style="columns: 2; column-gap: 32px; margin-top: 32px;">

<div style="break-inside: avoid; margin-bottom: 24px;">

## 基础用法

基本的按钮用法。

:::demo

```vue
<template>
  <XFlex gap="12" wrap="wrap">
    <XButton>默认按钮</XButton>
    <XButton type="primary">主要按钮</XButton>
    <XButton type="success">成功按钮</XButton>
    <XButton type="warning">警告按钮</XButton>
    <XButton type="danger">危险按钮</XButton>
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
    <XButton type="success" icon="mdi:check">确认</XButton>
    <XButton type="warning" icon="mdi:alert">警告</XButton>
    <XButton type="danger" icon="mdi:delete">删除</XButton>
    <XButton icon="mdi:search">搜索</XButton>
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

透明背景，只有边框和文字。

:::demo

```vue
<template>
  <XFlex gap="12" wrap="wrap">
    <XButton type="primary" ghost>主要按钮</XButton>
    <XButton type="success" ghost>成功按钮</XButton>
    <XButton type="warning" ghost>警告按钮</XButton>
    <XButton type="danger" ghost>危险按钮</XButton>
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

没有边框和背景色的按钮。

:::demo

```vue
<template>
  <XFlex gap="12">
    <XButton type="text">文字按钮</XButton>
    <XButton type="text" icon="mdi:link">链接</XButton>
    <XButton type="text" disabled>禁用按钮</XButton>
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

通过 `round` 属性设置圆角按钮。

:::demo

```vue
<template>
  <XFlex gap="12" wrap="wrap">
    <XButton type="primary" round icon="mdi:heart">收藏</XButton>
    <XButton type="success" round>成功按钮</XButton>
    <XButton type="warning" round>警告按钮</XButton>
    <XButton type="danger" round>危险按钮</XButton>
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

按钮的禁用状态。

:::demo

```vue
<template>
  <XFlex gap="12" wrap="wrap">
    <XButton disabled>默认按钮</XButton>
    <XButton type="primary" disabled>主要按钮</XButton>
    <XButton type="success" disabled>成功按钮</XButton>
    <XButton type="warning" disabled>警告按钮</XButton>
    <XButton type="danger" disabled>危险按钮</XButton>
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

点击按钮后显示加载状态。

:::demo

```vue
<template>
  <XFlex gap="12">
    <XButton type="primary" loading>加载中</XButton>
    <XButton type="success" loading>加载中</XButton>
    <XButton type="warning" loading>加载中</XButton>
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

提供三种尺寸。

:::demo

```vue
<template>
  <XFlex gap="12" align="center">
    <XButton type="primary" size="small" icon="mdi:cart">小型</XButton>
    <XButton type="primary" icon="mdi:cart">默认</XButton>
    <XButton type="primary" size="large" icon="mdi:cart">大型</XButton>
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

`block` 属性使按钮适合父宽度。

:::demo

```vue
<template>
  <XFlex vertical gap="12">
    <XButton type="primary" block icon="mdi:cart">立即购买</XButton>
    <XButton type="success" block icon="mdi:check">确认订单</XButton>
  </XFlex>
</template>

<script setup>
import { XFlex, XButton } from '@xlui/xux-ui'
</script>
```

:::

</div>

</div>

## 电商场景示例

常见的电商按钮使用场景。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <XFlex gap="12">
      <XButton type="primary" icon="mdi:cart">加入购物车</XButton>
      <XButton type="danger" ghost icon="mdi:heart">收藏</XButton>
    </XFlex>
    <XFlex gap="12">
      <XButton type="primary" block icon="mdi:shopping">立即购买</XButton>
    </XFlex>
    <XFlex gap="12">
      <XButton type="success" icon="mdi:check-circle">确认付款</XButton>
      <XButton icon="mdi:close">取消</XButton>
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
| type | 按钮类型 | `default` \| `primary` \| `success` \| `warning` \| `danger` \| `text` | `default` |
| size | 按钮尺寸 | `small` \| `medium` \| `large` | `medium` |
| icon | 左侧图标（使用 iconify 图标名） | `string` | - |
| iconRight | 右侧图标（使用 iconify 图标名） | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| block | 是否为块级按钮 | `boolean` | `false` |
| round | 是否为圆形按钮 | `boolean` | `false` |
| ghost | 是否为幽灵按钮（透明背景） | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击按钮时触发 | `(event: MouseEvent)` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 按钮内容 |
