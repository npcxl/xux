# Qrcode 二维码

二维码组件，用于生成和显示二维码。

## 基础用法

基本的二维码用法，传入要生成二维码的内容。

:::demo

```vue
<template>
  <XQrcode value="代码写出来是给人看的" />
</template>
```

:::

## 自定义尺寸

可以通过 `size` 属性自定义二维码的尺寸。

:::demo

```vue
<template>
  <div class="flex gap-4">
    <XQrcode value="代码写出来是给人看的" :size="150" />
    <XQrcode value="代码写出来是给人看的" :size="200" />
    <XQrcode value="代码写出来是给人看的" :size="250" />
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
      value="代码写出来是给人看的" 
      background-color="#f0f0f0"
      foreground-color="#333333"
    />
    <XQrcode 
      value="代码写出来是给人看的" 
      background-color="#1a1a1a"
      foreground-color="#ffffff"
    />
    <XQrcode 
      value="代码写出来是给人看的" 
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
    <XQrcode value="代码写出来是给人看的" :bordered="true" />
    <XQrcode value="代码写出来是给人看的" :bordered="false" />
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
      value="代码写出来是给人看的" 
      border-color="#ff6b35"
      :border-width="2"
    />
    <XQrcode 
      value="代码写出来是给人看的" 
      border-color="#10b981"
      :border-width="3"
    />
    <XQrcode 
      value="代码写出来是给人看的" 
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
      value="代码写出来是给人看的" 
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
      value="代码写出来是给人看的" 
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

const qrValue = ref('代码写出来是给人看的')
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
          value="代码写出来是给人看的" 
          error-correction-level="L"
          :size="150"
        />
        <p class="mt-2 text-sm text-gray-600">L - 低 (~7%)</p>
      </div>
      <div class="text-center">
        <XQrcode 
          value="代码写出来是给人看的" 
          error-correction-level="M"
          :size="150"
        />
        <p class="mt-2 text-sm text-gray-600">M - 中 (~15%)</p>
      </div>
      <div class="text-center">
        <XQrcode 
          value="代码写出来是给人看的" 
          error-correction-level="Q"
          :size="150"
        />
        <p class="mt-2 text-sm text-gray-600">Q - 高 (~25%)</p>
      </div>
      <div class="text-center">
        <XQrcode 
          value="代码写出来是给人看的" 
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

## 文本图标

可以在二维码中心添加文本图标，支持emoji和普通文本。

:::demo

```vue
<template>
  <div class="flex gap-4">
    <div class="text-center">
      <XQrcode 
        value="代码写出来是给人看的" 
        text-icon="🚀"
        :icon-size="30"
        :size="150"
      />
      <p class="mt-2 text-sm text-gray-600">Emoji图标</p>
    </div>
    <div class="text-center">
      <XQrcode 
        value="代码写出来是给人看的" 
        text-icon="LOGO"
        :icon-size="25"
        :size="150"
      />
      <p class="mt-2 text-sm text-gray-600">文本图标</p>
    </div>
    <div class="text-center">
      <XQrcode 
        value="代码写出来是给人看的" 
        text-icon="⭐"
        icon-color="#ff6b35"
        :icon-size="30"
        :size="150"
      />
      <p class="mt-2 text-sm text-gray-600">彩色文本图标</p>
    </div>
  </div>
</template>
```

:::
```

:::

## 图标尺寸

可以自定义图标的尺寸大小。

:::demo

```vue
<template>
  <div class="flex gap-4">
    <div class="text-center">
      <XQrcode 
        value="代码写出来是给人看的" 
        text-icon="⭐"
        :icon-size="20"
        :size="150"
      />
      <p class="mt-2 text-sm text-gray-600">小图标 (20px)</p>
    </div>
    <div class="text-center">
      <XQrcode 
        value="代码写出来是给人看的" 
        text-icon="⭐"
        :icon-size="40"
        :size="150"
      />
      <p class="mt-2 text-sm text-gray-600">中图标 (40px)</p>
    </div>
    <div class="text-center">
      <XQrcode 
        value="代码写出来是给人看的" 
        text-icon="⭐"
        :icon-size="60"
        :size="150"
      />
      <p class="mt-2 text-sm text-gray-600">大图标 (60px)</p>
    </div>
  </div>
</template>
```

:::

## 图标颜色

可以自定义文本图标的颜色，emoji图标不受影响。

:::demo

```vue
<template>
  <div class="flex gap-4">
    <div class="text-center">
      <XQrcode 
        value="代码写出来是给人看的" 
        text-icon="LOGO"
        icon-color="#ff6b35"
        :icon-size="25"
        :size="150"
      />
      <p class="mt-2 text-sm text-gray-600">橙色文本</p>
    </div>
    <div class="text-center">
      <XQrcode 
        value="代码写出来是给人看的" 
        text-icon="LOGO"
        icon-color="#10b981"
        :icon-size="25"
        :size="150"
      />
      <p class="mt-2 text-sm text-gray-600">绿色文本</p>
    </div>
    <div class="text-center">
      <XQrcode 
        value="代码写出来是给人看的" 
        text-icon="LOGO"
        icon-color="#8b5cf6"
        :icon-size="25"
        :size="150"
      />
      <p class="mt-2 text-sm text-gray-600">紫色文本</p>
    </div>
  </div>
</template>
```

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 二维码内容 | `string` | - |
| textIcon | 文本图标（支持emoji、文本） | `string` | - |
| icon | 图片图标（支持图片URL） | `string` | - |
| iconSize | 图标尺寸 | `number` | `40` |
| iconColor | 图标颜色（仅对文本图标有效） | `string` | `#000000` |
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
- `textIcon` 用于文本图标（包括emoji），`icon` 用于图片图标
- 图片图标会自动处理跨域问题
- 图标颜色仅对文本图标有效，emoji图标保持原有颜色
- 图标尺寸建议不超过二维码尺寸的1/3，以确保二维码可读性
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