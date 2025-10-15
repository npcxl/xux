<template>
  <div class="x-popconfirm" ref="popconfirmRef">
    <div @click="handleTriggerClick" ref="triggerRef">
      <slot name="trigger"></slot>
    </div>
    
    <Teleport to="body">
      <Transition name="popconfirm-fade">
        <div
          v-if="visible"
          ref="popupRef"
          class="popconfirm-popup"
          :style="popupStyle"
          @click.stop
        >
          <div class="popconfirm-content">
            <div class="popconfirm-icon" v-if="!hideIcon">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path 
                  v-if="icon === 'warning'"
                  fill="#f59e0b" 
                  d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
                />
                <path 
                  v-else-if="icon === 'info'"
                  fill="#3b82f6" 
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                />
                <path 
                  v-else-if="icon === 'error'"
                  fill="#ef4444" 
                  d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
                />
                <path 
                  v-else
                  fill="#f59e0b" 
                  d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
                />
              </svg>
            </div>
            <div class="popconfirm-message">
              <div class="popconfirm-title">{{ title }}</div>
              <div v-if="description" class="popconfirm-description">{{ description }}</div>
            </div>
          </div>
          <div class="popconfirm-actions">
            <XButton 
              size="small" 
              @click="handleCancel"
            >
              {{ cancelText }}
            </XButton>
            <XButton 
              size="small" 
              type="primary"
              @click="handleConfirm"
            >
              {{ okText }}
            </XButton>
          </div>
        </div>
      </Transition>
    </Teleport>
    
    <div 
      v-if="visible" 
      class="popconfirm-overlay" 
      @click="handleOverlayClick"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import XButton from '../Button/index.vue'

export interface PopconfirmProps {
  title: string
  description?: string
  okText?: string
  cancelText?: string
  icon?: 'warning' | 'info' | 'error'
  hideIcon?: boolean
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

const props = withDefaults(defineProps<PopconfirmProps>(), {
  okText: '确定',
  cancelText: '取消',
  icon: 'warning',
  hideIcon: false,
  placement: 'top'
})

const emit = defineEmits(['confirm', 'cancel'])

const visible = ref(false)
const popconfirmRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const popupRef = ref<HTMLElement | null>(null)
const popupStyle = ref({})
const isHandlingAction = ref(false)

function handleTriggerClick() {
  visible.value = !visible.value
  if (visible.value) {
    updatePopupPosition()
  }
}

function updatePopupPosition() {
  if (!triggerRef.value) return
  
  const triggerRect = triggerRef.value.getBoundingClientRect()
  const style: any = {
    position: 'fixed',
    zIndex: 9999
  }
  
  const offset = 8
  
  switch (props.placement) {
    case 'top':
      style.left = `${triggerRect.left + triggerRect.width / 2}px`
      style.bottom = `${window.innerHeight - triggerRect.top + offset}px`
      style.transform = 'translateX(-50%)'
      break
    case 'bottom':
      style.left = `${triggerRect.left + triggerRect.width / 2}px`
      style.top = `${triggerRect.bottom + offset}px`
      style.transform = 'translateX(-50%)'
      break
    case 'left':
      style.right = `${window.innerWidth - triggerRect.left + offset}px`
      style.top = `${triggerRect.top + triggerRect.height / 2}px`
      style.transform = 'translateY(-50%)'
      break
    case 'right':
      style.left = `${triggerRect.right + offset}px`
      style.top = `${triggerRect.top + triggerRect.height / 2}px`
      style.transform = 'translateY(-50%)'
      break
  }
  
  popupStyle.value = style
}

function handleConfirm() {
  isHandlingAction.value = true
  emit('confirm')
  visible.value = false
  setTimeout(() => {
    isHandlingAction.value = false
  }, 100)
}

function handleCancel() {
  isHandlingAction.value = true
  emit('cancel')
  visible.value = false
  setTimeout(() => {
    isHandlingAction.value = false
  }, 100)
}

function handleOverlayClick() {
  visible.value = false
}

function handleClickOutside(e: MouseEvent) {
  if (!visible.value || isHandlingAction.value) return
  
  const target = e.target as Node
  
  // 检查点击是否在触发元素或弹窗内
  const isInTrigger = popconfirmRef.value?.contains(target)
  const isInPopup = popupRef.value?.contains(target)
  
  if (!isInTrigger && !isInPopup) {
    visible.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', updatePopupPosition)
  window.addEventListener('scroll', updatePopupPosition, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', updatePopupPosition)
  window.removeEventListener('scroll', updatePopupPosition, true)
})
</script>

<style lang="scss" scoped>
.x-popconfirm {
  display: inline-block;
  position: relative;
}

.popconfirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9998;
}

.popconfirm-popup {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12),
              0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 16px;
  min-width: 280px;
  max-width: 360px;
  
  .popconfirm-content {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
    
    .popconfirm-icon {
      flex-shrink: 0;
      
      svg {
        display: block;
      }
    }
    
    .popconfirm-message {
      flex: 1;
      
      .popconfirm-title {
        font-size: 14px;
        font-weight: 500;
        color: #1a1a1a;
        line-height: 1.5;
      }
      
      .popconfirm-description {
        font-size: 13px;
        color: #6b7280;
        margin-top: 4px;
        line-height: 1.5;
      }
    }
  }
  
  .popconfirm-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
}

.popconfirm-fade-enter-active,
.popconfirm-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.popconfirm-fade-enter-from,
.popconfirm-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-8px) !important;
}
</style>

