<template>
  <Teleport to="body">
    <Transition
      name="modal-mask"
    >
      <div
        v-if="visible"
        class="modal-mask"
        @click="handleMaskClick"
      >
        <Transition
          :name="fullscreen ? 'modal-fullscreen' : 'modal'"
        >
          <div
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
/* 遮罩层动画 - 渐显渐隐 */
.modal-mask-enter-active {
  animation: maskFadeIn 0.4s ease-out;
}

.modal-mask-leave-active {
  animation: maskFadeOut 0.3s ease-in;
}

@keyframes maskFadeIn {
  0% {
    opacity: 0;
    backdrop-filter: blur(0px);
    background-color: rgba(0, 0, 0, 0);
  }
  100% {
    opacity: 1;
    backdrop-filter: blur(8px);
    background-color: rgba(0, 0, 0, 0.6);
  }
}

@keyframes maskFadeOut {
  0% {
    opacity: 1;
    backdrop-filter: blur(8px);
    background-color: rgba(0, 0, 0, 0.6);
  }
  100% {
    opacity: 0;
    backdrop-filter: blur(0px);
    background-color: rgba(0, 0, 0, 0);
  }
}

.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--x-modal-mask-bg, rgba(0, 0, 0, 0.6));
  backdrop-filter: blur(8px);
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 2000px;
}

/* 普通模态框动画 - 弹出/缩放效果 */
.modal-enter-active {
  animation: modalPopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-leave-active {
  animation: modalPopOut 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

@keyframes modalPopIn {
  0% {
    opacity: 0;
    transform: scale(0.7);
    filter: blur(10px);
    box-shadow: 
      0 0 0 0 rgba(59, 130, 246, 0),
      0 0 0 0 rgba(147, 51, 234, 0),
      0 0 80px -20px rgba(0, 0, 0, 0);
  }
  
  50% {
    opacity: 0.9;
    transform: scale(1.05);
    filter: blur(2px);
    box-shadow: 
      0 0 60px 3px rgba(59, 130, 246, 0.6),
      0 0 100px 5px rgba(147, 51, 234, 0.5),
      0 40px 80px -20px rgba(0, 0, 0, 0.4);
  }
  
  100% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0px);
    box-shadow: 
      0 0 30px 0 rgba(59, 130, 246, 0.2),
      0 0 60px 0 rgba(147, 51, 234, 0.15),
      0 30px 70px -15px rgba(0, 0, 0, 0.35);
  }
}

@keyframes modalPopOut {
  0% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0px);
    box-shadow: 
      0 0 30px 0 rgba(59, 130, 246, 0.2),
      0 0 60px 0 rgba(147, 51, 234, 0.15),
      0 30px 70px -15px rgba(0, 0, 0, 0.35);
  }
  
  100% {
    opacity: 0;
    transform: scale(0.8);
    filter: blur(8px);
    box-shadow: 
      0 0 40px 0 rgba(59, 130, 246, 0.3),
      0 0 80px 0 rgba(147, 51, 234, 0.25),
      0 20px 50px -10px rgba(0, 0, 0, 0.2);
  }
}

/* 全屏模态框动画 - 弹出展开效果 */
.modal-fullscreen-enter-active {
  animation: fullscreenPopIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-fullscreen-leave-active {
  animation: fullscreenPopOut 0.35s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

@keyframes fullscreenPopIn {
  0% {
    opacity: 0;
    transform: scale(0.85);
    border-radius: 30px;
    filter: blur(12px);
    box-shadow: 
      0 0 0 0 rgba(59, 130, 246, 0),
      0 0 0 0 rgba(147, 51, 234, 0),
      inset 0 0 0 0 rgba(255, 255, 255, 0);
  }
  
  60% {
    opacity: 0.95;
    transform: scale(1.02);
    border-radius: 8px;
    filter: blur(2px);
    box-shadow: 
      0 0 80px 5px rgba(59, 130, 246, 0.6),
      0 0 120px 8px rgba(147, 51, 234, 0.5),
      inset 0 0 60px rgba(255, 255, 255, 0.12),
      0 30px 80px -25px rgba(0, 0, 0, 0.35);
  }
  
  100% {
    opacity: 1;
    transform: scale(1);
    border-radius: 0;
    filter: blur(0px);
    box-shadow: 
      0 0 40px 0 rgba(59, 130, 246, 0.25),
      0 0 80px 0 rgba(147, 51, 234, 0.2),
      inset 0 0 40px rgba(255, 255, 255, 0.05),
      0 30px 80px -20px rgba(0, 0, 0, 0.3);
  }
}

@keyframes fullscreenPopOut {
  0% {
    opacity: 1;
    transform: scale(1);
    border-radius: 0;
    filter: blur(0px);
    box-shadow: 
      0 0 40px 0 rgba(59, 130, 246, 0.25),
      0 0 80px 0 rgba(147, 51, 234, 0.2),
      inset 0 0 40px rgba(255, 255, 255, 0.05),
      0 30px 80px -20px rgba(0, 0, 0, 0.3);
  }
  
  100% {
    opacity: 0;
    transform: scale(0.9);
    border-radius: 24px;
    filter: blur(10px);
    box-shadow: 
      0 0 60px 3px rgba(59, 130, 246, 0.4),
      0 0 100px 5px rgba(147, 51, 234, 0.3),
      inset 0 0 30px rgba(255, 255, 255, 0.08),
      0 20px 60px -15px rgba(0, 0, 0, 0.25);
  }
}

.modal-container {
  position: relative;
  background: var(--x-bg-color, 
    linear-gradient(135deg, 
      rgba(255, 255, 255, 0.98) 0%, 
      rgba(255, 255, 255, 0.95) 100%));
  border-radius: var(--x-radius-lg, 16px);
  box-shadow: 
    var(--x-shadow-xl, 
      0 0 30px rgba(59, 130, 246, 0.15),
      0 0 60px rgba(147, 51, 234, 0.1),
      0 30px 70px -15px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.8));
  max-width: 100%;
  max-height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  will-change: transform, opacity, filter;
  border: 1px solid rgba(255, 255, 255, 0.3);
  /* 微妙的光泽效果 */
  backdrop-filter: blur(10px);
}

/* 为容器添加动态光效边框 */
.modal-container::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.3) 0%,
    rgba(147, 51, 234, 0.2) 50%,
    rgba(59, 130, 246, 0.3) 100%
  );
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0.6;
}

