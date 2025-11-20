<template>
  <Teleport to="body">
    <Transition
      name="modal-mask"
    >
      <div
        v-if="visible"
        class="modal-mask"
        :class="{ 'modal-mask--hidden': !showMask }"
        :style="{ zIndex: modalZIndex }"
        @click="handleMaskClick"
      >
        <Transition
          :name="fullscreen ? 'modal-fullscreen' : 'modal'"
        >
          <div
            ref="modalRef"
            class="modal-container"
            :class="[
              `modal-container--${size}`,
              { 'modal-container--fullscreen': fullscreen },
              { 'modal-container--draggable': draggable && !fullscreen },
              { 'modal-container--dragging': isDragging },
              { 'modal-container--no-mask': !showMask }
            ]"
            :style="{ 
              width: width,
              transform: modalTransform
            }"
            @click.stop
            @mousedown="handleDragStart"
          >
            <!-- 头部 -->
            <div 
              v-if="showHeader" 
              class="modal-header"
              :class="{ 'modal-header--draggable': draggable && !fullscreen }"
            >
              <slot name="header">
                <h3 class="modal-title">{{ title }}</h3>
              </slot>
              <button
                v-if="showClose"
                class="modal-close"
                @click="handleClose"
                aria-label="关闭"
              >
              <Icon icon="mdi:close" />
              </button>
            </div>

            <!-- 内容 -->
            <div class="modal-body">
              <slot></slot>
            </div>

            <!-- 底部 -->
            <div v-if="showFooter" class="modal-footer">
              <slot name="footer">
                <XButton
                  v-if="showCancel"
                  size="small"
                  ghost
                  type="danger"
                
                  @click="handleCancel"
                >
                  {{ cancelText }}
                </XButton>
                <XButton
                  v-if="showConfirm"
                  size="small"
                  ghost
                  type="primary"
              
                  @click="handleConfirm"
                  :disabled="confirmLoading"
                >
                  <span v-if="confirmLoading" class="loading-spinner"></span>
                  {{ confirmText }}
                </XButton>
              </slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
import { ref as globalRef } from 'vue'

// 全局 Modal 实例栈，用于管理多个弹框的层级关系（所有 Modal 实例共享）
const modalStack: symbol[] = []

// 栈变化版本号，用于触发响应式更新
const stackVersion = globalRef(0)

// 触发栈更新
const updateStack = () => {
  stackVersion.value++
}
</script>

<script setup lang="ts">
import { watch, onMounted, onUnmounted, computed, ref } from 'vue'
import { Icon } from '@iconify/vue'

/**
 * Modal 模态框组件
 * @displayName XModal
 */

export interface ModalProps {
  visible?: boolean
  title?: string
  width?: string
  size?: 'small' | 'medium' | 'large'
  fullscreen?: boolean
  showHeader?: boolean
  showFooter?: boolean
  showClose?: boolean
  showCancel?: boolean
  showConfirm?: boolean
  cancelText?: string
  confirmText?: string
  confirmLoading?: boolean
  maskClosable?: boolean
  escClosable?: boolean
  /** 是否可拖拽 */
  draggable?: boolean
  /** 是否显示蒙版 */
  showMask?: boolean
}

const props = withDefaults(defineProps<ModalProps>(), {
  visible: false,
  title: '提示',
  size: 'medium',
  fullscreen: false,
  showHeader: true,
  showFooter: true,
  showClose: true,
  showCancel: true,
  showConfirm: true,
  cancelText: '取消',
  confirmText: '确定',
  confirmLoading: false,
  maskClosable: true,
  escClosable: true,
  draggable: false,
  showMask: true
})

const emit = defineEmits<{
  'update:visible': [visible: boolean]
  'close': []
  'cancel': []
  'confirm': []
  'opened': []
  'closed': []
}>()

// 创建唯一的 Modal 实例 ID
const modalId = Symbol('modal')

// 基础 z-index
const BASE_Z_INDEX = 1000

// 计算当前 Modal 的 z-index（根据在栈中的位置）
const modalZIndex = computed(() => {
  // 依赖 stackVersion 以触发响应式更新
  stackVersion.value
  const index = modalStack.indexOf(modalId)
  return index >= 0 ? BASE_Z_INDEX + index : BASE_Z_INDEX
})

// 拖拽相关状态
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })
const modalPosition = ref({ x: 0, y: 0 })
const modalRef = ref<HTMLElement | null>(null)

