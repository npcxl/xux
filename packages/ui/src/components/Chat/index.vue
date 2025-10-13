<template>
  <div class="x-chat" :style="{ height: height }" :class="{ 'x-chat--compact': compact }">
    <!-- 聊天头部 -->
    <div v-if="showHeader" class="x-chat-header">
      <div class="x-chat-header-info">
        <div v-if="serviceAvatar" class="x-chat-avatar">
          <img :src="serviceAvatar" alt="客服" />
        </div>
        <div class="x-chat-header-text">
          <div class="x-chat-service-name">{{ serviceName }}</div>
          <div class="x-chat-service-status" :class="{ 'x-chat-service-status--online': serviceOnline }">
            <span class="x-chat-status-dot"></span>
            {{ serviceOnline ? '在线' : '离线' }}
          </div>
        </div>
      </div>
      <slot name="header-extra"></slot>
    </div>

    <!-- 消息列表 -->
    <div ref="messagesContainer" class="x-chat-messages" :style="{ height: height }">
      <div v-if="messages.length === 0" class="x-chat-empty">
        <Icon icon="mdi:chat-outline" />
        <p>{{ emptyText }}</p>
      </div>

      <div v-for="(message, index) in messages" :key="message.id || index" class="x-chat-message-wrapper">
        <!-- 时间分割线 -->
        <div v-if="showMessageTime(message, index)" class="x-chat-time-divider">
          <span>{{ formatTime(message.timestamp) }}</span>
        </div>

        <div 
          class="x-chat-message"
          :class="{
            'x-chat-message--user': message.type === 'user',
            'x-chat-message--service': message.type === 'service',
            'x-chat-message--system': message.type === 'system'
          }"
        >
          <!-- 系统消息 -->
          <div v-if="message.type === 'system'" class="x-chat-system-message">
            {{ message.content }}
          </div>

          <!-- 用户/客服消息 -->
          <template v-else>
            <!-- 头像（仅当提供图片时显示） -->
            <div v-if="message.avatar" class="x-chat-message-avatar">
              <img :src="message.avatar" :alt="message.type" />
            </div>

            <!-- 消息内容 -->
            <div class="x-chat-message-content">
              <!-- 消息气泡 -->
              <div class="x-chat-message-bubble">
                <div v-if="message.content" class="x-chat-message-text">{{ message.content }}</div>
                
                <!-- 图片 -->
                <div v-if="message.image" class="x-chat-message-image">
                  <img :src="message.image" :alt="message.content" @click="handleImageClick(message.image)" />
                </div>

                <!-- 商品卡片 -->
                <div v-if="message.product" class="x-chat-product-card" @click="handleProductClick(message.product)">
                  <img :src="message.product.image" :alt="message.product.name" class="x-chat-product-image" />
                  <div class="x-chat-product-info">
                    <div class="x-chat-product-name">{{ message.product.name }}</div>
                    <div class="x-chat-product-price">¥{{ message.product.price }}</div>
                  </div>
                </div>
              </div>

              <!-- 消息状态 -->
              <div class="x-chat-message-status">
                <span v-if="message.status === 'sending'" class="x-chat-message-loading">
                  <Icon icon="eos-icons:loading" />
                </span>
                <span v-else-if="message.status === 'failed'" class="x-chat-message-failed" @click="handleResend(message)">
                  <Icon icon="mdi:alert-circle" />
                  重发
                </span>
                <span v-else-if="message.status === 'sent' && message.type === 'user'" class="x-chat-message-time">
                  {{ formatMessageTime(message.timestamp) }}
                </span>
                <span v-else class="x-chat-message-time">
                  {{ formatMessageTime(message.timestamp) }}
                </span>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- 正在输入提示 -->
      <Transition name="x-chat-typing">
        <div v-if="isTyping" class="x-chat-message x-chat-message--service">
          <div v-if="serviceAvatar" class="x-chat-message-avatar">
            <img :src="serviceAvatar" alt="客服" />
          </div>
          <div class="x-chat-message-content">
            <div class="x-chat-message-bubble">
              <div class="x-chat-typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- 输入区域 -->
    <div v-if="showInput" class="x-chat-input-wrapper">
      <!-- 快捷回复 -->
      <div v-if="quickReplies.length > 0 && showQuickReplies" class="x-chat-quick-replies">
        <XButton
          v-for="(reply, index) in quickReplies"
          :key="index"
          size="small"
          type="text"
          @click="handleQuickReply(reply)"
        >
          {{ reply }}
        </XButton>
      </div>

      <div class="x-chat-input-container">
        <!-- 工具栏 -->
        <div v-if="showToolbar" class="x-chat-toolbar">
          <button 
            class="x-chat-tool-btn" 
            @click="handleEmojiClick"
            :title="emojiPickerVisible ? '关闭表情' : '选择表情'"
          >
            <Icon icon="mdi:emoticon-happy-outline" />
          </button>
          <button class="x-chat-tool-btn" @click="handleImageUpload" title="发送图片">
            <Icon icon="mdi:image-outline" />
          </button>
          <button v-if="enableProduct" class="x-chat-tool-btn" @click="handleProductSelect" title="发送商品">
            <Icon icon="mdi:package-variant" />
          </button>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            style="display: none"
            @change="handleFileChange"
          />
        </div>

        <!-- 输入框 -->
        <div class="x-chat-input-area">
          <textarea
            ref="inputRef"
            v-model="inputText"
            class="x-chat-input"
            rows="1"
            :style="textareaStyle"
            :placeholder="placeholder"
            :disabled="disabled"
            :maxlength="maxLength"
            @keydown.enter.exact="handleEnterSend"
            @keydown.ctrl.enter.exact="handleCtrlEnterSend"
            @input="handleInput"
            @focus="handleInputFocus"
            @blur="handleInputBlur"
          ></textarea>
          
          <!-- 字数统计 -->
          <div v-if="showWordCount" class="x-chat-word-count">
            {{ inputText.length }}/{{ maxLength }}
          </div>
        </div>

        <!-- 发送按钮 -->
        <XButton
          type="primary"
          :disabled="!canSend"
          @click="handleSend"
          icon="mdi:send"
          :title="sendOnEnter ? 'Enter发送，Ctrl+Enter换行' : 'Ctrl+Enter发送'"
          class="x-chat-send-btn"
        />
      </div>

      <!-- 简易表情选择器 -->
      <Transition name="x-chat-emoji">
        <div v-if="emojiPickerVisible" class="x-chat-emoji-picker">
          <button
            v-for="emoji in emojis"
            :key="emoji"
            class="x-chat-emoji-btn"
            @click="insertEmoji(emoji)"
          >
            {{ emoji }}
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import XButton from '../Button/index.vue'

