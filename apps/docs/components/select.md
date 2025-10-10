# Select 选择器

下拉选择器组件，支持单选、多选、搜索等功能。

## 基础用法

基本的单选功能。

:::demo

```vue
<template>
  <div style="min-height: 250px;">
    <XSelect 
      v-model="selected" 
      :options="options"
      placeholder="请选择"
      width="200px"
    />
    <div class="mt-4 text-sm text-gray-600">
      选中的值：{{ selected }}
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

## 多选模式

通过设置 `multiple` 属性启用多选，选中的值会以标签形式展示。

:::demo

```vue
<template>
  <div style="min-height: 300px;">
    <XSelect 
      v-model="multiSelected" 
      :options="options"
      multiple
      placeholder="请选择多个选项"
      width="300px"
    />
    <div class="mt-4 text-sm text-gray-600">
      选中的值：{{ multiSelected.join(', ') || '未选择' }}
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

## 可搜索

启用 `searchable` 属性，可以在下拉列表中搜索选项。

:::demo

```vue
<template>
  <div style="min-height: 300px;">
    <XSelect 
      v-model="searchSelected" 
      :options="countries"
      searchable
      placeholder="搜索国家"
      width="250px"
    />
    <div class="mt-4 text-sm text-gray-600">
      选中：{{ searchSelected }}
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

## 多选 + 搜索

结合多选和搜索功能。

:::demo

```vue
<template>
  <div style="min-height: 300px;">
    <XSelect 
      v-model="multiSearchSelected" 
      :options="fruits"
      multiple
      searchable
      placeholder="搜索并选择水果"
      width="320px"
    />
    <div class="mt-4 p-3 bg-gray-100 rounded text-sm">
      <div class="font-medium mb-2">已选择的水果：</div>
      <div v-if="multiSearchSelected.length === 0" class="text-gray-500">未选择</div>
      <div v-else>
        <span 
          v-for="(item, index) in multiSearchSelected" 
          :key="item"
          class="inline-block mr-2 mb-1"
        >
          {{ getFruitLabel(item) }}<span v-if="index < multiSearchSelected.length - 1">, </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const multiSearchSelected = ref([])
const fruits = [
  { label: '苹果 🍎', value: 'apple' },
  { label: '香蕉 🍌', value: 'banana' },
  { label: '橙子 🍊', value: 'orange' },
  { label: '葡萄 🍇', value: 'grape' },
  { label: '西瓜 🍉', value: 'watermelon' },
  { label: '草莓 🍓', value: 'strawberry' },
  { label: '芒果 🥭', value: 'mango' },
  { label: '樱桃 🍒', value: 'cherry' }
]

const getFruitLabel = (value) => {
  return fruits.find(f => f.value === value)?.label || value
}
</script>
```

:::

## 禁用状态

通过 `disabled` 属性禁用选择器。

:::demo

```vue
<template>
  <div class="space-y-4" style="min-height: 200px;">
    <div>
      <label class="block text-sm font-medium mb-2">正常状态</label>
      <XSelect 
        v-model="normalValue" 
        :options="options"
        width="200px"
      />
    </div>
    <div>
      <label class="block text-sm font-medium mb-2">禁用状态</label>
      <XSelect 
        v-model="disabledValue" 
        :options="options"
        disabled
        width="200px"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const normalValue = ref('1')
const disabledValue = ref('2')
const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' }
]
</script>
```

:::

## 无边框模式

设置 `borderless` 属性可以去除边框，适合特殊场景。

:::demo

```vue
<template>
  <div class="space-y-4" style="min-height: 250px;">
    <div>
      <label class="block text-sm font-medium mb-2">默认样式</label>
      <XSelect 
        v-model="value1" 
        :options="options"
        width="200px"
      />
    </div>
    <div>
      <label class="block text-sm font-medium mb-2">无边框样式</label>
      <XSelect 
        v-model="value2" 
        :options="options"
        borderless
        width="200px"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref('1')
