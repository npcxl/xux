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

组件完美适配移动端，在移动设备上会以模态框形式显示。

:::demo

```vue
<template>
  <div class="demo-container">
    <div class="demo-item">
      <h4>移动端适配</h4>
      <p>在移动设备上，选择器会以全屏模态框形式显示，提供更好的用户体验。</p>
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

### 设计说明

#### 功能特性

1. **多种选择模式**
   - 日期选择：只选择日期
   - 时间选择：只选择时间
   - 日期时间选择：同时选择日期和时间

2. **移动端优化**
   - 响应式设计，自动适配移动端
   - 移动端以模态框形式显示
   - 触摸友好的交互设计

3. **丰富的交互**
   - 日期网格选择
   - 时间滑块和输入框
   - 键盘导航支持
   - 清空和确认操作

4. **灵活的配置**
   - 支持日期范围限制
   - 可自定义标题和占位符
   - 多种尺寸选择
   - 国际化支持

#### 样式设计

- **主色调**: 使用 `#1a1a1a` 作为主色调
- **圆角设计**: 现代化的圆角设计语言
- **阴影效果**: 适度的阴影提升层次感
- **过渡动画**: 流畅的过渡动画提升用户体验
- **响应式**: 完美适配各种屏幕尺寸

#### 使用场景

- 表单中的日期时间输入
- 日程安排和会议时间选择
- 数据筛选和查询
- 移动端应用的时间选择
