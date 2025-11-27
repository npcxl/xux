# Tooltips 提示框

当用户悬停在元素上时，显示简短的说明文字或提示信息。

## 重要说明

**v1.5.3 版本更新**：已移除丰富版本（rich variant）功能。

由于以下原因，我们移除了丰富版本：
- **性能问题**：自定义 CSS 动画和复杂样式导致渲染性能下降
- **适配问题**：在某些场景下会被页面元素遮住，无法正常显示

现在 Tooltips 通过 `teleported` 属性确保始终显示在最上层，不会被遮挡。

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

## 更多位置选项

支持更精确的位置控制，包括起始和结束位置。

:::demo

```vue
<template>
  <XFlex gap="16" wrap="wrap" align="center" justify="center" style="padding: 40px">
    <XTooltips content="顶部起始" placement="top-start">
      <XButton>top-start</XButton>
    </XTooltips>
    
    <XTooltips content="顶部居中" placement="top">
      <XButton>top</XButton>
    </XTooltips>
    
    <XTooltips content="顶部结束" placement="top-end">
      <XButton>top-end</XButton>
    </XTooltips>
    
    <XTooltips content="底部起始" placement="bottom-start">
      <XButton>bottom-start</XButton>
    </XTooltips>
    
    <XTooltips content="底部居中" placement="bottom">
      <XButton>bottom</XButton>
    </XTooltips>
    
    <XTooltips content="底部结束" placement="bottom-end">
      <XButton>bottom-end</XButton>
    </XTooltips>
  </XFlex>
</template>

<script setup>
import { XFlex, XButton, XTooltips } from '@xlui/xux-ui'
</script>
```

:::

</div>

</div>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| content | 提示内容文字 | `string` | - |
| placement | 提示框位置 | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | `'top'` |
| showArrow | 是否显示箭头 | `boolean` | `true` |
| offset | 偏移距离（像素） | `number` | `8` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 触发提示的元素 |

## 技术说明

Tooltips 组件基于 Element Plus 的 Popover 组件实现，具有以下优势：

- **不会被遮挡**：使用 `teleported` 属性，提示框会渲染到 body，确保始终显示在最上层
- **性能稳定**：使用成熟的组件库实现，性能优化和兼容性更好
- **功能完善**：支持自动定位、边界检测、动画效果等
- **易于维护**：减少自定义代码，降低维护成本
