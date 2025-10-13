# DateTimePicker 日期时间选择器

功能丰富的日期时间选择组件，支持日期、时间、日期时间三种模式，完美适配移动端。

## 基础用法

:::demo

```vue
<template>
  <div class="demo-container h-[600px]">
    <div class="demo-item">
      <h4>日期时间选择</h4>
      <XDateTimePicker v-model="datetime" mode="datetime" />
      <div class="demo-result">选择结果: {{ datetime }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XDateTimePicker } from '@xlui/xux-ui'

const datetime = ref(new Date())
</script>
```

:::

## 选择模式

支持三种选择模式：日期、时间、日期时间。

:::demo

```vue
<template>
  <div class="demo-container">
    <div class="demo-item">
      <h4>日期选择</h4>
      <XDateTimePicker v-model="date" mode="date" placeholder="请选择日期" />
      <div class="demo-result">选择结果: {{ date }}</div>
    </div>
    
    <div class="demo-item">
      <h4>时间选择</h4>
      <XDateTimePicker v-model="time" mode="time" placeholder="请选择时间" />
      <div class="demo-result">选择结果: {{ time }}</div>
    </div>
    
    <div class="demo-item">
      <h4>日期时间选择</h4>
      <XDateTimePicker v-model="datetime" mode="datetime" placeholder="请选择日期时间" />
      <div class="demo-result">选择结果: {{ datetime }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XDateTimePicker } from '@xlui/xux-ui'

const date = ref(new Date())
const time = ref(new Date())
const datetime = ref(new Date())
</script>
```

:::

## 尺寸变体

提供三种尺寸：小、中、大。

:::demo

```vue
<template>
  <div class="demo-container">
    <div class="demo-item">
      <h4>小尺寸</h4>
      <XDateTimePicker v-model="value1" size="small" mode="datetime" />
    </div>
    
    <div class="demo-item">
      <h4>中等尺寸（默认）</h4>
      <XDateTimePicker v-model="value2" size="medium" mode="datetime" />
    </div>
    
    <div class="demo-item">
      <h4>大尺寸</h4>
      <XDateTimePicker v-model="value3" size="large" mode="datetime" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XDateTimePicker } from '@xlui/xux-ui'

const value1 = ref(new Date())
const value2 = ref(new Date())
const value3 = ref(new Date())
</script>
```

:::

## 显示秒数

时间选择器可以显示秒数选择。

:::demo

```vue
<template>
  <div class="demo-container">
    <div class="demo-item">
      <h4>不显示秒数（默认）</h4>
      <XDateTimePicker v-model="time1" mode="time" />
    </div>
    
    <div class="demo-item">
      <h4>显示秒数</h4>
      <XDateTimePicker v-model="time2" mode="time" :show-seconds="true" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XDateTimePicker } from '@xlui/xux-ui'

const time1 = ref(new Date())
const time2 = ref(new Date())
</script>
```

:::

## 日期范围限制

可以设置最小和最大日期来限制选择范围。

:::demo

```vue
<template>
  <div class="demo-container">
    <div class="demo-item">
      <h4>限制日期范围</h4>
      <XDateTimePicker 
        v-model="date" 
        mode="date" 
        :min-date="minDate"
        :max-date="maxDate"
        placeholder="选择2024年的日期"
      />
      <div class="demo-result">选择结果: {{ date }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XDateTimePicker } from '@xlui/xux-ui'

const date = ref(new Date())
const minDate = new Date('2024-01-01')
const maxDate = new Date('2024-12-31')
</script>
```

:::

## 自定义标题和占位符

可以自定义选择器的标题和输入框占位符。

:::demo

```vue
<template>
  <div class="demo-container">
    <div class="demo-item">
      <h4>自定义标题和占位符</h4>
      <XDateTimePicker 
        v-model="datetime" 
        mode="datetime"
        title="选择会议时间"
        placeholder="请选择会议开始时间"
      />
      <div class="demo-result">选择结果: {{ datetime }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XDateTimePicker } from '@xlui/xux-ui'

const datetime = ref(new Date())
</script>
```

:::

## 禁用状态

可以禁用日期时间选择器。

:::demo

