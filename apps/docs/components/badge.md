# Badge 徽标

徽标组件用于在右上角显示数字或小红点，常用于消息提醒、通知等场景。

<div style="columns: 2; column-gap: 32px; margin-top: 32px;">

<div style="break-inside: avoid; margin-bottom: 24px;">

## 基础用法

在元素右上角显示徽标，具有心跳扩散动画效果。

:::demo

```vue
<template>
  <XFlex gap="16" align="center">
    <XBadge :value="5">
      <div class="demo-item">消息</div>
    </XBadge>

    <XBadge :value="12">
      <div class="demo-item">通知</div>
    </XBadge>

    <XBadge :value="0">
      <div class="demo-item">无消息</div>
    </XBadge>
  </XFlex>
</template>

<script setup>
import { XFlex, XBadge } from '@xlui/xux-ui'
</script>

<style>
.demo-item {
  width: 60px;
  height: 40px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
</style>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 小红点模式

设置 `dot` 属性显示小红点。

:::demo

```vue
<template>
  <XFlex gap="16" align="center">
    <XBadge dot>
      <div class="demo-item">消息</div>
    </XBadge>

    <XBadge dot>
      <div class="demo-item">通知</div>
    </XBadge>

    <XBadge dot color="#52c41a">
      <div class="demo-item">在线</div>
    </XBadge>

    <XBadge dot color="#faad14">
      <div class="demo-item">警告</div>
    </XBadge>
  </XFlex>
</template>

<script setup>
import { XFlex, XBadge } from '@xlui/xux-ui'
</script>

<style>
.demo-item {
  width: 60px;
  height: 40px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
</style>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 最大值限制

设置 `max` 属性，超过最大值显示 `${max}+`。

:::demo

```vue
<template>
  <XFlex gap="16" align="center">
    <XBadge :value="99" :max="99">
      <div class="demo-item">99</div>
    </XBadge>

    <XBadge :value="100" :max="99">
      <div class="demo-item">100</div>
    </XBadge>

    <XBadge :value="1000" :max="99">
      <div class="demo-item">1000</div>
    </XBadge>
  </XFlex>
</template>

<script setup>
import { XFlex, XBadge } from '@xlui/xux-ui'
</script>

<style>
.demo-item {
  width: 60px;
  height: 40px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
</style>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 自定义颜色

通过 `color` 属性自定义徽标颜色。

:::demo

```vue
<template>
  <XFlex gap="16" align="center">
    <XBadge :value="5" color="#52c41a">
      <div class="demo-item">成功</div>
    </XBadge>

    <XBadge :value="12" color="#1890ff">
      <div class="demo-item">信息</div>
    </XBadge>

    <XBadge :value="8" color="#faad14">
      <div class="demo-item">警告</div>
    </XBadge>

    <XBadge dot color="#722ed1">
      <div class="demo-item">自定义</div>
    </XBadge>
  </XFlex>
</template>

<script setup>
import { XFlex, XBadge } from '@xlui/xux-ui'
</script>

<style>
.demo-item {
  width: 60px;
  height: 40px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
</style>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 隐藏徽标

设置 `hidden` 属性隐藏徽标。

:::demo

```vue
<template>
  <XFlex gap="16" align="center">
    <XBadge :value="5" :hidden="hidden">
      <div class="demo-item">消息</div>
    </XBadge>

    <XButton @click="hidden = !hidden">
      {{ hidden ? "显示" : "隐藏" }}徽标
    </XButton>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XBadge, XButton } from '@xlui/xux-ui'

const hidden = ref(false)
</script>

<style>
.demo-item {
  width: 60px;
  height: 40px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
</style>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 实际应用场景

常见的实际使用场景。

:::demo

```vue
<template>
  <XFlex gap="16" align="center">
    <!-- 消息图标 -->
    <XBadge :value="3">
      <div class="icon">📧</div>
    </XBadge>

    <!-- 购物车 -->
    <XBadge :value="cartCount" :max="99">
      <div class="icon">🛒</div>
    </XBadge>

    <!-- 通知小红点 -->
    <XBadge dot>
      <div class="icon">🔔</div>
    </XBadge>

    <!-- 头像徽标 -->
    <XBadge :value="onlineCount" color="#52c41a">
      <div class="avatar">👤</div>
    </XBadge>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XBadge } from '@xlui/xux-ui'

const cartCount = ref(15)
const onlineCount = ref(23)
</script>

<style>
.icon,
.avatar {
  width: 40px;
  height: 40px;
  background: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
}
</style>
```

:::

</div>

</div>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| value | 显示的数字 | `number` | `0` |
| max | 最大值，超过最大值显示 `${max}+` | `number` | - |
| dot | 是否显示小红点 | `boolean` | `false` |
| hidden | 是否隐藏徽标 | `boolean` | `false` |
| color | 徽标背景颜色 | `string` | `'#ff4d4f'` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 徽标包裹的元素 |
