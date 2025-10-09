# Input 输入框

输入框组件，用于接收用户输入，支持多种类型和功能。

## 基础用法

基本的文本输入功能。

:::demo

```vue
<template>
  <div class="space-y-4">
    <XInput v-model="input1" placeholder="请输入内容" width="300px" />
    <div class="text-sm text-gray-600">输入的值：{{ input1 }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input1 = ref('')
</script>
```

:::

## 带标签

使用 `label` 属性为输入框添加浮动标签。

:::demo

```vue
<template>
  <div class="space-y-6">
    <XInput v-model="name" label="姓名" width="300px" />
    <XInput v-model="email" label="邮箱地址" type="email" width="300px" />
    <XInput v-model="phone" label="手机号码" type="tel" width="300px" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const phone = ref('')
</script>
```

:::

## 禁用状态

通过 `disabled` 属性禁用输入框。

:::demo

```vue
<template>
  <div class="space-y-4">
    <XInput v-model="value1" placeholder="正常状态" width="300px" />
    <XInput v-model="value2" placeholder="禁用状态" disabled width="300px" />
    <XInput v-model="value3" label="禁用状态（带标签）" disabled width="300px" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('已禁用的内容')
const value3 = ref('已禁用的内容')
</script>
```

:::

## 只读状态

通过 `readonly` 属性设置输入框为只读。

:::demo

```vue
<template>
  <div class="space-y-4">
    <XInput v-model="readonly1" placeholder="可编辑" width="300px" />
    <XInput v-model="readonly2" placeholder="只读" readonly width="300px" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const readonly1 = ref('')
const readonly2 = ref('这是只读内容')
</script>
```

:::

## 可清空

添加 `clearable` 属性，可快速清空输入内容。

:::demo

```vue
<template>
  <div class="space-y-4">
    <XInput 
      v-model="clearableValue" 
      placeholder="可清空的输入框" 
      clearable 
      width="300px"
      @clear="handleClear"
    />
    <div class="text-sm text-gray-600">
      输入的值：{{ clearableValue || '空' }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const clearableValue = ref('可以点击清空按钮')

const handleClear = () => {
  console.log('输入框已清空')
}
</script>
```

:::

## 密码输入

设置 `type="password"` 实现密码输入功能。

:::demo

```vue
<template>
  <div class="space-y-4">
    <XInput 
      v-model="password" 
      type="password"
      label="密码"
      clearable
      width="300px"
    />
    <div class="text-sm text-gray-600">
      密码长度：{{ password.length }} 位
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const password = ref('')
</script>
```

:::

## 字数限制

使用 `maxlength` 和 `show-word-limit` 属性限制和显示字数。

:::demo

```vue
<template>
  <div class="space-y-6">
    <div>
      <XInput 
        v-model="text1" 
        label="用户名"
        :maxlength="20"
        show-word-limit
        width="300px"
      />
    </div>
    <div>
      <XInput 
        v-model="text2" 
        placeholder="最多输入50个字符"
        :maxlength="50"
        show-word-limit
        clearable
        width="400px"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const text1 = ref('')
const text2 = ref('')
</script>
```

:::

## 错误状态

通过 `error` 属性显示错误状态。

:::demo

```vue
<template>
  <div class="space-y-4">
    <XInput 
      v-model="errorInput" 
      label="用户名"
      :error="errorInput.length > 0 && errorInput.length < 3"
      width="300px"
    />
    <div class="text-sm text-red-500" v-if="errorInput.length > 0 && errorInput.length < 3">
      用户名至少需要3个字符
    </div>
    <div class="text-sm text-green-500" v-else-if="errorInput.length >= 3">
      用户名格式正确
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const errorInput = ref('')
</script>
```

:::

## 不同输入类型

支持各种原生 HTML5 输入类型。

:::demo

```vue
<template>
  <div class="space-y-6">
    <XInput v-model="textValue" type="text" label="文本" width="300px" />
    <XInput v-model="numberValue" type="number" label="数字" width="300px" />
    <XInput v-model="emailValue" type="email" label="邮箱" width="300px" />
    <XInput v-model="urlValue" type="url" label="网址" width="300px" />
    <XInput v-model="telValue" type="tel" label="电话" width="300px" />
    <XInput v-model="dateValue" type="date" label="日期" width="300px" />
    <XInput v-model="timeValue" type="time" label="时间" width="300px" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const textValue = ref('')
const numberValue = ref('')
const emailValue = ref('')
const urlValue = ref('')
const telValue = ref('')
const dateValue = ref('')
const timeValue = ref('')
</script>
```

