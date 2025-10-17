# Switch 开关

开关用于在两种状态之间切换，常用于设置功能的开启或关闭。

<div style="columns: 2; column-gap: 32px; margin-top: 32px;">

<div style="break-inside: avoid; margin-bottom: 24px;">

## 基础用法

基本的开关用法，通过 `v-model` 绑定开关状态。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <XFlex align="center" gap="12">
      <XSwitch v-model="switchValue" />
      <span>开关状态: {{ switchValue ? '开启' : '关闭' }}</span>
    </XFlex>
    <XFlex align="center" gap="12">
      <XSwitch v-model="switchValue2" />
      <span>默认开启: {{ switchValue2 ? '开启' : '关闭' }}</span>
    </XFlex>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XSwitch } from '@xlui/xux-ui'

const switchValue = ref(false)
const switchValue2 = ref(true)
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 主题切换开关

通过 `variant="theme"` 使用精美的主题切换样式，带有日夜动画效果。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <XFlex align="center" gap="12">
      <XSwitch v-model="isDark" variant="theme" />
      <span>{{ isDark ? '夜间模式' : '日间模式' }}</span>
    </XFlex>
    <div style="padding: 12px; background: #f5f5f5; border-radius: 4px; font-size: 14px">
      当前主题：{{ isDark ? '🌙 深色' : '☀️ 浅色' }}
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XSwitch } from '@xlui/xux-ui'

const isDark = ref(false)
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 状态变化监听

监听开关状态的变化。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <XFlex align="center" gap="12">
      <XSwitch v-model="switchValue" @update:modelValue="handleChange" />
      <span>开关状态: {{ switchValue ? '开启' : '关闭' }}</span>
    </XFlex>
    <div style="font-size: 14px; color: #666">
      状态变化次数: {{ changeCount }}
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XSwitch } from '@xlui/xux-ui'

const switchValue = ref(false)
const changeCount = ref(0)

const handleChange = (value) => {
  changeCount.value++
}
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 禁用状态

通过 `disabled` 属性设置开关为禁用状态。

:::demo

```vue
<template>
  <XFlex gap="12" align="center">
    <XSwitch v-model="switchValue1" />
    <XSwitch v-model="switchValue2" disabled />
    <XSwitch v-model="switchValue3" disabled />
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XSwitch } from '@xlui/xux-ui'

const switchValue1 = ref(true)
const switchValue2 = ref(false)
const switchValue3 = ref(true)
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
  <XFlex vertical gap="16">
    <XFlex gap="12" align="center">
      <XSwitch v-model="switchValue" size="small" />
      <span>小尺寸</span>
    </XFlex>
    <XFlex gap="12" align="center">
      <XSwitch v-model="switchValue" size="medium" />
      <span>中等尺寸</span>
    </XFlex>
    <XFlex gap="12" align="center">
      <XSwitch v-model="switchValue" size="large" />
      <span>大尺寸</span>
    </XFlex>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XSwitch } from '@xlui/xux-ui'

const switchValue = ref(true)
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 自定义颜色

通过 `color` 属性自定义开关的激活颜色。

:::demo

```vue
<template>
  <XFlex gap="12" align="center">
    <XSwitch v-model="switch1" color="#52c41a" />
    <XSwitch v-model="switch2" color="#1890ff" />
    <XSwitch v-model="switch3" color="#722ed1" />
    <XSwitch v-model="switch4" color="#eb2f96" />
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XSwitch } from '@xlui/xux-ui'

const switch1 = ref(true)
const switch2 = ref(true)
const switch3 = ref(true)
const switch4 = ref(true)
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 带文字的开关

在开关内显示文字。

:::demo

```vue
<template>
  <XFlex gap="12" align="center">
    <XSwitch 
      v-model="switchValue" 
      active-text="开"
      inactive-text="关"
    />
    <span>状态: {{ switchValue ? '开启' : '关闭' }}</span>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XSwitch } from '@xlui/xux-ui'

const switchValue = ref(true)
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 带图标的开关

在开关内显示图标。

:::demo

```vue
<template>
  <XFlex gap="12" align="center">
    <XSwitch 
      v-model="switchValue" 
      active-icon="mdi:check"
      inactive-icon="mdi:close"
    />
    <span>状态: {{ switchValue ? '开启' : '关闭' }}</span>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XSwitch } from '@xlui/xux-ui'

const switchValue = ref(true)
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 加载状态

通过 `loading` 属性设置加载状态。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <XFlex gap="12" align="center">
      <XSwitch v-model="switchValue" loading />
      <span>加载中...</span>
    </XFlex>
    <XButton size="small" @click="switchValue = !switchValue">
      切换状态
    </XButton>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XButton, XSwitch } from '@xlui/xux-ui'

const switchValue = ref(false)
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 设置场景

常见的设置功能场景。

:::demo

```vue
<template>
  <XFlex vertical gap="16" style="max-width: 400px">
    <XFlex justify="space-between" align="center">
      <span>接收通知</span>
      <XSwitch v-model="settings.notification" />
    </XFlex>
    <XFlex justify="space-between" align="center">
      <span>自动播放</span>
      <XSwitch v-model="settings.autoPlay" />
    </XFlex>
    <XFlex justify="space-between" align="center">
      <span>夜间模式</span>
      <XSwitch v-model="settings.darkMode" />
    </XFlex>
    <XFlex justify="space-between" align="center">
      <span>省电模式</span>
      <XSwitch v-model="settings.powerSaving" />
    </XFlex>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XSwitch } from '@xlui/xux-ui'

const settings = ref({
  notification: true,
  autoPlay: false,
  darkMode: false,
  powerSaving: true
})
</script>
```

:::

</div>

</div>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue | 绑定值 | `boolean` | `false` |
| variant | 开关样式变体 | `'default' \| 'theme'` | `'default'` |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| color | 激活时的颜色（仅 default 变体） | `string` | `'#1a1a1a'` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| active-text | 开启时的文字（仅 default 变体） | `string` | `''` |
| inactive-text | 关闭时的文字（仅 default 变体） | `string` | `''` |
| active-icon | 开启时的图标（仅 default 变体） | `string` | `''` |
| inactive-icon | 关闭时的图标（仅 default 变体） | `string` | `''` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 状态变化时触发 | `(value: boolean)` |
| change | 状态变化时触发 | `(value: boolean)` |