/**
 * Chat 聊天组件
 * @displayName XChat
 */

export interface ChatMessage {
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

export interface ChatProps {
  /** 消息列表 */
  messages?: ChatMessage[]
  /** 聊天窗口高度 */
  height?: string
  /** 是否显示头部 */
  showHeader?: boolean
  /** 客服名称 */
  serviceName?: string
  /** 客服头像 */
  serviceAvatar?: string
  /** 客服在线状态 */
  serviceOnline?: boolean
  /** 是否显示输入框 */
  showInput?: boolean
  /** 输入框占位符 */
  placeholder?: string
  /** 是否禁用输入 */
  disabled?: boolean
  /** 最大输入长度 */
  maxLength?: number
  /** 是否显示字数统计 */
  showWordCount?: boolean
  /** Enter键发送（true: Enter发送，false: Ctrl+Enter发送） */
  sendOnEnter?: boolean
  /** 是否显示工具栏 */
  showToolbar?: boolean
  /** 是否启用商品卡片 */
  enableProduct?: boolean
  /** 是否正在输入 */
  isTyping?: boolean
  /** 快捷回复列表 */
  quickReplies?: string[]
  /** 是否显示快捷回复 */
  showQuickReplies?: boolean
  /** 空状态文本 */
  emptyText?: string
  /** 紧凑模式 */
  compact?: boolean
  /** 用户头像 */
  userAvatar?: string
  /** 输入框自动增高的最大高度，超过后出现滚动条（单位：px） */
  inputMaxHeight?: number
}

const props = withDefaults(defineProps<ChatProps>(), {
  messages: () => [],
  height: '500px',
  showHeader: true,
  serviceName: '客服小助手',
  serviceAvatar: '',
  serviceOnline: true,
  showInput: true,
  placeholder: '请输入消息...',
  disabled: false,
  maxLength: 500,
  showWordCount: false,
  sendOnEnter: true,
  showToolbar: true,
  enableProduct: true,
  isTyping: false,
  quickReplies: () => [],
  showQuickReplies: true,
  emptyText: '暂无消息',
  compact: false,
  userAvatar: '',
  inputMaxHeight: 200
})

const emit = defineEmits<{
  'send-message': [content: string]
  'send-image': [file: File]
  'select-product': []
  'click-product': [product: ChatMessage['product']]
  'click-image': [image: string]
  'resend': [message: ChatMessage]
  'input': [value: string]
  'focus': []
  'blur': []
}>()

// 输入框相关
const inputRef = ref<HTMLTextAreaElement>()
const inputText = ref('')
// 输入框滚动控制
const textareaOverflowY = ref<'hidden' | 'auto'>('hidden')
const textareaStyle = computed(() => {
  return {
    maxHeight: `${props.inputMaxHeight}px`,
    overflowY: textareaOverflowY.value
  } as Record<string, string>
})

const fileInput = ref<HTMLInputElement>()
const messagesContainer = ref<HTMLDivElement>()

// 表情选择器
const emojiPickerVisible = ref(false)
const emojis = [
  '😀', '😃', '😄', '😁', '😊', '😇', '🙂', '🙃', '😉', '😌',
  '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜',
  '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞',
  '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺',
  '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶',
  '👍', '👎', '👏', '🙌', '👐', '🤝', '🙏', '✨', '💖', '❤️'
]

// 计算属性
const canSend = computed(() => {
  return inputText.value.trim().length > 0 && !props.disabled
})

// 方法
const handleSend = () => {
  if (!canSend.value) return
  
  const content = inputText.value.trim()
  emit('send-message', content)
  inputText.value = ''
  
  // 调整文本框高度
  if (inputRef.value) {
    inputRef.value.style.height = 'auto'
  }
}

const handleEnterSend = (e: KeyboardEvent) => {
  if (props.sendOnEnter) {
    e.preventDefault()
    handleSend()
  }
}

const handleCtrlEnterSend = (e: KeyboardEvent) => {
  if (!props.sendOnEnter) {
    e.preventDefault()
    handleSend()
  } else {
    // 插入换行符
    const textarea = inputRef.value
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const value = inputText.value
      inputText.value = value.substring(0, start) + '\n' + value.substring(end)
      nextTick(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1
      })
    }
  }
}

