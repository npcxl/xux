# Select 选择器

下拉选择器组件，支持单选、多选、搜索等功能。

<div style="columns: 2; column-gap: 32px; margin-top: 32px;">

<div style="break-inside: avoid; margin-bottom: 24px;">

## 基础用法

基本的单选功能。

:::demo

```vue
<template>
  <XFlex vertical gap="16" style="min-height: 250px">
    <XSelect 
      v-model="selected" 
      :options="options"
      placeholder="请选择"
      width="200px"
    />
    <div style="font-size: 14px; color: #666">
      选中的值：{{ selected }}
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XSelect } from '@xlui/xux-ui'

const selected = ref('')
const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
  { label: '选项四', value: '4' }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 多选模式

设置 `multiple` 属性启用多选。

:::demo

```vue
<template>
  <XFlex vertical gap="16" style="min-height: 300px">
    <XSelect 
      v-model="multiSelected" 
      :options="options"
      multiple
      placeholder="请选择多个选项"
      width="300px"
    />
    <div style="font-size: 14px; color: #666">
      选中的值：{{ multiSelected.join(', ') || '未选择' }}
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XSelect } from '@xlui/xux-ui'

const multiSelected = ref([])
const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Grape', value: 'grape' },
  { label: 'Mango', value: 'mango' }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 可搜索

启用 `searchable` 属性，在下拉列表中搜索选项。

:::demo

```vue
<template>
  <XFlex vertical gap="16" style="min-height: 300px">
    <XSelect 
      v-model="searchSelected" 
      :options="countries"
      searchable
      placeholder="搜索国家"
      width="250px"
    />
    <div style="font-size: 14px; color: #666">
      选中：{{ searchSelected }}
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XSelect } from '@xlui/xux-ui'

const searchSelected = ref('')
const countries = [
  { label: '中国', value: 'CN' },
  { label: '美国', value: 'US' },
  { label: '日本', value: 'JP' },
  { label: '韩国', value: 'KR' },
  { label: '英国', value: 'GB' },
  { label: '法国', value: 'FR' },
  { label: '德国', value: 'DE' },
  { label: '意大利', value: 'IT' }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 多选 + 搜索

结合多选和搜索功能。

:::demo

```vue
<template>
  <XFlex vertical gap="16" style="min-height: 300px">
    <XSelect 
      v-model="multiSearchSelected" 
      :options="fruits"
      multiple
      searchable
      placeholder="搜索并选择水果"
      width="320px"
    />
    <div style="padding: 12px; background: #f5f5f5; border-radius: 4px; font-size: 14px">
      <div style="font-weight: 500; margin-bottom: 8px">已选择的水果：</div>
      <div v-if="multiSearchSelected.length === 0" style="color: #999">未选择</div>
      <div v-else style="color: #666">
        {{ multiSearchSelected.join(', ') }}
      </div>
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XSelect } from '@xlui/xux-ui'

const multiSearchSelected = ref([])
const fruits = [
  { label: '苹果 Apple', value: 'apple' },
  { label: '香蕉 Banana', value: 'banana' },
  { label: '橙子 Orange', value: 'orange' },
  { label: '葡萄 Grape', value: 'grape' },
  { label: '芒果 Mango', value: 'mango' },
  { label: '西瓜 Watermelon', value: 'watermelon' }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 禁用状态

禁用整个选择器或单个选项。

:::demo

```vue
<template>
  <XFlex vertical gap="16" style="min-height: 250px">
    <div>
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px">整体禁用</div>
      <XSelect 
        v-model="selected1" 
        :options="options"
        disabled
        width="200px"
      />
    </div>
    <div>
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px">部分选项禁用</div>
      <XSelect 
        v-model="selected2" 
        :options="optionsWithDisabled"
        width="200px"
      />
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XSelect } from '@xlui/xux-ui'

const selected1 = ref('1')
const selected2 = ref('')
const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' }
]
const optionsWithDisabled = [
  { label: '可选项', value: '1' },
  { label: '禁用项', value: '2', disabled: true },
  { label: '可选项', value: '3' }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 可清空

设置 `clearable` 属性显示清空按钮。

:::demo

```vue
<template>
  <XFlex vertical gap="16" style="min-height: 250px">
    <XSelect 
      v-model="clearSelected" 
      :options="options"
      clearable
      placeholder="可清空的选择器"
      width="200px"
    />
    <div style="font-size: 14px; color: #666">
      选中的值：{{ clearSelected || '未选择' }}
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XSelect } from '@xlui/xux-ui'

const clearSelected = ref('2')
const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' }
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
| modelValue | 绑定值 | `string \| number \| Array` | - |
| options | 选项数据 | `Array<Option>` | `[]` |
| placeholder | 占位文本 | `string` | `'请选择'` |
| width | 选择器宽度 | `string` | `'200px'` |
| multiple | 是否多选 | `boolean` | `false` |
| searchable | 是否可搜索 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |

### Option

| 属性名 | 说明 | 类型 |
|--------|------|------|
| label | 选项标签 | `string` |
| value | 选项值 | `string \| number` |
| disabled | 是否禁用（可选） | `boolean` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值变化时触发 | `(value: string \| number \| Array)` |
| change | 值变化时触发 | `(value: string \| number \| Array)` |
