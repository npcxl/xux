# 类型检查工具 Type

提供各种数据类型的判断方法，比原生 `typeof` 更准确。

## 导入

```javascript
import { 
  getType, isObject, isArray, isString, isNumber,
  isBoolean, isFunction, isNull, isUndefined, isNil,
  isDate, isRegExp, isPromise, isSymbol, isEmpty,
  isEmptyObject, isEmptyArray, isEmptyString,
  isPlainObject, isMap, isSet, isInteger, isFloat
} from '@xlui/xux-ui'
```

## 基础类型判断

判断常见数据类型。

:::demo

```vue
<template>
  <div class="space-y-2">
    <div class="grid grid-cols-4 gap-2">
      <XButton 
        v-for="item in types" 
        :key="item.name"
        @click="testValue = item.value"
        :type="testValue === item.value ? 'primary' : ''">
        {{ item.name }}
      </XButton>
    </div>
    <div class="p-4 bg-blue-50 rounded">
      <div class="text-sm font-mono mb-3">
        getType: <span class="text-blue-600 font-bold">{{ getType(testValue) }}</span>
      </div>
      <div class="grid grid-cols-3 gap-2 text-xs">
        <div>isObject: <span :class="isObject(testValue) ? 'text-green-600' : 'text-gray-400'">{{ isObject(testValue) }}</span></div>
        <div>isArray: <span :class="isArray(testValue) ? 'text-green-600' : 'text-gray-400'">{{ isArray(testValue) }}</span></div>
        <div>isString: <span :class="isString(testValue) ? 'text-green-600' : 'text-gray-400'">{{ isString(testValue) }}</span></div>
        <div>isNumber: <span :class="isNumber(testValue) ? 'text-green-600' : 'text-gray-400'">{{ isNumber(testValue) }}</span></div>
        <div>isBoolean: <span :class="isBoolean(testValue) ? 'text-green-600' : 'text-gray-400'">{{ isBoolean(testValue) }}</span></div>
        <div>isFunction: <span :class="isFunction(testValue) ? 'text-green-600' : 'text-gray-400'">{{ isFunction(testValue) }}</span></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XButton, getType, isObject, isArray, isString, isNumber, isBoolean, isFunction } from '@xlui/xux-ui'

const testValue = ref({})
const types = [
  { name: '对象', value: {} },
  { name: '数组', value: [] },
  { name: '字符串', value: 'text' },
  { name: '数字', value: 123 },
  { name: '布尔值', value: true },
  { name: '函数', value: () => {} }
]
</script>
```

:::

## isEmpty

判断是否为空值（null、undefined、空字符串、空数组、空对象）。

:::demo

```vue
<template>
  <div class="space-y-2">
    <div class="grid grid-cols-6 gap-2">
      <XButton 
        v-for="item in values" 
        :key="item.name"
        @click="current = item"
        size="small"
        :type="current === item ? 'primary' : ''">
        {{ item.name }}
      </XButton>
    </div>
    <div class="p-4 rounded text-center"
      :class="isEmpty(current.value) ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'">
      <div class="text-lg font-bold">{{ isEmpty(current.value) ? '✓ 为空' : '✗ 不为空' }}</div>
      <div class="text-xs mt-1 opacity-75">当前测试值：{{ current.name }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XButton, isEmpty } from '@xlui/xux-ui'

const values = [
  { name: 'null', value: null },
  { name: 'undefined', value: undefined },
  { name: '""', value: '' },
  { name: '[]', value: [] },
  { name: '{}', value: {} },
  { name: '"text"', value: 'text' }
]
const current = ref(values[0])
</script>
```

:::

## 数字类型判断

区分整数、浮点数和NaN。

:::demo

```vue
<template>
  <div class="space-y-2">
    <XInput 
      v-model="numInput" 
      placeholder="输入数字测试（如：42 或 3.14）"
    />
    <div class="p-4 bg-gray-50 rounded">
      <div class="grid grid-cols-3 gap-4 text-center">
        <div>
          <div class="text-xs text-gray-600 mb-1">isNumber</div>
          <div class="text-2xl" :class="isNumber(Number(numInput)) ? 'text-green-600' : 'text-red-600'">
            {{ isNumber(Number(numInput)) ? '✓' : '✗' }}
          </div>
        </div>
        <div>
          <div class="text-xs text-gray-600 mb-1">isInteger</div>
          <div class="text-2xl" :class="isInteger(Number(numInput)) ? 'text-green-600' : 'text-red-600'">
            {{ isInteger(Number(numInput)) ? '✓' : '✗' }}
          </div>
        </div>
        <div>
          <div class="text-xs text-gray-600 mb-1">isFloat</div>
          <div class="text-2xl" :class="isFloat(Number(numInput)) ? 'text-green-600' : 'text-red-600'">
            {{ isFloat(Number(numInput)) ? '✓' : '✗' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, isNumber, isInteger, isFloat } from '@xlui/xux-ui'
const numInput = ref('42')
</script>
```

:::

## 特殊类型判断

