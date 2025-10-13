# Chat 聊天组件

一个功能完整的聊天组件，适用于电商客服场景，支持文字、图片、商品卡片等多种消息类型。

## 基础用法

最简单的聊天框示例，包含用户和客服的对话。

:::demo

```vue
<template>
  <XChat
    :messages="messages"
    :is-typing="isTyping"
    @send-message="handleSendMessage"
  />
</template>

<script setup>
import { ref } from 'vue'

const messages = ref([
  {
    id: 1,
    type: 'service',
    content: '您好！我是客服小助手，有什么可以帮助您的吗？',
    timestamp: Date.now() - 60000
  },
  {
    id: 2,
    type: 'user',
    content: '我想了解一下这款商品的详细信息',
    timestamp: Date.now() - 30000
  },
  {
    id: 3,
    type: 'service',
    content: '好的，请稍等，我马上为您查询',
    timestamp: Date.now()
  }
])

const isTyping = ref(false)

const handleSendMessage = (content) => {
  // 添加用户消息
  messages.value.push({
    id: Date.now(),
    type: 'user',
    content,
    timestamp: Date.now(),
    status: 'sent'
  })
  
  // 模拟客服正在输入
  isTyping.value = true
  
  // 模拟客服回复
  setTimeout(() => {
    isTyping.value = false
    messages.value.push({
      id: Date.now(),
      type: 'service',
      content: '收到您的消息，我们会尽快处理！',
      timestamp: Date.now()
    })
  }, 2000)
}
</script>
```

:::

## 在 Modal 中使用

将聊天组件嵌入到模态框中，适合作为网站右下角的客服窗口。

:::demo

```vue
<template>
  <XButton @click="chatVisible = true" icon="mdi:message-text">打开客服</XButton>
  
  <XModal
    v-model:visible="chatVisible"
    title="在线客服"
    :show-footer="false"
    size="large"
  >
    <XChat
      :messages="modalMessages"
      :is-typing="modalTyping"
      :show-header="false"
      height="500px"
      compact
      @send-message="handleModalSend"
    />
  </XModal>
</template>

<script setup>
import { ref } from 'vue'

const chatVisible = ref(false)
const modalMessages = ref([
  {
    id: 1,
    type: 'service',
    content: '您好，欢迎咨询！',
    timestamp: Date.now()
  }
])
const modalTyping = ref(false)

const handleModalSend = (content) => {
  modalMessages.value.push({
    id: Date.now(),
    type: 'user',
    content,
    timestamp: Date.now()
  })
  
  modalTyping.value = true
  setTimeout(() => {
    modalTyping.value = false
    modalMessages.value.push({
      id: Date.now(),
      type: 'service',
      content: '感谢您的留言，我们会尽快回复！',
      timestamp: Date.now()
    })
  }, 1500)
}
</script>
```

:::

## 带头像的消息

为用户和客服添加头像，让对话更加生动。

:::demo

```vue
<template>
  <XChat
    :messages="avatarMessages"
    service-name="李客服"
    :service-online="true"
    height="400px"
    @send-message="handleAvatarSend"
  />
</template>

<script setup>
import { ref } from 'vue'

const avatarMessages = ref([
  {
    id: 1,
    type: 'service',
    content: '您好，很高兴为您服务！我是李客服。',
    timestamp: Date.now() - 120000
  },
  {
    id: 2,
    type: 'user',
    content: '你好！请问有什么优惠活动吗？',
    timestamp: Date.now() - 60000
  },
  {
    id: 3,
    type: 'service',
    content: '我们现在有新用户专享优惠，全场8折！',
    timestamp: Date.now()
  }
])

const handleAvatarSend = (content) => {
  avatarMessages.value.push({
    id: Date.now(),
    type: 'user',
    content,
    timestamp: Date.now()
  })
}
</script>
```

:::

## 随机头像示例

使用随机头像服务快速生成用户/客服头像，便于联调与演示。

::::demo

```vue
<template>
  <XChat
    :messages="messages"
    service-name="小明客服"
    :service-avatar="serviceAvatar"
    :service-online="true"
    :show-header="true"
    height="420px"
  />
</template>

<script setup>
import { ref } from 'vue'

// 这里使用 i.pravatar.cc / picsum.photos 作为随机头像/图片源
const userAvatar = `https://i.pravatar.cc/100?u=user-${Date.now()}`
const serviceAvatar = `https://i.pravatar.cc/100?u=service-${Date.now()}`

