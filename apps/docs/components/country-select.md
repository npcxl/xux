# CountrySelect 国家/地区选择器

一个功能强大的国家和地区选择器组件，提供完整的国家列表、国旗展示、智能搜索、IP 地址自动检测等功能。

<div style="columns: 2; column-gap: 32px; margin-top: 32px;">

<div style="break-inside: avoid; margin-bottom: 24px;">

## 基础用法

最简单的用法，提供基础的国家选择功能。

:::demo

```vue
<template>
  <div style="width:300px">
  <XFlex vertical gap="16" style="min-height: 300px">
    <XCountrySelect v-model="selectedCountry" placeholder="请选择国家" />
    <div style="font-size: 14px; color: #666">
      选中的国家：{{ selectedCountry || '未选择' }}
    </div>
  </XFlex>
  </div>
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

## IP 地址智能检测

通过 `auto-detect-from-ip` 属性启用 IP 地址检测功能，自动识别用户所在国家/地区。

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

## 返回值类型

使用 `return-type` 属性控制组件返回的数据格式，支持返回国家名称或 ISO 代码。

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

<div style="break-inside: avoid; margin-bottom: 24px;">

## 多选模式

通过 `multiple` 属性启用多选功能。

:::demo

```vue
<template>
  <XFlex vertical gap="16" style="min-height: 350px">
    <XCountrySelect 
      v-model="multipleCountries" 
      multiple
      placeholder="选择多个国家"
    />
    <div style="padding: 12px; background: #f5f5f5; border-radius: 4px; font-size: 14px">
      <div style="font-weight: 500; margin-bottom: 8px">已选择 {{ multipleCountries.length }} 个国家：</div>
      <div>{{ multipleCountries.join(', ') || '未选择' }}</div>
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XCountrySelect } from '@xlui/xux-ui'

const multipleCountries = ref([])
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 限制最大选择数

通过 `max-selection` 属性限制最大选择数量。

:::demo

```vue
<template>
  <XFlex vertical gap="16" style="min-height: 350px">
    <XCountrySelect 
      v-model="limitedCountries" 
      multiple
      :max-selection="3"
      placeholder="最多选择3个国家"
    />
    <div style="padding: 12px; background: #f5f5f5; border-radius: 4px; font-size: 14px">
      <div style="font-weight: 500; margin-bottom: 8px">已选择 {{ limitedCountries.length }} / 3 个国家：</div>
      <div>{{ limitedCountries.join(', ') || '未选择' }}</div>
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XCountrySelect } from '@xlui/xux-ui'

const limitedCountries = ref([])
</script>
```

:::

</div>

</div>

## API 文档

### 属性 Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| **modelValue** | 绑定值，单选时为字符串，多选时为数组 | `string \| string[]` | `''` / `[]` |
| **placeholder** | 输入框占位文本 | `string` | `'请选择国家'` |
| **width** | 选择器宽度，支持任何 CSS 宽度值 | `string` | `'280px'` |
| **return-type** | 返回值类型（国家名称或 ISO 代码） | `'name' \| 'code'` | `'name'` |
| **multiple** | 是否启用多选模式 | `boolean` | `false` |
| **max-selection** | 多选模式下最大可选数量（0 表示不限制） | `number` | `0` |
| **auto-detect-from-ip** | 是否自动根据 IP 地址检测国家 | `boolean` | `false` |
| **ip-detect-url** | 自定义 IP 检测服务的接口地址 | `string` | `'https://ipinfo.io/json'` |
| **ip-detect-method** | IP 检测服务的请求方法 | `'GET' \| 'POST'` | `'GET'` |
| **ip-detect-headers** | IP 检测请求的自定义请求头 | `Record<string, string>` | `{}` |
| **ip-detect-response-parser** | 自定义 IP 检测响应解析函数 | `(data: any) => string` | - |
| **priority-countries** | 优先显示的国家代码列表（ISO 代码） | `string[]` | 见下方说明 |
| **disabled** | 是否禁用选择器 | `boolean` | `false` |
| **required** | 是否为必填项 | `boolean` | `false` |
| **custom-class** | 自定义 CSS 类名 | `string` | `''` |

> **priority-countries 默认值：** `['US', 'CA', 'GB', 'DE', 'FR', 'JP', 'CN', 'AU']`

### 事件 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| **update:modelValue** | 选中值变化时触发，用于 `v-model` | `(value: string \| string[])` |
| **change** | 选中值变化时触发，返回值和国家对象 | `(value: string \| string[], country: Country \| Country[])` |
| **ip-detect-start** | IP 地址检测开始时触发 | - |
| **ip-detect-success** | IP 地址检测成功时触发 | `(countryCode: string)` |
| **ip-detect-error** | IP 地址检测失败时触发 | `(error: Error)` |

### 方法 Methods

通过 `ref` 调用组件实例方法：

```javascript
const countrySelectRef = ref()

// 手动触发 IP 检测
countrySelectRef.value.detectCountryFromIp()

// 清除所有选择
countrySelectRef.value.clearAll()
```

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| **detectCountryFromIp** | 手动触发 IP 地址检测 | - | `Promise<void>` |
| **clearAll** | 清除所有已选择的国家 | - | `void` |

### 暴露属性 Expose

组件暴露的只读属性，可通过 `ref` 访问：

| 属性名 | 说明 | 类型 |
|--------|------|------|
| **allCountries** | 所有可选国家的完整列表 | `Readonly<Ref<Country[]>>` |
| **sortedCountries** | 根据优先级排序后的国家列表 | `Readonly<Ref<Country[]>>` |
| **selectedCountries** | 当前已选择的国家列表（多选模式） | `Readonly<Ref<Country[]>>` |

### 类型定义 Types

```typescript
interface Country {
  name: string      // 国家名称
  code: string      // ISO 3166-1 alpha-2 代码
  dialCode: string  // 国际电话区号
  flagSvg: string   // 国旗 SVG 图片地址
}
```
