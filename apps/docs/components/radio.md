# Radio 单选框

单选框用于在一组选项中选择一个选项，支持标准版本和电商支付版本两种变体。

## 基础用法

最简单的单选框用法，使用标准版本。

:::demo

```vue
<template>
  <div class="flex flex-col gap-6">
    <div>
      <h4 class="text-sm font-medium mb-2">传统模式</h4>
      <XRadio 
        v-model="selected1" 
        :options="basicOptions"
        variant="standard"
        mode="default"
      />
    </div>
    
    <div>
      <h4 class="text-sm font-medium mb-2">列表模式</h4>
      <XRadio 
        v-model="selected1" 
        :options="basicOptions"
        variant="standard"
        mode="list"
      />
    </div>
    
    <div class="text-sm text-gray-600">
      当前选择: {{ selected1 }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected1 = ref('option1')

const basicOptions = [
  { value: 'option1', label: '选项一', icon: 'mdi:check-circle' },
  { value: 'option2', label: '选项二', icon: 'mdi:star' },
  { value: 'option3', label: '选项三', icon: 'mdi:heart' }
]
</script>
```

:::





## 自定义支付选项

可以通过 `paymentOptions` 属性自定义支付方式选项。

:::demo

```vue
<template>
  <div class="flex flex-col gap-4">
    <XRadio 
      v-model="customPayment" 
      variant="payment"
      :payment-options="customPaymentOptions"
      @change="handleCustomPaymentChange"
    />
    <div class="text-sm text-gray-600">
      当前选择: {{ customPayment }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const customPayment = ref('alipay')
const customPaymentOptions = [
  {
    value: 'Alipay',
    label: '支付宝',
    icon: 'simple-icons:alipay'
  },
  {
    value: 'Wechat',
    label: '微信支付',
    icon: 'simple-icons:wechat'
  },
  {
    value: 'VISA',
    label: 'Visa',
    icon: 'logos:visa'
  },
  {
    value: 'paypal',
    label: 'PayPal',
    icon: 'logos:paypal'
  }
]

const handleCustomPaymentChange = (value) => {
  console.log('自定义支付方式变更:', value)
}
</script>
```

:::

## 带描述的选项

可以为每个选项添加描述文字。

:::demo

```vue
<template>
  <div class="flex flex-col gap-4">
    <XRadio 
      v-model="selected2" 
      :options="optionsWithDescription"
      variant="standard"
      mode="list"
    />
    <div class="text-sm text-gray-600">
      当前选择: {{ selected2 }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected2 = ref('basic')

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
    description: '适合小型团队，包含高级功能',
    icon: 'mdi:account-group'
  },
  { 
    value: 'enterprise', 
    label: '企业版', 
    description: '适合大型企业，包含所有功能',
    icon: 'mdi:domain'
  }
]
</script>
```

:::

## 不同尺寸

支持三种尺寸：`small`、`medium`、`large`。

:::demo

```vue
<template>
  <div class="flex flex-col gap-6">
    <div>
      <h4 class="text-sm font-medium mb-2">小尺寸</h4>
      <XRadio 
        v-model="selected3" 
        :options="basicOptions"
        size="small"
        variant="standard"
        mode="default"
      />
    </div>
    
    <div>
      <h4 class="text-sm font-medium mb-2">中等尺寸</h4>
      <XRadio 
        v-model="selected3" 
        :options="basicOptions"
        size="medium"
        variant="standard"
        mode="default"
      />
    </div>
    
    <div>
      <h4 class="text-sm font-medium mb-2">大尺寸</h4>
      <XRadio 
        v-model="selected3" 
        :options="basicOptions"
        size="large"
        variant="standard"
        mode="default"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected3 = ref('option1')

const basicOptions = [
  { value: 'option1', label: '选项一', icon: 'mdi:check-circle' },
  { value: 'option2', label: '选项二', icon: 'mdi:star' },
  { value: 'option3', label: '选项三', icon: 'mdi:heart' }
]
</script>
```

:::

## 水平布局

可以设置水平布局，选项会横向排列。

:::demo

```vue
<template>
  <div class="flex flex-col gap-4">
    <XRadio 
      v-model="selected4" 
      :options="basicOptions"
      direction="horizontal"
      variant="standard"
      mode="default"
    />
    <div class="text-sm text-gray-600">
      当前选择: {{ selected4 }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected4 = ref('option1')

const basicOptions = [
  { value: 'option1', label: '选项一', icon: 'mdi:check-circle' },
  { value: 'option2', label: '选项二', icon: 'mdi:star' },
  { value: 'option3', label: '选项三', icon: 'mdi:heart' }
]
</script>
```

:::

## 禁用状态

可以禁用整个组件或单个选项。

:::demo