```vue
<template>
  <div class="demo-container">
    <div class="demo-item">
      <h4>禁用状态</h4>
      <XDateTimePicker v-model="datetime" mode="datetime" :disabled="true" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XDateTimePicker } from '@xlui/xux-ui'

const datetime = ref(new Date())
</script>
```

:::

## 事件监听

可以监听选择器的打开、关闭和值变化事件。

:::demo

```vue
<template>
  <div class="demo-container">
    <div class="demo-item">
      <h4>事件监听</h4>
      <XDateTimePicker 
        v-model="datetime" 
        mode="datetime"
        @open="handleOpen"
        @close="handleClose"
        @change="handleChange"
      />
      <div class="demo-result">
        <p>选择结果: {{ datetime }}</p>
        <p>事件日志: {{ eventLog }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XDateTimePicker } from '@xlui/xux-ui'

const datetime = ref(new Date())
const eventLog = ref('')

const handleOpen = () => {
  eventLog.value = '选择器已打开'
}

const handleClose = () => {
  eventLog.value = '选择器已关闭'
}

const handleChange = (value) => {
  eventLog.value = `值已改变: ${value}`
}
</script>
```

:::

## 移动端适配

组件完美适配移动端，在移动设备上会以下拉/上拉浮动区域形式显示。

:::demo

```vue
<template>
  <div class="demo-container">
    <div class="demo-item">
      <h4>移动端适配</h4>
      <p>在移动设备上，选择器会以下拉/上拉浮动区域形式显示，提供更好的用户体验。</p>
      <XDateTimePicker v-model="datetime" mode="datetime" />
      <div class="demo-result">选择结果: {{ datetime }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XDateTimePicker } from '@xlui/xux-ui'

const datetime = ref(new Date())
</script>
```

:::

## 与 useDateTime 结合使用

组件内部集成了 `useDateTime` composable，你也可以单独使用它来处理时间相关的逻辑。

:::demo

```vue
<template>
  <div class="demo-container">
    <div class="demo-item">
      <h4>结合 useDateTime 使用</h4>
      <XDateTimePicker v-model="datetime" mode="datetime" />
      <div class="demo-result">
        <p>选择结果: {{ datetime }}</p>
        <p>格式化显示: {{ formatDateTime }}</p>
        <p>相对时间: {{ relativeTime }}</p>
        <p>是否今天: {{ isToday ? '是' : '否' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { XDateTimePicker, useDateTime } from '@xlui/xux-ui'

const datetime = ref(new Date())
const { format, fromNow, isSame } = useDateTime()

const formatDateTime = computed(() => {
  return datetime.value ? format(datetime.value, 'YYYY年MM月DD日 HH:mm:ss') : ''
})

const relativeTime = computed(() => {
  return datetime.value ? fromNow(datetime.value) : ''
})

const isToday = computed(() => {
  return datetime.value ? isSame(datetime.value, new Date(), 'day') : false
})
</script>
```

:::

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| modelValue | 绑定值 | `Date \| string \| null` | — | `null` |
| mode | 选择模式 | `string` | `date` / `time` / `datetime` | `datetime` |
| size | 尺寸 | `string` | `small` / `medium` / `large` | `medium` |
| disabled | 是否禁用 | `boolean` | — | `false` |
| placeholder | 占位符 | `string` | — | `请选择日期时间` |
| title | 选择器标题 | `string` | — | `选择日期时间` |
| showSeconds | 是否显示秒 | `boolean` | — | `false` |
| minDate | 最小日期 | `Date \| string` | — | — |
| maxDate | 最大日期 | `Date \| string` | — | — |
| dateFormat | 日期格式 | `string` | — | `YYYY-MM-DD` |
| timeFormat | 时间格式 | `string` | `12` / `24` | `24` |
| showToday | 是否显示今天按钮 | `boolean` | — | `true` |
| showClear | 是否显示清空按钮 | `boolean` | — | `true` |
| locale | 语言 | `string` | `zh-CN` / `en-US` | `zh-CN` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值改变时触发 | `(value: Date \| null)` |
| change | 值改变时触发 | `(value: Date \| null)` |
| open | 选择器打开时触发 | — |
| close | 选择器关闭时触发 | — |

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