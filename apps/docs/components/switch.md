# Switch 开关

开关用于在两种状态之间切换，常用于设置功能的开启或关闭。

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 32px;">

<div>

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

## 不同尺寸

提供三种尺寸选择。

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
      <span>中等尺寸（默认）</span>
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

## 禁用状态

通过 `disabled` 属性设置开关为禁用状态。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <XFlex gap="12" align="center">
      <XSwitch v-model="switchValue1" />
      <span>正常状态</span>
    </XFlex>
    <XFlex gap="12" align="center">
      <XSwitch v-model="switchValue2" disabled />
      <span>禁用（关闭）</span>
    </XFlex>
    <XFlex gap="12" align="center">
      <XSwitch v-model="switchValue3" disabled />
      <span>禁用（开启）</span>
    </XFlex>
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

## 加载状态

通过 `loading` 属性设置加载状态，加载中无法切换。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <XFlex gap="12" align="center">
      <XSwitch v-model="switchValue" loading />
      <span>加载中...</span>
    </XFlex>
    <XButton size="small" type="primary" @click="switchValue = !switchValue">
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

<div>

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
    <div style="padding: 12px; background: #f5f5f5; border-radius: 8px; font-size: 14px">
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

## 状态变化监听

监听开关状态的变化，支持 `update:modelValue` 和 `change` 事件。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <XFlex align="center" gap="12">
      <XSwitch v-model="switchValue" @update:modelValue="handleChange" />
      <span>开关状态: {{ switchValue ? '开启' : '关闭' }}</span>
    </XFlex>
    <div style="padding: 12px; background: #f5f5f5; border-radius: 8px; font-size: 14px">
      状态变化次数: <strong>{{ changeCount }}</strong>
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
  console.log('开关状态变化:', value)
}
</script>
```

:::

## 设置场景

常见的设置功能场景，展示开关在实际应用中的使用。

:::demo

```vue
<template>
  <XFlex vertical gap="16" style="max-width: 400px">
    <div style="padding: 16px; background: #f9f9f9; border-radius: 10px">
      <XFlex vertical gap="16">
        <XFlex justify="space-between" align="center">
          <XFlex vertical gap="4">
            <span style="font-weight: 500">接收通知</span>
            <span style="font-size: 12px; color: #666">允许应用发送通知提醒</span>
          </XFlex>
          <XSwitch v-model="settings.notification" />
        </XFlex>
        
        <div style="height: 1px; background: #e5e5e5"></div>
        
        <XFlex justify="space-between" align="center">
          <XFlex vertical gap="4">
            <span style="font-weight: 500">自动播放</span>
            <span style="font-size: 12px; color: #666">视频内容自动播放</span>
          </XFlex>
          <XSwitch v-model="settings.autoPlay" />
        </XFlex>
        
        <div style="height: 1px; background: #e5e5e5"></div>
        
        <XFlex justify="space-between" align="center">
          <XFlex vertical gap="4">
            <span style="font-weight: 500">夜间模式</span>
            <span style="font-size: 12px; color: #666">使用深色主题</span>
          </XFlex>
          <XSwitch v-model="settings.darkMode" />
        </XFlex>
        
        <div style="height: 1px; background: #e5e5e5"></div>
        
        <XFlex justify="space-between" align="center">
          <XFlex vertical gap="4">
            <span style="font-weight: 500">省电模式</span>
            <span style="font-size: 12px; color: #666">延长电池使用时间</span>
          </XFlex>
          <XSwitch v-model="settings.powerSaving" />
        </XFlex>
      </XFlex>
    </div>
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
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 状态变化时触发 | `(value: boolean)` |
| change | 状态变化时触发 | `(value: boolean)` |