```vue
<template>
  <div class="flex flex-col gap-6">
    <div>
      <h4 class="text-sm font-medium mb-2">整体禁用</h4>
      <XRadio 
        v-model="selected5" 
        :options="basicOptions"
        :disabled="true"
        variant="standard"
        mode="default"
      />
    </div>
    
    <div>
      <h4 class="text-sm font-medium mb-2">单个选项禁用</h4>
      <XRadio 
        v-model="selected5" 
        :options="optionsWithDisabled"
        variant="standard"
        mode="default"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected5 = ref('option1')

const basicOptions = [
  { value: 'option1', label: '选项一', icon: 'mdi:check-circle' },
  { value: 'option2', label: '选项二', icon: 'mdi:star' },
  { value: 'option3', label: '选项三', icon: 'mdi:heart' }
]

const optionsWithDisabled = [
  { value: 'option1', label: '选项一', icon: 'mdi:check-circle' },
  { value: 'option2', label: '选项二（禁用）', disabled: true, icon: 'mdi:lock' },
  { value: 'option3', label: '选项三', icon: 'mdi:heart' }
]
</script>
```

:::

## 带图标的选项

可以为选项添加图标。

:::demo

```vue
<template>
  <div class="flex flex-col gap-4">
    <XRadio 
      v-model="selected6" 
      :options="optionsWithIcons"
      :show-icon="true"
      variant="standard"
      mode="list"
    />
    <div class="text-sm text-gray-600">
      当前选择: {{ selected6 }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected6 = ref('email')

const optionsWithIcons = [
  { 
    value: 'email', 
    label: '邮件通知',
    description: '通过邮件接收通知',
    icon: 'mdi:email'
  },
  { 
    value: 'sms', 
    label: '短信通知',
    description: '通过短信接收通知',
    icon: 'mdi:message-text'
  },
  { 
    value: 'push', 
    label: '推送通知',
    description: '通过应用推送接收通知',
    icon: 'mdi:bell'
  }
]
</script>
```

:::


## 自定义插槽

支持自定义图标和内容插槽。

:::demo

```vue
<template>
  <div class="flex flex-col gap-4">
    <XRadio 
      v-model="selected7" 
      :options="customOptions"
      variant="standard"
      mode="list"
    >
      <template #icon="{ option }">
        <div class="w-8 h-8 rounded-full flex items-center justify-center text-white"
             :class="option.color">
          {{ option.label.charAt(0) }}
        </div>
      </template>
    </XRadio>
    <div class="text-sm text-gray-600">
      当前选择: {{ selected7 }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected7 = ref('red')

const customOptions = [
  { 
    value: 'red', 
    label: '红色主题',
    description: '温暖的红色配色方案',
    color: 'bg-red-500',
    icon: 'mdi:palette'
  },
  { 
    value: 'blue', 
    label: '蓝色主题',
    description: '清新的蓝色配色方案',
    color: 'bg-blue-500',
    icon: 'mdi:palette'
  },
  { 
    value: 'green', 
    label: '绿色主题',
    description: '自然的绿色配色方案',
    color: 'bg-green-500',
    icon: 'mdi:palette'
  }
]
</script>
```

:::

## API

### Props

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| modelValue | 当前选中的值 | `string \| number` | — | `''` |
| options | 选项列表 | `RadioOption[]` | — | `[]` |
| size | 组件尺寸 | `string` | `small` / `medium` / `large` | `medium` |
| disabled | 是否禁用 | `boolean` | — | `false` |
| showIcon | 是否显示图标 | `boolean` | — | `false` |
| name | 单选组名称 | `string` | — | `'radio-group'` |
| direction | 布局方向 | `string` | `horizontal` / `vertical` | `vertical` |
| variant | 组件变体 | `string` | `standard` / `payment` | `standard` |
| mode | 显示模式 | `string` | `default` / `list` | `default` |
| paymentOptions | 支付选项列表（仅 payment 变体生效） | `RadioOption[]` | — | `[]`（使用默认支付选项） |

### RadioOption

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| value | 选项值 | `string \| number` | — | — |
| label | 选项标签 | `string` | — | — |
| description | 选项描述 | `string` | — | — |
| disabled | 是否禁用 | `boolean` | — | `false` |
| icon | 图标组件 | `any` | — | — |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选项变化时触发 | `(value: string \| number)` |

### Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| icon | 自定义图标 | `{ option: RadioOption }` |
| content | 自定义内容 | `{ option: RadioOption }` |

## 贡献者

<div class="contributors">
  <div class="contributor-item">
    <a href="https://gitee.com/leheya" target="_blank" rel="noopener noreferrer">
      <img 
        src="https://foruda.gitee.com/avatar/1751620424517657404/10604783_leheya_1751620424.png!avatar200" 
        alt="leheya"
        class="contributor-avatar"
      />
      <span class="contributor-name">无敌暴龙神</span>
    </a>
  </div>
</div>

<style scoped>
.contributors {
  display: flex;
  gap: 24px;
  margin: 24px 0;
  flex-wrap: wrap;
}

.contributor-item a {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease;
}

.contributor-item a:hover {
  transform: translateY(-2px);
}

.contributor-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid var(--vp-c-border);
  transition: border-color 0.2s ease;
  object-fit: cover;
}

.contributor-item a:hover .contributor-avatar {
  border-color: var(--vp-c-brand-1);
}

.contributor-name {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color 0.2s ease;
}

.contributor-item a:hover .contributor-name {
  color: var(--vp-c-brand-1);
}

@media (max-width: 768px) {
  .contributors {
    gap: 16px;
  }
  
  .contributor-avatar {
    width: 60px;
    height: 60px;
  }
  
  .contributor-name {
    font-size: 12px;
  }
}
</style>