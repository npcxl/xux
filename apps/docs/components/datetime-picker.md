# DateTimePicker 日期时间选择器

现代化的日期时间选择器，支持日期、时间、日期时间三种模式，支持范围选择、快捷选项、时区配置等功能。

## 基础用法

最基础的日期时间选择器，支持三种模式。

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">选择日期</div>
      <XDateTimePicker 
        v-model="date" 
        mode="date"
        placeholder="请选择日期"
      />
      <div style="margin-top: 8px; color: #999; font-size: 13px;">
        已选择：{{ dateDisplay }}
      </div>
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">选择时间</div>
      <XDateTimePicker 
        v-model="time" 
        mode="time"
        placeholder="请选择时间"
      />
      <div style="margin-top: 8px; color: #999; font-size: 13px;">
        已选择：{{ time || '未选择' }}
      </div>
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">选择日期时间</div>
      <XDateTimePicker 
        v-model="datetime" 
        mode="datetime"
        placeholder="请选择日期时间"
      />
      <div style="margin-top: 8px; color: #999; font-size: 13px;">
        已选择：{{ datetimeDisplay }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDateTime } from '@xlui/xux-ui'

const date = ref(null)
const time = ref(null)
const datetime = ref(null)

const { format, create } = useDateTime()

const dateDisplay = computed(() => {
  if (!date.value) return '未选择'
  return date.value
})

const datetimeDisplay = computed(() => {
  if (!datetime.value) return '未选择'
  return datetime.value
})
</script>
```

:::

## 范围选择

通过 `range` 属性开启范围选择模式。

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">日期范围</div>
      <XDateTimePicker 
        v-model="dateRange" 
        mode="date" 
        range
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
      <div style="margin-top: 8px; color: #999; font-size: 13px;">
        已选择：{{ dateRangeDisplay }}
      </div>
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">日期时间范围</div>
      <XDateTimePicker 
        v-model="datetimeRange" 
        mode="datetime"
        range
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      />
      <div style="margin-top: 8px; color: #999; font-size: 13px;">
        已选择：{{ datetimeRangeDisplay }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const dateRange = ref(null)
const datetimeRange = ref(null)

const dateRangeDisplay = computed(() => {
  if (!dateRange.value || !Array.isArray(dateRange.value)) return '未选择'
  const [start, end] = dateRange.value
  return `${start} 至 ${end}`
})

const datetimeRangeDisplay = computed(() => {
  if (!datetimeRange.value || !Array.isArray(datetimeRange.value)) return '未选择'
  const [start, end] = datetimeRange.value
  return `${start} 至 ${end}`
})
</script>
```

:::

## 组件尺寸

支持三种尺寸：`small`、`medium`（默认）、`large`。

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">Small 小号</div>
      <XDateTimePicker 
        v-model="date1" 
        mode="date"
        size="small"
        placeholder="小号选择器"
      />
    </div>
    
    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">Medium 中号（默认）</div>
      <XDateTimePicker 
        v-model="date2" 
        mode="date"
        size="medium"
        placeholder="中号选择器"
      />
    </div>
    
    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">Large 大号</div>
      <XDateTimePicker 
        v-model="date3" 
        mode="date"
        size="large"
        placeholder="大号选择器"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const date1 = ref(null)