/* 内部光晕效果 */
.modal-container::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    circle at 50% 0%,
    rgba(59, 130, 246, 0.08) 0%,
    transparent 60%
  );
  pointer-events: none;
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
}

.modal-container--fullscreen .modal-header {
  padding: 24px 32px;
  background: var(--x-gradient-bg-light, linear-gradient(to bottom, #fafafa, #ffffff));
}

.modal-container--fullscreen .modal-body {
  padding: 32px;
}

.modal-container--fullscreen .modal-footer {
  padding: 20px 32px;
  background: var(--x-gradient-bg-light, linear-gradient(to top, #fafafa, #ffffff));
}

.modal-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 28px;
  border-bottom: 1px solid var(--x-color-gray-200, rgba(229, 231, 235, 0.6));
  flex-shrink: 0;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.8) 100%
  );
  backdrop-filter: blur(10px);
  z-index: 1;
}

.modal-header::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(59, 130, 246, 0.3) 20%,
    rgba(147, 51, 234, 0.2) 50%,
    rgba(59, 130, 246, 0.3) 80%,
    transparent 100%
  );
}

.modal-title {
  font-size: var(--x-font-size-lg, 20px);
  font-weight: 700;
  background: linear-gradient(
    135deg,
    var(--x-color-gray-900, #1a1a1a) 0%,
    var(--x-color-gray-700, #374151) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.modal-close {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 1px solid transparent;
  background: rgba(0, 0, 0, 0.02);
  color: var(--x-color-gray-500, #6b7280);
  cursor: pointer;
  border-radius: var(--x-radius-md, 8px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.modal-close::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.1) 0%,
    rgba(147, 51, 234, 0.1) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.modal-close:hover {
  background: linear-gradient(
    135deg,
    rgba(239, 68, 68, 0.1) 0%,
    rgba(220, 38, 38, 0.08) 100%
  );
  color: var(--x-color-red-600, #dc2626);
  border-color: rgba(239, 68, 68, 0.2);
  transform: scale(1.05) rotate(90deg);
  box-shadow: 
    0 4px 12px rgba(239, 68, 68, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.modal-close:hover::before {
  opacity: 1;
}

.modal-close:active {
  transform: scale(0.95) rotate(90deg);
}

.modal-body {
  position: relative;
  flex: 1;
  padding: 28px;
  overflow-y: auto;
  color: var(--x-color-gray-700, #374151);
  z-index: 1;
  /* 美化滚动条 */
  scrollbar-width: thin;
  scrollbar-color: rgba(59, 130, 246, 0.3) transparent;
}

.modal-body::-webkit-scrollbar {
  width: 8px;
}

.modal-body::-webkit-scrollbar-track {
  background: transparent;
}

.modal-body::-webkit-scrollbar-thumb {
  background: linear-gradient(
    180deg,
    rgba(59, 130, 246, 0.4) 0%,
    rgba(147, 51, 234, 0.3) 100%
  );
  border-radius: 4px;
  transition: background 0.3s ease;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(
    180deg,
    rgba(59, 130, 246, 0.6) 0%,
    rgba(147, 51, 234, 0.5) 100%
  );
}

.modal-footer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
  padding: 20px 28px;
  border-top: 1px solid var(--x-color-gray-200, rgba(229, 231, 235, 0.6));
  flex-shrink: 0;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.8) 100%
  );
  backdrop-filter: blur(10px);
  z-index: 1;
}

.modal-footer::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(59, 130, 246, 0.3) 20%,
    rgba(147, 51, 234, 0.2) 50%,
    rgba(59, 130, 246, 0.3) 80%,
    transparent 100%
  );
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
  width: 18px;
  height: 18px;
  border: 2.5px solid transparent;
  border-top-color: rgba(255, 255, 255, 0.9);
  border-right-color: rgba(255, 255, 255, 0.6);
  border-bottom-color: rgba(255, 255, 255, 0.3);
  border-left-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: 
    epicSpin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite,
    spinPulse 1.6s ease-in-out infinite;
  box-shadow: 
    0 0 8px rgba(255, 255, 255, 0.3),
    inset 0 0 8px rgba(255, 255, 255, 0.2);
  position: relative;
}

.loading-spinner::before {
  content: '';
  position: absolute;
  inset: -4px;
  border: 1px solid transparent;
  border-top-color: rgba(59, 130, 246, 0.4);
  border-radius: 50%;
  animation: epicSpin 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite reverse;
}

.loading-spinner::after {
  content: '';
  position: absolute;
  inset: 2px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.8) 0%,
    transparent 70%
  );
  border-radius: 50%;
  animation: spinGlow 1.6s ease-in-out infinite;
}

@keyframes epicSpin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spinPulse {
  0%, 100% {
    border-width: 2.5px;
    opacity: 1;
  }
  50% {
    border-width: 3px;
    opacity: 0.8;
  }
}

@keyframes spinGlow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.2);
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

