# Flex 弹性布局

强大的 Flexbox 布局组件，简化 CSS Flexbox 的使用。

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; margin-top: 32px;">

<div>

## 基础用法

最简单的 Flex 布局。

:::demo

```vue
<template>
  <XFlex gap="12">
    <XButton>Button 1</XButton>
    <XButton type="primary">Button 2</XButton>
    <XButton type="success">Button 3</XButton>
  </XFlex>
</template>

<script setup>
import { XFlex, XButton } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div>

## 垂直布局

使用 `vertical` 属性创建垂直布局。

:::demo

```vue
<template>
  <XFlex vertical gap="12" style="max-width: 200px">
    <XButton>Button 1</XButton>
    <XButton type="primary">Button 2</XButton>
    <XButton type="success">Button 3</XButton>
  </XFlex>
</template>

<script setup>
import { XFlex, XButton } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div>

## Inline Flex

使用 `inline` 属性创建 inline-flex 布局。

:::demo

```vue
<template>
  <div>
    <span style="color: #666">第一组：</span>
    <XFlex inline gap="8" style="margin: 0 12px">
      <XTag size="small">A</XTag>
      <XTag size="small">B</XTag>
    </XFlex>
    <span style="color: #666">第二组：</span>
    <XFlex inline gap="8" style="margin-left: 12px">
      <XTag size="small" type="success">C</XTag>
      <XTag size="small" type="warning">D</XTag>
    </XFlex>
  </div>
</template>

<script setup>
import { XFlex, XTag } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div>

## 间距控制

通过 `gap` 属性控制间距。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px">gap="12"</div>
      <XFlex wrap="wrap" gap="12">
        <XTag v-for="i in 4" :key="i">Tag {{ i }}</XTag>
      </XFlex>
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px">gap="24"</div>
      <XFlex wrap="wrap" gap="24">
        <XTag v-for="i in 4" :key="i">Tag {{ i }}</XTag>
      </XFlex>
    </div>
  </XFlex>
</template>

<script setup>
import { XFlex, XTag } from '@xlui/xux-ui'
</script>
```

:::

</div>

</div>

## 主轴对齐

通过 `justify` 属性控制主轴对齐方式。

:::demo

```vue
<template>
  <XFlex vertical gap="12">
    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px">start（默认）</div>
      <div style="padding: 12px; background: #f5f5f5; border-radius: 4px">
        <XFlex justify="start" gap="8">
          <XTag>1</XTag>
          <XTag>2</XTag>
          <XTag>3</XTag>
        </XFlex>
      </div>
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px">center</div>
      <div style="padding: 12px; background: #f5f5f5; border-radius: 4px">
        <XFlex justify="center" gap="8">
          <XTag>1</XTag>
          <XTag>2</XTag>
          <XTag>3</XTag>
        </XFlex>
      </div>
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px">end</div>
      <div style="padding: 12px; background: #f5f5f5; border-radius: 4px">
        <XFlex justify="end" gap="8">
          <XTag>1</XTag>
          <XTag>2</XTag>
          <XTag>3</XTag>
        </XFlex>
      </div>
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px">space-between</div>
      <div style="padding: 12px; background: #f5f5f5; border-radius: 4px">
        <XFlex justify="space-between">
          <XTag>1</XTag>
          <XTag>2</XTag>
          <XTag>3</XTag>
        </XFlex>
      </div>
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px">space-around</div>
      <div style="padding: 12px; background: #f5f5f5; border-radius: 4px">
        <XFlex justify="space-around">
          <XTag>1</XTag>
          <XTag>2</XTag>
          <XTag>3</XTag>
        </XFlex>
      </div>
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px">space-evenly</div>
      <div style="padding: 12px; background: #f5f5f5; border-radius: 4px">
        <XFlex justify="space-evenly">
          <XTag>1</XTag>
          <XTag>2</XTag>
          <XTag>3</XTag>
        </XFlex>
      </div>
    </div>
  </XFlex>
</template>

<script setup>
import { XFlex, XTag } from '@xlui/xux-ui'
</script>
```

:::

## 交叉轴对齐

通过 `align` 属性控制交叉轴对齐方式。

:::demo

```vue
<template>
  <XFlex vertical gap="12">
    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px">start（默认）</div>
      <div style="padding: 12px; background: #f5f5f5; border-radius: 4px; height: 80px">
        <XFlex align="start" gap="8" style="height: 100%">
          <XButton size="small">小</XButton>
          <XButton>中等</XButton>
          <XButton size="large">大</XButton>
        </XFlex>
      </div>
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px">center</div>
      <div style="padding: 12px; background: #f5f5f5; border-radius: 4px; height: 80px">
        <XFlex align="center" gap="8" style="height: 100%">
          <XButton size="small">小</XButton>
          <XButton>中等</XButton>
          <XButton size="large">大</XButton>
        </XFlex>
      </div>
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px">end</div>
      <div style="padding: 12px; background: #f5f5f5; border-radius: 4px; height: 80px">
        <XFlex align="end" gap="8" style="height: 100%">
          <XButton size="small">小</XButton>
          <XButton>中等</XButton>
          <XButton size="large">大</XButton>
        </XFlex>
      </div>
    </div>
  </XFlex>
</template>

<script setup>
import { XFlex, XButton } from '@xlui/xux-ui'
</script>
```

