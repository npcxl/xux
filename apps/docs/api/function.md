# 函数工具 Function

提供防抖、节流、重试、并发控制、函数缓存等高阶函数功能。

## 导入

```javascript
import { 
  debounce, throttle, once, sleep, retry,
  pLimit, memoize, curry, compose, pipe
} from '@xlui/xux-ui'
```

## debounce / throttle

防抖和节流。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="p-3 bg-gray-50 rounded">
      <div class="text-xs text-gray-600 mb-2">输入触发（防抖300ms）</div>
      <XInput v-model="text" @input="handleDebounce" placeholder="输入测试防抖" />
      <div class="mt-2 text-sm text-blue-600">触发次数: {{ debounceCount }}</div>
    </div>
    <div class="p-3 bg-gray-50 rounded">
      <div class="text-xs text-gray-600 mb-2">点击触发（节流1000ms）</div>
      <XButton @click="handleThrottle" type="primary">点击测试节流</XButton>
      <div class="mt-2 text-sm text-green-600">触发次数: {{ throttleCount }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, XButton, debounce, throttle } from '@xlui/xux-ui'

const text = ref('')
const debounceCount = ref(0)
const throttleCount = ref(0)

const handleDebounce = debounce(() => {
  debounceCount.value++
}, 300)

const handleThrottle = throttle(() => {
  throttleCount.value++
}, 1000)
</script>
```

:::

## once

只执行一次的函数。

:::demo

```vue
<template>
  <div class="space-y-3">
    <XButton @click="handleOnce" type="primary" block>
      点击（只会执行一次）
    </XButton>
    <div class="p-4 bg-blue-50 rounded text-center">
      <div class="text-sm text-gray-600 mb-1">点击次数: {{ clickCount }}</div>
      <code class="text-xl font-bold text-blue-600">{{ result }}</code>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XButton, once } from '@xlui/xux-ui'

const clickCount = ref(0)
const result = ref('等待点击...')

const handleOnce = once(() => {
  result.value = '只执行一次！'
})

const handleClick = () => {
  clickCount.value++
  handleOnce()
}
</script>
```

:::

## sleep / retry

延迟执行和重试机制。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div>
      <label class="text-xs text-gray-600">延迟时间（毫秒）</label>
      <XInput v-model.number="delay" type="number" />
    </div>
    <XButton @click="testSleep" type="primary" :disabled="loading" block>
      {{ loading ? '执行中...' : '测试延迟执行' }}
    </XButton>
    <div class="p-3 bg-gray-50 rounded">
      <code class="text-sm">{{ message }}</code>
    </div>
    <div class="border-t pt-3">
      <div class="mb-2">
        <label class="text-xs text-gray-600">成功率（0-1）</label>
        <XInput v-model.number="successRate" type="number" step="0.1" min="0" max="1" />
      </div>
      <XButton @click="testRetry" type="success" :disabled="retrying" block>
        {{ retrying ? '重试中...' : '测试重试机制' }}
      </XButton>
      <div class="mt-2 p-3 bg-green-50 rounded text-xs">
        {{ retryMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, XButton, sleep, retry } from '@xlui/xux-ui'

const delay = ref(1000)
const loading = ref(false)
const message = ref('等待测试...')

const retrying = ref(false)
const successRate = ref(0.3)
const retryMessage = ref('等待测试...')

const testSleep = async () => {
  loading.value = true
  message.value = '开始延迟...'
  await sleep(delay.value)
  message.value = `延迟 ${delay.value}ms 后执行完成！`
  loading.value = false
}

const testRetry = async () => {
  retrying.value = true
  retryMessage.value = '开始重试...'
  
  try {
    await retry(async () => {
      if (Math.random() > successRate.value) {
        throw new Error('失败')
      }
      return '成功'
    }, 3, 500)
    retryMessage.value = '✓ 重试成功！'
  } catch {
    retryMessage.value = '✗ 重试3次后仍失败'
  }
  
  retrying.value = false
}
</script>
```

:::

## memoize

函数结果缓存。

:::demo

```vue
<template>
  <div class="space-y-3">
    <XInput v-model.number="n" type="number" placeholder="输入数字计算斐波那契" />
    <div class="grid grid-cols-2 gap-2">
      <XButton @click="calcNormal" type="primary">普通计算</XButton>
      <XButton @click="calcMemo" type="success">缓存计算</XButton>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <div class="p-3 bg-blue-50 rounded">
        <div class="text-xs text-gray-600 mb-1">普通计算</div>
        <div class="text-sm">耗时: {{ normalTime }}ms</div>
        <code class="text-xs">结果: {{ normalResult }}</code>
      </div>
      <div class="p-3 bg-green-50 rounded">
        <div class="text-xs text-gray-600 mb-1">缓存计算</div>
        <div class="text-sm">耗时: {{ memoTime }}ms</div>
        <code class="text-xs">结果: {{ memoResult }}</code>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, XButton, memoize } from '@xlui/xux-ui'

const n = ref(35)
const normalTime = ref(0)
const normalResult = ref('')
const memoTime = ref(0)
const memoResult = ref('')

const fib = (n) => n <= 1 ? n : fib(n - 1) + fib(n - 2)
const memoFib = memoize((n) => n <= 1 ? n : memoFib(n - 1) + memoFib(n - 2))

const calcNormal = () => {
  const start = performance.now()
  normalResult.value = fib(n.value)
  normalTime.value = (performance.now() - start).toFixed(2)
}

const calcMemo = () => {
  const start = performance.now()
  memoResult.value = memoFib(n.value)
  memoTime.value = (performance.now() - start).toFixed(2)
}
</script>
```

:::

## API

| 函数 | 说明 | 参数 |
|------|------|------|
| `debounce(fn, delay?, immediate?)` | 防抖 | `fn: Function, delay?: number, immediate?: boolean` |
| `throttle(fn, delay?)` | 节流 | `fn: Function, delay?: number` |
| `once(fn)` | 只执行一次 | `fn: Function` |
| `sleep(ms)` | 延迟执行 | `ms: number` |
| `retry(fn, maxAttempts?, delay?)` | 重试 | `fn: Function, maxAttempts?: number, delay?: number` |
| `pLimit(tasks, limit?)` | 并发控制 | `tasks: Function[], limit?: number` |
| `memoize(fn)` | 函数缓存 | `fn: Function` |
| `curry(fn)` | 柯里化 | `fn: Function` |
| `compose(...fns)` | 函数组合 | `fns: Function[]` |
| `pipe(...fns)` | 函数管道 | `fns: Function[]` |