:::

## 事件监听

监听输入框的各种事件。

:::demo

```vue
<template>
  <div class="space-y-4">
    <XInput 
      v-model="eventValue" 
      placeholder="输入查看事件日志"
      clearable
      width="300px"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @clear="handleClear"
    />
    <div class="p-3 bg-gray-100 rounded text-sm space-y-1">
      <div><strong>事件日志：</strong></div>
      <div v-for="(log, index) in logs" :key="index" class="text-xs">
        {{ log }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const eventValue = ref('')
const logs = ref([])

const addLog = (message) => {
  const time = new Date().toLocaleTimeString()
  logs.value.unshift(`[${time}] ${message}`)
  if (logs.value.length > 8) {
    logs.value.pop()
  }
}

const handleInput = (value) => {
  addLog(`输入事件: ${value}`)
}

const handleChange = (value) => {
  addLog(`改变事件: ${value}`)
}

const handleFocus = () => {
  addLog('获得焦点')
}

const handleBlur = () => {
  addLog('失去焦点')
}

const handleClear = () => {
  addLog('清空输入')
}
</script>
```

:::

## 自定义宽度

通过 `width` 属性自定义输入框宽度。

:::demo

```vue
<template>
  <div class="space-y-6">
    <div>
      <div class="text-sm text-gray-600 mb-2">宽度: 150px</div>
      <XInput v-model="value1" placeholder="150px" width="150px" />
    </div>
    <div>
      <div class="text-sm text-gray-600 mb-2">宽度: 300px</div>
      <XInput v-model="value2" placeholder="300px" width="300px" />
    </div>
    <div>
      <div class="text-sm text-gray-600 mb-2">宽度: 100%</div>
      <XInput v-model="value3" placeholder="100%" width="100%" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
</script>
```

:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 绑定值 | `string \| number` | - |
| type | 输入框类型 | `string` | `'text'` |
| placeholder | 占位符文本 | `string` | `''` |
| label | 浮动标签文本 | `string` | `''` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| required | 是否必填 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| showWordLimit | 是否显示字数统计 | `boolean` | `false` |
| maxlength | 最大输入长度 | `number` | - |
| minlength | 最小输入长度 | `number` | - |
| autocomplete | 自动完成 | `string` | `'off'` |
| error | 是否显示错误状态 | `boolean` | `false` |
| width | 输入框宽度 | `string` | `'100%'` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值改变时触发 | `(value: string \| number)` |
| input | 输入时触发 | `(value: string \| number, event: Event)` |
| change | 值改变且失去焦点时触发 | `(value: string \| number, event: Event)` |
| focus | 获得焦点时触发 | `(event: FocusEvent)` |
| blur | 失去焦点时触发 | `(event: FocusEvent)` |
| clear | 点击清空按钮时触发 | `()` |
| keydown | 按下键盘时触发 | `(event: KeyboardEvent)` |
| keyup | 释放键盘时触发 | `(event: KeyboardEvent)` |

### Exposed Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| focus | 使输入框获得焦点 | `()` |
| blur | 使输入框失去焦点 | `()` |
| select | 选中输入框中的文本 | `()` |

## 使用场景

1. **表单输入**：用户注册、登录、信息填写
2. **搜索框**：站内搜索、数据筛选
3. **数据编辑**：表格行内编辑、信息修改
4. **聊天输入**：即时通讯、评论回复
5. **数值输入**：金额、数量、参数配置

## 最佳实践

1. **标签使用**：
   - 重要字段使用浮动标签
   - 简单输入可使用 placeholder
   - 标签文字简洁明了

2. **输入验证**：
   - 实时验证用户输入
   - 清晰的错误提示信息
   - 验证通过给予正向反馈

3. **字数限制**：
   - 长文本输入显示字数统计
   - 接近限制时给予提示
   - 超出限制阻止输入

4. **用户体验**：
   - 合适的输入框宽度
   - 明确的聚焦状态
   - 便捷的清空功能
   - 支持键盘操作

5. **性能优化**：
   - 输入防抖处理
   - 避免频繁验证
   - 合理使用事件监听
