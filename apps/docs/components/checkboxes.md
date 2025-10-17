# Checkboxes 多选框

多选框组件，用于在一组选项中进行多项选择。

<div style="columns: 2; column-gap: 32px; margin-top: 32px;">

<div style="break-inside: avoid; margin-bottom: 24px;">

## 基础用法

基本的多选功能，垂直列表显示。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <XCheckboxes v-model="selected" :options="options" />
    <div style="font-size: 14px; color: #666">
      选中的值：{{ selected.join(', ') || '未选择' }}
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XCheckboxes } from '@xlui/xux-ui'

const selected = ref([])
const options = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape' }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 水平布局

设置 `layout="horizontal"` 实现水平排列。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <XCheckboxes 
      v-model="selected" 
      :options="options"
      layout="horizontal"
    />
    <div style="font-size: 14px; color: #666">
      已选择：{{ selected.length }} 项
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XCheckboxes } from '@xlui/xux-ui'

const selected = ref(['vue', 'react'])
const options = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 网格布局

使用 `layout="grid"` 和 `columns` 属性设置网格布局。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <XCheckboxes 
      v-model="selected" 
      :options="options"
      layout="grid"
      :columns="3"
    />
    <div style="padding: 12px; background: #f5f5f5; border-radius: 4px; font-size: 14px">
      <div style="font-weight: 500; margin-bottom: 8px">已选择的技能：</div>
      <div v-if="selected.length === 0" style="color: #999">未选择</div>
      <div v-else style="color: #666">
        <span v-for="(item, index) in selected" :key="item">
          {{ getLabel(item) }}<span v-if="index < selected.length - 1">, </span>
        </span>
      </div>
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XCheckboxes } from '@xlui/xux-ui'

const selected = ref(['html', 'css', 'js'])
const options = [
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'JavaScript', value: 'js' },
  { label: 'TypeScript', value: 'ts' },
  { label: 'Vue.js', value: 'vue' },
  { label: 'React', value: 'react' }
]

const getLabel = (value) => {
  return options.find(opt => opt.value === value)?.label || value
}
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 禁用状态

禁用整个组件或单个选项。

:::demo

```vue
<template>
  <XFlex vertical gap="24">
    <div>
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px">整体禁用</div>
      <XCheckboxes 
        v-model="selected1" 
        :options="options1"
        disabled
      />
    </div>
    <div>
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px">部分选项禁用</div>
      <XCheckboxes 
        v-model="selected2" 
        :options="options2"
      />
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XCheckboxes } from '@xlui/xux-ui'

const selected1 = ref(['option1'])
const options1 = [
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2' }
]

const selected2 = ref(['option1'])
const options2 = [
  { label: '可选项1', value: 'option1' },
  { label: '禁用项', value: 'option2', disabled: true },
  { label: '可选项2', value: 'option3' }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 全选功能

添加全选/取消全选功能。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <XFlex align="center" gap="12">
      <XButton 
        size="small" 
        @click="selectAll"
        :disabled="selected.length === options.length"
      >
        全选
      </XButton>
      <XButton 
        size="small" 
        @click="clearAll"
        :disabled="selected.length === 0"
      >
        清空
      </XButton>
    </XFlex>
    <XCheckboxes 
      v-model="selected" 
      :options="options"
      layout="horizontal"
    />
    <div style="font-size: 14px; color: #666">
      已选择 {{ selected.length }} / {{ options.length }} 项
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XButton, XCheckboxes } from '@xlui/xux-ui'

const selected = ref([])
const options = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' }
]

const selectAll = () => {
  selected.value = options.map(opt => opt.value)
}

const clearAll = () => {
  selected.value = []
}
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 带图标的选项

为选项添加图标。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <XCheckboxes 
      v-model="selected" 
      :options="options"
      layout="grid"
      :columns="2"
    />
    <div style="font-size: 14px; color: #666">
      已选择：{{ selected.join(', ') || '未选择' }}
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XCheckboxes } from '@xlui/xux-ui'

const selected = ref(['email'])
const options = [
  { label: '邮件通知', value: 'email', icon: 'mdi:email' },
  { label: '短信通知', value: 'sms', icon: 'mdi:message' },
  { label: '推送通知', value: 'push', icon: 'mdi:bell' },
  { label: '语音通知', value: 'voice', icon: 'mdi:phone' }
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
| modelValue | 绑定值 | `Array<string \| number>` | `[]` |
| options | 选项数据 | `Array<Option>` | `[]` |
| layout | 布局方式 | `'vertical' \| 'horizontal' \| 'grid'` | `'vertical'` |
| columns | 网格列数（仅 grid 布局） | `number` | `3` |
| disabled | 是否禁用 | `boolean` | `false` |

### Option

| 属性名 | 说明 | 类型 |
|--------|------|------|
| label | 选项标签 | `string` |
| value | 选项值 | `string \| number` |
| icon | 图标（可选） | `string` |
| disabled | 是否禁用（可选） | `boolean` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值变化时触发 | `(value: Array<string \| number>)` |
| change | 值变化时触发 | `(value: Array<string \| number>)` |
