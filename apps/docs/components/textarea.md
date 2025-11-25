# Textarea 文本域

文本域是 Input 组件的一个变体，通过设置 `multiline` 属性启用多行输入功能。

## 基础用法

通过设置 `multiline` 属性来启用文本域模式，`rows` 属性控制默认显示的行数。

:::demo

```vue
<template>
  <XInput
    v-model="value"
    multiline
    :rows="4"
    placeholder="请输入内容..."
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

:::

## 自动调整高度

设置 `autoResize` 属性可以让文本域根据内容自动调整高度，同时可以通过 `minRows` 和 `maxRows` 限制高度范围。

:::demo

```vue
<template>
  <XInput
    v-model="value"
    multiline
    auto-resize
    :min-rows="2"
    :max-rows="6"
    placeholder="输入内容会自动调整高度..."
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

:::

## 字数统计

文本域同样支持字数统计功能。

:::demo

```vue
<template>
  <XInput
    v-model="value"
    multiline
    :rows="3"
    :maxlength="200"
    show-word-limit
    placeholder="最多输入200个字符..."
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

:::

## 可清空

文本域支持一键清空功能。

:::demo

```vue
<template>
  <XInput
    v-model="value"
    multiline
    clearable
    :rows="3"
    placeholder="可以一键清空内容..."
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

:::

## 调整尺寸

通过 `resize` 属性控制用户是否可以调整文本域的尺寸。

:::demo

```vue
<template>
  <div class="space-y-4">
    <XInput v-model="value1" multiline :rows="3" resize="none" placeholder="不可调整大小" />
    <XInput v-model="value2" multiline :rows="3" resize="vertical" placeholder="可垂直调整大小" />
    <XInput v-model="value3" multiline :rows="3" resize="horizontal" placeholder="可水平调整大小" />
    <XInput v-model="value4" multiline :rows="3" resize="both" placeholder="可自由调整大小" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
</script>
```

:::

## 不同尺寸

文本域支持三种尺寸。

:::demo

```vue
<template>
  <div class="space-y-4">
    <XInput v-model="value1" multiline size="small" :rows="3" placeholder="小尺寸文本域" />
    <XInput v-model="value2" multiline size="medium" :rows="3" placeholder="中等尺寸文本域" />
    <XInput v-model="value3" multiline size="large" :rows="3" placeholder="大尺寸文本域" />
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

## 状态

文本域支持错误和成功状态。

:::demo

```vue
<template>
  <div class="space-y-4">
    <XInput
      v-model="value1"
      multiline
      error
      :rows="3"
      error-text="内容格式不正确"
      placeholder="错误状态"
    />
    <XInput
      v-model="value2"
      multiline
      success
      :rows="3"
      success-text="内容验证通过"
      placeholder="成功状态"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('验证通过的内容')
</script>
```

:::

## 禁用和只读

:::demo

```vue
<template>
  <div class="space-y-4">
    <XInput v-model="value1" multiline disabled :rows="3" placeholder="禁用状态" />
    <XInput v-model="value2" multiline readonly :rows="3" placeholder="只读状态" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref('这是禁用的文本域')
const value2 = ref('这是只读的文本域')
</script>
```

:::

## API

### 文本域相关属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| multiline | 是否启用多行输入（文本域） | `boolean` | `false` |
| rows | 文本域的行数 | `number` | `3` |
| autoResize | 是否自动调整高度 | `boolean` | `false` |
| minRows | 自动调整高度时的最小行数 | `number` | `2` |
| maxRows | 自动调整高度时的最大行数 | `number` | `10` |
| resize | 用户是否可以调整文本域大小 | `'none' \| 'both' \| 'horizontal' \| 'vertical'` | `'none'` |

### 其他属性

文本域模式下，Input 组件的其他属性（如 `clearable`、`showWordLimit`、`maxlength`、`disabled`、`readonly`、`error`、`success` 等）同样适用。
