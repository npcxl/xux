# 时间处理函数

基于 dayjs 的时间处理 Composable 函数，提供丰富的时间操作和格式化功能。

## 快速开始

:::demo

```vue
<template>
  <div class="datetime-demo">
    <div class="demo-item">
      <h4>当前时间（实时）</h4>
      <p class="time-display">{{ now.format('YYYY-MM-DD HH:mm:ss') }}</p>
    </div>
    <div class="demo-item">
      <h4>格式化时间</h4>
      <p>{{ format(new Date(), 'YYYY年MM月DD日') }}</p>
    </div>
    <div class="demo-item">
      <h4>相对时间</h4>
      <p>{{ fromNow(new Date(Date.now() - 2 * 60 * 60 * 1000)) }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useDateTime } from '@xlui/xux-ui'

const { now, format, fromNow, updateNow } = useDateTime()

let timer = null

onMounted(() => {
  // 每秒更新当前时间
  timer = setInterval(() => {
    updateNow()
  }, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped>
.datetime-demo {
  display: flex;
  gap: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 0.5rem;
}

.demo-item {
  flex: 1;
  text-align: center;
}

.demo-item h4 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 0.9rem;
}

.demo-item p {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
  color: #007bff;
}

.time-display {
  font-family: monospace;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
</style>
```

:::

## 主要功能

### useDateTime - 基础时间处理

```javascript
import { useDateTime } from '@xlui/xux-ui'

const { 
  format,           // 格式化时间
  create,           // 创建时间对象
  isSame,           // 比较时间
  add,              // 时间加法
  subtract,         // 时间减法
  diff,             // 计算时间差
  fromNow,          // 相对时间
  getCalendarDates  // 获取日历日期
} = useDateTime()

// 基础用法
const date = create('2024-01-15')
format(date, 'YYYY-MM-DD')        // "2024-01-15"
add(date, 1, 'day')               // 2024-01-16
isSame(date, '2024-01-15', 'day') // true
```

### useDateRange - 时间范围选择

:::demo

```vue
<template>
  <div class="daterange-demo">
    <div class="range-inputs">
      <XDateTimePicker 
        v-model="startDate" 
        mode="date" 
        placeholder="开始日期"
        @change="handleStartChange"
      />
      <span>至</span>
      <XDateTimePicker 
        v-model="endDate" 
        mode="date" 
        placeholder="结束日期"
        @change="handleEndChange"
      />
    </div>
    
    <div class="range-info">
      <p v-if="!isValidRange" class="error">请选择有效的时间范围</p>
      <p v-else class="success">
        选择范围: {{ range.start.format('YYYY-MM-DD') }} - {{ range.end.format('YYYY-MM-DD') }}
        <br>
        持续天数: {{ rangeDuration }} 天
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XDateTimePicker, useDateRange } from '@xlui/xux-ui'

const { range, setRange, isValidRange, rangeDuration } = useDateRange()
const startDate = ref('')
const endDate = ref('')

const handleStartChange = (date) => {
  startDate.value = date
  setRange(date, endDate.value)
}

const handleEndChange = (date) => {
  endDate.value = date
  setRange(startDate.value, date)
}
</script>

<style scoped>
.daterange-demo {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 0.5rem;
}

.range-inputs {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.range-inputs span {
  color: #666;
  font-weight: 500;
}

.range-info {
  text-align: center;
}

.error {
  color: #dc3545;
  margin: 0;
}

.success {
  color: #28a745;
  margin: 0;
}
</style>
```

:::

```javascript
import { useDateRange } from '@xlui/xux-ui'

const { 
  range,           // 当前时间范围
  setRange,        // 设置时间范围
  isValidRange,    // 验证范围有效性
  rangeDuration    // 范围持续时间
} = useDateRange()

// 设置时间范围
setRange('2024-01-01', '2024-01-31')
console.log(rangeDuration.value) // 30 (天)
```

### useCountdown - 倒计时功能

:::demo

