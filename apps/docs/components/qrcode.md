# Qrcode 二维码

iOS风格的二维码组件，支持多种精美的渲染风格，可以在二维码中间添加 Logo 或 GIF 动图。采用现代化的设计语言，完美融合 iOS 17 的视觉风格。

## 基础用法

基础二维码，支持多种风格。

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px;">
    <XQrcode value="https://xux.xlcig.cn" />
    <XQrcode value="https://xux.xlcig.cn" type="rounded" />
    <XQrcode value="https://xux.xlcig.cn" type="dots" />
  </div>
</template>
```

:::

## 2D 风格展示

多种 2D 风格二维码。

:::demo

```vue
<template>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
    <div style="text-align: center;">
      <h4 style="margin-bottom: 10px; color: #333;">Normal 普通</h4>
      <XQrcode value="https://xux.xlcig.cn" type="normal" />
    </div>
    <div style="text-align: center;">
      <h4 style="margin-bottom: 10px; color: #333;">Rounded 圆角</h4>
      <XQrcode value="https://xux.xlcig.cn" type="rounded" />
    </div>
    <div style="text-align: center;">
      <h4 style="margin-bottom: 10px; color: #333;">Dots 圆点</h4>
      <XQrcode value="https://xux.xlcig.cn" type="dots" />
    </div>
    <div style="text-align: center;">
      <h4 style="margin-bottom: 10px; color: #333;">Gradient 渐变</h4>
      <XQrcode value="https://xux.xlcig.cn" type="gradient" />
    </div>
    <div style="text-align: center;">
      <h4 style="margin-bottom: 10px; color: #333;">Liquid 波浪</h4>
      <XQrcode value="https://xux.xlcig.cn" type="liquid" />
    </div>
  </div>
</template>
```

:::


## Logo 和 GIF 支持

在二维码中间添加 Logo 或 GIF 动图。

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px;">
    <XQrcode 
      value="https://xux.xlcig.cn" 
      logo="/logo.png"
      :logo-size="40"
    />
    <XQrcode 
      value="https://xux.xlcig.cn" 
      type="gradient"
      logo="/logo.png"
      :logo-size="50"
    />
    <XQrcode 
      value="https://xux.xlcig.cn" 
      type="rounded"
      logo="/logo.png"
      :logo-size="40"
      foreground-color="#8b5cf6"
    />
  </div>
</template>
```

:::

## 自定义颜色

设置前景色和背景色。

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px;">
    <XQrcode 
      value="https://xux.xlcig.cn" 
      type="dots"
      foreground-color="#ff6b35"
      background-color="#fff5f2"
    />
    <XQrcode 
      value="https://xux.xlcig.cn" 
      type="rounded"
      foreground-color="#8b5cf6"
      background-color="#f3f0ff"
    />
    <XQrcode 
      value="https://xux.xlcig.cn" 
      type="gradient"
      foreground-color="gradient"
      background-color="#1a1a1a"
    />
  </div>
</template>
```

:::

## 自定义尺寸

设置二维码尺寸。

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <XQrcode value="https://xux.xlcig.cn" type="dots" :size="100" />
    <XQrcode value="https://xux.xlcig.cn" type="rounded" :size="150" />
    <XQrcode value="https://xux.xlcig.cn" type="gradient" :size="200" />
  </div>
</template>
```

:::

## 完整配置示例

使用 options 统一配置。

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px;">
    <XQrcode 
      value="https://xux.xlcig.cn" 
      :options="options1"
    />
    <XQrcode 
      value="https://xux.xlcig.cn" 
      :options="options2"
    />
    <XQrcode 
      value="https://xux.xlcig.cn" 
      :options="options3"
    />
  </div>
</template>

<script setup>
const options1 = {
  type: 'rounded',
  size: 180,
  foregroundColor: '#ff6b35',
  backgroundColor: '#fff5f2',
  logo: '/logo.png',
  logoSize: 40,
  bordered: true,
  borderColor: '#ff6b35',
  borderWidth: 2
}

const options2 = {
  type: 'gradient',
  size: 180,
  logo: '/logo.png',
  logoSize: 45,
  bordered: false
}

const options3 = {
  type: 'dots',
  size: 180,
  foregroundColor: '#10b981',
  backgroundColor: '#f0fdf4',
  logo: '/logo.png',
  logoSize: 40
}
</script>
```

:::


## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 二维码内容 | `string` | - |
| type | 二维码样式类型 | `'normal' \| 'rounded' \| 'dots' \| 'gradient' \| 'liquid'` | `'normal'` |
| size | 二维码尺寸 | `number` | `200` |
| logo | Logo图片地址（支持 GIF） | `string` | - |
| logoSize | Logo尺寸 | `number` | `40` |
| backgroundColor | 背景色 | `string` | `#ffffff` |
| foregroundColor | 前景色（支持渐变：`gradient`） | `string` | `#1a1a1a` |
| errorCorrectionLevel | 容错级别 | `'L' \| 'M' \| 'Q' \| 'H'` | `'H'` |
| bordered | 是否显示边框 | `boolean` | `true` |
| borderColor | 边框颜色 | `string` | `#d9d9d9` |
| borderWidth | 边框宽度 | `number` | `1` |
| loadingText | 加载文本 | `string` | `'生成中...'` |
| errorText | 错误文本 | `string` | `'生成失败'` |
| options | 统一配置选项（优先级高于单独的 props） | `QrcodeOptions` | - |

### QrcodeOptions

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| type | 二维码样式类型 | `'normal' \| 'rounded' \| 'dots' \| 'gradient' \| 'liquid'` |
| size | 二维码尺寸 | `number` |
| logo | Logo图片地址 | `string` |
| logoSize | Logo尺寸 | `number` |
| backgroundColor | 背景色 | `string` |
| foregroundColor | 前景色 | `string` |
| errorCorrectionLevel | 容错级别 | `'L' \| 'M' \| 'Q' \| 'H'` |
| bordered | 是否显示边框 | `boolean` |
| borderColor | 边框颜色 | `string` |
| borderWidth | 边框宽度 | `number` |
| loadingText | 加载文本 | `string` |
| errorText | 错误文本 | `string` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| success | 二维码生成成功时触发 | - |
| error | 二维码生成失败时触发 | `(error: Error)` |

### Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| refresh | 重新生成二维码 | - |

