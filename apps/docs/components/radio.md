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

## 电商支付版本

专门为电商场景设计的支付方式选择组件，使用 `:has()` 伪类实现动画效果。

:::demo

```vue
<template>
  <div class="flex flex-col gap-4">
    <XRadio 
      v-model="selectedPayment" 
      variant="payment"
      @change="handlePaymentChange"
    />
    <div class="text-sm text-gray-600">
      当前选择: {{ selectedPayment }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedPayment = ref('')

const handlePaymentChange = (value) => {
  console.log('支付方式变更:', value)
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

## 设计说明

### 两种变体

**标准版本 (standard)**
- 通用的单选框组件，适用于各种场景
- 卡片式设计，每个选项都是独立的卡片
- 支持图标、描述文字、自定义插槽
- 灵活的尺寸和布局选项

**电商支付版本 (payment)**
- 专门为电商支付场景设计
- 使用 `:has()` 伪类实现动画效果
- 预置了 Google Pay、Apple Pay、PayPal、Visa 等支付方式图标
- 选中时文字会从右侧滑入，提供独特的视觉体验

### 交互设计

- 选中状态有明显的视觉反馈（边框颜色、背景色、阴影）
- 悬停效果提供即时反馈
- 支持键盘导航和屏幕阅读器
- 电商版本具有特殊的文字滑入动画

### 布局灵活性

- 标准版本支持垂直和水平布局
- 三种尺寸适应不同场景
- 响应式设计，适配各种屏幕尺寸

### 扩展性

- 支持自定义图标和内容
- 灵活的插槽系统
- 完整的 TypeScript 类型支持
- 可以轻松添加新的变体

## 注意事项

1. 确保每个选项的 `value` 值唯一
2. 建议在表单中使用时配合表单验证
3. 大量选项时考虑使用其他组件（如 Select）
4. 移动端建议使用垂直布局以获得更好的触摸体验
