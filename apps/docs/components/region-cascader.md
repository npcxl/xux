# RegionCascader 地区级联选择器

地区级联选择器组件，支持中国省市区三级联动选择，支持自定义显示级别。

使用 Web Worker 线程处理数据，懒加载机制，极致性能。

<div style="columns: 2; column-gap: 32px; margin-top: 32px;">

<div style="break-inside: avoid; margin-bottom: 24px;">

## 基础用法

最基本的地区选择功能。

:::demo

```vue
<template>
  <XFlex vertical gap="16" style="min-height: 400px">
    <XRegionCascader v-model="region" @change="handleChange" />
    <div style="font-size: 14px; color: #666">
      选中的值: {{ region.join(' > ') || '未选择' }}
    </div>
    <div style="font-size: 14px; color: #666">
      选中的标签: {{ labels.join(' > ') }}
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XRegionCascader } from '@xlui/xux-ui'

const region = ref([])
const labels = ref([])

const handleChange = (values, labelArr) => {
  labels.value = labelArr
}
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 默认值

设置组件的默认选中值。

:::demo

```vue
<template>
  <XFlex vertical gap="16" style="min-height: 400px">
    <XRegionCascader v-model="region" />
    <div style="font-size: 14px; color: #666">
      当前选中: {{ region.join(' > ') }}
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XRegionCascader } from '@xlui/xux-ui'

const region = ref(['11', '1101', '110101'])
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 自定义分隔符

可以自定义显示的分隔符。

:::demo

```vue
<template>
  <XFlex vertical gap="24" style="min-height: 500px">
    <div>
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px">默认分隔符 ( / )</div>
      <XRegionCascader v-model="region1" />
    </div>
    
    <div>
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px">破折号分隔符 ( - )</div>
      <XRegionCascader v-model="region2" separator=" - " />
    </div>
    
    <div>
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px">箭头分隔符 ( → )</div>
      <XRegionCascader v-model="region3" separator=" → " />
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XRegionCascader } from '@xlui/xux-ui'

const region1 = ref(['11', '1101', '110101'])
const region2 = ref(['31', '3101', '310101'])
const region3 = ref(['44', '4401', '440103'])
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 禁用状态

通过 `disabled` 属性禁用组件。

:::demo

```vue
<template>
  <XFlex vertical gap="24" style="min-height: 400px">
    <div>
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px">正常状态</div>
      <XRegionCascader v-model="region" />
    </div>
    <div>
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px">禁用状态</div>
      <XRegionCascader v-model="region" disabled />
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XRegionCascader } from '@xlui/xux-ui'

const region = ref(['11', '1101', '110101'])
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
  <XFlex vertical gap="16" style="min-height: 400px">
    <XRegionCascader v-model="region" clearable />
    <div style="font-size: 14px; color: #666">
      当前选中: {{ region.join(' > ') || '未选择' }}
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XRegionCascader } from '@xlui/xux-ui'

const region = ref(['31', '3101', '310101'])
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
  <XFlex vertical gap="16" style="min-height: 400px">
    <XRegionCascader v-model="region" width="100%" />
    <div style="font-size: 14px; color: #666">
      当前选中: {{ region.join(' > ') || '未选择' }}
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XRegionCascader } from '@xlui/xux-ui'

const region = ref([])
</script>
```

:::

</div>

</div>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue | 绑定值（省、市、区的代码数组） | `Array<string>` | `[]` |
| placeholder | 占位文本 | `string` | `'请选择省/市/区'` |
| width | 选择器宽度 | `string` | `'300px'` |
| separator | 分隔符 | `string` | `' / '` |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值变化时触发 | `(value: Array<string>)` |
| change | 值变化时触发 | `(value: Array<string>, labels: Array<string>)` |

### 说明

- 组件使用 Web Worker 线程处理数据，性能优异
- 支持懒加载机制，仅加载需要的数据
- 内置中国省市区三级数据
- 代码值为国家标准行政区划代码
