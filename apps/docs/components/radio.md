# Radio 单选框

单选框用于在一组选项中选择一个选项，支持标准版本和电商支付版本两种变体。

<div style="columns: 2; column-gap: 32px; margin-top: 32px;">

<div style="break-inside: avoid; margin-bottom: 24px;">

## 基础用法 - 传统模式

最简单的单选框用法。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <XRadio 
      v-model="selected1" 
      :options="basicOptions"
      variant="standard"
      mode="default"
    />
    <div style="font-size: 14px; color: #666">
      当前选择: {{ selected1 }}
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XRadio } from '@xlui/xux-ui'

const selected1 = ref('option1')

const basicOptions = [
  { value: 'option1', label: '选项一', icon: 'mdi:check-circle' },
  { value: 'option2', label: '选项二', icon: 'mdi:star' },
  { value: 'option3', label: '选项三', icon: 'mdi:heart' }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 基础用法 - 列表模式

列表形式展示的单选框。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <XRadio 
      v-model="selected2" 
      :options="basicOptions"
      variant="standard"
      mode="list"
    />
    <div style="font-size: 14px; color: #666">
      当前选择: {{ selected2 }}
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XRadio } from '@xlui/xux-ui'

const selected2 = ref('option1')

const basicOptions = [
  { value: 'option1', label: '选项一', icon: 'mdi:check-circle' },
  { value: 'option2', label: '选项二', icon: 'mdi:star' },
  { value: 'option3', label: '选项三', icon: 'mdi:heart' }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 带描述的选项

为每个选项添加描述文字。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <XRadio 
      v-model="selected3" 
      :options="optionsWithDescription"
      variant="standard"
      mode="list"
    />
    <div style="font-size: 14px; color: #666">
      当前选择: {{ selected3 }}
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XRadio } from '@xlui/xux-ui'

const selected3 = ref('basic')

const optionsWithDescription = [
  { 
    value: 'basic', 
    label: '基础版', 
    description: '适合个人用户，包含基本功能',
    icon: 'mdi:account'
  },
  { 
    value: 'pro', 
    label: '专业版', 
    description: '适合团队使用，功能更全面',
    icon: 'mdi:account-group'
  },
  { 
    value: 'enterprise', 
    label: '企业版', 
    description: '定制化服务，专属支持',
    icon: 'mdi:office-building'
  }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 电商支付版本

专为支付场景设计的单选框。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <XRadio 
      v-model="paymentMethod" 
      variant="payment"
      :payment-options="paymentOptions"
    />
    <div style="font-size: 14px; color: #666">
      当前选择: {{ paymentMethod }}
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XRadio } from '@xlui/xux-ui'

const paymentMethod = ref('alipay')

const paymentOptions = [
  {
    value: 'alipay',
    label: '支付宝',
    icon: 'simple-icons:alipay'
  },
  {
    value: 'wechat',
    label: '微信支付',
    icon: 'simple-icons:wechat'
  },
  {
    value: 'unionpay',
    label: '银联',
    icon: 'mdi:credit-card'
  }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 自定义支付选项

自定义支付方式选项。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <XRadio 
      v-model="customPayment" 
      variant="payment"
      :payment-options="customPaymentOptions"
    />
    <div style="font-size: 14px; color: #666">
      当前选择: {{ customPayment }}
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XRadio } from '@xlui/xux-ui'

const customPayment = ref('visa')

const customPaymentOptions = [
  {
    value: 'visa',
    label: 'Visa',
    icon: 'logos:visa'
  },
  {
    value: 'mastercard',
    label: 'Mastercard',
    icon: 'logos:mastercard'
  },
  {
    value: 'paypal',
    label: 'PayPal',
    icon: 'logos:paypal'
  }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 禁用状态

禁用单选框或特定选项。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <XRadio 
      v-model="selected4" 
      :options="disabledOptions"
      variant="standard"
      mode="list"
    />
    <div style="font-size: 14px; color: #666">
      当前选择: {{ selected4 }}
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XRadio } from '@xlui/xux-ui'

const selected4 = ref('option1')

const disabledOptions = [
  { value: 'option1', label: '可选项', icon: 'mdi:check' },
  { value: 'option2', label: '禁用项', icon: 'mdi:close', disabled: true },
  { value: 'option3', label: '可选项', icon: 'mdi:star' }
]
</script>
```

:::

</div>

</div>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue | 绑定值 | `string \| number` | - |
| options | 选项数据（标准版本） | `Array<Option>` | `[]` |
| paymentOptions | 支付选项数据（支付版本） | `Array<PaymentOption>` | `[]` |
| variant | 变体类型 | `'standard' \| 'payment'` | `'standard'` |
| mode | 显示模式（仅标准版本） | `'default' \| 'list'` | `'default'` |

### Option

| 属性名 | 说明 | 类型 |
|--------|------|------|
| value | 选项值 | `string \| number` |
| label | 选项标签 | `string` |
| icon | 图标（可选） | `string` |
| description | 描述（可选） | `string` |
| disabled | 是否禁用（可选） | `boolean` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值变化时触发 | `(value: string \| number)` |
| change | 值变化时触发 | `(value: string \| number)` |