const date2 = ref(null)
const date3 = ref(null)
</script>
```

:::

## 快捷选项

支持预设快捷选项和自定义快捷选项。

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">默认快捷选项（单选）</div>
      <XDateTimePicker 
        v-model="date1" 
        mode="date"
        :show-shortcuts="true"
        placeholder="选择日期"
      />
      <div style="margin-top: 8px; color: #999; font-size: 13px;">
        已选择：{{ date1 || '未选择' }}
      </div>
    </div>
    
    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">默认快捷选项（范围）</div>
      <XDateTimePicker 
        v-model="dateRange" 
        mode="date"
        range
        :show-shortcuts="true"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
      <div style="margin-top: 8px; color: #999; font-size: 13px;">
        已选择：{{ rangeDisplay }}
      </div>
    </div>
    
    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">自定义快捷选项</div>
      <XDateTimePicker 
        v-model="date2" 
        mode="date"
        :shortcuts="customShortcuts"
        placeholder="选择日期"
      />
      <div style="margin-top: 8px; color: #999; font-size: 13px;">
        已选择：{{ date2 || '未选择' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const date1 = ref(null)
const date2 = ref(null)
const dateRange = ref(null)

const rangeDisplay = computed(() => {
  if (!dateRange.value || !Array.isArray(dateRange.value)) return '未选择'
  const [start, end] = dateRange.value
  return `${start} 至 ${end}`
})

const customShortcuts = [
  {
    text: '今天',
    icon: 'mdi:calendar-today',
    value: () => new Date()
  },
  {
    text: '明天',
    icon: 'mdi:calendar-arrow-right',
    value: () => {
      const date = new Date()
      date.setDate(date.getDate() + 1)
      return date
    }
  },
  {
    text: '一周后',
    icon: 'mdi:calendar-week',
    value: () => {
      const date = new Date()
      date.setDate(date.getDate() + 7)
      return date
    }
  },
  {
    text: '一个月后',
    icon: 'mdi:calendar-month',
    value: () => {
      const date = new Date()
      date.setMonth(date.getMonth() + 1)
      return date
    }
  }
]
</script>
```

:::

## 时间精度