const messages = ref([
  {
    id: 1,
    type: 'service',
    content: '您好～我是您的专属客服，请问要咨询什么？',
    timestamp: Date.now() - 120000,
    avatar: serviceAvatar
  },
  {
    id: 2,
    type: 'user',
    content: '想看看这件衣服的上身效果图',
    timestamp: Date.now() - 60000,
    avatar: userAvatar
  },
  {
    id: 3,
    type: 'service',
    content: '好的，我这边给您找一下实拍图～',
    timestamp: Date.now() - 30000,
    avatar: serviceAvatar
  },
  {
    id: 4,
    type: 'service',
    image: `https://picsum.photos/seed/${Date.now() % 1000}/300/200`,
    timestamp: Date.now(),
    avatar: serviceAvatar
  }
])
</script>
```

::::

## 图片消息

支持发送和显示图片消息。

:::demo

```vue
<template>
  <XChat
    :messages="imageMessages"
    height="450px"
    :enable-image="true"
    @send-message="handleImageSend"
    @send-image="handleSendImage"
    @click-image="handleClickImage"
  />
</template>

<script setup>
import { ref } from 'vue'

const imageMessages = ref([
  {
    id: 1,
    type: 'service',
    content: '请问需要什么帮助？',
    timestamp: Date.now() - 60000
  },
  {
    id: 2,
    type: 'user',
    content: '这是商品的问题图片',
    image: 'https://picsum.photos/300/200',
    timestamp: Date.now()
  }
])

const handleImageSend = (content) => {
  imageMessages.value.push({
    id: Date.now(),
    type: 'user',
    content,
    timestamp: Date.now()
  })
}

const handleSendImage = (file) => {
  const tempId = Date.now()
  imageMessages.value.push({
    id: tempId,
    type: 'user',
    content: '正在发送图片...',
    timestamp: Date.now(),
    status: 'sending'
  })
  
  setTimeout(() => {
    const index = imageMessages.value.findIndex(m => m.id === tempId)
    if (index > -1) {
      imageMessages.value[index] = {
        id: tempId,
        type: 'user',
        image: URL.createObjectURL(file),
        timestamp: Date.now(),
        status: 'sent'
      }
    }
  }, 1000)
}

const handleClickImage = (imageUrl) => {
  window.open(imageUrl, '_blank')
}
</script>
```

:::

## 商品卡片消息

在聊天中分享商品信息，适合电商场景的客服推荐。

:::demo

```vue
<template>
  <XChat
    :messages="productMessages"
    :enable-product="true"
    :product-provider="pickProduct"
    height="450px"
    @send-message="handleProductSend"
    @send-product="handleSendProduct"
    @click-product="handleClickProduct"
  />
</template>

<script setup>
import { ref } from 'vue'

const productMessages = ref([
  {
    id: 1,
    type: 'user',
    content: '有推荐的手机吗？',
    timestamp: Date.now() - 120000
  },
  {
    id: 2,
    type: 'service',
    content: '为您推荐这款热销商品：',
    timestamp: Date.now() - 60000
  },
  {
    id: 3,
    type: 'service',
    product: {
      id: 1001,
      name: 'iPhone 15 Pro Max 256GB 钛金色',
      price: 9999,
      image: 'https://picsum.photos/200/200?random=1'
    },
    timestamp: Date.now()
  }
])

const handleProductSend = (content) => {
  productMessages.value.push({
    id: Date.now(),
    type: 'user',
    content,
    timestamp: Date.now()
  })
}

const handleClickProduct = (product) => {
  alert(`查看商品：${product.name}`)
}

const handleSendProduct = (product) => {
  productMessages.value.push({
    id: Date.now(),
    type: 'user',
    product,
    timestamp: Date.now(),
    status: 'sent'
  })
}

// 可选：演示如何通过接口获取商品数据
const pickProduct = async () => {
  const res = await fetch('https://dummyjson.com/products/2').then(r => r.json())
  return { id: res.id, name: res.title, price: res.price, image: res.thumbnail }
}
</script>
```

:::

## 系统消息

显示系统提示消息，用于通知会话状态变化。

:::demo

```vue
<template>
  <XChat 
    :messages="systemMessages" 
    height="400px"
    @send-message="handleSystemSend" 
  />
</template>