// 拖拽开始
const handleDragStart = (e: MouseEvent) => {
  if (!props.draggable || props.fullscreen) return
  
  const target = e.target as HTMLElement
  // 只有点击标题栏时才能拖拽
  if (!target.closest('.modal-header')) return
  
  isDragging.value = true
  dragOffset.value = {
    x: e.clientX - modalPosition.value.x,
    y: e.clientY - modalPosition.value.y
  }
  
  document.addEventListener('mousemove', handleDragMove)
  document.addEventListener('mouseup', handleDragEnd)
  e.preventDefault()
}

// 拖拽移动
const handleDragMove = (e: MouseEvent) => {
  if (!isDragging.value) return
  
  modalPosition.value = {
    x: e.clientX - dragOffset.value.x,
    y: e.clientY - dragOffset.value.y
  }
}

// 拖拽结束
const handleDragEnd = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', handleDragMove)
  document.removeEventListener('mouseup', handleDragEnd)
}

// 计算Modal的transform样式
const modalTransform = computed(() => {
  if (props.fullscreen || (!props.draggable && modalPosition.value.x === 0 && modalPosition.value.y === 0)) {
    return ''
  }
  return `translate(${modalPosition.value.x}px, ${modalPosition.value.y}px)`
})

const handleClose = () => {
  emit('update:visible', false)
  emit('close')
}

const handleCancel = () => {
  emit('cancel')
  emit('update:visible', false)
}

const handleConfirm = () => {
  emit('confirm')
}

const handleMaskClick = () => {
  if (props.maskClosable) {
    handleClose()
  }
}

// 全局 ESC 键盘事件处理
const handleGlobalEsc = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    // 获取栈顶的 Modal（最上层的弹框）
    const topModalId = modalStack[modalStack.length - 1]
    
    // 只有当前 Modal 是栈顶时才处理 ESC 事件
    if (topModalId === modalId && props.escClosable && props.visible) {
      handleClose()
    }
  }
}

// 将当前 Modal 添加到栈顶
const pushToStack = () => {
  if (!modalStack.includes(modalId)) {
    modalStack.push(modalId)
    updateStack() // 触发响应式更新
  }
}

// 从栈中移除当前 Modal
const removeFromStack = () => {
  const index = modalStack.indexOf(modalId)
  if (index > -1) {
    modalStack.splice(index, 1)
    updateStack() // 触发响应式更新
  }
}

// 监听 visible 变化
watch(() => props.visible, (val) => {
  if (val) {
    // 打开弹框：添加到栈顶
    pushToStack()
    
    // 只有第一个弹框时才禁止 body 滚动
    if (modalStack.length === 1) {
      document.body.style.overflow = 'hidden'
    }
    
    // 重置拖拽位置
    modalPosition.value = { x: 0, y: 0 }
    
    emit('opened')
  } else {
    // 关闭弹框：从栈中移除
    removeFromStack()
    
    // 只有所有弹框都关闭时才恢复 body 滚动
    if (modalStack.length === 0) {
      document.body.style.overflow = ''
    }
    
    emit('closed')
  }
})

// 组件挂载时添加全局 ESC 事件监听
onMounted(() => {
  document.addEventListener('keydown', handleGlobalEsc)
})

// 组件卸载时移除事件监听和栈中的记录
onUnmounted(() => {
  document.removeEventListener('keydown', handleGlobalEsc)
  document.removeEventListener('mousemove', handleDragMove)
  document.removeEventListener('mouseup', handleDragEnd)
  removeFromStack()
  
  // 如果是最后一个 Modal 被卸载，恢复 body 滚动
  if (modalStack.length === 0) {
    document.body.style.overflow = ''
  }
})

// 暴露方法
defineExpose({
  close: handleClose
})
</script>

<style scoped>
/* 遮罩层动画 - 渐显渐隐 */
.modal-mask-enter-active {
  animation: maskFadeIn 0.25s ease-out;
}

.modal-mask-leave-active {
  animation: maskFadeOut 0.2s ease-out;
}

@keyframes maskFadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes maskFadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--x-mask-color, rgba(0, 0, 0, 0.4));
  backdrop-filter: blur(20px);
  /* z-index 由组件动态设置 */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 隐藏蒙版 - 只保留一点点暗色来区分层级 */
.modal-mask--hidden {
  background-color: rgba(0, 0, 0, 0.05);
  backdrop-filter: none;
}

