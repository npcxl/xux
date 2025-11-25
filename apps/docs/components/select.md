# Select 选择器

选择器组件，具有磨砂玻璃效果、优雅动画和流畅交互。支持单选、多选、搜索等功能。

## 特性展示

<div style="
  columns: 2;
  column-gap: 24px;
  margin-top: 24px;
">

<div style="break-inside: avoid; margin-bottom: 24px;">
<h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">基础用法</h3>

:::demo

```vue
<template>
  <div style="min-height: 200px">
    <XSelect 
      v-model="selected" 
      :options="options"
      placeholder="请选择"
      width="100%"
    />
    <div style="margin-top: 12px; font-size: 14px; color: rgba(60, 60, 67, 0.6)">
      选中的值：{{ selected || '未选择' }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
<h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">多选模式</h3>

:::demo

```vue
<template>
  <div style="min-height: 280px">
    <XSelect 
      v-model="multiSelected" 
      :options="options"
      multiple
      placeholder="请选择多个选项"
      width="100%"
    />
    <div style="margin-top: 12px; padding: 12px; background: rgba(0, 122, 255, 0.06); border-radius: 12px;">
      <div style="font-size: 12px; color: #007AFF; font-weight: 500; margin-bottom: 4px;">已选择：</div>
      <div style="font-size: 14px; color: rgba(0, 0, 0, 0.8)">
        {{ multiSelected.join(', ') || '未选择' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
<h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">可清除</h3>

:::demo

```vue
<template>
  <div style="min-height: 200px">
    <div style="margin-bottom: 16px;">
      <div style="font-size: 13px; font-weight: 500; margin-bottom: 8px; color: rgba(60, 60, 67, 0.6)">单选 - 可清除</div>
      <XSelect 
        v-model="clearableSelected" 
        :options="options"
        clearable
        placeholder="选择后可清除"
        width="100%"
      />
    </div>
    <div>
      <div style="font-size: 13px; font-weight: 500; margin-bottom: 8px; color: rgba(60, 60, 67, 0.6)">多选 - 可清除</div>
      <XSelect 
        v-model="clearableMultiple" 
        :options="options"
        clearable
        multiple
        placeholder="选择多个后可一键清除"
        width="100%"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const clearableSelected = ref('')
const clearableMultiple = ref([])
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
<h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">禁用状态</h3>

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 16px;">
      <div style="font-size: 13px; font-weight: 500; margin-bottom: 8px; color: rgba(60, 60, 67, 0.6)">整体禁用</div>
      <XSelect 
        v-model="selected1" 
        :options="options"
        disabled
        width="100%"
      />
    </div>
    <div>
      <div style="font-size: 13px; font-weight: 500; margin-bottom: 8px; color: rgba(60, 60, 67, 0.6)">部分选项禁用</div>
      <XSelect 
        v-model="selected2" 
        :options="optionsWithDisabled"
        width="100%"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
<h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">可搜索</h3>

:::demo

```vue
<template>
  <div style="min-height: 280px">
    <XSelect 
      v-model="searchSelected" 
      :options="countries"
      searchable
      placeholder="搜索国家"
      width="100%"
    />
    <div style="margin-top: 12px; font-size: 14px; color: rgba(60, 60, 67, 0.6)">
      选中：{{ searchSelected || '未选择' }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
<h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">多选 + 搜索</h3>

:::demo

```vue
<template>
  <div style="min-height: 320px">
    <XSelect 
      v-model="multiSearchSelected" 
      :options="fruits"
      multiple
      searchable
      placeholder="搜索并选择水果"
      width="100%"
    />
    <div style="margin-top: 12px; padding: 16px; background: linear-gradient(135deg, rgba(52, 199, 89, 0.06) 0%, rgba(0, 122, 255, 0.06) 100%); border-radius: 12px;">
      <div style="font-weight: 500; margin-bottom: 8px; font-size: 13px; color: rgba(0, 0, 0, 0.7)">已选择的水果：</div>
      <div v-if="multiSearchSelected.length === 0" style="color: rgba(60, 60, 67, 0.6); font-size: 14px;">未选择</div>
      <div v-else style="color: rgba(0, 0, 0, 0.8); font-size: 14px; line-height: 1.6;">
        {{ multiSearchSelected.map(v => fruits.find(f => f.value === v)?.label).join(' • ') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
<h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">无边框样式</h3>

:::demo

```vue
<template>
  <div style="min-height: 200px">
    <XSelect 
      v-model="borderlessSelected" 
      :options="options"
      :borderless="true"
      placeholder="无边框选择器"
      width="100%"
    />
    <div style="margin-top: 12px; font-size: 14px; color: rgba(60, 60, 67, 0.6)">
      选中：{{ borderlessSelected || '未选择' }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const borderlessSelected = ref('')
const options = [
  { label: '轻量设计', value: '1' },
  { label: '优雅简洁', value: '2' },
  { label: '现代风格', value: '3' }
]
</script>
```

:::
</div>

<div style="break-inside: avoid; margin-bottom: 24px;">
<h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">自定义宽度</h3>

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 16px;">
      <div style="font-size: 13px; color: rgba(60, 60, 67, 0.6); margin-bottom: 8px;">小尺寸</div>
      <XSelect 
        v-model="size1" 
        :options="sizeOptions"
        size="small"
        width="150px"
      />
    </div>
    <div style="margin-bottom: 16px;">
      <div style="font-size: 13px; color: rgba(60, 60, 67, 0.6); margin-bottom: 8px;">中尺寸（默认）</div>
      <XSelect 
        v-model="size2" 
        :options="sizeOptions"
        width="200px"
      />
    </div>
    <div>
      <div style="font-size: 13px; color: rgba(60, 60, 67, 0.6); margin-bottom: 8px;">大尺寸</div>
      <XSelect 
        v-model="size3" 
        :options="sizeOptions"
        size="large"
        width="250px"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const size1 = ref('S')
const size2 = ref('M')
const size3 = ref('L')
const sizeOptions = [
  { label: 'Small', value: 'S' },
  { label: 'Medium', value: 'M' },
  { label: 'Large', value: 'L' },
  { label: 'X-Large', value: 'XL' }
]
</script>
```

:::
</div>

</div>

## 设计特点

- **磨砂玻璃效果**：使用 `backdrop-filter` 实现 iOS 风格的毛玻璃背景
- **流畅动画**：所有交互都有精心设计的过渡动画
- **优雅的聚焦效果**：聚焦时的光晕和阴影完全遵循 iOS 设计语言
- **精致的下拉菜单**：选项悬停、选中状态都有细腻的视觉反馈
- **响应式设计**：完美适配不同屏幕尺寸
- **暗色模式**：自动适配系统深色主题
- **辅助功能**：支持键盘导航和屏幕阅读器

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue | 绑定值 | `any` | - |
| options | 选项数据 | `SelectOption[]` | `[]` |
| placeholder | 占位文本 | `string` | `'请选择...'` |
| multiple | 是否多选 | `boolean` | `false` |
| searchable | 是否可搜索 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| labelKey | 标签键名 | `string` | `'label'` |
| valueKey | 值键名 | `string` | `'value'` |
| noOptionsText | 无选项提示文本 | `string` | `'暂无选项'` |
| clearable | 是否可清空 | `boolean` | `false` |
| borderless | 是否无边框 | `boolean` | `false` |
| width | 选择器宽度 | `string` | `'100%'` |
| size | 尺寸大小 | `'small' \| 'medium' \| 'large'` | `'medium'` |

### SelectOption

```typescript
interface SelectOption {
  label: string
  value: any
  disabled?: boolean
  [key: string]: any
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值变化时触发 | `(value: any)` |
| change | 值变化时触发 | `(value: any)` |
| open | 展开时触发 | - |
| close | 收起时触发 | - |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| open | 展开下拉菜单 | - |
| close | 关闭下拉菜单 | - |
| toggle | 切换下拉菜单 | - |
