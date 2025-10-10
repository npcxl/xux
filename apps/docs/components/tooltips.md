# Tooltips 提示框

当用户悬停在元素上时，显示简短的说明文字或提示信息。

## 基础用法

最简单的用法，支持上下左右四个方向。

:::demo

```vue
<template>
  <div class="flex gap-8 flex-wrap items-center justify-center p-20">
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
  </div>
</template>
```

:::

## 丰富版本

基于 CSS Buttons 的丰富提示效果，带有动画和按钮样式转换。

:::demo

```vue
<template>
  <div class="flex gap-6 flex-wrap items-center justify-center p-20">
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
  </div>
</template>
```

:::

## 不同的提示内容

可以为每个提示框自定义不同的内容。

:::demo

```vue
<template>
  <div class="flex gap-6 flex-wrap items-center justify-center p-10">
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
  </div>
</template>
```

:::

## 丰富版本 - 上方提示

基于 CSS Buttons 的上方提示效果，悬停时会有震动动画。

:::demo

```vue
<template>
  <div class="flex gap-6 flex-wrap items-center justify-center p-20">
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
  </div>
</template>
```

:::

## 丰富版本 - 下方提示

基于 CSS Buttons 的下方提示效果。

:::demo

```vue
<template>
  <div class="flex gap-6 flex-wrap items-center justify-center p-20">
    <XTooltips 
      variant="rich" 
      content="Button" 
      label="Info Below" 
      placement="bottom"
      hover-text="See Below"
    />
    
    <XTooltips 
      variant="rich" 
      content="Action" 
      label="Action" 
      placement="bottom"
      hover-text="Do It!"
    />
  </div>
</template>
```

:::

## 丰富版本 - 左右提示

基于 CSS Buttons 的左右提示效果。

:::demo

```vue
<template>
  <div class="flex gap-6 flex-wrap items-center justify-center p-20">
    <XTooltips 
      variant="rich" 
      content="Left" 
      label="Look Left" 
      placement="left"
      hover-text="Left Side"
    />
    
    <XTooltips 
      variant="rich" 
      content="Right" 
      label="Look Right" 
      placement="right"
      hover-text="Right Side"
    />
  </div>
</template>
```

:::

## API

### Props

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| content | Tooltip 显示的内容 | `string` | — | — |
| placement | Tooltip 的位置 | `string` | `top` / `bottom` / `left` / `right` | `top` |
| variant | 变体类型 | `string` | `basic` / `rich` | `basic` |
| label | 丰富版本的标签文字（仅 variant="rich" 时有效） | `string` | — | `'Hover'` |
| hoverText | 丰富版本的悬停文字（仅 variant="rich" 时有效） | `string` | — | `''` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 触发 Tooltip 的元素（仅 variant="basic" 时有效） |