/* 普通模态框动画 - 从上方滑入 */
.modal-enter-active {
  animation: modalSlideIn 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.modal-leave-active {
  animation: modalSlideOut 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes modalSlideIn {
  0% {
    opacity: 0;
    transform: translateY(-10px) scale(0.98);
  }
  
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes modalSlideOut {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  
  100% {
    opacity: 0;
    transform: translateY(-8px) scale(0.98);
  }
}

/* 全屏模态框动画 - 从上方滑入 */
.modal-fullscreen-enter-active {
  animation: fullscreenSlideIn 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.modal-fullscreen-leave-active {
  animation: fullscreenSlideOut 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes fullscreenSlideIn {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fullscreenSlideOut {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  
  100% {
    opacity: 0;
    transform: translateY(-8px);
  }
}

.modal-container {
  position: relative;
  background: var(--x-bg-color, #FFFFFF);
  border-radius: var(--x-radius-lg, 14px);
  max-width: 100%;
  max-height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--x-border-color-lighter, #E5E5E7);
  transition: box-shadow 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* 可拖拽的Modal */
.modal-container--draggable {
  cursor: default;
}

/* 拖拽中的Modal */
.modal-container--dragging {
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.25);
  cursor: move;
  user-select: none;
}

/* 无蒙版时的Modal - 加强阴影来区分层级 */
.modal-container--no-mask {
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.35), 
              0 10px 30px rgba(0, 0, 0, 0.25),
              0 0 0 1px rgba(0, 0, 0, 0.05);
}




.modal-container--small {
  width: 400px;
}

.modal-container--medium {
  width: 600px;
}

.modal-container--large {
  width: 800px;
}

.modal-container--fullscreen {
  width: 100vw !important;
  height: 100vh !important;
  max-height: 100vh;
  border-radius: 0;
  margin: 0;
  border: none;
}

.modal-container--fullscreen .modal-header {
  padding: 20px 28px;
}

.modal-container--fullscreen .modal-body {
  padding: 28px;
}

.modal-container--fullscreen .modal-footer {
  padding: 16px 28px;
}

.modal-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  flex-shrink: 0;
  background: var(--x-bg-color, #FFFFFF);
  z-index: 1;
}

/* 可拖拽的标题栏 */
.modal-header--draggable {
  cursor: move;
  user-select: none;
}

.modal-title {
  font-size: var(--x-font-size-lg, 17px);
  font-weight: 600;
  font-family: var(--x-font-family);
  color: var(--x-text-color-primary);
  margin: 0;
  letter-spacing: -0.4px;
}

.modal-close {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  background: var(--x-fill-color);
  color: var(--x-text-color-secondary, #8E8E93);
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.modal-close:hover {
  background: var(--x-fill-color-hover);
  color: var(--x-text-color-primary);
  transform: scale(1.1);
}

.modal-close:active {
  transform: scale(0.95);
}

.modal-body {
  position: relative;
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  font-family: var(--x-font-family);
  color: var(--x-text-color-regular);
  line-height: 1.5;
  z-index: 1;
  /* 美化滚动条 */
  scrollbar-width: thin;
  scrollbar-color: rgba(142, 142, 147, 0.3) transparent;
}

.modal-body::-webkit-scrollbar {
  width: 6px;
}

.modal-body::-webkit-scrollbar-track {
  background: transparent;
}

.modal-body::-webkit-scrollbar-thumb {
  background: rgba(142, 142, 147, 0.3);
  border-radius: 3px;
  transition: background 0.2s ease;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background: rgba(142, 142, 147, 0.5);
}

.modal-footer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 12px 20px 16px;
  flex-shrink: 0;
  background: var(--x-bg-color, #FFFFFF);
  z-index: 1;
}

.modal-btn {
  padding: 8px 16px;
  font-size: var(--x-font-size-sm, 14px);
  font-weight: 500;
  border-radius: var(--x-radius-md, 6px);
  cursor: pointer;
  transition: all var(--x-transition-fast, 0.15s ease);
  border: 1px solid;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.modal-btn--cancel {
  background-color: var(--x-bg-color, white);
  border-color: var(--x-color-gray-300, #d1d5db);
  color: var(--x-color-gray-700, #374151);
}

.modal-btn--cancel:hover {
  background-color: var(--x-color-gray-50, #f9fafb);
  border-color: var(--x-color-gray-400, #9ca3af);
}

.modal-btn--confirm {
  background-color: var(--x-color-primary, #1a1a1a);
  border-color: var(--x-color-primary, #1a1a1a);
  color: white;
}

.modal-btn--confirm:hover:not(:disabled) {
  background-color: var(--x-color-primary-dark, #0d0d0d);
}

.modal-btn--confirm:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 响应式 */
@media (max-width: 768px) {
  .modal-mask {
    padding: 10px;
  }
  
  .modal-container--small,
  .modal-container--medium,
  .modal-container--large {
    width: 100%;
  }
  
  .modal-header {
    padding: 16px;
  }
  
  .modal-body {
    padding: 16px;
  }
  
  .modal-footer {
    padding: 12px 16px;
  }
}
</style>