const handleInput = () => {
  emit('input', inputText.value)
  
  // 自动调整文本框高度
  if (inputRef.value) {
    inputRef.value.style.height = 'auto'
    const max = props.inputMaxHeight
    const nextHeight = Math.min(inputRef.value.scrollHeight, max)
    inputRef.value.style.height = nextHeight + 'px'
    textareaOverflowY.value = inputRef.value.scrollHeight > max ? 'auto' : 'hidden'
  }
}

const handleInputFocus = () => {
  emit('focus')
}

const handleInputBlur = () => {
  emit('blur')
}

const handleEmojiClick = () => {
  emojiPickerVisible.value = !emojiPickerVisible.value
}

const insertEmoji = (emoji: string) => {
  if (inputRef.value) {
    const start = inputRef.value.selectionStart
    const end = inputRef.value.selectionEnd
    const value = inputText.value
    inputText.value = value.substring(0, start) + emoji + value.substring(end)
    
    nextTick(() => {
      if (inputRef.value) {
        inputRef.value.focus()
        const newPos = start + emoji.length
        inputRef.value.selectionStart = inputRef.value.selectionEnd = newPos
      }
    })
  } else {
    inputText.value += emoji
  }
}

const handleImageUpload = () => {
  fileInput.value?.click()
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    emit('send-image', file)
    // 清空文件选择
    target.value = ''
  }
}

const handleProductSelect = () => {
  emit('select-product')
}

const handleQuickReply = (reply: string) => {
  inputText.value = reply
  handleSend()
}

const handleProductClick = (product: ChatMessage['product']) => {
  emit('click-product', product)
}

