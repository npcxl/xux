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

## 容错级别

二维码支持四种容错级别，级别越高，容错能力越强，但二维码密度也越高。

:::demo

```vue
<template>
  <div>
    <div class="mb-4">
      <XSelect 
        v-model="errorLevel" 
        :options="errorLevelOptions"
        placeholder="选择容错级别"
        class="w-60"
      />
    </div>
    <div class="flex gap-4">
      <div class="text-center">
        <XQrcode 
          value="https://example.com" 
          error-correction-level="L"
          :size="150"
        />
        <p class="mt-2 text-sm text-gray-600">L - 低 (~7%)</p>
      </div>
      <div class="text-center">
        <XQrcode 
          value="https://example.com" 
          error-correction-level="M"
          :size="150"
        />
        <p class="mt-2 text-sm text-gray-600">M - 中 (~15%)</p>
      </div>
      <div class="text-center">
        <XQrcode 
          value="https://example.com" 
          error-correction-level="Q"
          :size="150"
        />
        <p class="mt-2 text-sm text-gray-600">Q - 高 (~25%)</p>
      </div>
      <div class="text-center">
        <XQrcode 
          value="https://example.com" 
          error-correction-level="H"
          :size="150"
        />
        <p class="mt-2 text-sm text-gray-600">H - 最高 (~30%)</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const errorLevel = ref('M')

const errorLevelOptions = [
  { label: 'L - 低 (~7%)', value: 'L' },
  { label: 'M - 中 (~15%)', value: 'M' },
  { label: 'Q - 高 (~25%)', value: 'Q' },
  { label: 'H - 最高 (~30%)', value: 'H' }
]
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

- 本组件使用 `qrcode` 库生成二维码
- 支持多种容错级别（L、M、Q、H），建议使用 M 级别以获得最佳效果
- 组件支持响应式设计，在移动端会自动调整样式
- 二维码内容过长时，建议适当增大尺寸以确保可读性

## 贡献者

<div class="contributors">
  <div class="contributor-item">
    <a href="https://gitee.com/haijun-li" target="_blank" rel="noopener noreferrer">
      <img 
        src="https://p3.itc.cn/images01/20230307/e9d72e3788844ed1a9259e442899e1bd.png" 
        alt="lihaijun"
        class="contributor-avatar"
      />
      <span class="contributor-name">lihaijun</span>
    </a>
  </div>
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