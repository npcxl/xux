# Qrcode 二维码

二维码组件，用于生成和显示二维码。

## 基础用法

基本的二维码用法，传入要生成二维码的内容。标准的黑白二维码。

:::demo

```vue
<template>
  <div class="flex gap-4">
    <div class="text-center">
      <XQrcode value="代码写出来是给人看的" />
      <p class="mt-2 text-sm text-gray-600">标准二维码</p>
    </div>
    <div class="text-center">
      <XQrcode 
        value="代码写出来是给人看的"
        foreground-color="#0066cc"
      />
      <p class="mt-2 text-sm text-gray-600">单色二维码</p>
    </div>
    <div class="text-center">
      <XQrcode 
        value="代码写出来是给人看的"
        :size="150"
      />
      <p class="mt-2 text-sm text-gray-600">自定义尺寸</p>
    </div>
  </div>
</template>
```

:::

:::

## 二维码风格

通过 `type` 属性可以选择不同的二维码风格，支持常规、圆角和点状粒子三种样式。

:::demo

```vue
<template>
  <div class="flex gap-4">
    <div class="text-center">
      <XQrcode 
        value="代码写出来是给人看的" 
        type="normal"
        :size="200"
      />
      <p class="mt-2 text-sm text-gray-600">常规风格</p>
    </div>
    <div class="text-center">
      <XQrcode 
        value="代码写出来是给人看的" 
        type="rounded"
        :size="200"
      />
      <p class="mt-2 text-sm text-gray-600">圆角风格</p>
    </div>
    <div class="text-center">
      <XQrcode 
        value="代码写出来是给人看的" 
        type="dots"
        :size="200"
      />
      <p class="mt-2 text-sm text-gray-600">点状粒子风格</p>
    </div>
  </div>
</template>
```

:::

## 点状粒子风格配色

点状粒子风格搭配不同的颜色，呈现不同的视觉效果。

:::demo

```vue
<template>
  <div class="flex gap-4">
    <div class="text-center">
      <XQrcode 
        value="代码写出来是给人看的" 
        type="dots"
        :size="180"
        foreground-color="#1890ff"
      />
      <p class="mt-2 text-sm text-gray-600">蓝色点状</p>
    </div>
    <div class="text-center">
      <XQrcode 
        value="代码写出来是给人看的" 
        type="dots"
        :size="180"
        foreground-color="#52c41a"
      />
      <p class="mt-2 text-sm text-gray-600">绿色点状</p>
    </div>
    <div class="text-center">
      <XQrcode 
        value="代码写出来是给人看的" 
        type="dots"
        :size="180"
        foreground-color="#ff6b35"
        background-color="#fff7f0"
      />
      <p class="mt-2 text-sm text-gray-600">橙色点状</p>
    </div>
  </div>
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
| logo | Logo图片URL（仅支持图片） | `string` | - |
| logoSize | Logo尺寸 | `number` | `40` |
| size | 二维码尺寸 | `number` | `200` |
| backgroundColor | 背景色 | `string` | `#ffffff` |
| foregroundColor | 前景色 | `string` | `#1a1a1a` |
| type | 二维码样式类型 | `'normal' \| 'rounded' \| 'dots'` | `'normal'` |
| errorCorrectionLevel | 容错级别 | `'L' \| 'M' \| 'Q' \| 'H'` | `'H'` |
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

- 本组件使用 `qrcode` 库生成二维码，可被扫码器正常识别
- 支持多种容错级别（L、M、Q、H），使用 Logo 时建议使用 H 级别
- **风格化二维码采用精确的模块级渲染，确保可扫描性**
- `rounded` 风格使用圆角矩形（97% 填充率），`dots` 风格使用圆点（约 66% 填充率）
- 所有风格均基于原始二维码矩阵数据渲染，保证数据完整性
- Logo 仅支持图片 URL，不支持文本或 emoji
- Logo 图片会自动处理跨域问题
- Logo 会嵌入到二维码中央白色圆角背景区域，不会覆盖二维码数据
- Logo 尺寸建议不超过二维码尺寸的 1/4，以确保二维码可读性
- 组件支持响应式设计，在移动端会自动调整样式
- 二维码内容过长时，建议适当增大尺寸以确保可读性