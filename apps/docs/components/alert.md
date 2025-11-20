# Alert 警告提示

居中显示的警告提示，支持自动关闭和手动关闭。

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 32px;">

<div>

## 基础用法

四种类型的 Alert：成功、信息、警告和错误。

:::demo

```vue
<template>
  <XFlex gap="12" wrap="wrap">
    <XButton type="success" @click="showSuccess">成功提示</XButton>
    <XButton type="primary" @click="showInfo">信息提示</XButton>
    <XButton type="warning" @click="showWarning">警告提示</XButton>
    <XButton type="danger" @click="showError">错误提示</XButton>
  </XFlex>
</template>

<script setup>
import { XFlex, XButton, useAlert } from '@xlui/xux-ui'

const alert = useAlert()

const showSuccess = () => {
  alert.success('操作成功！所有更改已保存。')
}

const showInfo = () => {
  alert.info('这是一条信息提示，请注意查看。')
}

const showWarning = () => {
  alert.warning('警告：请谨慎操作下一步。')
}

const showError = () => {
  alert.error('错误：操作失败，请重试。')
}
</script>
```

:::

## 自定义关闭时间

通过 `duration` 属性设置自动关闭时间，单位为毫秒。设置为 0 则不自动关闭。

:::demo

```vue
<template>
  <XFlex gap="12" wrap="wrap">
    <XButton @click="show1s">1秒后关闭</XButton>
    <XButton @click="show5s">5秒后关闭</XButton>
    <XButton @click="showNoClose">不自动关闭</XButton>
  </XFlex>
</template>

<script setup>
import { XFlex, XButton, useAlert } from '@xlui/xux-ui'

const alert = useAlert()

const show1s = () => {
  alert.info('这条消息1秒后自动关闭', { duration: 1000 })
}

const show5s = () => {
  alert.info('这条消息5秒后自动关闭', { duration: 5000 })
}

const showNoClose = () => {
  alert.warning('这条消息不会自动关闭，请手动点击关闭按钮', { duration: 0 })
}
</script>
```

:::

</div>

<div>

## 带标题的 Alert

可以添加标题，使信息更清晰。

:::demo

```vue
<template>
  <XButton type="success" @click="showWithTitle">带标题的提示</XButton>
</template>

<script setup>
import { XButton, useAlert } from '@xlui/xux-ui'

const alert = useAlert()

const showWithTitle = () => {
  alert.show({
    title: '操作成功',
    content: '您的订单已提交，我们会尽快为您处理。订单号：#12345',
    type: 'success'
  })
}
</script>
```

:::

## 手动关闭

可以通过返回的 `close` 方法手动关闭 Alert。

:::demo

```vue
<template>
  <XFlex gap="12" wrap="wrap">
    <XButton @click="showManualClose">显示提示</XButton>
    <XButton type="danger" @click="closeAlert" :disabled="!alertInstance">关闭提示</XButton>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XButton, useAlert } from '@xlui/xux-ui'

const alert = useAlert()
const alertInstance = ref(null)

const showManualClose = () => {
  alertInstance.value = alert.info('这条消息需要手动关闭', { duration: 0 })
}

const closeAlert = () => {
  if (alertInstance.value) {
    alertInstance.value.close()
    alertInstance.value = null
  }
}
</script>
```

:::

</div>

</div>

## API

### useAlert()

| 方法 | 说明 | 参数 |
|------|------|------|
| success | 显示成功提示 | `(content: string, options?: AlertOptions)` |
| info | 显示信息提示 | `(content: string, options?: AlertOptions)` |
| warning | 显示警告提示 | `(content: string, options?: AlertOptions)` |
| error | 显示错误提示 | `(content: string, options?: AlertOptions)` |
| show | 显示自定义提示 | `(options: AlertOptions)` |

### AlertOptions

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| title | 标题 | `string` | `''` |
| content | 内容 | `string` | `''` |
| type | 类型 | `'success' \| 'info' \| 'warning' \| 'error'` | `'info'` |
| duration | 自动关闭时间（毫秒），0 为不自动关闭 | `number` | `5000` |
| closable | 是否显示关闭按钮 | `boolean` | `true` |