const handleImageClick = (image: string) => {
  emit('click-image', image)
}

const handleResend = (message: ChatMessage) => {
  emit('resend', message)
}

// 时间格式化
const formatTime = (timestamp: number | Date) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  // 一分钟内
  if (diff < 60000) {
    return '刚刚'
  }
  
  // 一小时内
  if (diff < 3600000) {
    return `${Math.floor(diff / 60000)}分钟前`
  }
  
  // 今天
  if (date.toDateString() === now.toDateString()) {
    return `今天 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }
  
  // 昨天
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  if (date.toDateString() === yesterday.toDateString()) {
    return `昨天 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }
  
  // 其他
  return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

const formatMessageTime = (timestamp: number | Date) => {
  const date = new Date(timestamp)
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

const showMessageTime = (message: ChatMessage, index: number) => {
  if (index === 0) return true
  
  const prevMessage = props.messages[index - 1]
  if (!prevMessage) return true
  
  const diff = new Date(message.timestamp).getTime() - new Date(prevMessage.timestamp).getTime()
  // 超过5分钟显示时间
  return diff > 300000
}

// 滚动到底部
const scrollToBottom = (smooth = true) => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTo({
        top: messagesContainer.value.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto'
      })
    }
  })
}

// 监听消息变化，自动滚动到底部
watch(() => props.messages, () => {
  scrollToBottom()
}, { deep: true })

watch(() => props.isTyping, (val) => {
  if (val) {
    scrollToBottom()
  }
})

// 点击外部关闭表情选择器
const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (emojiPickerVisible.value && !target.closest('.x-chat-emoji-picker') && !target.closest('.x-chat-tool-btn')) {
    emojiPickerVisible.value = false
  }
}

onMounted(() => {
  scrollToBottom(false)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 暴露方法
defineExpose({
  scrollToBottom,
  focus: () => inputRef.value?.focus(),
  clear: () => { inputText.value = '' }
})
</script>

<style scoped>
.x-chat {
  display: flex;
  flex-direction: column;
  background-color: var(--x-color-white, #ffffff);
  border-radius: var(--x-radius-lg, 12px);
  overflow: hidden;
  font-family: var(--x-font-family, 'Segoe UI', sans-serif);
  box-shadow: var(--x-shadow-md, 0 4px 6px rgba(0, 0, 0, 0.1));
}

.x-chat--compact {
  box-shadow: none;
  border-radius: 0;
}

/* 头部 */
.x-chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background-color: var(--x-color-white, #ffffff);
  border-bottom: 1px solid var(--x-color-gray-200, #e5e7eb);
}

.x-chat-header-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.x-chat-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  font-size: 24px;
  flex-shrink: 0;
}

.x-chat-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.x-chat-header-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.x-chat-service-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--x-color-gray-900, #1a1a1a);
}

.x-chat-service-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--x-color-gray-500, #6b7280);
}

.x-chat-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--x-color-gray-400, #9ca3af);
}

