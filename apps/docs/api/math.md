# 数学工具 Math

精确数学计算，解决 JavaScript 浮点数精度问题。

## 导入

```javascript
import { 
  add, subtract, multiply, divide, round, ceil, floor,
  clamp, random, randomInt, mapRange, inRange,
  mean, median, percentage
} from '@xlui/xux-ui'
```

## 精确四则运算

解决 JavaScript 浮点数精度问题（如 0.1 + 0.2 ≠ 0.3）。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="grid grid-cols-3 gap-2">
      <div>
        <label class="text-xs text-gray-600">数字 A</label>
        <XInput v-model.number="numA" type="number" step="0.01" />
      </div>
      <div>
        <label class="text-xs text-gray-600">数字 B</label>
        <XInput v-model.number="numB" type="number" step="0.01" />
      </div>
      <div>
        <label class="text-xs text-gray-600">运算</label>
        <XSelect v-model="op">
          <option value="add">加</option>
          <option value="subtract">减</option>
          <option value="multiply">乘</option>
          <option value="divide">除</option>
        </XSelect>
      </div>
    </div>
    <div class="p-4 bg-blue-50 rounded text-center">
      <div class="text-xs text-gray-600 mb-2">{{ numA }} {{ opSymbol }} {{ numB }} =</div>
      <code class="text-3xl font-bold text-blue-600">{{ result }}</code>
    </div>
    <div class="text-xs text-gray-400 text-center">
      原生计算：{{ nativeResult }} {{ result === nativeResult ? '' : '（精度有误）' }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { XInput, XSelect, add, subtract, multiply, divide } from '@xlui/xux-ui'

const numA = ref(0.1)
const numB = ref(0.2)
const op = ref('add')

const ops = { add, subtract, multiply, divide }
const symbols = { add: '+', subtract: '-', multiply: '×', divide: '÷' }

const result = computed(() => ops[op.value](numA.value, numB.value))
const opSymbol = computed(() => symbols[op.value])
const nativeResult = computed(() => {
  if (op.value === 'add') return numA.value + numB.value
  if (op.value === 'subtract') return numA.value - numB.value
  if (op.value === 'multiply') return numA.value * numB.value
  return numA.value / numB.value
})
</script>
```

:::

## round / ceil / floor

四舍五入、向上/向下取整。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="grid grid-cols-2 gap-2">
      <div>
        <label class="text-xs text-gray-600">数字</label>
        <XInput v-model.number="num" type="number" step="0.01" />
      </div>
      <div>
        <label class="text-xs text-gray-600">保留小数位</label>
        <XInput v-model.number="decimals" type="number" min="0" max="10" />
      </div>
    </div>
    <div class="grid grid-cols-3 gap-2">
      <div class="p-3 bg-blue-50 rounded text-center">
        <div class="text-xs text-gray-600 mb-1">round</div>
        <code class="text-xl font-bold text-blue-600">{{ round(num, decimals) }}</code>
      </div>
      <div class="p-3 bg-green-50 rounded text-center">
        <div class="text-xs text-gray-600 mb-1">ceil</div>
        <code class="text-xl font-bold text-green-600">{{ ceil(num, decimals) }}</code>
      </div>
      <div class="p-3 bg-orange-50 rounded text-center">
        <div class="text-xs text-gray-600 mb-1">floor</div>
        <code class="text-xl font-bold text-orange-600">{{ floor(num, decimals) }}</code>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, round, ceil, floor } from '@xlui/xux-ui'
const num = ref(3.14159)
const decimals = ref(2)
</script>
```

:::

## clamp / inRange

限制范围和范围判断。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="grid grid-cols-3 gap-2">
      <div>
        <label class="text-xs text-gray-600">数字</label>
        <XInput v-model.number="num" type="number" />
      </div>
      <div>
        <label class="text-xs text-gray-600">最小值</label>
        <XInput v-model.number="min" type="number" />
      </div>
      <div>
        <label class="text-xs text-gray-600">最大值</label>
        <XInput v-model.number="max" type="number" />
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <div class="p-3 bg-blue-50 rounded text-center">
        <div class="text-xs text-gray-600 mb-1">clamp - 限制范围</div>
        <code class="text-2xl font-bold text-blue-600">{{ clamp(num, min, max) }}</code>
      </div>
      <div class="p-3 rounded text-center"
        :class="inRange(num, min, max) ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'">
        <div class="text-xs mb-1">inRange - 是否在范围内</div>
        <div class="text-2xl font-bold">{{ inRange(num, min, max) ? '✓ 是' : '✗ 否' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, clamp, inRange } from '@xlui/xux-ui'
const num = ref(50)
const min = ref(0)
const max = ref(100)
</script>
```

:::

## random / randomInt

生成随机数。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="grid grid-cols-3 gap-2">
      <div>
        <label class="text-xs text-gray-600">最小值</label>
        <XInput v-model.number="min" type="number" />
      </div>
      <div>
        <label class="text-xs text-gray-600">最大值</label>
        <XInput v-model.number="max" type="number" />
      </div>
      <div>
        <label class="text-xs text-gray-600">小数位</label>
        <XInput v-model.number="decimals" type="number" min="0" max="10" />
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <XButton @click="rand = random(min, max, decimals)" type="primary" block>
        生成随机数
      </XButton>
      <XButton @click="randInt = randomInt(min, max)" type="success" block>
        生成随机整数
      </XButton>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <div class="p-4 bg-blue-50 rounded text-center">
        <div class="text-xs text-gray-600 mb-1">random</div>
        <code class="text-2xl font-bold text-blue-600">{{ rand }}</code>
      </div>
      <div class="p-4 bg-green-50 rounded text-center">
        <div class="text-xs text-gray-600 mb-1">randomInt</div>
        <code class="text-2xl font-bold text-green-600">{{ randInt }}</code>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, XButton, random, randomInt } from '@xlui/xux-ui'
const min = ref(0)
const max = ref(100)
const decimals = ref(2)
const rand = ref(0)
const randInt = ref(0)
</script>
```

:::

## mapRange

数值映射。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="grid grid-cols-5 gap-2">
      <div>
        <label class="text-xs text-gray-600">当前值</label>
        <XInput v-model.number="value" type="number" />
      </div>
      <div>
        <label class="text-xs text-gray-600">原始最小</label>
        <XInput v-model.number="inMin" type="number" />
      </div>
      <div>
        <label class="text-xs text-gray-600">原始最大</label>
        <XInput v-model.number="inMax" type="number" />
      </div>
      <div>
        <label class="text-xs text-gray-600">目标最小</label>
        <XInput v-model.number="outMin" type="number" />
      </div>
      <div>
        <label class="text-xs text-gray-600">目标最大</label>
        <XInput v-model.number="outMax" type="number" />
      </div>
    </div>
    <div class="p-4 bg-purple-50 rounded text-center">
      <div class="text-xs text-gray-600 mb-2">
        将 {{ value }} 从 [{{ inMin }}, {{ inMax }}] 映射到 [{{ outMin }}, {{ outMax }}]
      </div>
      <code class="text-3xl font-bold text-purple-600">{{ mapRange(value, inMin, inMax, outMin, outMax) }}</code>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, mapRange } from '@xlui/xux-ui'
const value = ref(50)
const inMin = ref(0)
const inMax = ref(100)
const outMin = ref(0)
const outMax = ref(255)
</script>
```

:::

## mean / median

平均值和中位数。

:::demo

```vue
<template>
  <div class="space-y-3">
    <XInput v-model="numbers" placeholder="输入数字，用逗号分隔" />
    <div class="grid grid-cols-2 gap-2">
      <div class="p-4 bg-blue-50 rounded text-center">
        <div class="text-xs text-gray-600 mb-1">mean - 平均值</div>
        <code class="text-3xl font-bold text-blue-600">{{ meanValue }}</code>
      </div>
      <div class="p-4 bg-green-50 rounded text-center">
        <div class="text-xs text-gray-600 mb-1">median - 中位数</div>
        <code class="text-3xl font-bold text-green-600">{{ medianValue }}</code>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { XInput, mean, median } from '@xlui/xux-ui'

const numbers = ref('1,2,3,4,5,6,7,8,9')
const nums = computed(() => numbers.value.split(',').map(Number).filter(n => !isNaN(n)))
const meanValue = computed(() => mean(...nums.value))
const medianValue = computed(() => median(...nums.value))
</script>
```

:::

## percentage

百分比计算。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="grid grid-cols-2 gap-2">
      <div>
        <label class="text-xs text-gray-600">当前值</label>
        <XInput v-model.number="value" type="number" />
      </div>
      <div>
        <label class="text-xs text-gray-600">总数</label>
        <XInput v-model.number="total" type="number" />
      </div>
    </div>
    <div class="p-4 bg-blue-50 rounded">
      <div class="flex items-center gap-3">
        <div class="flex-1 h-6 bg-gray-200 rounded overflow-hidden">
          <div class="h-full bg-blue-500 transition-all" :style="`width: ${percentage(value, total)}%`"></div>
        </div>
        <code class="text-2xl font-bold text-blue-600 min-w-24 text-right">
          {{ percentage(value, total) }}%
        </code>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, percentage } from '@xlui/xux-ui'
const value = ref(75)
const total = ref(100)
</script>
```

:::

## API

| 函数 | 说明 | 参数 |
|------|------|------|
| `add(num1, num2)` | 精确加法 | `num1: number, num2: number` |
| `subtract(num1, num2)` | 精确减法 | `num1: number, num2: number` |
| `multiply(num1, num2)` | 精确乘法 | `num1: number, num2: number` |
| `divide(num1, num2)` | 精确除法 | `num1: number, num2: number` |
| `round(num, decimals?)` | 四舍五入 | `num: number, decimals?: number` |
| `ceil(num, decimals?)` | 向上取整 | `num: number, decimals?: number` |
| `floor(num, decimals?)` | 向下取整 | `num: number, decimals?: number` |
| `clamp(num, min, max)` | 限制范围 | `num: number, min: number, max: number` |
| `random(min, max, decimals?)` | 随机数 | `min: number, max: number, decimals?: number` |
| `randomInt(min, max)` | 随机整数 | `min: number, max: number` |
| `mapRange(num, inMin, inMax, outMin, outMax)` | 数值映射 | `num: number, inMin: number, inMax: number, outMin: number, outMax: number` |
| `inRange(num, min, max, inclusive?)` | 范围判断 | `num: number, min: number, max: number, inclusive?: boolean` |
| `mean(...nums)` | 平均值 | `...nums: number[]` |
| `median(...nums)` | 中位数 | `...nums: number[]` |
| `percentage(value, total, decimals?)` | 百分比 | `value: number, total: number, decimals?: number` |