:::

## 换行

通过 `wrap` 属性控制换行行为。

:::demo

```vue
<template>
  <XFlex vertical gap="24">
    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px">nowrap（不换行，默认）- 超出显示滚动条</div>
      <div style="max-width: 500px; overflow-x: auto; padding: 12px; background: #f5f5f5; border-radius: 4px">
        <XFlex wrap="nowrap" gap="12">
          <XTag v-for="i in 8" :key="i">标签{{ i }}</XTag>
        </XFlex>
      </div>
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px">wrap（换行）- 超出自动换行，gap="16"</div>
      <div style="max-width: 500px; padding: 12px; background: #f5f5f5; border-radius: 4px">
        <XFlex wrap="wrap" gap="16">
          <XTag v-for="i in 8" :key="i">标签{{ i }}</XTag>
        </XFlex>
      </div>
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px">wrap（换行）- 更大间距，gap="24"</div>
      <div style="max-width: 500px; padding: 12px; background: #f5f5f5; border-radius: 4px">
        <XFlex wrap="wrap" gap="24">
          <XTag type="success" v-for="i in 8" :key="i">标签{{ i }}</XTag>
        </XFlex>
      </div>
    </div>
  </XFlex>
</template>

<script setup>
import { XFlex, XTag } from '@xlui/xux-ui'
</script>
```

:::

## 行列间距

通过 `rowGap`、`columnGap` 分别控制行列间距。

:::demo

```vue
<template>
  <XFlex vertical gap="24">
    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px">统一间距 gap="16"</div>
      <div style="max-width: 500px; padding: 16px; background: #f5f5f5; border-radius: 4px">
        <XFlex wrap="wrap" gap="16">
          <XTag v-for="i in 8" :key="i">Tag {{ i }}</XTag>
        </XFlex>
      </div>
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px">不同行列间距 rowGap="32" columnGap="8"</div>
      <div style="max-width: 500px; padding: 16px; background: #f5f5f5; border-radius: 4px">
        <XFlex wrap="wrap" row-gap="32" column-gap="8">
          <XTag type="success" v-for="i in 8" :key="i">Tag {{ i }}</XTag>
        </XFlex>
      </div>
    </div>
  </XFlex>
</template>

<script setup>
import { XFlex, XTag } from '@xlui/xux-ui'
</script>
```

:::

## 组合使用

实际应用场景示例。

:::demo

```vue
<template>
  <XFlex vertical gap="24">
    <!-- 表单布局 -->
    <div>
      <h4 style="margin-bottom: 12px">表单布局</h4>
      <XFlex vertical gap="12" style="max-width: 400px">
        <XFlex align="center" gap="12">
          <label style="width: 70px; text-align: right">用户名:</label>
          <XInput v-model="formData.username" placeholder="请输入用户名" style="flex: 1" />
        </XFlex>
        <XFlex align="center" gap="12">
          <label style="width: 70px; text-align: right">密码:</label>
          <XInput v-model="formData.password" type="password" placeholder="请输入密码" style="flex: 1" />
        </XFlex>
        <XFlex justify="end" gap="12">
          <XButton>取消</XButton>
          <XButton type="primary">提交</XButton>
        </XFlex>
      </XFlex>
    </div>

    <!-- 标签组 -->
    <div>
      <h4 style="margin-bottom: 12px">标签组</h4>
      <XFlex wrap="wrap" gap="8">
        <XTag>Vue 3</XTag>
        <XTag type="success">TypeScript</XTag>
        <XTag type="warning">JavaScript</XTag>
        <XTag type="danger">CSS</XTag>
        <XTag type="info">HTML</XTag>
        <XTag>Vite</XTag>
        <XTag type="success">UnoCSS</XTag>
      </XFlex>
    </div>

    <!-- 操作按钮组 -->
    <div>
      <h4 style="margin-bottom: 12px">操作按钮组</h4>
      <XFlex gap="12" wrap="wrap">
        <XButton type="primary">新建</XButton>
        <XButton>编辑</XButton>
        <XButton type="danger">删除</XButton>
        <XButton type="warning">导出</XButton>
        <XButton type="success">审核</XButton>
      </XFlex>
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XButton, XInput, XTag } from '@xlui/xux-ui'

const formData = ref({
  username: '',
  password: ''
})
</script>
```

:::

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| inline | 是否为 inline-flex | `boolean` | — | `false` |
| vertical | 是否垂直布局 | `boolean` | — | `false` |
| justify | 主轴对齐方式 | `string` | `start` / `end` / `center` / `space-between` / `space-around` / `space-evenly` | `start` |
| align | 交叉轴对齐方式 | `string` | `start` / `end` / `center` / `stretch` / `baseline` | `start` |
| wrap | 是否换行 | `string` | `nowrap` / `wrap` / `wrap-reverse` | `nowrap` |
| gap | 间距（同时设置行和列） | `string \| number` | — | — |
| rowGap | 行间距 | `string \| number` | — | — |
| columnGap | 列间距 | `string \| number` | — | — |
| flex | flex 属性 | `string \| number` | — | — |
| tag | 自定义渲染标签 | `string` | — | `div` |

### Slots

| 名称 | 说明 |
|------|------|
| default | 默认插槽，放置子元素 |
