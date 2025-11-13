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

为选项添加图标，支持 Iconify 图标库。

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

<div style="break-inside: avoid; margin-bottom: 24px;">

## 混合图标示例

展示不同图标库和图标的混合使用。

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
      已选择：{{ selected.join(', ') || '未选择' }}
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XCheckboxes } from '@xlui/xux-ui'

const selected = ref(['github', 'twitter'])
const options = [
  { label: 'GitHub', value: 'github', icon: 'mdi:github' },
  { label: 'Twitter', value: 'twitter', icon: 'mdi:twitter' },
  { label: 'LinkedIn', value: 'linkedin', icon: 'mdi:linkedin' },
  { label: 'Facebook', value: 'facebook', icon: 'mdi:facebook' },
  { label: 'Instagram', value: 'instagram', icon: 'mdi:instagram' },
  { label: 'YouTube', value: 'youtube', icon: 'mdi:youtube' }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 可折叠菜单

使用 `collapsible` 属性开启折叠功能，添加汉堡菜单按钮控制选项的显示和隐藏。

:::demo

```vue
<template>
  <XFlex vertical gap="24">
    <div>
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px; color: #374151;">折叠菜单 - 默认展开</div>
      <XCheckboxes 
        v-model="selected1" 
        :options="options"
        collapsible
        :defaultExpanded="true"
      />
      <div style="font-size: 14px; color: #666; margin-top: 12px">
        已选择：{{ selected1.join(', ') || '未选择' }}
      </div>
    </div>
    
    <div>
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px; color: #374151;">折叠菜单 - 默认折叠</div>
      <XCheckboxes 
        v-model="selected2" 
        :options="techOptions"
        collapsible
        :defaultExpanded="false"
        layout="grid"
        :columns="2"
      />
      <div style="font-size: 14px; color: #666; margin-top: 12px">
        已选择 {{ selected2.length }} 项
      </div>
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XCheckboxes } from '@xlui/xux-ui'

const selected1 = ref(['apple', 'banana'])
const options = [
  { label: '苹果', value: 'apple', icon: 'mdi:apple' },
  { label: '香蕉', value: 'banana', icon: 'mdi:fruit-citrus' },
  { label: '橙子', value: 'orange', icon: 'mdi:orange' },
  { label: '葡萄', value: 'grape', icon: 'mdi:fruit-grapes' },
  { label: '草莓', value: 'strawberry', icon: 'mdi:food-apple' }
]

const selected2 = ref(['vue', 'ts'])
const techOptions = [
  { label: 'Vue.js', value: 'vue', icon: 'mdi:vuejs' },
  { label: 'React', value: 'react', icon: 'mdi:react' },
  { label: 'TypeScript', value: 'ts', icon: 'mdi:language-typescript' },
  { label: 'JavaScript', value: 'js', icon: 'mdi:language-javascript' },
  { label: 'Node.js', value: 'node', icon: 'mdi:nodejs' },
  { label: 'Python', value: 'python', icon: 'mdi:language-python' }
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
| collapsible | 是否可折叠 | `boolean` | `false` |
| defaultExpanded | 默认是否展开 | `boolean` | `true` |

### Option

| 属性名 | 说明 | 类型 |
|--------|------|------|
| label | 选项标签 | `string` |
| value | 选项值 | `string \| number` |
| icon | 图标名称（可选） | `string` |
| disabled | 是否禁用（可选） | `boolean` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值变化时触发 | `(value: Array<string \| number>)` |
| change | 值变化时触发 | `(value: Array<string \| number>)` |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| clearAll | 清空所有选中项 | - |
| selectAll | 全选所有可选项 | - |
| removeOption | 移除单个选项 | `value: string \| number` |
| toggle | 切换折叠状态 | - |
| expand | 展开选项列表 | - |
| collapse | 折叠选项列表 | - |
