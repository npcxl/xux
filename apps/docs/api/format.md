# 格式化工具 Format

提供数字、货币、文件大小、日期、时间等格式化功能。

## 导入

```javascript
import { 
  formatNumber, formatCurrency, formatFileSize, formatDate,
  formatRelativeTime, formatCountdown, formatPercentage,
  formatPhone, formatBankCard, formatChineseNumber,
  formatChineseCurrency, padZero
} from '@xlui/xux-ui'
```

## formatNumber

格式化数字（千分位）。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="grid grid-cols-2 gap-2">
      <div>
        <label class="text-xs text-gray-600">数字</label>
        <XInput v-model.number="num" type="number" />
      </div>
      <div>
        <label class="text-xs text-gray-600">小数位数</label>
        <XInput v-model.number="decimals" type="number" min="0" max="10" />
      </div>
    </div>
    <div class="p-4 bg-blue-50 rounded text-center">
      <code class="text-2xl font-bold text-blue-600">{{ formatNumber(num, decimals) }}</code>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, formatNumber } from '@xlui/xux-ui'
const num = ref(1234567.89)
const decimals = ref(2)
</script>
```

:::

## formatCurrency

格式化货币。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="grid grid-cols-3 gap-2">
      <div>
        <label class="text-xs text-gray-600">金额</label>
        <XInput v-model.number="amount" type="number" />
      </div>
      <div>
        <label class="text-xs text-gray-600">符号</label>
        <XInput v-model="currency" />
      </div>
      <div>
        <label class="text-xs text-gray-600">小数位</label>
        <XInput v-model.number="decimals" type="number" />
      </div>
    </div>
    <div class="p-4 bg-green-50 rounded text-center">
      <code class="text-3xl font-bold text-green-600">{{ formatCurrency(amount, currency, decimals) }}</code>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, formatCurrency } from '@xlui/xux-ui'
const amount = ref(9999.99)
const currency = ref('¥')
const decimals = ref(2)
</script>
```

:::

## formatFileSize

格式化文件大小。

:::demo

```vue
<template>
  <div class="space-y-3">
    <XInput v-model.number="bytes" type="number" placeholder="输入字节数" />
    <div class="grid grid-cols-5 gap-2">
      <XButton @click="bytes = 1024" type="primary">1 KB</XButton>
      <XButton @click="bytes = 1024 * 1024" type="success">1 MB</XButton>
      <XButton @click="bytes = 1024 * 1024 * 1024" type="warning">1 GB</XButton>
      <XButton @click="bytes = 1024 * 1024 * 1024 * 10" type="danger">10 GB</XButton>
      <XButton @click="bytes = 1024 * 1024 * 1024 * 1024">1 TB</XButton>
    </div>
    <div class="p-4 bg-purple-50 rounded text-center">
      <div class="text-xs text-gray-600 mb-2">{{ bytes }} bytes</div>
      <code class="text-2xl font-bold text-purple-600">{{ formatFileSize(bytes) }}</code>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, XButton, formatFileSize } from '@xlui/xux-ui'
const bytes = ref(1536000)
</script>
```

:::

## formatDate

格式化日期。

:::demo

```vue
<template>
  <div class="space-y-3">
    <XInput v-model="format" placeholder="格式模板" />
    <div class="text-xs text-gray-600 mb-2">支持：YYYY MM DD HH mm ss</div>
    <div class="grid grid-cols-2 gap-2">
      <div class="p-3 bg-blue-50 rounded">
        <div class="text-xs text-gray-600 mb-1">当前时间</div>
        <code class="text-sm text-blue-600">{{ formatDate(now, format) }}</code>
      </div>
      <div class="p-3 bg-green-50 rounded">
        <div class="text-xs text-gray-600 mb-1">指定日期</div>
        <code class="text-sm text-green-600">{{ formatDate('2024-01-01', format) }}</code>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, formatDate } from '@xlui/xux-ui'
const format = ref('YYYY-MM-DD HH:mm:ss')
const now = new Date()
</script>
```

:::

## formatRelativeTime

相对时间（多久前）。

:::demo

```vue
<template>
  <div class="space-y-2">
    <div class="grid grid-cols-3 gap-2">
      <XButton @click="setTime(5)" type="primary">5分钟前</XButton>
      <XButton @click="setTime(60)" type="success">1小时前</XButton>
      <XButton @click="setTime(1440)" type="warning">1天前</XButton>
    </div>
    <div class="p-4 bg-orange-50 rounded text-center">
      <code class="text-xl font-bold text-orange-600">{{ formatRelativeTime(date) }}</code>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XButton, formatRelativeTime } from '@xlui/xux-ui'
const date = ref(Date.now() - 5 * 60 * 1000)
const setTime = (minutes) => {
  date.value = Date.now() - minutes * 60 * 1000
}
</script>
```

:::

## formatCountdown

格式化倒计时。

:::demo

