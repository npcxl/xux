# Color 颜色选择器

一个优雅的颜色选择器组件，支持预设颜色和自定义颜色输入。

<div style="columns: 2; column-gap: 32px; margin-top: 32px;">

<div style="break-inside: avoid; margin-bottom: 24px;">

## 基础用法

最简单的颜色选择器示例。

:::demo

```vue
<template>
  <XFlex vertical gap="16" style="padding-top: 40px">
    <XColor v-model="color" />
    <div style="font-size: 14px; color: #666">选中的颜色：{{ color }}</div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XColor } from '@xlui/xux-ui'

const color = ref('#3b82f6')
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 自定义颜色列表

通过 `colors` 属性自定义颜色列表。

:::demo

```vue
<template>
  <XFlex vertical gap="16" style="padding-top: 40px">
    <XColor v-model="color" :colors="customColors" />
    <div style="font-size: 14px; color: #666">选中的颜色：{{ color }}</div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XColor } from '@xlui/xux-ui'

const color = ref('#ff5733')

const customColors = [
  '#ff5733',
  '#33ff57',
  '#3357ff',
  '#ff33f5',
  '#33fff5',
  '#f5ff33',
  '#ff8c00',
  '#7b68ee'
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 隐藏颜色输入框

设置 `show-input` 为 `false` 可隐藏原生颜色输入框。

:::demo

```vue
<template>
  <XFlex vertical gap="16" style="padding-top: 40px">
    <XColor v-model="color" :show-input="false" />
    <div style="font-size: 14px; color: #666">选中的颜色：{{ color }}</div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XColor } from '@xlui/xux-ui'

const color = ref('#8b5cf6')
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 隐藏提示信息

设置 `show-tooltips` 为 `false` 可隐藏悬停提示。

:::demo

```vue
<template>
  <XFlex vertical gap="16" style="padding-top: 40px">
    <XColor v-model="color" :show-tooltips="false" />
    <div style="font-size: 14px; color: #666">选中的颜色：{{ color }}</div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XColor } from '@xlui/xux-ui'

const color = ref('#10b981')
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 禁用状态

通过 `disabled` 属性禁用颜色选择器。

:::demo

```vue
<template>
  <div style="padding-top: 40px">
    <XColor v-model="color" disabled />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XColor } from '@xlui/xux-ui'

const color = ref('#f472b6')
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 事件监听

支持 `change` 事件，在颜色变化时触发。

:::demo

```vue
<template>
  <div style="padding-top: 40px">
    <XColor v-model="color" @change="handleChange" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XColor, xlMsg } from '@xlui/xux-ui'

const color = ref('#3b82f6')

const handleChange = (value) => {
  xlMsg({
    message: `颜色已变更为：${value}`,
    type: 'success'
  })
}
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 主题色配置

使用颜色选择器配置应用主题色。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <div :style="themeStyle">
      <h3 style="margin: 0 0 8px 0">当前主题色</h3>
      <p style="margin: 0">{{ themeColor }}</p>
    </div>
    <XColor v-model="themeColor" :colors="themeColors" />
  </XFlex>
</template>

<script setup>
import { ref, computed } from 'vue'
import { XFlex, XColor } from '@xlui/xux-ui'

const themeColor = ref('#3b82f6')

const themeColors = [
  '#3b82f6', // 蓝色
  '#10b981', // 绿色
  '#f59e0b', // 橙色
  '#ef4444', // 红色
  '#8b5cf6', // 紫色
  '#ec4899', // 粉色
  '#14b8a6', // 青色
  '#f97316'  // 深橙
]

const themeStyle = computed(() => ({
  backgroundColor: themeColor.value,
  padding: '20px',
  borderRadius: '8px',
  color: 'white',
  textAlign: 'center'
}))
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 电商场景

商品颜色选择应用。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <div style="font-weight: 500">选择商品颜色</div>
    <XColor 
      v-model="productColor" 
      :colors="productColors"
      :show-input="false"
    />
    <div style="font-size: 14px; color: #666">
      已选择：<span :style="{ color: productColor, fontWeight: 'bold' }">{{ productColor }}</span>
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XColor } from '@xlui/xux-ui'

const productColor = ref('#e11d48')

const productColors = [
  '#000000', // 经典黑
  '#ffffff', // 纯净白
  '#e11d48', // 玫瑰红
  '#f472b6', // 樱花粉
  '#0ea5e9', // 天空蓝
  '#10b981', // 薄荷绿
  '#f59e0b', // 香槟金
  '#8b5cf6'  // 薰衣紫
]
</script>
```

:::

</div>

</div>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | `string` | — |
| colors | 自定义颜色列表 | `string[]` | 默认 10 种颜色 |
| show-input | 是否显示原生颜色输入框 | `boolean` | `true` |
| show-tooltips | 是否显示颜色值提示 | `boolean` | `true` |
| disabled | 是否禁用 | `boolean` | `false` |
| default-color | 默认颜色 | `string` | `#3b82f6` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 绑定值变化时触发 | `(value: string)` |
| change | 颜色变化时触发 | `(value: string)` |

### 默认颜色列表

组件内置了 10 种精选颜色：

```js
[
  '#e11d48', // 玫红
  '#f472b6', // 粉红
  '#fb923c', // 橙色
  '#facc15', // 黄色
  '#84cc16', // 青柠
  '#10b981', // 翠绿
  '#0ea5e9', // 天蓝
  '#3b82f6', // 蓝色
  '#8b5cf6', // 紫色
  '#a78bfa'  // 淡紫
]
```