const value2 = ref('2')
const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' }
]
</script>
```

:::

## 自定义宽度

通过 `width` 属性自定义选择器宽度。

:::demo

```vue
<template>
  <div class="space-y-4" style="min-height: 300px;">
    <div>
      <label class="block text-sm font-medium mb-2">宽度: 150px</label>
      <XSelect 
        v-model="value1" 
        :options="options"
        width="150px"
      />
    </div>
    <div>
      <label class="block text-sm font-medium mb-2">宽度: 250px</label>
      <XSelect 
        v-model="value2" 
        :options="options"
        width="250px"
      />
    </div>
    <div>
      <label class="block text-sm font-medium mb-2">宽度: 100%</label>
      <XSelect 
        v-model="value3" 
        :options="options"
        width="100%"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const options = [
  { label: '短选项', value: '1' },
  { label: '这是一个比较长的选项', value: '2' },
  { label: '选项三', value: '3' }
]
</script>
```

:::

## 自定义字段名

使用 `label-key` 和 `value-key` 属性自定义数据字段。

:::demo

```vue
<template>
  <div style="min-height: 250px;">
    <XSelect 
      v-model="selected" 
      :options="customOptions"
      label-key="name"
      value-key="id"
      placeholder="选择用户"
      width="220px"
    />
    <div class="mt-4 text-sm text-gray-600">
      选中的ID：{{ selected }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref('')
const customOptions = [
  { id: 1, name: '张三', role: 'Admin' },
  { id: 2, name: '李四', role: 'User' },
  { id: 3, name: '王五', role: 'Guest' },
  { id: 4, name: '赵六', role: 'User' }
]
</script>
```

:::

## 事件监听

监听选择器的各种事件。

:::demo

```vue
<template>
  <div style="min-height: 300px;">
    <XSelect 
      v-model="selected" 
      :options="options"
      @change="handleChange"
      @open="handleOpen"
      @close="handleClose"
      width="200px"
    />
    <div class="mt-4 p-3 bg-gray-100 rounded text-sm space-y-1">
      <div><strong>事件日志：</strong></div>
      <div v-for="(log, index) in logs" :key="index" class="text-xs">
        {{ log }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref('')
const logs = ref([])
const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' }
]

const addLog = (message) => {
  const time = new Date().toLocaleTimeString()
  logs.value.unshift(`[${time}] ${message}`)
  if (logs.value.length > 5) {
    logs.value.pop()
  }
}

const handleChange = (value) => {
  addLog(`值改变: ${value}`)
}

const handleOpen = () => {
  addLog('下拉框打开')
}

const handleClose = () => {
  addLog('下拉框关闭')
}
</script>
```

:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 绑定值 | `any \| any[]` | - |
| options | 选项数据 | `SelectOption[]` | `[]` |
| placeholder | 占位符文本 | `string` | `'请选择...'` |
| multiple | 是否多选 | `boolean` | `false` |
| searchable | 是否可搜索 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| labelKey | 选项标签字段名 | `string` | `'label'` |
| valueKey | 选项值字段名 | `string` | `'value'` |
| noOptionsText | 无选项时的提示文本 | `string` | `'暂无选项'` |
| clearable | 是否可清空（暂未实现） | `boolean` | `false` |
| borderless | 是否无边框 | `boolean` | `false` |
| width | 选择器宽度 | `string` | `'200px'` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值改变时触发 | `(value: any)` |
| change | 选择选项时触发 | `(value: any)` |
| open | 下拉框打开时触发 | `()` |
| close | 下拉框关闭时触发 | `()` |

### Exposed Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| open | 打开下拉框 | `()` |
| close | 关闭下拉框 | `()` |
| toggle | 切换下拉框状态 | `()` |

### SelectOption 接口

```typescript
interface SelectOption {
  label: string       // 选项显示文本
  value: any         // 选项值
  disabled?: boolean // 是否禁用（可选）
  [key: string]: any // 支持自定义字段
}
```
