# Checkboxes 多选框

多选框组件，用于在一组选项中进行多项选择。

## 基础用法

基本的多选功能，显示为垂直列表。

:::demo

```vue
<template>
  <div>
    <XCheckboxes v-model="selected" :options="options" />
    <div class="mt-4 text-sm text-gray-600">
      选中的值：{{ selected.join(', ') || '未选择' }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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

## 水平布局

设置 `layout="horizontal"` 实现水平排列。

:::demo

```vue
<template>
  <div>
    <XCheckboxes 
      v-model="selected" 
      :options="options"
      layout="horizontal"
    />
    <div class="mt-4 text-sm text-gray-600">
      已选择：{{ selected.length }} 项
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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

## 网格布局

使用 `layout="grid"` 和 `columns` 属性设置网格布局。

:::demo

```vue
<template>
  <div>
    <XCheckboxes 
      v-model="selected" 
      :options="options"
      layout="grid"
      :columns="3"
    />
    <div class="mt-4 p-3 bg-gray-100 rounded text-sm">
      <div class="font-medium mb-2">已选择的技能：</div>
      <div v-if="selected.length === 0" class="text-gray-500">未选择</div>
      <div v-else>
        <span v-for="(item, index) in selected" :key="item">
          {{ getLabel(item) }}<span v-if="index < selected.length - 1">, </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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

## 禁用状态

通过 `disabled` 属性禁用整个组件，或禁用单个选项。

:::demo

```vue
<template>
  <div class="space-y-6">
    <div>
      <div class="text-sm font-medium mb-2">整体禁用</div>
      <XCheckboxes 
        v-model="selected1" 
        :options="options1"
        disabled
      />
    </div>
    <div>
      <div class="text-sm font-medium mb-2">部分选项禁用</div>
      <XCheckboxes 
        v-model="selected2" 
        :options="options2"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected1 = ref(['option1'])
const options1 = [
  { label: '选项一', value: 'option1' },
  { label: '选项二', value: 'option2' },
  { label: '选项三', value: 'option3' }
]

const selected2 = ref(['js'])
const options2 = [
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'JavaScript', value: 'js', disabled: true },
  { label: 'TypeScript', value: 'ts' }
]
</script>
```

:::

## 最大选择数量

通过 `max-selections` 限制最多可选择的数量。

:::demo

```vue
<template>
  <div>
    <div class="mb-2 text-sm">
      <span class="font-medium">最多选择 3 项</span>
      <span class="ml-2 text-gray-600">（已选 {{ selected.length }}/3）</span>
    </div>
    <XCheckboxes 
      v-model="selected" 
      :options="options"
      :max-selections="3"
      layout="horizontal"
    />
    <div v-if="selected.length >= 3" class="mt-2 text-sm text-orange-500">
      已达到最大选择数量
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref(['red'])
const options = [
  { label: '红色', value: 'red' },
  { label: '橙色', value: 'orange' },
  { label: '黄色', value: 'yellow' },
  { label: '绿色', value: 'green' },
  { label: '蓝色', value: 'blue' },
  { label: '紫色', value: 'purple' }
]
</script>
```

:::

## 事件监听

监听选择变化事件。

:::demo

```vue
<template>
  <div>
    <XCheckboxes 
      v-model="selected" 
      :options="options"
      @change="handleChange"
      layout="horizontal"
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

const selected = ref([])
const logs = ref([])
const options = [
  { label: '选项 A', value: 'a' },
  { label: '选项 B', value: 'b' },
  { label: '选项 C', value: 'c' },
  { label: '选项 D', value: 'd' }
]

