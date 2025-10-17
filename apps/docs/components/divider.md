# Divider 分割线

区隔内容的分割线。

<div style="columns: 2; column-gap: 32px; margin-top: 32px;">

<div style="break-inside: avoid; margin-bottom: 24px;">

## 基础用法

默认为水平分割线。

:::demo

```vue
<template>
  <div>
    <p>这是第一段内容</p>
    <XDivider />
    <p>这是第二段内容</p>
    <XDivider />
    <p>这是第三段内容</p>
  </div>
</template>

<script setup>
import { XDivider } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 带文字的分割线

可以在分割线中间插入文字。

:::demo

```vue
<template>
  <div>
    <p>上面的内容</p>
    <XDivider>分割线文字</XDivider>
    <p>下面的内容</p>
  </div>
</template>

<script setup>
import { XDivider } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 文字位置

通过 `content-position` 设置文字位置。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <div>
      <XDivider content-position="left">左侧文字</XDivider>
      <p style="margin: 0">左侧对齐的分割线</p>
    </div>
    
    <div>
      <XDivider content-position="center">居中文字</XDivider>
      <p style="margin: 0">居中对齐的分割线（默认）</p>
    </div>
    
    <div>
      <XDivider content-position="right">右侧文字</XDivider>
      <p style="margin: 0">右侧对齐的分割线</p>
    </div>
  </XFlex>
</template>

<script setup>
import { XFlex, XDivider } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 虚线

通过 `dashed` 属性设置为虚线。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <div>
      <p style="margin: 0">实线分割（默认）</p>
      <XDivider />
    </div>
    
    <div>
      <p style="margin: 0">虚线分割</p>
      <XDivider dashed />
    </div>
    
    <div>
      <XDivider dashed>虚线带文字</XDivider>
      <p style="margin: 0">虚线也可以带文字</p>
    </div>
  </XFlex>
</template>

<script setup>
import { XFlex, XDivider } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 垂直分割线

使用 `direction="vertical"` 设置垂直分割线。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <div>
      <span>选项1</span>
      <XDivider direction="vertical" />
      <span>选项2</span>
      <XDivider direction="vertical" />
      <span>选项3</span>
      <XDivider direction="vertical" />
      <span>选项4</span>
    </div>
    
    <XFlex align="center">
      <XButton type="primary">按钮</XButton>
      <XDivider direction="vertical" />
      <XButton type="success">按钮</XButton>
      <XDivider direction="vertical" />
      <XButton type="danger">按钮</XButton>
    </XFlex>
  </XFlex>
</template>

<script setup>
import { XFlex, XButton, XDivider } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 自定义间距

通过 `margin` 属性自定义分割线的外边距。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <div>
      <p style="margin: 0">默认间距（24px）</p>
      <XDivider />
      <p style="margin: 0">内容</p>
    </div>
    
    <div>
      <p style="margin: 0">小间距</p>
      <XDivider margin="12px" />
      <p style="margin: 0">内容</p>
    </div>
    
    <div>
      <p style="margin: 0">大间距</p>
      <XDivider margin="48px" />
      <p style="margin: 0">内容</p>
    </div>
  </XFlex>
</template>

<script setup>
import { XFlex, XDivider } from '@xlui/xux-ui'
</script>
```

:::

</div>

</div>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| direction | 分割线方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| dashed | 是否虚线 | `boolean` | `false` |
| content-position | 内容位置（仅水平分割线） | `'left' \| 'center' \| 'right'` | `'center'` |
| margin | 外边距 | `string` | `''` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 分割线中间的内容（仅水平分割线支持） |