```vue
<template>
  <div class="space-y-3">
    <XInput v-model.number="seconds" type="number" placeholder="总秒数" />
    <div class="p-4 bg-red-50 rounded">
      <div class="text-center mb-3">
        <code class="text-3xl font-bold text-red-600">{{ countdown.format }}</code>
      </div>
      <div class="grid grid-cols-4 gap-2 text-center text-xs">
        <div><span class="font-bold">{{ countdown.days }}</span> 天</div>
        <div><span class="font-bold">{{ countdown.hours }}</span> 时</div>
        <div><span class="font-bold">{{ countdown.minutes }}</span> 分</div>
        <div><span class="font-bold">{{ countdown.seconds }}</span> 秒</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { XInput, formatCountdown } from '@xlui/xux-ui'
const seconds = ref(90061)
const countdown = computed(() => formatCountdown(seconds.value))
</script>
```

:::

## formatPercentage

格式化百分比。

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
        <div class="flex-1 h-4 bg-gray-200 rounded overflow-hidden">
          <div class="h-full bg-blue-500 transition-all" :style="`width: ${(value/total*100)}%`"></div>
        </div>
        <code class="text-xl font-bold text-blue-600 min-w-20 text-right">
          {{ formatPercentage(value, total) }}
        </code>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, formatPercentage } from '@xlui/xux-ui'
const value = ref(75)
const total = ref(100)
</script>
```

:::

## formatPhone / formatBankCard

格式化手机号和银行卡号。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div>
      <label class="text-xs text-gray-600">手机号</label>
      <XInput v-model="phone" placeholder="输入手机号" />
      <div class="mt-2 p-3 bg-blue-50 rounded">
        <code class="text-blue-600">{{ formatPhone(phone) }}</code>
      </div>
    </div>
    <div>
      <label class="text-xs text-gray-600">银行卡号</label>
      <XInput v-model="card" placeholder="输入银行卡号" />
      <div class="mt-2 p-3 bg-green-50 rounded">
        <code class="text-green-600">{{ formatBankCard(card) }}</code>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, formatPhone, formatBankCard } from '@xlui/xux-ui'
const phone = ref('13800138000')
const card = ref('6222021234567890123')
</script>
```

:::

## formatChineseNumber

数字转中文。

:::demo

```vue
<template>
  <div class="space-y-3">
    <XInput v-model.number="num" type="number" placeholder="输入数字" />
    <div class="p-4 bg-yellow-50 rounded text-center">
      <code class="text-2xl font-bold text-yellow-700">{{ formatChineseNumber(num) }}</code>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, formatChineseNumber } from '@xlui/xux-ui'
const num = ref(12345)
</script>
```

:::

## formatChineseCurrency

金额转大写中文。

:::demo

```vue
<template>
  <div class="space-y-3">
    <XInput v-model.number="amount" type="number" step="0.01" placeholder="输入金额" />
    <div class="p-4 bg-red-50 rounded text-center">
      <code class="text-xl font-bold text-red-600">{{ formatChineseCurrency(amount) }}</code>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, formatChineseCurrency } from '@xlui/xux-ui'
const amount = ref(12345.67)
</script>
```

:::

## padZero

数字补零。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="grid grid-cols-2 gap-2">
      <div>
        <label class="text-xs text-gray-600">数字</label>
        <XInput v-model.number="num" type="number" />
      </div>
      <div>
        <label class="text-xs text-gray-600">长度</label>
        <XInput v-model.number="length" type="number" />
      </div>
    </div>
    <div class="p-4 bg-gray-50 rounded text-center">
      <code class="text-3xl font-mono font-bold text-gray-700">{{ padZero(num, length) }}</code>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, padZero } from '@xlui/xux-ui'
const num = ref(5)
const length = ref(3)
</script>
```

:::

## API

| 函数 | 说明 | 参数 |
|------|------|------|
| `formatNumber(num, decimals?)` | 千分位格式化 | `num: number, decimals?: number` |
| `formatCurrency(amount, currency?, decimals?)` | 货币格式化 | `amount: number, currency?: string, decimals?: number` |
| `formatFileSize(bytes, decimals?)` | 文件大小格式化 | `bytes: number, decimals?: number` |
| `formatDate(date, format?)` | 日期格式化 | `date: Date\|string\|number, format?: string` |
| `formatRelativeTime(date)` | 相对时间 | `date: Date\|string\|number` |
| `formatCountdown(seconds)` | 倒计时 | `seconds: number` |
| `formatPercentage(value, total, decimals?)` | 百分比 | `value: number, total: number, decimals?: number` |
| `formatPhone(phone)` | 手机号格式化 | `phone: string` |
| `formatBankCard(cardNo)` | 银行卡格式化 | `cardNo: string` |
| `formatChineseNumber(num)` | 数字转中文 | `num: number` |
| `formatChineseCurrency(amount)` | 金额转大写 | `amount: number` |
| `padZero(num, length?)` | 数字补零 | `num: number, length?: number` |