通过 `show-seconds` 属性控制是否显示秒。

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">不显示秒（默认）</div>
      <XDateTimePicker 
        v-model="time1" 
        mode="time"
        :show-seconds="false"
        placeholder="选择时间（时:分）"
      />
      <div style="margin-top: 8px; color: #999; font-size: 13px;">
        已选择：{{ time1 || '未选择' }}
      </div>
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">显示秒</div>
      <XDateTimePicker 
        v-model="time2" 
        mode="time"
        :show-seconds="true"
        placeholder="选择时间（时:分:秒）"
      />
      <div style="margin-top: 8px; color: #999; font-size: 13px;">
        已选择：{{ time2 || '未选择' }}
      </div>
    </div>
    
    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">日期时间（含秒）</div>
      <XDateTimePicker 
        v-model="datetime" 
        mode="datetime"
        :show-seconds="true"
        placeholder="选择日期时间"
      />
      <div style="margin-top: 8px; color: #999; font-size: 13px;">
        已选择：{{ datetime || '未选择' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const time1 = ref(null)
const time2 = ref(null)
const datetime = ref(null)
</script>
```

:::

## 日期限制

通过 `min-date` 和 `max-date` 限制可选日期范围。

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">限制最小日期</div>
      <XDateTimePicker 
        v-model="date1" 
        mode="date" 
        :min-date="minDate"
        placeholder="只能选择今天及以后"
      />
      <div style="margin-top: 8px; color: #999; font-size: 13px;">
        最小日期：{{ minDateDisplay }}
      </div>
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">限制最大日期</div>
      <XDateTimePicker 
        v-model="date2" 
        mode="date"
        :max-date="maxDate"
        placeholder="只能选择今天及以前"
      />
      <div style="margin-top: 8px; color: #999; font-size: 13px;">
        最大日期：{{ maxDateDisplay }}
    </div>
  </div>

    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">限制日期范围</div>
      <XDateTimePicker 
        v-model="date3" 
        mode="date"
        :min-date="rangeMinDate"
        :max-date="rangeMaxDate"
        placeholder="只能选择未来30天内"
      />
      <div style="margin-top: 8px; color: #999; font-size: 13px;">
        可选范围：{{ rangeMinDateDisplay }} 至 {{ rangeMaxDateDisplay }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDateTime } from '@xlui/xux-ui'

const date1 = ref(null)
const date2 = ref(null)
const date3 = ref(null)

const { format, create } = useDateTime()

const minDate = new Date()
const maxDate = new Date()

const rangeMinDate = new Date()
const rangeMaxDate = new Date()
rangeMaxDate.setDate(rangeMaxDate.getDate() + 30)

const minDateDisplay = computed(() => format(create(minDate), 'YYYY-MM-DD'))
const maxDateDisplay = computed(() => format(create(maxDate), 'YYYY-MM-DD'))
const rangeMinDateDisplay = computed(() => format(create(rangeMinDate), 'YYYY-MM-DD'))
const rangeMaxDateDisplay = computed(() => format(create(rangeMaxDate), 'YYYY-MM-DD'))
</script>
```

:::

## 禁用状态

通过 `disabled` 属性禁用选择器。

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">禁用状态（有值）</div>
      <XDateTimePicker 
        v-model="date1" 
        mode="datetime"
        disabled
        placeholder="禁用的选择器"
      />
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">禁用状态（无值）</div>
      <XDateTimePicker 
        v-model="date2" 
        mode="datetime"
        disabled
        placeholder="禁用的选择器"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDateTime } from '@xlui/xux-ui'

const { format, create } = useDateTime()

const date1 = ref(format(create(), 'YYYY-MM-DD HH:mm'))
const date2 = ref(null)
</script>
```

:::

## 事件监听

监听选择器的各种事件。

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <XDateTimePicker 
        v-model="date" 
        mode="datetime"
        placeholder="请选择日期时间"
        @change="handleChange"
        @open="handleOpen"
        @close="handleClose"
      />
    </div>

    <div style="padding: 12px; background: #f5f5f5; border-radius: 4px; font-size: 13px;">
      <div style="color: #666; margin-bottom: 8px;">事件日志：</div>
      <div 
        v-for="(log, index) in logs" 
        :key="index"
        style="padding: 4px 0; color: #333; border-bottom: 1px solid #e5e5e5;"
      >
        <span style="color: #1a1a1a; font-weight: 600;">{{ log.time }}</span>
        <span style="margin: 0 8px; color: #999;">|</span>
        <span style="color: #3b82f6;">{{ log.event }}</span>
        <span v-if="log.value" style="margin-left: 8px; color: #666;">
          → {{ log.value }}
        </span>
      </div>
      <div v-if="logs.length === 0" style="color: #999; padding: 8px 0;">
        暂无事件日志
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDateTime } from '@xlui/xux-ui'

const date = ref(null)
const logs = ref([])

const { format, create } = useDateTime()

const addLog = (event, value = '') => {
  const time = format(create(), 'HH:mm:ss')
  logs.value.unshift({ time, event, value })
  if (logs.value.length > 5) {
    logs.value.pop()
  }
}

const handleChange = (value) => {
  addLog('change', typeof value === 'string' ? value : JSON.stringify(value))
}

const handleOpen = () => {
  addLog('open')
}

const handleClose = () => {
  addLog('close')
}
</script>
```

:::

## DateTime 工具函数

配套的 `useDateTime` composable 提供了丰富的日期时间处理功能。

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div>
      <h4 style="margin: 0 0 12px 0; color: #333; font-size: 15px;">格式化</h4>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
        <div>
          <div style="color: #666; font-size: 13px; margin-bottom: 4px;">标准日期：</div>
          <div style="color: #1a1a1a; font-weight: 500;">{{ formattedDate }}</div>
        </div>
        <div>
          <div style="color: #666; font-size: 13px; margin-bottom: 4px;">标准时间：</div>
          <div style="color: #1a1a1a; font-weight: 500;">{{ formattedTime }}</div>
        </div>
        <div>
          <div style="color: #666; font-size: 13px; margin-bottom: 4px;">日期时间：</div>
          <div style="color: #1a1a1a; font-weight: 500;">{{ formattedDateTime }}</div>
        </div>
        <div>
          <div style="color: #666; font-size: 13px; margin-bottom: 4px;">时间戳：</div>
          <div style="color: #1a1a1a; font-weight: 500;">{{ timestamp }}</div>
        </div>
    </div>
  </div>

    <div>
      <h4 style="margin: 0 0 12px 0; color: #333; font-size: 15px;">相对时间</h4>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
        <div>
          <div style="color: #666; font-size: 13px; margin-bottom: 4px;">从现在开始：</div>
          <div style="color: #3b82f6; font-weight: 500;">{{ relativeTime }}</div>
        </div>
        <div>
          <div style="color: #666; font-size: 13px; margin-bottom: 4px;">人性化差值：</div>
          <div style="color: #3b82f6; font-weight: 500;">{{ humanized }}</div>
        </div>
      </div>
    </div>

    <div>
      <h4 style="margin: 0 0 12px 0; color: #333; font-size: 15px;">计算</h4>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
        <div>
          <div style="color: #666; font-size: 13px; margin-bottom: 4px;">7天后：</div>
          <div style="color: #1a1a1a; font-weight: 500;">{{ sevenDaysLater }}</div>
        </div>
        <div>
          <div style="color: #666; font-size: 13px; margin-bottom: 4px;">30天前：</div>
          <div style="color: #1a1a1a; font-weight: 500;">{{ thirtyDaysAgo }}</div>
        </div>
        <div>
          <div style="color: #666; font-size: 13px; margin-bottom: 4px;">本月开始：</div>
          <div style="color: #1a1a1a; font-weight: 500;">{{ monthStart }}</div>
        </div>
        <div>
          <div style="color: #666; font-size: 13px; margin-bottom: 4px;">本月结束：</div>
          <div style="color: #1a1a1a; font-weight: 500;">{{ monthEnd }}</div>
        </div>
      </div>
    </div>

    <div>
      <h4 style="margin: 0 0 12px 0; color: #333; font-size: 15px;">比较</h4>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
        <div>
          <div style="color: #666; font-size: 13px; margin-bottom: 4px;">是否是今天：</div>
          <div :style="{ color: isToday ? '#10b981' : '#ef4444', fontWeight: 500 }">
            {{ isToday ? '✓ 是' : '✗ 否' }}
          </div>
        </div>
        <div>
          <div style="color: #666; font-size: 13px; margin-bottom: 4px;">是否在未来：</div>
          <div :style="{ color: isAfterNow ? '#10b981' : '#ef4444', fontWeight: 500 }">
            {{ isAfterNow ? '✓ 是' : '✗ 否' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useDateTime } from '@xlui/xux-ui'

const { 
  format, 
  create, 
  add, 
  subtract, 
  startOf, 
  endOf,
  fromNow,
  humanizeDiff,
  isSame,
  isAfter,
  getCurrent
} = useDateTime()

const now = ref(create())

const formattedDate = computed(() => format(now.value, 'YYYY-MM-DD'))
const formattedTime = computed(() => format(now.value, 'HH:mm:ss'))
const formattedDateTime = computed(() => format(now.value, 'YYYY-MM-DD HH:mm:ss'))
const timestamp = computed(() => format(now.value, 'X'))

const relativeTime = computed(() => {
  const future = add(now.value, 2, 'hour')
  return fromNow(future)
})

const humanized = computed(() => {
  const past = subtract(now.value, 30, 'minute')
  return humanizeDiff(past, now.value)
})

const sevenDaysLater = computed(() => {
  const date = add(now.value, 7, 'day')
  return format(date, 'YYYY-MM-DD')
})

const thirtyDaysAgo = computed(() => {
  const date = subtract(now.value, 30, 'day')
  return format(date, 'YYYY-MM-DD')
})

const monthStart = computed(() => {
  const date = startOf(now.value, 'month')
  return format(date, 'YYYY-MM-DD')
})

const monthEnd = computed(() => {
  const date = endOf(now.value, 'month')
  return format(date, 'YYYY-MM-DD')
})

const isToday = computed(() => isSame(now.value, create(), 'day'))
const isAfterNow = computed(() => isAfter(now.value, create()))

let timer = null
onMounted(() => {
  timer = setInterval(() => {
    now.value = getCurrent()
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
```

:::

## API

### DateTimePicker Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `Date \| string \| null \| [Date, Date] \| [string, string]` | `null` |
| mode | 选择模式 | `'date' \| 'time' \| 'datetime'` | `'datetime'` |
| range | 是否为范围选择 | `boolean` | `false` |
| size | 组件尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| disabled | 是否禁用 | `boolean` | `false` |
| placeholder | 占位符 | `string` | `'请选择日期时间'` |
| startPlaceholder | 开始日期占位符（范围选择） | `string` | `'开始日期'` |
| endPlaceholder | 结束日期占位符（范围选择） | `string` | `'结束日期'` |
| title | 面板标题 | `string` | `'选择日期时间'` |
| showSeconds | 是否显示秒 | `boolean` | `false` |
| minDate | 最小可选日期 | `Date \| string` | - |
| maxDate | 最大可选日期 | `Date \| string` | - |
| dateFormat | 日期格式 | `string` | `'YYYY-MM-DD'` |
| timeFormat | 时间格式 | `'12' \| '24'` | `'24'` |
| showToday | 是否显示今天按钮 | `boolean` | `true` |
| showClear | 是否显示清空按钮 | `boolean` | `true` |
| locale | 语言 | `'zh-CN' \| 'en-US'` | `'zh-CN'` |
| showShortcuts | 是否显示快捷选择 | `boolean` | `true` |
| shortcuts | 自定义快捷选项 | `ShortcutOption[]` | - |

### ShortcutOption

```ts
interface ShortcutOption {
  text: string
  value: () => Date | [Date, Date]
  icon?: string
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值变化时触发 | `value: string \| null \| [string, string]` |
| change | 值变化时触发 | `value: string \| null \| [string, string]` |
| open | 打开面板时触发 | - |
| close | 关闭面板时触发 | - |

### useDateTime

日期时间处理工具函数。

#### 配置选项

```ts
interface DateTimeOptions {
  timezone?: string        // 时区，默认 'Asia/Shanghai'
  locale?: string          // 语言，默认 'zh-cn'
  defaultFormat?: string   // 默认格式，默认 'YYYY-MM-DD HH:mm:ss'
  parseStrict?: boolean    // 解析是否严格，默认 false
  weekStart?: 0 | 1       // 周起始，0 周日，1 周一
}
```

#### 基础方法

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| now | 当前时间（响应式） | - | `Ref<Dayjs>` |
| getCurrent | 获取当前时间 | - | `Dayjs` |
| format | 格式化日期时间 | `(value, format?)` | `string` |
| parse | 解析日期时间 | `(value, format?)` | `Dayjs` |
| create | 创建日期时间实例 | `(value?)` | `Dayjs` |

#### 比较方法

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| isSame | 是否相同 | `(a, b, unit?)` | `boolean` |
| isAfter | 是否在之后 | `(a, b, unit?)` | `boolean` |
| isBefore | 是否在之前 | `(a, b, unit?)` | `boolean` |
| isSameOrAfter | 是否相同或在之后 | `(a, b, unit?)` | `boolean` |
| isSameOrBefore | 是否相同或在之前 | `(a, b, unit?)` | `boolean` |
| isBetween | 是否在区间内 | `(value, start, end, unit?, inclusivity?)` | `boolean` |

#### 计算方法

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| add | 增加时间 | `(value, amount, unit)` | `Dayjs` |
| subtract | 减少时间 | `(value, amount, unit)` | `Dayjs` |
| diff | 计算差值 | `(a, b, unit?, float?)` | `number` |
| startOf | 开始时间 | `(value, unit)` | `Dayjs` |
| endOf | 结束时间 | `(value, unit)` | `Dayjs` |

#### 相对时间方法

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| fromNow | 从现在开始的相对时间 | `(value)` | `string` |
| toNow | 到现在的相对时间 | `(value)` | `string` |
| from | 从指定时间的相对时间 | `(a, b)` | `string` |
| to | 到指定时间的相对时间 | `(a, b)` | `string` |
| humanizeDiff | 人性化差值 | `(a, b?, unit?)` | `string` |

#### 日历方法

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| getCalendarDates | 获取日历日期 | `(year, month, selected?, min?, max?)` | `CalendarDate[]` |
| getMonthInfo | 获取月份信息 | `(year, month)` | `MonthInfo` |
| getTimeRanges | 获取时间范围（今天、本周、本月等） | - | `TimeRanges` |

#### 常用格式

```ts
const formats = {
  date: 'YYYY-MM-DD',
  time: 'HH:mm:ss',
  datetime: 'YYYY-MM-DD HH:mm:ss',
  dateTime: 'YYYY-MM-DD HH:mm',
  month: 'YYYY-MM',
  year: 'YYYY',
  timestamp: 'X',
  iso: 'YYYY-MM-DDTHH:mm:ssZ'
}
```

## 样式变量

组件使用 CSS 变量，可通过覆盖变量自定义样式：

```css
.x-datetime-picker {
  /* 边框颜色 */
  --datetime-border-color: #e5e7eb;
  --datetime-border-hover-color: #1a1a1a;
  --datetime-border-focus-color: #1a1a1a;
  
  /* 背景颜色 */
  --datetime-bg-color: #ffffff;
  --datetime-bg-disabled-color: #f9fafb;
  
  /* 文字颜色 */
  --datetime-text-color: #1a1a1a;
  --datetime-text-disabled-color: #9ca3af;
  --datetime-placeholder-color: #9ca3af;
  
  /* 面板颜色 */
  --datetime-panel-bg: #ffffff;
  --datetime-panel-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  
  /* 选中颜色 */
  --datetime-selected-bg: #3b82f6;
  --datetime-selected-text: #ffffff;
  
  /* 今天颜色 */
  --datetime-today-color: #3b82f6;
  
  /* 范围颜色 */
  --datetime-range-bg: rgba(26, 26, 26, 0.08);
}
```

## 最佳实践

### 1. 合理选择模式

根据实际需求选择合适的模式：

- **date**：只需要日期，不需要时间（如生日、活动日期）
- **time**：只需要时间，不需要日期（如营业时间、定时任务）
- **datetime**：需要完整的日期时间（如预约时间、发布时间）

### 2. 使用日期限制

为了避免用户选择无效日期，建议合理设置 `minDate` 和 `maxDate`：

```vue
<!-- 只能选择未来日期 -->
<XDateTimePicker 
  v-model="date" 
  :min-date="new Date()"
/>

<!-- 只能选择过去日期 -->
<XDateTimePicker 
  v-model="date" 
  :max-date="new Date()"
/>
```

### 3. 提供快捷选项

对于常用的日期范围，提供快捷选项可以大大提升用户体验：

```vue
<XDateTimePicker 
  v-model="dateRange" 
  range
  :shortcuts="[
    { text: '最近7天', value: () => [sevenDaysAgo, today] },
    { text: '最近30天', value: () => [thirtyDaysAgo, today] },
    { text: '最近90天', value: () => [ninetyDaysAgo, today] }
  ]"
/>
```

### 4. 时区处理

如果应用涉及多时区，使用 `useDateTime` 的时区功能：

```ts
const { format, create } = useDateTime({
  timezone: 'America/New_York'
})
```

## 常见问题

### 如何获取时间戳？

```ts
const { format, create } = useDateTime()
const timestamp = format(create(), 'X') // Unix 时间戳（秒）
```

### 如何自定义日期格式？

```vue
<XDateTimePicker 
  v-model="date" 
  date-format="YYYY年MM月DD日"
/>
```

### 如何禁用特定日期？

目前组件通过 `minDate` 和 `maxDate` 限制日期范围。如果需要更复杂的禁用逻辑，建议在 `change` 事件中进行验证。

### 范围选择如何限制最大跨度？

```ts
const handleChange = (value) => {
  if (Array.isArray(value)) {
    const [start, end] = value
    const { diff } = useDateTime()
    const days = diff(end, start, 'day')
    
    if (days > 90) {
      xlMsg.error('最多只能选择90天')
      date.value = null
    }
  }
}
```