<script setup>
import { ref } from 'vue'

const systemMessages = ref([
  {
    id: 1,
    type: 'system',
    content: '客服已进入会话',
    timestamp: Date.now() - 180000
  },
  {
    id: 2,
    type: 'service',
    content: '您好，请问有什么可以帮助您的？',
    timestamp: Date.now() - 120000
  },
  {
    id: 3,
    type: 'user',
    content: '我的订单什么时候发货？',
    timestamp: Date.now() - 60000
  },
  {
    id: 4,
    type: 'system',
    content: '您的订单已发货',
    timestamp: Date.now()
  }
])

const handleSystemSend = (content) => {
  systemMessages.value.push({
    id: Date.now(),
    type: 'user',
    content,
    timestamp: Date.now()
  })
}
</script>
```

:::

## 快捷回复

提供常用的快捷回复选项，提高沟通效率。

:::demo

```vue
<template>
  <XChat
    :messages="quickMessages"
    :quick-replies="quickReplies"
    :show-quick-replies="true"
    height="450px"
    @send-message="handleQuickSend"
  />
</template>

<script setup>
import { ref } from 'vue'

const quickMessages = ref([
  {
    id: 1,
    type: 'service',
    content: '您好！请选择您需要的服务',
    timestamp: Date.now()
  }
])

const quickReplies = [
  '查询订单',
  '申请退款',
  '物流信息',
  '商品咨询',
  '售后服务'
]

const handleQuickSend = (content) => {
  quickMessages.value.push({
    id: Date.now(),
    type: 'user',
    content,
    timestamp: Date.now()
  })
  
  setTimeout(() => {
    let replyContent = ''
    switch (content) {
      case '查询订单':
        replyContent = '请提供您的订单号，我来帮您查询'
        break
      case '申请退款':
        replyContent = '请告诉我您要退款的原因，我会尽快为您处理'
        break
      case '物流信息':
        replyContent = '请提供您的订单号，我查询一下物流信息'
        break
      default:
        replyContent = '收到您的消息，正在为您处理...'
    }
    
    quickMessages.value.push({
      id: Date.now(),
      type: 'service',
      content: replyContent,
      timestamp: Date.now()
    })
  }, 1000)
}
</script>
```

:::

## 消息状态

显示消息的发送状态（发送中、已发送、发送失败）。

:::demo

```vue
<template>
  <XChat
    :messages="statusMessages"
    height="400px"
    @send-message="handleStatusSend"
    @resend="handleResend"
  />
</template>

<script setup>
import { ref } from 'vue'

const statusMessages = ref([
  {
    id: 1,
    type: 'service',
    content: '您好！',
    timestamp: Date.now() - 60000
  }
])

const handleStatusSend = (content) => {
  const newMessage = {
    id: Date.now(),
    type: 'user',
    content,
    timestamp: Date.now(),
    status: 'sending'
  }
  
  statusMessages.value.push(newMessage)
  
  // 模拟发送（有30%概率失败）
  setTimeout(() => {
    const index = statusMessages.value.findIndex(m => m.id === newMessage.id)
    if (index > -1) {
      const success = Math.random() > 0.3
      statusMessages.value[index].status = success ? 'sent' : 'failed'
    }
  }, 1000)
}

const handleResend = (message) => {
  const index = statusMessages.value.findIndex(m => m.id === message.id)
  if (index > -1) {
    statusMessages.value[index].status = 'sending'
    
    setTimeout(() => {
      statusMessages.value[index].status = 'sent'
    }, 1000)
  }
}
</script>
```

:::

## 正在输入动画

客服正在输入时显示动画提示，提升用户体验。

:::demo

```vue
<template>
  <div class="space-y-3">
    <XButton @click="toggleTyping" type="primary">
      {{ isTypingDemo ? '停止输入' : '模拟客服输入' }}
    </XButton>
    
    <XChat
      :messages="typingMessages"
      :is-typing="isTypingDemo"
      height="400px"
      @send-message="handleTypingSend"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const typingMessages = ref([
  {
    id: 1,
    type: 'user',
    content: '你好，在吗？',
    timestamp: Date.now()
  }
])

const isTypingDemo = ref(false)

const toggleTyping = () => {
  isTypingDemo.value = !isTypingDemo.value
  
  if (isTypingDemo.value) {
    setTimeout(() => {
      isTypingDemo.value = false
      typingMessages.value.push({
        id: Date.now(),
        type: 'service',
        content: '在的！请问有什么可以帮您？',
        timestamp: Date.now()
      })
    }, 3000)
  }
}

