# Qrcode 二维码

二维码组件，用于生成和显示二维码。

## 基础用法

基本的二维码用法，传入要生成二维码的内容。

:::demo

```vue
<template>
  <XQrcode value="https://example.com" />
</template>
```

:::

## 自定义尺寸

可以通过 `size` 属性自定义二维码的尺寸。

:::demo

```vue
<template>
  <div class="flex gap-4">
    <XQrcode value="https://example.com" :size="150" />
    <XQrcode value="https://example.com" :size="200" />
    <XQrcode value="https://example.com" :size="250" />
  </div>
</template>
```

:::

## 自定义颜色

可以自定义二维码的背景色和前景色。

:::demo

```vue
<template>
  <div class="flex gap-4">
    <XQrcode 
      value="https://example.com" 
      background-color="#f0f0f0"
      foreground-color="#333333"
    />
    <XQrcode 
      value="https://example.com" 
      background-color="#1a1a1a"
      foreground-color="#ffffff"
    />
    <XQrcode 
      value="https://example.com" 
      background-color="#e8f5e8"
      foreground-color="#2d5a2d"
    />
  </div>
</template>
```

:::

## 无边框

设置 `bordered` 为 `false` 可以移除边框。

:::demo

```vue
<template>
  <div class="flex gap-4">
    <XQrcode value="https://example.com" :bordered="true" />
    <XQrcode value="https://example.com" :bordered="false" />
  </div>
</template>
```

:::

## 自定义边框

可以自定义边框的颜色和宽度。

:::demo

```vue
<template>
  <div class="flex gap-4">
    <XQrcode 
      value="https://example.com" 
      border-color="#ff6b35"
      :border-width="2"
    />
    <XQrcode 
      value="https://example.com" 
      border-color="#10b981"
      :border-width="3"
    />
    <XQrcode 
      value="https://example.com" 
      border-color="#8b5cf6"
      :border-width="1"
    />
  </div>
</template>
```

:::

## 事件处理

组件支持成功和失败事件回调。

:::demo

```vue
<template>
  <div>
    <XQrcode 
      value="https://example.com" 
      @success="handleSuccess"
      @error="handleError"
    />
    <div class="mt-4 text-sm text-gray-600">
      <p>控制台查看事件输出</p>
    </div>
  </div>
</template>

<script setup>
function handleSuccess() {
  console.log('二维码生成成功')
}

function handleError(error) {
  console.error('二维码生成失败:', error)
}
</script>
```

:::

## 手动刷新

可以通过 ref 调用 `refresh` 方法重新生成二维码。

:::demo

```vue
<template>
  <div>
    <XQrcode 
      ref="qrcodeRef"
      value="https://example.com" 
    />
    <div class="mt-4">
      <XButton @click="refreshQR">刷新二维码</XButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const qrcodeRef = ref()

function refreshQR() {
  qrcodeRef.value.refresh()
}
</script>
```

:::

## 动态内容

二维码内容可以动态变化，组件会自动重新生成。

:::demo

```vue
<template>
  <div>
    <div class="mb-4">
      <XInput 
        v-model="qrValue" 
        placeholder="输入要生成二维码的内容"
        class="w-80"
      />
    </div>
    <XQrcode :value="qrValue" />
    <div class="mt-4 text-sm text-gray-600">
      <p>当前内容: {{ qrValue || '空' }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const qrValue = ref('https://example.com')
</script>
```

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 二维码内容 | `string` | - |
| size | 二维码尺寸 | `number` | `200` |
| backgroundColor | 背景色 | `string` | `#ffffff` |
| foregroundColor | 前景色 | `string` | `#000000` |
| errorCorrectionLevel | 容错级别 | `'L' \| 'M' \| 'Q' \| 'H'` | `'M'` |
| bordered | 是否显示边框 | `boolean` | `true` |
| borderColor | 边框颜色 | `string` | `#d9d9d9` |
| borderWidth | 边框宽度 | `number` | `1` |
| loadingText | 加载文本 | `string` | `'生成中...'` |
| errorText | 错误文本 | `string` | `'生成失败'` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| success | 二维码生成成功时触发 | - |
| error | 二维码生成失败时触发 | `(error: Error)` |

### Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| refresh | 重新生成二维码 | - |

### 注意事项

- 本组件使用 Canvas API 生成二维码，生成的是模拟图案，不是真正的二维码
- 如需生成真正的二维码，建议使用专业的二维码库
- 组件支持响应式设计，在移动端会自动调整样式