```vue
<template>
  <div class="countdown-demo">
    <div class="countdown-item">
      <h4>限时优惠倒计时</h4>
      <div class="countdown-display">
        {{ promotionCountdown.formatDuration('HH:mm:ss') }}
      </div>
      <p v-if="promotionCountdown.isExpired.value" class="expired">优惠已结束</p>
      <p v-else class="active">优惠进行中</p>
    </div>
    
    <div class="countdown-item">
      <h4>活动倒计时</h4>
      <div class="countdown-display">
        {{ eventCountdown.formatDuration('HH小时mm分钟ss秒') }}
      </div>
      <p v-if="eventCountdown.isExpired.value" class="expired">活动已结束</p>
      <p v-else class="active">活动进行中</p>
    </div>
    
    <div class="countdown-item">
      <h4>活动结束倒计时</h4>
      <div class="countdown-display">
        {{ newYearCountdown.formatDuration('HH小时mm分钟ss秒') }}
      </div>
      <p v-if="newYearCountdown.isExpired.value" class="expired">活动已结束</p>
      <p v-else class="active">活动进行中</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useCountdown } from '@xlui/xux-ui'

// 限时优惠：24小时后结束
const promotionEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000)
const promotionCountdown = useCountdown(promotionEndTime)

// 活动倒计时：3小时后结束
const eventEndTime = new Date(Date.now() + 3 * 60 * 60 * 1000)
const eventCountdown = useCountdown(eventEndTime)

// 新年倒计时：2小时后
const newYearTime = new Date(Date.now() + 2 * 60 * 60 * 1000)
const newYearCountdown = useCountdown(newYearTime)

let timer = null

onMounted(() => {
  // 每秒更新所有倒计时
  timer = setInterval(() => {
    promotionCountdown.updateNow()
    eventCountdown.updateNow()
    newYearCountdown.updateNow()
  }, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped>
.countdown-demo {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 0.5rem;
}

.countdown-item {
  flex: 1;
  text-align: center;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.countdown-item:hover {
  transform: translateY(-2px);
}

.countdown-item h4 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 0.9rem;
}

.countdown-display {
  font-size: 1.2rem;
  font-weight: bold;
  color: #007bff;
  font-family: monospace;
  margin-bottom: 0.5rem;
  animation: pulse 2s infinite;
}

.expired {
  color: #dc3545;
  margin: 0;
  font-weight: 500;
}

.active {
  color: #28a745;
  margin: 0;
  font-weight: 500;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}
</style>
```

:::

```javascript
import { useCountdown } from '@xlui/xux-ui'

// 目标时间：1小时后
const targetDate = new Date(Date.now() + 60 * 60 * 1000)
const { 
  formatDuration,  // 格式化倒计时
  isExpired,       // 是否已过期
  parts            // 时间部分
} = useCountdown(targetDate)

formatDuration('HH:mm:ss')  // "01:00:00"
parts.value.hours          // 1
```

## 与 DateTimePicker 结合使用

:::demo

```vue
<template>
  <div class="datetime-example h-[600px]">
    <div class="picker-group">
      <h4>日期选择器</h4>
      <XDateTimePicker 
        v-model="selectedDate" 
        mode="date" 
        placeholder="选择日期"
        @change="handleDateChange"
      />
      <p class="result">选择结果: {{ selectedDate || '未选择' }}</p>
    </div>
    
    <div class="picker-group">
      <h4>时间选择器</h4>
      <XDateTimePicker 
        v-model="selectedTime" 
        mode="time" 
        placeholder="选择时间"
        @change="handleTimeChange"
      />
      <p class="result">选择结果: {{ selectedTime || '未选择' }}</p>
    </div>
    
    <div class="picker-group">
      <h4>日期时间选择器</h4>
      <XDateTimePicker 
        v-model="selectedDateTime" 
        mode="datetime" 
        placeholder="选择日期时间"
        @change="handleDateTimeChange"
      />
      <p class="result">选择结果: {{ selectedDateTime || '未选择' }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XDateTimePicker } from '@xlui/xux-ui'

const selectedDate = ref('')
const selectedTime = ref('')
const selectedDateTime = ref('')

const handleDateChange = (value) => {
  console.log('选择的日期:', value) // "2024-01-15"
}

const handleTimeChange = (value) => {
  console.log('选择的时间:', value) // "14:30:25"
}

const handleDateTimeChange = (value) => {
  console.log('选择的日期时间:', value) // "2024-01-15 14:30:25"
}
</script>

<style scoped>
.datetime-example {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 0.5rem;
}

.picker-group {
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.picker-group h4 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1rem;
}

.result {
  margin: 0.5rem 0 0 0;
  font-size: 0.9rem;
  color: #666;
  font-family: monospace;
}
</style>
```

:::

## 实际应用场景

### 报表时间范围选择

```vue
<template>
  <div class="report-system">
    <XDateTimePicker 
      v-model="startDate" 
      mode="date" 
      placeholder="开始日期"
      @change="handleStartChange"
    />
    <XDateTimePicker 
      v-model="endDate" 
      mode="date" 
      placeholder="结束日期"
      @change="handleEndChange"
    />
    
    <button @click="generateReport" :disabled="!isValidRange">
      生成报表
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XDateTimePicker, useDateRange } from '@xlui/xux-ui'

const { setRange, isValidRange, rangeDuration } = useDateRange()
const startDate = ref('')
const endDate = ref('')

const handleStartChange = (date) => {
  startDate.value = date
  setRange(date, endDate.value)
}

const handleEndChange = (date) => {
  endDate.value = date
  setRange(startDate.value, date)
}

const generateReport = () => {
  if (isValidRange.value) {
    console.log('生成报表，时间范围:', rangeDuration.value, '天')
  }
}
</script>
```

