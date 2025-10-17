# Result 结果

用于反馈一系列操作任务的处理结果。

<div style="columns: 2; column-gap: 32px; margin-top: 32px;">

<div style="break-inside: avoid; margin-bottom: 24px;">

## 成功状态

操作成功的结果展示。

:::demo

```vue
<template>
  <XResult
    status="success"
    title="提交成功"
    sub-title="您的订单已成功提交"
  >
    <template #extra>
      <XButton type="primary">查看订单</XButton>
    </template>
  </XResult>
</template>

<script setup>
import { XResult, XButton } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 失败状态

操作失败的结果展示。

:::demo

```vue
<template>
  <XResult
    status="error"
    title="操作失败"
    sub-title="抱歉，操作失败，请稍后重试"
  >
    <template #extra>
      <XButton type="primary">重新尝试</XButton>
    </template>
  </XResult>
</template>

<script setup>
import { XResult, XButton } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 警告状态

警告提示的结果展示。

:::demo

```vue
<template>
  <XResult
    status="warning"
    title="警告提示"
    sub-title="检测到异常情况，请注意检查"
  >
    <template #extra>
      <XButton type="warning">处理异常</XButton>
    </template>
  </XResult>
</template>

<script setup>
import { XResult, XButton } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 信息状态

普通信息的结果展示。

:::demo

```vue
<template>
  <XResult
    status="info"
    title="信息提示"
    sub-title="这是一条普通的信息提示"
  >
    <template #extra>
      <XButton>我知道了</XButton>
    </template>
  </XResult>
</template>

<script setup>
import { XResult, XButton } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 404 页面

页面不存在的结果展示。

:::demo

```vue
<template>
  <XResult
    status="404"
    title="页面不存在"
    sub-title="抱歉，您访问的页面不存在"
  >
    <template #extra>
      <XButton type="primary">返回首页</XButton>
    </template>
  </XResult>
</template>

<script setup>
import { XResult, XButton } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 403 无权限

无访问权限的结果展示。

:::demo

```vue
<template>
  <XResult
    status="403"
    title="无访问权限"
    sub-title="抱歉，您没有权限访问此页面"
  >
    <template #extra>
      <XFlex gap="12" justify="center">
        <XButton type="primary">返回首页</XButton>
        <XButton>联系管理员</XButton>
      </XFlex>
    </template>
  </XResult>
</template>

<script setup>
import { XFlex, XResult, XButton } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 500 服务器错误

服务器错误的结果展示。

:::demo

```vue
<template>
  <XResult
    status="500"
    title="服务器错误"
    sub-title="抱歉，服务器出现了一些问题"
  >
    <template #extra>
      <XFlex gap="12" justify="center">
        <XButton type="primary">刷新页面</XButton>
        <XButton>返回首页</XButton>
      </XFlex>
    </template>
  </XResult>
</template>

<script setup>
import { XFlex, XResult, XButton } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 自定义图标

使用插槽自定义图标。

:::demo

```vue
<template>
  <XResult status="success">
    <template #icon>
      <div style="font-size: 64px">🎉</div>
    </template>
    <template #title>
      恭喜您完成任务！
    </template>
    <template #subTitle>
      您已获得 100 积分奖励
    </template>
    <template #extra>
      <XButton type="primary">查看积分</XButton>
    </template>
  </XResult>
</template>

<script setup>
import { XResult, XButton } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 自定义内容

使用插槽自定义标题和描述。

:::demo

```vue
<template>
  <XResult status="success">
    <template #title>
      <div style="font-size: 20px; font-weight: 600">订单提交成功！</div>
    </template>
    <template #subTitle>
      <div>
        <p>订单号：<span style="font-family: monospace">202410150001</span></p>
        <p style="margin-top: 8px">预计 3-5 个工作日送达</p>
      </div>
    </template>
    <template #extra>
      <XFlex gap="12" justify="center">
        <XButton type="primary">查看订单</XButton>
        <XButton>继续购物</XButton>
      </XFlex>
    </template>
  </XResult>
</template>

<script setup>
import { XFlex, XResult, XButton } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 实际应用

表单提交成功场景。

:::demo

```vue
<template>
  <XResult
    status="success"
    title="注册成功"
    sub-title="欢迎加入我们，您的账号已创建成功"
  >
    <template #extra>
      <XFlex gap="12" justify="center">
        <XButton type="primary">立即登录</XButton>
        <XButton>完善资料</XButton>
      </XFlex>
    </template>
  </XResult>
</template>

<script setup>
import { XFlex, XResult, XButton } from '@xlui/xux-ui'
</script>
```

:::

</div>

</div>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| status | 结果状态 | `'success' \| 'error' \| 'warning' \| 'info' \| '404' \| '403' \| '500'` | `'info'` |
| title | 标题 | `string` | `''` |
| sub-title | 副标题 | `string` | `''` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| icon | 自定义图标 |
| title | 自定义标题 |
| subTitle | 自定义副标题 |
| extra | 底部操作区 |
