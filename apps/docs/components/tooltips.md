# Tooltips 提示框

当用户悬停在元素上时，显示简短的说明文字或提示信息。

<div style="columns: 2; column-gap: 32px; margin-top: 32px;">

<div style="break-inside: avoid; margin-bottom: 24px;">

## 基础用法

支持上下左右四个方向。

:::demo

```vue
<template>
  <XFlex gap="16" wrap="wrap" align="center" justify="center" style="padding: 40px">
    <XTooltips content="这是一个提示" placement="top">
      <XButton>上方提示</XButton>
    </XTooltips>
    
    <XTooltips content="这是一个提示" placement="bottom">
      <XButton>下方提示</XButton>
    </XTooltips>
    
    <XTooltips content="这是一个提示" placement="left">
      <XButton>左侧提示</XButton>
    </XTooltips>
    
    <XTooltips content="这是一个提示" placement="right">
      <XButton>右侧提示</XButton>
    </XTooltips>
  </XFlex>
</template>

<script setup>
import { XFlex, XButton, XTooltips } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 不同的提示内容

可以为每个提示框自定义不同的内容。

:::demo

```vue
<template>
  <XFlex gap="12" wrap="wrap" align="center" justify="center" style="padding: 20px">
    <XTooltips content="保存你的工作" placement="top">
      <XButton type="primary" icon="mdi:content-save">保存</XButton>
    </XTooltips>
    
    <XTooltips content="删除此项" placement="top">
      <XButton type="danger" icon="mdi:delete">删除</XButton>
    </XTooltips>
    
    <XTooltips content="下载文件到本地" placement="top">
      <XButton type="success" icon="mdi:download">下载</XButton>
    </XTooltips>
    
    <XTooltips content="分享给朋友" placement="top">
      <XButton icon="mdi:share">分享</XButton>
    </XTooltips>
  </XFlex>
</template>

<script setup>
import { XFlex, XButton, XTooltips } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 丰富版本 - 基础

基于 CSS Buttons 的丰富提示效果，带有动画和按钮样式转换。

:::demo

```vue
<template>
  <XFlex gap="16" wrap="wrap" align="center" justify="center" style="padding: 40px">
    <XTooltips 
      variant="rich" 
      content="Tooltip" 
      label="XUX" 
      placement="top"
      hover-text="Click Me"
    />
    
    <XTooltips 
      variant="rich" 
      content="Tooltip" 
      label="XUX" 
      placement="bottom"
      hover-text="Click Me"
    />
    
    <XTooltips 
      variant="rich" 
      content="Tooltip" 
      label="XUX" 
      placement="left"
      hover-text="Click Me"
    />
    
    <XTooltips 
      variant="rich" 
      content="Tooltip" 
      label="XUX" 
      placement="right"
      hover-text="Click Me"
    />
  </XFlex>
</template>

<script setup>
import { XFlex, XTooltips } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 丰富版本 - 自定义文字

自定义按钮文字和悬停效果。

:::demo

```vue
<template>
  <XFlex gap="16" wrap="wrap" align="center" justify="center" style="padding: 40px">
    <XTooltips 
      variant="rich" 
      content="Button" 
      label="Hover Me" 
      placement="top"
      hover-text="Awesome!"
    />
    
    <XTooltips 
      variant="rich" 
      content="Click" 
      label="Click Here" 
      placement="top"
      hover-text="Nice!"
    />
    
    <XTooltips 
      variant="rich" 
      content="Info" 
      label="Learn More" 
      placement="bottom"
      hover-text="Great!"
    />
  </XFlex>
</template>

<script setup>
import { XFlex, XTooltips } from '@xlui/xux-ui'
</script>
```

:::

</div>

</div>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| content | 提示内容文字 | `string` | `''` |
| placement | 提示框位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |
| variant | 提示框变体 | `'default' \| 'rich'` | `'default'` |
| label | 按钮标签文字（rich 变体） | `string` | `''` |
| hover-text | 悬停时的文字（rich 变体） | `string` | `''` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 触发提示的元素（default 变体） |