const handleTypingSend = (content) => {
  typingMessages.value.push({
    id: Date.now(),
    type: 'user',
    content,
    timestamp: Date.now()
  })
  
  isTypingDemo.value = true
  setTimeout(() => {
    isTypingDemo.value = false
    typingMessages.value.push({
      id: Date.now(),
      type: 'service',
      content: '收到您的消息！',
      timestamp: Date.now()
    })
  }, 2000)
}
</script>
```

:::

## 紧凑模式

使用紧凑模式，去除外部阴影和边框，适合嵌入到其他容器中。

:::demo

```vue
<template>
  <div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
    <XChat
      :messages="compactMessages"
      :compact="true"
      height="350px"
      @send-message="handleCompactSend"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const compactMessages = ref([
  {
    id: 1,
    type: 'service',
    content: '这是紧凑模式的聊天框',
    timestamp: Date.now()
  }
])

const handleCompactSend = (content) => {
  compactMessages.value.push({
    id: Date.now(),
    type: 'user',
    content,
    timestamp: Date.now()
  })
}
</script>
```

:::

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| messages | 消息列表 | `ChatMessage[]` | `[]` |
| height | 聊天窗口高度 | `string` | `'500px'` |
| showHeader | 是否显示头部 | `boolean` | `true` |
| serviceName | 客服名称 | `string` | `'客服小助手'` |
| serviceAvatar | 客服头像 | `string` | `''` |
| serviceOnline | 客服在线状态 | `boolean` | `true` |
| showInput | 是否显示输入框 | `boolean` | `true` |
| placeholder | 输入框占位符 | `string` | `'请输入消息...'` |
| disabled | 是否禁用输入 | `boolean` | `false` |
| maxLength | 最大输入长度 | `number` | `500` |
| showWordCount | 是否显示字数统计 | `boolean` | `false` |
| sendOnEnter | Enter键发送 | `boolean` | `true` |
| showToolbar | 是否显示工具栏 | `boolean` | `true` |
| enableProduct | 是否启用商品卡片 | `boolean` | `true` |
| isTyping | 是否正在输入 | `boolean` | `false` |
| quickReplies | 快捷回复列表 | `string[]` | `[]` |
| showQuickReplies | 是否显示快捷回复 | `boolean` | `true` |
| emptyText | 空状态文本 | `string` | `'暂无消息'` |
| compact | 紧凑模式 | `boolean` | `false` |
| userAvatar | 用户头像 | `string` | `''` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| send-message | 发送消息时触发 | `(content: string)` |
| send-image | 发送图片时触发 | `(file: File)` |
| select-product | 选择商品时触发 | `()` |
| click-product | 点击商品卡片时触发 | `(product: Product)` |
| click-image | 点击图片时触发 | `(image: string)` |
| resend | 重新发送消息时触发 | `(message: ChatMessage)` |
| input | 输入框内容变化时触发 | `(value: string)` |
| focus | 输入框获得焦点时触发 | `()` |
| blur | 输入框失去焦点时触发 | `()` |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| header-extra | 头部右侧额外内容 |

## Methods

通过 ref 可以调用以下方法：

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| scrollToBottom | 滚动到底部 | `()` |
| focus | 聚焦输入框 | `()` |
| clear | 清空输入框 | `()` |

## Types

### ChatMessage

```typescript
interface ChatMessage {
  id?: string | number
  type: 'user' | 'service' | 'system'
  content?: string
  timestamp: number | Date
  avatar?: string
  status?: 'sending' | 'sent' | 'failed'
  image?: string
  product?: {
    id: string | number
    name: string
    price: number
    image: string
  }
}
```
## 键盘快捷键

- `Enter`: 发送消息（默认）或换行（取决于 `sendOnEnter` 配置）
- `Ctrl + Enter`: 换行（默认）或发送消息（取决于 `sendOnEnter` 配置）

## 注意事项

1. 消息列表会自动滚动到底部
2. 时间戳超过5分钟会显示时间分割线
3. 输入框支持自动高度调整
4. 表情选择器点击外部自动关闭
5. 图片消息点击可放大查看
6. 商品卡片点击触发 `click-product` 事件
7. 发送失败的消息可以点击重新发送

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
