# Msg 消息提示

全局消息提示组件，用于显示操作反馈、通知和确认对话框。

## 基础用法

通过函数调用显示不同类型的消息。

:::demo

```vue
<template>
  <div class="flex flex-wrap gap-2">
    <XButton @click="showInfo" type="primary">
      信息提示
    </XButton>
    <XButton @click="showSuccess" type="success">
      成功提示
    </XButton>
    <XButton @click="showWarning" type="warning">
      警告提示
    </XButton>
    <XButton @click="showDanger" type="danger">
      错误提示
    </XButton>
  </div>
</template>

<script setup>
import { xlMsg } from '@xlui/xux-ui'

const msg = xlMsg()

const showInfo = () => {
  msg.info('这是一条信息提示')
}

const showSuccess = () => {
  msg.success('操作成功！')
}

const showWarning = () => {
  msg.warning('请注意此操作')
}

const showDanger = () => {
  msg.danger('操作失败')
}
</script>
```

:::

## 带内容的消息

可以添加更多的描述内容。

:::demo

```vue
<template>
  <div class="flex flex-wrap gap-2">
    <XButton @click="showDetailInfo" type="primary">
      详细信息
    </XButton>
    <XButton @click="showDetailSuccess" type="success">
      详细成功
    </XButton>
  </div>
</template>

<script setup>
import { xlMsg } from '@xlui/xux-ui'

const msg = xlMsg()

const showDetailInfo = () => {
  msg.info('系统通知', '您有一条新的消息，请及时查看。')
}

const showDetailSuccess = () => {
  msg.success('保存成功', '您的设置已经成功保存，将在下次登录时生效。')
}
</script>
```

:::

## 自定义持续时间

设置消息显示的持续时间（毫秒）。

:::demo

```vue
<template>
  <div class="flex flex-wrap gap-2">
    <XButton @click="showShort" type="primary">
      1秒消失
    </XButton>
    <XButton @click="showLong" type="success">
      5秒消失
    </XButton>
    <XButton @click="showPermanent" type="danger">
      不自动消失
    </XButton>
  </div>
</template>

<script setup>
import { xlMsg } from '@xlui/xux-ui'

const msg = xlMsg()

const showShort = () => {
  msg.info('快速消息', '1秒后消失', 1000)
}

const showLong = () => {
  msg.info('长时间消息', '5秒后消失', 5000)
}

const showPermanent = () => {
  msg.info('持久消息', '不会自动消失，需要手动关闭', 0)
}
</script>
```

:::

## 确认对话框

显示需要用户确认的对话框。

:::demo

```vue
<template>
  <div class="flex flex-wrap gap-2">
    <XButton @click="showConfirm" type="primary">
      普通确认
    </XButton>
    <XButton @click="showDeleteConfirm" type="danger">
      删除确认
    </XButton>
    <XButton @click="showWarningConfirm" type="warning">
      警告确认
    </XButton>
  </div>
</template>

<script setup>
import { xlMsg } from '@xlui/xux-ui'

const msg = xlMsg()

const showConfirm = () => {
  msg.confirm({
    title: '确认操作',
    content: '您确定要执行此操作吗？',
    confirmText: '确定',
    cancelText: '取消',
    onConfirm: () => {
      msg.success('已确认')
    },
    onCancel: () => {
      msg.info('已取消')
    }
  })
}

const showDeleteConfirm = () => {
  msg.confirm({
    title: '删除确认',
    content: '此操作将永久删除该文件，是否继续？',
    type: 'danger',
    confirmText: '删除',
    cancelText: '取消',
    onConfirm: () => {
      msg.success('删除成功', '文件已被删除')
    },
    onCancel: () => {
      msg.info('已取消删除')
    }
  })
}

const showWarningConfirm = () => {
  msg.confirm({
    title: '警告',
    content: '此操作可能会影响系统性能，确定继续吗？',
    type: 'warning',
    confirmText: '继续',
    cancelText: '取消',
    onConfirm: () => {
      msg.warning('操作进行中...')
    }
  })
}
</script>
```

:::

## API

### xlMsg 方法

```typescript
import { xlMsg } from '@xlui/xux-ui'

const msg = xlMsg()
```

#### 消息提示方法

| 方法 | 说明 | 参数 |
|------|------|------|
| show | 显示消息 | `(options: MessageOptions)` |
| success | 成功消息 | `(title: string, content?: string, duration?: number)` |
| danger | 错误消息 | `(title: string, content?: string, duration?: number)` |
| warning | 警告消息 | `(title: string, content?: string, duration?: number)` |
| info | 信息消息 | `(title: string, content?: string, duration?: number)` |
| confirm | 确认对话框 | `(options: ConfirmOptions)` |
| remove | 移除消息 | `(messageId: string)` |

### MessageOptions

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 消息标题 | `string` | - |
| content | 消息内容 | `string` | - |
| type | 消息类型 | `'success' \| 'danger' \| 'warning' \| 'info'` | `'info'` |
| duration | 持续时间（毫秒），0 表示不自动关闭 | `number` | `3000` |

### ConfirmOptions

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 对话框标题 | `string` | - |
| content | 对话框内容 | `string` | - |
| confirmText | 确认按钮文本 | `string` | `'确认'` |
| cancelText | 取消按钮文本 | `string` | `'取消'` |
| type | 对话框类型 | `'success' \| 'danger' \| 'warning' \| 'info'` | `'info'` |
| onConfirm | 确认回调 | `() => void` | - |
| onCancel | 取消回调 | `() => void` | - |


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