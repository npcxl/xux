# CountrySelect 国家选择器

国家选择器组件，支持国旗显示、IP自动检测、自定义后端接口等功能。

<div style="columns: 2; column-gap: 32px; margin-top: 32px;">

<div style="break-inside: avoid; margin-bottom: 24px;">

## 基础用法

默认显示国家选择器，支持搜索和选择功能。

:::demo

```vue
<template>
  <XFlex vertical gap="16" style="min-height: 300px">
    <XCountrySelect v-model="selectedCountry" placeholder="请选择国家" />
    <div style="font-size: 14px; color: #666">
      选中的国家：{{ selectedCountry || '未选择' }}
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XCountrySelect } from '@xlui/xux-ui'

const selectedCountry = ref('')
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## IP 自动检测

启用 `auto-detect-from-ip` 属性后，组件会自动根据用户 IP 检测所在国家。

:::demo

```vue
<template>
  <XFlex vertical gap="16" style="min-height: 300px">
    <XCountrySelect 
      v-model="country" 
      auto-detect-from-ip
      placeholder="自动检测中..."
      @ip-detect-success="handleDetectSuccess"
    />
    <div style="padding: 12px; background: #f5f5f5; border-radius: 4px; font-size: 14px">
      <div>检测状态：{{ detectStatus }}</div>
      <div v-if="country">当前国家：{{ country }}</div>
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XCountrySelect } from '@xlui/xux-ui'

const country = ref('')
const detectStatus = ref('准备中...')

const handleDetectSuccess = (countryCode) => {
  detectStatus.value = `检测成功：${countryCode}`
}
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 返回类型

通过 `return-type` 属性控制返回国家名称还是国家代码。

:::demo

```vue
<template>
  <XFlex vertical gap="24" style="min-height: 450px">
    <div style="min-height: 200px">
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px">返回国家名称（默认）</div>
      <XCountrySelect v-model="countryName" return-type="name" />
      <div style="margin-top: 8px; font-size: 14px; color: #666">值：{{ countryName }}</div>
    </div>
    
    <div style="min-height: 200px">
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px">返回国家代码</div>
      <XCountrySelect v-model="countryCode" return-type="code" />
      <div style="margin-top: 8px; font-size: 14px; color: #666">值：{{ countryCode }}</div>
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XCountrySelect } from '@xlui/xux-ui'

const countryName = ref('')
const countryCode = ref('')
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 优先国家列表

将常用国家显示在列表前面。

:::demo

```vue
<template>
  <XFlex vertical gap="16" style="min-height: 300px">
    <XCountrySelect 
      v-model="priorityCountry" 
      :priority-countries="['CN', 'US', 'JP', 'GB']"
      placeholder="选择国家（常用国家优先）"
    />
    <div style="font-size: 14px; color: #666">
      选中：{{ priorityCountry || '未选择' }}
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XCountrySelect } from '@xlui/xux-ui'

const priorityCountry = ref('')
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 禁用状态

通过 `disabled` 属性禁用选择器。

:::demo

```vue
<template>
  <XFlex vertical gap="16" style="min-height: 300px">
    <XCountrySelect 
      v-model="disabledCountry" 
      disabled
      placeholder="已禁用"
    />
    <div style="font-size: 14px; color: #666">
      选中：{{ disabledCountry || '未选择' }}
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XCountrySelect } from '@xlui/xux-ui'

const disabledCountry = ref('CN')
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 自定义宽度

通过 `width` 属性自定义宽度。

:::demo

```vue
<template>
  <XFlex vertical gap="16" style="min-height: 300px">
    <XCountrySelect 
      v-model="widthCountry" 
      width="100%"
      placeholder="全宽度"
    />
    <div style="font-size: 14px; color: #666">
      选中：{{ widthCountry || '未选择' }}
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XCountrySelect } from '@xlui/xux-ui'

const widthCountry = ref('')
</script>
```

:::

</div>

</div>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue | 绑定值 | `string` | `''` |
| placeholder | 占位文本 | `string` | `'请选择国家'` |
| width | 选择器宽度 | `string` | `'280px'` |
| return-type | 返回值类型 | `'name' \| 'code'` | `'name'` |
| auto-detect-from-ip | 是否自动从 IP 检测国家 | `boolean` | `false` |
| ip-detect-url | 自定义 IP 检测接口 URL | `string` | `''` |
| priority-countries | 优先显示的国家代码列表 | `Array<string>` | `[]` |
| disabled | 是否禁用 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值变化时触发 | `(value: string)` |
| change | 值变化时触发 | `(value: string)` |
| ip-detect-start | IP 检测开始 | - |
| ip-detect-success | IP 检测成功 | `(countryCode: string)` |
| ip-detect-error | IP 检测失败 | `(error: Error)` |
