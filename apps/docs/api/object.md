# 对象工具 Object

提供对象的深度操作、属性处理、路径访问等功能。

## 导入

```javascript
import { 
  deepClone, deepMerge, get, set, unset, has,
  pick, omit, invert, mapKeys, mapValues,
  compactObject, isEqual
} from '@xlui/xux-ui'
```

## deepClone

深度克隆对象，支持 Date、RegExp、Map、Set。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="p-3 bg-gray-50 rounded">
      <div class="text-sm text-gray-600 mb-2">原对象</div>
      <pre class="text-xs">{{ JSON.stringify(original, null, 2) }}</pre>
    </div>
    <XButton @click="modify" type="primary" block>
      修改克隆对象的嵌套属性
    </XButton>
    <div class="grid grid-cols-2 gap-2">
      <div class="p-3 bg-blue-50 rounded">
        <div class="text-sm text-gray-600 mb-2">克隆对象</div>
        <pre class="text-xs">{{ JSON.stringify(cloned, null, 2) }}</pre>
      </div>
      <div class="p-3 bg-green-50 rounded">
        <div class="text-sm text-gray-600 mb-2">原对象（未变）</div>
        <pre class="text-xs">{{ JSON.stringify(original, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XButton, deepClone } from '@xlui/xux-ui'

const original = ref({ name: 'Tom', info: { age: 20 } })
const cloned = ref(deepClone(original.value))

const modify = () => {
  cloned.value.info.age = 30
  cloned.value = { ...cloned.value }
}
</script>
```

:::

## deepMerge

对象深度合并。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="grid grid-cols-2 gap-2">
      <div class="p-3 bg-blue-50 rounded">
        <div class="text-xs text-gray-600 mb-1">对象 A</div>
        <pre class="text-xs">{{ JSON.stringify(objA, null, 2) }}</pre>
      </div>
      <div class="p-3 bg-green-50 rounded">
        <div class="text-xs text-gray-600 mb-1">对象 B</div>
        <pre class="text-xs">{{ JSON.stringify(objB, null, 2) }}</pre>
      </div>
    </div>
    <div class="p-4 bg-gray-50 rounded">
      <div class="text-sm text-gray-600 mb-2">合并结果</div>
      <pre class="text-xs">{{ JSON.stringify(deepMerge({...objA}, objB), null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { deepMerge } from '@xlui/xux-ui'

const objA = { a: 1, b: { c: 2 } }
const objB = { b: { d: 3 }, e: 4 }
</script>
```

:::

## get / set / has

路径操作：获取、设置、判断。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="p-3 bg-gray-50 rounded">
      <div class="text-xs text-gray-600 mb-2">测试对象</div>
      <pre class="text-xs">{{ JSON.stringify(obj, null, 2) }}</pre>
    </div>
    <div class="grid grid-cols-3 gap-2">
      <div>
        <label class="text-xs text-gray-600">路径</label>
        <XInput v-model="path" placeholder="如: user.name" />
      </div>
      <div>
        <label class="text-xs text-gray-600">新值</label>
        <XInput v-model="value" placeholder="新值" />
      </div>
      <div class="flex items-end">
        <XButton @click="setValue" type="primary" block>设置</XButton>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <div class="p-3 bg-blue-50 rounded">
        <div class="text-xs text-gray-600 mb-1">get(obj, "{{ path }}")</div>
        <code class="text-blue-600">{{ get(obj, path, '不存在') }}</code>
      </div>
      <div class="p-3 bg-green-50 rounded">
        <div class="text-xs text-gray-600 mb-1">has(obj, "{{ path }}")</div>
        <code class="text-green-600">{{ has(obj, path) }}</code>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, XButton, get, set, has } from '@xlui/xux-ui'

const obj = ref({ user: { name: '张三', age: 20 } })
const path = ref('user.name')
const value = ref('李四')

const setValue = () => {
  set(obj.value, path.value, value.value)
  obj.value = { ...obj.value }
}
</script>
```

:::

## pick / omit

提取或排除属性。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="p-3 bg-gray-50 rounded">
      <div class="text-xs text-gray-600 mb-2">原对象</div>
      <pre class="text-xs">{{ JSON.stringify(user, null, 2) }}</pre>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <div class="p-3 bg-blue-50 rounded">
        <div class="text-xs text-gray-600 mb-2">pick(['name', 'age'])</div>
        <pre class="text-xs">{{ JSON.stringify(pick(user, ['name', 'age']), null, 2) }}</pre>
      </div>
      <div class="p-3 bg-green-50 rounded">
        <div class="text-xs text-gray-600 mb-2">omit(['password'])</div>
        <pre class="text-xs">{{ JSON.stringify(omit(user, ['password']), null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { pick, omit } from '@xlui/xux-ui'

const user = { name: '张三', age: 20, email: 'test@example.com', password: '******' }
</script>
```

:::

## invert

键值互换。

:::demo

```vue
<template>
  <div class="space-y-2">
    <div class="grid grid-cols-2 gap-2">
      <div class="p-3 bg-blue-50 rounded">
        <div class="text-xs text-gray-600 mb-2">原对象</div>
        <pre class="text-xs">{{ JSON.stringify(codeMap, null, 2) }}</pre>
      </div>
      <div class="p-3 bg-green-50 rounded">
        <div class="text-xs text-gray-600 mb-2">invert(codeMap)</div>
        <pre class="text-xs">{{ JSON.stringify(invert(codeMap), null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { invert } from '@xlui/xux-ui'
const codeMap = { success: 200, notFound: 404, error: 500 }
</script>
```

:::

## mapKeys / mapValues

转换键名或键值。

:::demo

```vue
<template>
  <div class="space-y-2">
    <div class="p-3 bg-gray-50 rounded">
      <div class="text-xs text-gray-600 mb-2">原对象</div>
      <pre class="text-xs">{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <div class="p-3 bg-blue-50 rounded">
        <div class="text-xs text-gray-600 mb-2">mapKeys - 键名大写</div>
        <pre class="text-xs">{{ JSON.stringify(mapKeys(data, k => k.toUpperCase()), null, 2) }}</pre>
      </div>
      <div class="p-3 bg-green-50 rounded">
        <div class="text-xs text-gray-600 mb-2">mapValues - 值×2</div>
        <pre class="text-xs">{{ JSON.stringify(mapValues(data, v => v * 2), null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { mapKeys, mapValues } from '@xlui/xux-ui'
const data = { a: 1, b: 2, c: 3 }
</script>
```

:::

## compactObject

移除 null 和 undefined。

:::demo

```vue
<template>
  <div class="space-y-2">
    <div class="grid grid-cols-2 gap-2">
      <div class="p-3 bg-gray-50 rounded">
        <div class="text-xs text-gray-600 mb-2">原对象</div>
        <pre class="text-xs">{{ JSON.stringify(dirty, null, 2) }}</pre>
      </div>
      <div class="p-3 bg-blue-50 rounded">
        <div class="text-xs text-gray-600 mb-2">compactObject(dirty)</div>
        <pre class="text-xs">{{ JSON.stringify(compactObject(dirty), null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { compactObject } from '@xlui/xux-ui'
const dirty = { a: 1, b: null, c: undefined, d: 0, e: '' }
</script>
```

:::

## isEqual

深度比较对象。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="grid grid-cols-2 gap-2">
      <div>
        <label class="text-xs text-gray-600">对象 A (JSON)</label>
        <XInput v-model="jsonA" type="textarea" rows="3" />
      </div>
      <div>
        <label class="text-xs text-gray-600">对象 B (JSON)</label>
        <XInput v-model="jsonB" type="textarea" rows="3" />
      </div>
    </div>
    <div class="p-4 rounded text-center" 
      :class="result ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'">
      <div class="text-2xl font-bold">{{ result ? '✓ 相等' : '✗ 不相等' }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { XInput, isEqual } from '@xlui/xux-ui'

const jsonA = ref('{"a":1,"b":{"c":2}}')
const jsonB = ref('{"a":1,"b":{"c":2}}')

const result = computed(() => {
  try {
    return isEqual(JSON.parse(jsonA.value), JSON.parse(jsonB.value))
  } catch {
    return false
  }
})
</script>
```

:::

## API

| 函数 | 说明 | 参数 |
|------|------|------|
| `deepClone(obj)` | 深度克隆 | `obj: T` |
| `deepMerge(target, ...sources)` | 深度合并 | `target: T, sources: Partial<T>[]` |
| `get(obj, path, defaultValue?)` | 获取路径值 | `obj: any, path: string\|string[], defaultValue?: T` |
| `set(obj, path, value)` | 设置路径值 | `obj: T, path: string\|string[], value: any` |
| `unset(obj, path)` | 删除路径值 | `obj: T, path: string\|string[]` |
| `has(obj, path)` | 判断路径存在 | `obj: any, path: string\|string[]` |
| `pick(obj, keys)` | 提取属性 | `obj: T, keys: K[]` |
| `omit(obj, keys)` | 排除属性 | `obj: T, keys: K[]` |
| `invert(obj)` | 键值互换 | `obj: T` |
| `mapKeys(obj, converter)` | 转换键名 | `obj: T, converter: Function` |
| `mapValues(obj, converter)` | 转换键值 | `obj: T, converter: Function` |
| `compactObject(obj)` | 移除null/undefined | `obj: T` |
| `isEqual(obj1, obj2)` | 深度比较 | `obj1: any, obj2: any` |
