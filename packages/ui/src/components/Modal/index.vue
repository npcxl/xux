<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="visible"
        class="modal-mask"
        @click="handleMaskClick"
      >
        <Transition
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-300"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="visible"
            class="modal-container"
            :class="[
              `modal-container--${size}`,
              { 'modal-container--fullscreen': fullscreen }
            ]"
            :style="{ width: width }"
            @click.stop
          >
            <!-- 头部 -->
            <div v-if="showHeader" class="modal-header">
              <slot name="header">
                <h3 class="modal-title">{{ title }}</h3>
              </slot>
              <XButton
                v-if="showClose"
                size="small"
                class="modal-close"
                icon="mdi:close"
                @click="handleClose"
                aria-label="关闭"
              >
                <Icon icon="mdi:close" />
              </XButton>
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

<script setup lang="ts">
import { watch } from 'vue'
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
  escClosable: true
})

const emit = defineEmits<{
  'update:visible': [visible: boolean]
  'close': []
  'cancel': []
  'confirm': []
  'opened': []
  'closed': []
}>()

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

// 键盘事件
const handleEsc = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.escClosable && props.visible) {
    handleClose()
  }
}

// 监听 visible 变化
watch(() => props.visible, (val) => {
  if (val) {
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    emit('opened')
  } else {
    document.removeEventListener('keydown', handleEsc)
    document.body.style.overflow = ''
    emit('closed')
  }
})

// 暴露方法
defineExpose({
  close: handleClose
})
</script>

<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-container {
  position: relative;
  background-color: white;
  border-radius: var(--x-radius-lg, 12px);
  box-shadow: var(--x-shadow-xl, 0 20px 25px rgba(0, 0, 0, 0.15));
  max-width: 100%;
  max-height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--x-color-gray-200, #e5e7eb);
  flex-shrink: 0;
}

.modal-title {
  font-size: var(--x-font-size-lg, 18px);
  font-weight: 600;
  color: var(--x-color-gray-900, #1a1a1a);
  margin: 0;
}

.modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  background: none;
  color: var(--x-color-gray-500, #6b7280);
  cursor: pointer;
  border-radius: var(--x-radius-md, 6px);
  transition: all var(--x-transition-fast, 0.15s ease);
}

.modal-close:hover {
  background-color: var(--x-color-gray-100, #f3f4f6);
  color: var(--x-color-gray-700, #374151);
}

.modal-body {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  color: var(--x-color-gray-700, #374151);
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid var(--x-color-gray-200, #e5e7eb);
  flex-shrink: 0;
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
  background-color: white;
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
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
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