const handleChange = (value) => {
  const time = new Date().toLocaleTimeString()
  logs.value.unshift(`[${time}] 选中: ${value.join(', ') || '空'}`)
  if (logs.value.length > 5) {
    logs.value.pop()
  }
}
</script>
```

:::

## 暴露的方法

组件暴露了一些方法用于编程控制。

:::demo

```vue
<template>
  <div>
    <XCheckboxes 
      ref="checkboxesRef"
      v-model="selected" 
      :options="options"
      layout="grid"
      :columns="3"
    />
    <div class="mt-4 flex gap-2">
      <button 
        @click="selectAll"
        class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 text-sm"
      >
        全选
      </button>
      <button 
        @click="clearAll"
        class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
      >
        清空
      </button>
    </div>
    <div class="mt-3 text-sm text-gray-600">
      已选择：{{ selected.join(', ') || '无' }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const checkboxesRef = ref(null)
const selected = ref([])
const options = [
  { label: '周一', value: 'mon' },
  { label: '周二', value: 'tue' },
  { label: '周三', value: 'wed' },
  { label: '周四', value: 'thu' },
  { label: '周五', value: 'fri' },
  { label: '周六', value: 'sat' },
  { label: '周日', value: 'sun' }
]

const selectAll = () => {
  checkboxesRef.value?.selectAll()
}

const clearAll = () => {
  checkboxesRef.value?.clearAll()
}
</script>
```

:::

## 不同列数的网格

调整网格列数以适应不同场景。

:::demo

```vue
<template>
  <div class="space-y-6">
    <div>
      <div class="text-sm font-medium mb-2">2 列</div>
      <XCheckboxes 
        v-model="selected1" 
        :options="options"
        layout="grid"
        :columns="2"
      />
    </div>
    <div>
      <div class="text-sm font-medium mb-2">4 列</div>
      <XCheckboxes 
        v-model="selected2" 
        :options="options"
        layout="grid"
        :columns="4"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected1 = ref([])
const selected2 = ref([])
const options = [
  { label: '选项 1', value: '1' },
  { label: '选项 2', value: '2' },
  { label: '选项 3', value: '3' },
  { label: '选项 4', value: '4' },
  { label: '选项 5', value: '5' },
  { label: '选项 6', value: '6' },
  { label: '选项 7', value: '7' },
  { label: '选项 8', value: '8' }
]
</script>
```

:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 绑定值 | `(string \| number)[]` | `[]` |
| options | 选项数据 | `CheckboxOption[]` | `[]` |
| placeholder | 占位提示文本 | `string` | `'请选择选项'` |
| maxSelections | 最大选择数量，0 表示无限制 | `number` | `0` |
| disabled | 是否禁用 | `boolean` | `false` |
| layout | 布局方式 | `'vertical' \| 'horizontal' \| 'grid'` | `'vertical'` |
| columns | 网格列数（仅 grid 布局生效） | `number` | `3` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值改变时触发 | `(value: (string \| number)[])` |
| change | 选择改变时触发 | `(value: (string \| number)[])` |

### Exposed Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| selectAll | 全选所有可选项 | `()` |
| clearAll | 清空所有选择 | `()` |
| removeOption | 移除指定选项 | `(value: string \| number)` |

### CheckboxOption 接口

```typescript
interface CheckboxOption {
  label: string              // 选项显示文本
  value: string | number     // 选项值
  disabled?: boolean         // 是否禁用（可选）
}
```

## 使用场景

1. **表单多选**：兴趣爱好、技能选择、权限配置
2. **筛选条件**：商品筛选、数据过滤
3. **设置选项**：功能开关、偏好设置
4. **问卷调查**：多选题目
5. **批量操作**：批量选择数据项

## 最佳实践

1. **选项数量**：
   - 少于 5 项：使用垂直布局
   - 5-10 项：使用水平或网格布局
   - 超过 10 项：考虑使用分组或搜索功能

2. **布局选择**：
   - 垂直布局：适合长文本选项
   - 水平布局：适合短文本、标签式选择
   - 网格布局：适合大量选项，保持整齐

3. **最大选择**：
   - 明确限制数量时使用 `max-selections`
   - 显示当前选择数量和限制
   - 达到限制时给予提示

4. **禁用状态**：
   - 整体禁用：不允许任何修改
   - 部分禁用：某些选项已被预设或锁定
   - 给出禁用原因的提示

5. **用户体验**：
   - 提供全选/清空功能
   - 实时显示已选数量
   - 选中状态要明显
   - 支持键盘操作