.x-chat-service-status--online .x-chat-status-dot {
  background-color: var(--x-color-success, #10b981);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* 消息列表 */
.x-chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.x-chat-messages::-webkit-scrollbar {
  width: 6px;
}

.x-chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.x-chat-messages::-webkit-scrollbar-thumb {
  background-color: var(--x-color-gray-300, #d1d5db);
  border-radius: 3px;
}

.x-chat-messages::-webkit-scrollbar-thumb:hover {
  background-color: var(--x-color-gray-400, #9ca3af);
}

/* 空状态 */
.x-chat-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--x-color-gray-400, #9ca3af);
  font-size: 48px;
}

.x-chat-empty p {
  font-size: 14px;
  margin-top: 12px;
}

/* 时间分割线 */
.x-chat-time-divider {
  text-align: center;
  font-size: 12px;
  color: var(--x-color-gray-500, #6b7280);
  padding: 8px 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.x-chat-time-divider::before {
  content: '';
  flex: 1;
  height: 1px;
  background-color: var(--x-color-gray-200, #e5e7eb);
  margin-right: 12px;
}

.x-chat-time-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: var(--x-color-gray-200, #e5e7eb);
  margin-left: 12px;
}

.x-chat-time-divider span {
  background-color: #f9fafb;
  padding: 2px 12px;
  border-radius: 12px;
  white-space: nowrap;
}

/* 消息 */
.x-chat-message-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.x-chat-message {
  display: flex;
  gap: 12px;
  animation: message-in 0.3s ease-out;
}

@keyframes message-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.x-chat-message--user {
  flex-direction: row-reverse;
}

.x-chat-message--system {
  justify-content: center;
}

.x-chat-message-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  font-size: 20px;
  flex-shrink: 0;
}

.x-chat-message--user .x-chat-message-avatar {
  background-color: var(--x-color-gray-300, #d1d5db);
}

.x-chat-message-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.x-chat-message-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 70%;
}

.x-chat-message--user .x-chat-message-content {
  align-items: flex-end;
}

.x-chat-message-bubble {
  padding: 12px 16px;
  border-radius: 16px;
  word-wrap: break-word;
  animation: bubble-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}

@keyframes bubble-in {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.x-chat-message--service .x-chat-message-bubble {
  background-color: var(--x-color-white, #ffffff);
  border: 1px solid var(--x-color-gray-200, #e5e7eb);
  border-bottom-left-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.x-chat-message--user .x-chat-message-bubble {
  background-color: var(--x-color-gray-100, #f3f4f6);
  color: var(--x-color-gray-900, #1f2937);
  border: 1px solid var(--x-color-gray-200, #e5e7eb);
  border-bottom-right-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.x-chat-message-text {
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
}

/* 系统消息 */
.x-chat-system-message {
  padding: 8px 16px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  font-size: 13px;
  color: var(--x-color-gray-600, #4b5563);
  text-align: center;
}

/* 消息状态 */
.x-chat-message-status {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--x-color-gray-500, #6b7280);
  padding: 0 4px;
}

.x-chat-message--user .x-chat-message-status {
  justify-content: flex-end;
}

.x-chat-message-loading {
  display: flex;
  align-items: center;
  font-size: 14px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.x-chat-message-failed {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--x-color-danger, #ef4444);
  cursor: pointer;
  transition: opacity 0.2s;
}

.x-chat-message-failed:hover {
  opacity: 0.8;
}

/* 图片消息 */
.x-chat-message-image {
  margin-top: 4px;
}

.x-chat-message-image img {
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.x-chat-message-image img:hover {
  transform: scale(1.05);
}

/* 商品卡片 */
.x-chat-product-card {
  display: flex;
  gap: 12px;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 4px;
}

.x-chat-message--user .x-chat-product-card {
  background-color: var(--x-color-gray-100, #f3f4f6);
}

.x-chat-product-card:hover {
  background-color: rgba(0, 0, 0, 0.06);
}

.x-chat-message--user .x-chat-product-card:hover {
  background-color: var(--x-color-gray-200, #e5e7eb);
}

.x-chat-product-image {
  width: 60px;
  height: 60px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
}

.x-chat-product-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  flex: 1;
}

.x-chat-product-name {
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.x-chat-product-price {
  font-size: 16px;
  font-weight: 600;
  color: #ff6b35;
}

.x-chat-message--user .x-chat-product-price {
  color: var(--x-color-gray-900, #1f2937);
}

/* 正在输入动画 */
.x-chat-typing-indicator {
  display: flex;
  gap: 4px;
  padding: 4px;
}

.x-chat-typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--x-color-gray-400, #9ca3af);
  animation: typing 1.4s infinite;
}

.x-chat-typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.x-chat-typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
}

.x-chat-typing-enter-active,
.x-chat-typing-leave-active {
  transition: all 0.3s ease;
}

.x-chat-typing-enter-from,
.x-chat-typing-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 输入区域 */
.x-chat-input-wrapper {
  border-top: 1px solid var(--x-color-gray-200, #e5e7eb);
  background-color: var(--x-color-white, #ffffff);
  position: relative;
}

.x-chat-quick-replies {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  overflow-x: auto;
  border-bottom: 1px solid var(--x-color-gray-200, #e5e7eb);
  background-color: var(--x-color-white, #ffffff);
}

.x-chat-quick-replies::-webkit-scrollbar {
  height: 4px;
}

.x-chat-quick-replies::-webkit-scrollbar-track {
  background: transparent;
}

.x-chat-quick-replies::-webkit-scrollbar-thumb {
  background-color: var(--x-color-gray-300, #d1d5db);
  border-radius: 2px;
}

.x-chat-quick-replies .x-btn {
  border-radius: 20px;
  border: 1px solid var(--x-color-gray-300, #d1d5db);
  background-color: var(--x-color-white, #ffffff);
  color: var(--x-color-gray-700, #374151);
  white-space: nowrap;
}

.x-chat-quick-replies .x-btn:hover {
  border-color: var(--x-color-primary, #667eea);
  color: var(--x-color-primary, #667eea);
  background-color: rgba(102, 126, 234, 0.05);
}

.x-chat-input-container {
  display: flex;
  gap: 8px;
  padding: 16px 20px;
  align-items: center;
  background-color: var(--x-color-white, #ffffff);
}

.x-chat-toolbar {
  display: flex;
  gap: 8px;
}

.x-chat-tool-btn {
  width: 40px;
  height: 40px;
  border: 1px solid var(--x-color-gray-300, #d1d5db);
  background: var(--x-color-gray-100, #f3f4f6);
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--x-color-gray-600, #4b5563);
  transition: all 0.2s;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.x-chat-tool-btn:hover {
  background-color: var(--x-color-gray-200, #e5e7eb);
  color: var(--x-color-primary, #667eea);
}

.x-chat-input-area {
  flex: 1;
  position: relative;
}

.x-chat-input {
  width: 100%;
  min-height: 0;
  max-height: 200px;
  padding: 12px 16px;
  border: 1px solid var(--x-color-gray-300, #d1d5db);
  border-radius: 24px;
  font-size: 15px;
  font-family: inherit;
  resize: none;
  outline: none;
  transition: all 0.2s;
  line-height: 1.5;
  background-color: var(--x-color-white, #ffffff);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  overflow-y: hidden; /* 单行时隐藏滚动，超出再自适应 */
}

.x-chat-input:focus {
  border-color: var(--x-color-primary, #667eea);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15);
}

.x-chat-input:disabled {
  background-color: var(--x-color-gray-50, #f9fafb);
  cursor: not-allowed;
  opacity: 0.6;
}

.x-chat-word-count {
  position: absolute;
  right: 8px;
  bottom: 6px;
  font-size: 11px;
  color: var(--x-color-gray-400, #9ca3af);
  pointer-events: none;
}

.x-chat-send-btn {
  flex-shrink: 0;
  border-radius: 50% !important;
  width: 40px !important;
  height: 40px !important;
  padding: 0 !important;
  min-width: 40px !important;
  border: 1px solid var(--x-color-gray-300, #d1d5db) !important;
}

/* 表情选择器 */
.x-chat-emoji-picker {
  position: absolute;
  bottom: 100%;
  left: 16px;
  margin-bottom: 8px;
  padding: 12px;
  background-color: var(--x-color-white, #ffffff);
  border: 1px solid var(--x-color-gray-200, #e5e7eb);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-width: 400px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
}

.x-chat-emoji-picker::-webkit-scrollbar {
  width: 6px;
}

.x-chat-emoji-picker::-webkit-scrollbar-track {
  background: transparent;
}

.x-chat-emoji-picker::-webkit-scrollbar-thumb {
  background-color: var(--x-color-gray-300, #d1d5db);
  border-radius: 3px;
}

.x-chat-emoji-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 20px;
  border-radius: 6px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.x-chat-emoji-btn:hover {
  background-color: var(--x-color-gray-100, #f3f4f6);
  transform: scale(1.2);
}

.x-chat-emoji-enter-active,
.x-chat-emoji-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.x-chat-emoji-enter-from,
.x-chat-emoji-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 响应式 */
@media (max-width: 768px) {
  .x-chat-message-content {
    max-width: 80%;
  }
  
  .x-chat-emoji-picker {
    grid-template-columns: repeat(8, 1fr);
    max-width: 320px;
  }
  
  .x-chat-header {
    padding: 12px 16px;
  }
  
  .x-chat-messages {
    padding: 16px;
  }
  
  .x-chat-input-container {
    padding: 12px;
  }
}
</style>