Date、RegExp、Promise、Symbol等。

:::demo

```vue
<template>
  <div class="space-y-2">
    <div v-for="item in items" :key="item.name" 
      class="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
      <code class="text-sm">{{ item.name }}</code>
      <span class="text-lg" :class="item.check() ? 'text-green-600' : 'text-red-600'">
        {{ item.check() ? '✓' : '✗' }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { isDate, isRegExp, isPromise, isSymbol, isNull, isUndefined } from '@xlui/xux-ui'

const items = [
  { name: 'isDate(new Date())', check: () => isDate(new Date()) },
  { name: 'isRegExp(/test/)', check: () => isRegExp(/test/) },
  { name: 'isPromise(Promise.resolve())', check: () => isPromise(Promise.resolve()) },
  { name: 'isSymbol(Symbol("test"))', check: () => isSymbol(Symbol('test')) },
  { name: 'isNull(null)', check: () => isNull(null) },
  { name: 'isUndefined(undefined)', check: () => isUndefined(undefined) }
]
</script>
```

:::

## 集合类型判断

Map、Set等集合类型。

:::demo

```vue
<template>
  <div class="space-y-2">
    <div v-for="item in items" :key="item.name" 
      class="flex items-center justify-between p-3 rounded transition-colors"
      :class="item.check() ? 'bg-green-50' : 'bg-red-50'">
      <span class="text-sm">{{ item.name }}</span>
      <span class="text-lg font-bold" :class="item.check() ? 'text-green-600' : 'text-red-600'">
        {{ item.check() ? '✓' : '✗' }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { isMap, isSet, isWeakMap, isWeakSet } from '@xlui/xux-ui'

const items = [
  { name: 'isMap(new Map())', check: () => isMap(new Map()) },
  { name: 'isSet(new Set())', check: () => isSet(new Set()) },
  { name: 'isWeakMap(new WeakMap())', check: () => isWeakMap(new WeakMap()) },
  { name: 'isWeakSet(new WeakSet())', check: () => isWeakSet(new WeakSet()) },
  { name: 'isMap({})', check: () => isMap({}) },
  { name: 'isSet([])', check: () => isSet([]) }
]
</script>
```

:::

## isPlainObject

判断是否为纯对象（通过 {} 或 new Object 创建）。

:::demo

```vue
<template>
  <div class="space-y-2">
    <div class="grid grid-cols-4 gap-2">
      <XButton 
        v-for="item in values" 
        :key="item.name"
        @click="current = item"
        size="small"
        :type="current === item ? 'primary' : ''">
        {{ item.name }}
      </XButton>
    </div>
    <div class="p-4 rounded text-center"
      :class="isPlainObject(current.value) ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'">
      <div class="text-lg font-bold">
        {{ isPlainObject(current.value) ? '✓ 是纯对象' : '✗ 不是纯对象' }}
      </div>
      <div class="text-xs mt-1 opacity-75">当前测试：{{ current.name }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XButton, isPlainObject } from '@xlui/xux-ui'

class MyClass {}
const values = [
  { name: '{}', value: {} },
  { name: 'new Object()', value: new Object() },
  { name: 'new MyClass()', value: new MyClass() },
  { name: '[]', value: [] }
]
const current = ref(values[0])
</script>
```

:::

## API

| 函数 | 说明 | 返回值 |
|------|------|--------|
| `getType(value)` | 获取准确类型 | `string` |
| `isObject(value)` | 是否为对象 | `boolean` |
| `isArray(value)` | 是否为数组 | `boolean` |
| `isString(value)` | 是否为字符串 | `boolean` |
| `isNumber(value)` | 是否为数字 | `boolean` |
| `isBoolean(value)` | 是否为布尔值 | `boolean` |
| `isFunction(value)` | 是否为函数 | `boolean` |
| `isNull(value)` | 是否为null | `boolean` |
| `isUndefined(value)` | 是否为undefined | `boolean` |
| `isNil(value)` | 是否为null/undefined | `boolean` |
| `isDate(value)` | 是否为Date | `boolean` |
| `isRegExp(value)` | 是否为正则 | `boolean` |
| `isPromise(value)` | 是否为Promise | `boolean` |
| `isSymbol(value)` | 是否为Symbol | `boolean` |
| `isMap(value)` | 是否为Map | `boolean` |
| `isSet(value)` | 是否为Set | `boolean` |
| `isWeakMap(value)` | 是否为WeakMap | `boolean` |
| `isWeakSet(value)` | 是否为WeakSet | `boolean` |
| `isInteger(value)` | 是否为整数 | `boolean` |
| `isFloat(value)` | 是否为浮点数 | `boolean` |
| `isEmpty(value)` | 是否为空值 | `boolean` |
| `isEmptyObject(value)` | 是否为空对象 | `boolean` |
| `isEmptyArray(value)` | 是否为空数组 | `boolean` |
| `isEmptyString(value)` | 是否为空字符串 | `boolean` |
| `isPlainObject(value)` | 是否为纯对象 | `boolean` |
