# 数组工具 Array

提供数组操作、统计、转换等功能。

## 导入

```javascript
import { 
  unique, flatten, groupBy, chunk, shuffle, sample,
  sum, average, max, min, intersection, union,
  difference, compact, countBy, move, sortBy
} from '@xlui/xux-ui'
```

## unique / flatten

数组去重和扁平化。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="p-3 bg-blue-50 rounded">
      <div class="text-xs text-gray-600 mb-1">unique - 数组去重</div>
      <div class="text-sm mb-2"><code>[1, 2, 2, 3, 3, 3, 4]</code></div>
      <code class="text-blue-600">→ {{ unique([1, 2, 2, 3, 3, 3, 4]) }}</code>
    </div>
    <div class="p-3 bg-green-50 rounded">
      <div class="text-xs text-gray-600 mb-1">flatten - 数组扁平化</div>
      <div class="text-sm mb-2"><code>[1, [2, [3, [4, 5]]]]</code></div>
      <code class="text-green-600">→ {{ flatten([1, [2, [3, [4, 5]]]]) }}</code>
    </div>
  </div>
</template>

<script setup>
import { unique, flatten } from '@xlui/xux-ui'
</script>
```

:::

## groupBy / chunk

数组分组和分块。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="p-3 bg-gray-50 rounded">
      <div class="text-xs text-gray-600 mb-2">groupBy - 按年龄分组</div>
      <div class="text-xs space-y-1">
        <div v-for="(group, age) in grouped" :key="age" class="font-mono">
          <span class="text-blue-600">年龄 {{ age }}:</span> {{ group.map(u => u.name).join(', ') }}
        </div>
      </div>
    </div>
    <div class="p-3 bg-gray-50 rounded">
      <div class="text-xs text-gray-600 mb-1">chunk - 分块(每块2个)</div>
      <div class="text-sm mb-2"><code>[1, 2, 3, 4, 5, 6]</code></div>
      <code class="text-blue-600">→ {{ chunk([1,2,3,4,5,6], 2) }}</code>
    </div>
  </div>
</template>

<script setup>
import { groupBy, chunk } from '@xlui/xux-ui'

const users = [
  { name: '张三', age: 20 },
  { name: '李四', age: 25 },
  { name: '王五', age: 20 }
]
const grouped = groupBy(users, 'age')
</script>
```

:::

## shuffle / sample

数组乱序和随机取值。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="p-3 bg-gray-50 rounded">
      <div class="text-xs text-gray-600 mb-2">shuffle - 数组乱序</div>
      <XButton 
        @click="shuffled = shuffle([1,2,3,4,5,6])" 
        type="primary"
        class="mb-2">
        点击乱序
      </XButton>
      <div class="font-mono text-blue-600">{{ shuffled }}</div>
    </div>
    <div class="p-3 bg-gray-50 rounded">
      <div class="text-xs text-gray-600 mb-2">sample - 随机取值</div>
      <div class="flex gap-2 mb-2">
        <XButton 
          @click="sampled = sample([1,2,3,4,5,6])" 
          type="success">
          取1个
        </XButton>
        <XButton 
          @click="sampled = sample([1,2,3,4,5,6], 3)" 
          type="warning">
          取3个
        </XButton>
      </div>
      <div class="text-lg font-mono text-green-600">{{ sampled }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XButton, shuffle, sample } from '@xlui/xux-ui'