### 活动倒计时

```vue
<template>
  <div class="countdown">
    <h3>活动倒计时</h3>
    <div class="countdown-display">
      {{ formatDuration('HH:mm:ss') }}
    </div>
    <p v-if="isExpired">活动已结束</p>
  </div>
</template>

<script setup>
import { useCountdown } from '@xlui/xux-ui'

// 活动结束时间
const endTime = '2025-12-31 23:59:59'
const { formatDuration, isExpired } = useCountdown(endTime)
</script>
```

## 配置选项

```javascript
import { useDateTime } from '@xlui/xux-ui'

const { format } = useDateTime({
  timezone: 'Asia/Shanghai',           // 时区设置
  locale: 'zh-cn',                    // 语言设置
  defaultFormat: 'YYYY-MM-DD HH:mm:ss' // 默认格式
})
```

## 预设格式

```javascript
const { formats } = useDateTime()

formats.date        // 'YYYY-MM-DD'
formats.time        // 'HH:mm:ss'
formats.datetime    // 'YYYY-MM-DD HH:mm:ss'
formats.dateTime    // 'YYYY-MM-DD HH:mm'
formats.month       // 'YYYY-MM'
formats.year        // 'YYYY'
```

## 注意事项

1. **时区处理**: 默认使用 'Asia/Shanghai' 时区
2. **语言设置**: 默认使用中文，支持 dayjs 的所有语言包
3. **性能优化**: 使用 computed 缓存计算结果
4. **类型安全**: 完整的 TypeScript 类型定义
5. **响应式**: 基于 Vue 3 的响应式系统

## API 参考

### useDateTime(options?)

| 方法 | 说明 |
|------|------|
| format(date, format?) | 格式化时间 |
| create(date?) | 创建时间对象 |
| isSame(a, b, unit?) | 比较时间是否相同 |
| add(date, amount, unit) | 时间加法 |
| subtract(date, amount, unit) | 时间减法 |
| diff(a, b, unit?) | 计算时间差 |
| fromNow(date) | 相对时间显示 |
| getCalendarDates(year, month, ...) | 获取日历日期 |

### useDateRange(initialRange?)

| 属性/方法 | 说明 |
|-----------|------|
| range | 当前时间范围 |
| setRange(start, end) | 设置时间范围 |
| isValidRange | 是否有效范围 |
| rangeDuration | 范围持续时间 |

### useCountdown(targetDate)

| 属性/方法 | 说明 |
|-----------|------|
| formatDuration(format?) | 格式化倒计时 |
| isExpired | 是否已过期 |
| parts | 时间部分对象 |
| updateNow() | 更新当前时间 |

## 贡献者

<div class="contributors">
  <div class="contributor-item">
    <a href="https://gitee.com/leheya" target="_blank" rel="noopener noreferrer">
      <img 
        src="https://foruda.gitee.com/avatar/1751620424517657404/10604783_leheya_1751620424.png!avatar200" 
        alt="leheya"
        class="contributor-avatar"
      />
      <span class="contributor-name">无敌暴龙神</span>
    </a>
  </div>
  <!-- <div class="contributor-item">
    <a href="https://gitee.com/haijun-li" target="_blank" rel="noopener noreferrer">
      <img 
        src="https://p3.itc.cn/images01/20230307/e9d72e3788844ed1a9259e442899e1bd.png" 
        alt="lihaijun"
        class="contributor-avatar"
      />
      <span class="contributor-name">lihaijun</span>
    </a>
  </div> -->
</div>

<style scoped>
.contributors {
  display: flex;
  gap: 24px;
  margin: 24px 0;
  flex-wrap: wrap;
}

.contributor-item a {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease;
}

.contributor-item a:hover {
  transform: translateY(-2px);
}

.contributor-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid var(--vp-c-border);
  transition: border-color 0.2s ease;
  object-fit: cover;
}

.contributor-item a:hover .contributor-avatar {
  border-color: var(--vp-c-brand-1);
}

.contributor-name {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color 0.2s ease;
}

.contributor-item a:hover .contributor-name {
  color: var(--vp-c-brand-1);
}

@media (max-width: 768px) {
  .contributors {
    gap: 16px;
  }
  
  .contributor-avatar {
    width: 60px;
    height: 60px;
  }
  
  .contributor-name {
    font-size: 12px;
  }
}
</style>