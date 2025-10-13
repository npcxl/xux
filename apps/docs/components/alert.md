# Alert 警告提示

居中显示的警告提示，支持自动关闭和手动关闭。

## 基础用法

四种类型的 Alert：成功、信息、警告和错误。

:::demo

```vue
<template>
  <div class="flex gap-3">
    <XButton type="success" @click="showSuccess">成功提示</XButton>
    <XButton type="primary" @click="showInfo">信息提示</XButton>
    <XButton type="warning" @click="showWarning">警告提示</XButton>
    <XButton type="danger" @click="showError">错误提示</XButton>
  </div>
</template>

<script setup lang="ts">
import { useAlert } from '@xlui/xux-ui'

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

## 带标题的 Alert

可以添加标题，使信息更清晰。

:::demo

```vue
<template>
  <div class="flex flex-col gap-3">
    <XButton type="success" @click="showWithTitle">带标题的提示</XButton>
  </div>
</template>

<script setup lang="ts">
import { useAlert } from '@xlui/xux-ui'

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

## 自定义关闭时间

通过 `duration` 属性设置自动关闭时间，单位为毫秒。设置为 0 则不自动关闭。

:::demo

```vue
<template>
  <div class="flex  gap-3">
    <XButton @click="show1s">1秒后关闭</XButton>
    <XButton @click="show5s">5秒后关闭</XButton>
    <XButton @click="showNoClose">不自动关闭</XButton>
  </div>
</template>

<script setup lang="ts">
import { useAlert } from '@xlui/xux-ui'

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

## 手动关闭

可以通过返回的 `close` 方法手动关闭 Alert。

:::demo

```vue
<template>
  <div class="flex gap-3">
    <XButton @click="showManualClose">显示提示</XButton>
    <XButton type="danger" @click="closeAlert" :disabled="!alertInstance">手动关闭</XButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAlert } from '@xlui/xux-ui'

const alert = useAlert()
const alertInstance = ref<any>(null)

const showManualClose = () => {
  alertInstance.value = alert.info('这条消息不会自动关闭', { duration: 0 })
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

## 禁用关闭按钮

设置 `closable: false` 可以隐藏关闭按钮。

:::demo

```vue
<template>
  <div class="flex flex-col gap-3">
    <XButton @click="showNoCloseBtn">无关闭按钮（3秒后自动关闭）</XButton>
  </div>
</template>

<script setup lang="ts">
import { useAlert } from '@xlui/xux-ui'

const alert = useAlert()

const showNoCloseBtn = () => {
  alert.info('这条消息没有关闭按钮，3秒后自动关闭', {
    duration: 3000,
    closable: false
  })
}
</script>
```

:::

## API

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| show | 显示 Alert | `(options: AlertOptions)` | `{ close: () => void }` |
| success | 显示成功提示 | `(content: string, options?: Partial<AlertOptions>)` | `{ close: () => void }` |
| error | 显示错误提示 | `(content: string, options?: Partial<AlertOptions>)` | `{ close: () => void }` |
| warning | 显示警告提示 | `(content: string, options?: Partial<AlertOptions>)` | `{ close: () => void }` |
| info | 显示信息提示 | `(content: string, options?: Partial<AlertOptions>)` | `{ close: () => void }` |

### AlertOptions

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| title | 标题 | `string` | — | — |
| content | 内容 | `string` | — | — |
| type | 类型 | `string` | `success` / `info` / `warning` / `error` | `info` |
| duration | 自动关闭时间（毫秒），0 表示不自动关闭 | `number` | — | `5000` |
| closable | 是否显示关闭按钮 | `boolean` | — | `true` |


## 贡献者

<div class="contributors">
  <div class="contributor-item">
    <a href="https://gitee.com/leheya" target="_blank" rel="noopener noreferrer">
      <img 
        src="https://foruda.gitee.com/avatar/1751620424517657404/10604783_leheya_1751620424.png!avatar200" 
        alt="leheya"
        class="contributor-avatar"
      />
      <span class="contributor-name">无敌暴龙神</span>
    </a>
  </div>
  <!-- <div class="contributor-item">
    <a href="https://gitee.com/haijun-li" target="_blank" rel="noopener noreferrer">
      <img 
        src="https://p3.itc.cn/images01/20230307/e9d72e3788844ed1a9259e442899e1bd.png" 
        alt="lihaijun"
        class="contributor-avatar"
      />
      <span class="contributor-name">lihaijun</span>
    </a>
  </div> -->
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