const shuffled = ref([1, 2, 3, 4, 5, 6])
const sampled = ref(null)
</script>
```

:::

## 数组统计

sum、average、max、min。

:::demo

```vue
<template>
  <div class="p-4 bg-gray-50 rounded">
    <div class="text-xs text-gray-600 mb-3">测试数组: [10, 20, 30, 40, 50]</div>
    <div class="grid grid-cols-4 gap-3">
      <div class="p-3 bg-blue-50 rounded text-center">
        <div class="text-xs text-gray-600 mb-1">sum</div>
        <div class="text-2xl font-bold text-blue-600">{{ sum(nums) }}</div>
      </div>
      <div class="p-3 bg-green-50 rounded text-center">
        <div class="text-xs text-gray-600 mb-1">average</div>
        <div class="text-2xl font-bold text-green-600">{{ average(nums) }}</div>
      </div>
      <div class="p-3 bg-orange-50 rounded text-center">
        <div class="text-xs text-gray-600 mb-1">max</div>
        <div class="text-2xl font-bold text-orange-600">{{ max(nums) }}</div>
      </div>
      <div class="p-3 bg-purple-50 rounded text-center">
        <div class="text-xs text-gray-600 mb-1">min</div>
        <div class="text-2xl font-bold text-purple-600">{{ min(nums) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { sum, average, max, min } from '@xlui/xux-ui'
const nums = [10, 20, 30, 40, 50]
</script>
```

:::

## 集合运算

交集、并集、差集。

:::demo

```vue
<template>
  <div class="space-y-2">
    <div class="grid grid-cols-2 gap-2">
      <div class="p-3 bg-blue-50 rounded">
        <div class="text-xs text-gray-600">数组A</div>
        <code class="text-sm">{{ arr1 }}</code>
      </div>
      <div class="p-3 bg-green-50 rounded">
        <div class="text-xs text-gray-600">数组B</div>
        <code class="text-sm">{{ arr2 }}</code>
      </div>
    </div>
    <div class="p-3 bg-orange-50 rounded">
      <div class="text-xs text-gray-600 mb-1">intersection - 交集</div>
      <code class="text-orange-600">{{ intersection(arr1, arr2) }}</code>
    </div>
    <div class="p-3 bg-purple-50 rounded">
      <div class="text-xs text-gray-600 mb-1">union - 并集</div>
      <code class="text-purple-600">{{ union(arr1, arr2) }}</code>
    </div>
    <div class="p-3 bg-red-50 rounded">
      <div class="text-xs text-gray-600 mb-1">difference - 差集(A-B)</div>
      <code class="text-red-600">{{ difference(arr1, arr2) }}</code>
    </div>
  </div>
</template>

<script setup>
import { intersection, union, difference } from '@xlui/xux-ui'
const arr1 = [1, 2, 3, 4]
const arr2 = [3, 4, 5, 6]
</script>
```

:::

## compact / countBy

移除假值和元素计数。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="p-3 bg-gray-50 rounded">
      <div class="text-xs text-gray-600 mb-1">compact - 移除假值</div>
      <div class="text-xs mb-2 text-gray-400"><code>[0, 1, false, 2, '', 3, null]</code></div>
      <code class="text-sm text-blue-600">→ {{ compact([0, 1, false, 2, '', 3, null]) }}</code>
    </div>
    <div class="p-3 bg-gray-50 rounded">
      <div class="text-xs text-gray-600 mb-1">countBy - 元素计数</div>
      <div class="text-xs mb-2 text-gray-400"><code>['a', 'b', 'a', 'c', 'b', 'a']</code></div>
      <div class="text-xs space-y-1">
        <div v-for="(count, item) in countBy(['a','b','a','c','b','a'])" :key="item" class="font-mono">
          <span class="text-blue-600">{{ item }}</span>: {{ count }} 次
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { compact, countBy } from '@xlui/xux-ui'
</script>
```

:::

## move

移动数组元素。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="p-3 bg-gray-50 rounded">
      <div class="text-xs text-gray-600 mb-2">当前数组</div>
      <code class="font-mono text-lg">{{ arr }}</code>
    </div>
    <XButton 
      @click="arr = move(arr, 0, arr.length - 1)" 
      type="primary"
      block>
      移动第1个元素到最后
    </XButton>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XButton, move } from '@xlui/xux-ui'
const arr = ref([1, 2, 3, 4, 5])
</script>
```

:::

## sortBy

对象数组排序。

:::demo

```vue
<template>
  <div class="space-y-2">
    <div class="p-3 bg-gray-50 rounded">
      <div class="text-xs text-gray-600 mb-2">原数组</div>
      <div class="text-xs space-y-1">
        <div v-for="u in users" :key="u.name" class="font-mono">
          {{ u.name }}: {{ u.age }}岁
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <div class="p-3 bg-blue-50 rounded">
        <div class="text-xs text-gray-600 mb-1">按年龄升序</div>
        <div class="text-xs space-y-1">
          <div v-for="u in sortBy(users, 'age', 'asc')" :key="u.name" class="font-mono text-blue-600">
            {{ u.name }}: {{ u.age }}岁
          </div>
        </div>
      </div>
      <div class="p-3 bg-green-50 rounded">
        <div class="text-xs text-gray-600 mb-1">按年龄降序</div>
        <div class="text-xs space-y-1">
          <div v-for="u in sortBy(users, 'age', 'desc')" :key="u.name" class="font-mono text-green-600">
            {{ u.name }}: {{ u.age }}岁
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { sortBy } from '@xlui/xux-ui'
const users = [
  { name: '张三', age: 25 },
  { name: '李四', age: 20 },
  { name: '王五', age: 30 }
]
</script>
```

:::

## API

| 函数 | 说明 | 参数 |
|------|------|------|
| `unique(arr)` | 数组去重 | `arr: T[]` |
| `flatten(arr, depth?)` | 数组扁平化 | `arr: any[], depth?: number` |
| `groupBy(arr, key)` | 数组分组 | `arr: T[], key: keyof T \| Function` |
| `chunk(arr, size)` | 数组分块 | `arr: T[], size: number` |
| `shuffle(arr)` | 数组乱序 | `arr: T[]` |
| `sample(arr, count?)` | 随机取值 | `arr: T[], count?: number` |
| `sum(arr)` | 求和 | `arr: number[]` |
| `average(arr)` | 平均值 | `arr: number[]` |
| `max(arr)` | 最大值 | `arr: number[]` |
| `min(arr)` | 最小值 | `arr: number[]` |
| `intersection(arr1, arr2)` | 交集 | `arr1: T[], arr2: T[]` |
| `union(arr1, arr2)` | 并集 | `arr1: T[], arr2: T[]` |
| `difference(arr1, arr2)` | 差集 | `arr1: T[], arr2: T[]` |
| `compact(arr)` | 移除假值 | `arr: T[]` |
| `countBy(arr)` | 元素计数 | `arr: T[]` |
| `move(arr, from, to)` | 移动元素 | `arr: T[], from: number, to: number` |
| `sortBy(arr, key, order?)` | 对象数组排序 | `arr: T[], key: keyof T, order?: 'asc'\|'desc'` |
