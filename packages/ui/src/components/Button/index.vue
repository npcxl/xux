<template>
  <button 
    :class="buttonClass"
    :disabled="disabled || loading"
    @click="handleClick"
    @mousedown="handleMouseDown"
    ref="buttonRef"
  >
    <!-- 波纹效果 -->
    <span 
      v-for="ripple in ripples" 
      :key="ripple.id"
      class="x-btn-ripple"
      :style="ripple.style"
    ></span>
    
    <!-- 左侧图标 -->
    <span v-if="icon && !loading" class="x-btn-icon">
      <Icon :icon="icon" />
    </span>
    
    <!-- 加载图标 -->
    <span v-if="loading" class="x-btn-loading">
      <Icon icon="eos-icons:loading" />
    </span>
    
    <!-- 按钮内容 如果没有内容，则不显示-->
    <span v-if="$slots.default && !loading" class="x-btn-content">
      <slot />
    </span>
    
    <!-- 右侧图标 -->
    <span v-if="iconRight && !loading" class="x-btn-icon">
      <Icon :icon="iconRight" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'

/**
 * Button 按钮组件
 * @displayName XButton
 */

type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'text' | 'link'
type ButtonSize = 'small' | 'medium' | 'large'

interface Props {
  /**
   * 按钮类型
   * @values default, primary, success, warning, danger, text, link
   */
  type?: ButtonType
  /**
   * 按钮尺寸
   * @values small, medium, large
   */
  size?: ButtonSize
  /**
   * 左侧图标（使用 iconify 图标名）
   * @example "mdi:cart"
   */
  icon?: string
  /**
   * 右侧图标（使用 iconify 图标名）
   * @example "mdi:arrow-right"
   */
  iconRight?: string
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否加载中
   */
  loading?: boolean
  /**
   * 是否为块级按钮
   */
  block?: boolean
  /**
   * 是否为圆形按钮
   */
  round?: boolean
  /**
   * 是否为幽灵按钮（透明背景，只有边框）
   */
  ghost?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'medium',
  disabled: false,
  loading: false,
  block: false,
  round: false,
  ghost: false
})

const emit = defineEmits<{
  /**
   * 点击按钮时触发
   */
  (e: 'click', event: MouseEvent): void
}>()

// 波纹效果
interface Ripple {
  id: number
  style: {
    left: string
    top: string
  }
}

const buttonRef = ref<HTMLButtonElement>()
const ripples = ref<Ripple[]>([])
let rippleId = 0

const buttonClass = computed(() => {
  return [
    'x-btn',
    `x-btn-${props.type}`,
    `x-btn-${props.size}`,
    {
      'x-btn-disabled': props.disabled,
      'x-btn-loading': props.loading,
      'x-btn-block': props.block,
      'x-btn-round': props.round,
      'x-btn-ghost': props.ghost,
    }
  ]
})

function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}

function handleMouseDown(event: MouseEvent) {
  if (props.disabled || props.loading) return
  
  const button = buttonRef.value
  if (!button) return
  
  const rect = button.getBoundingClientRect()
  const ripple: Ripple = {
    id: rippleId++,
    style: {
      left: `${event.clientX - rect.left}px`,
      top: `${event.clientY - rect.top}px`,
    }
  }
  
  ripples.value.push(ripple)
  
  setTimeout(() => {
    const index = ripples.value.findIndex(r => r.id === ripple.id)
    if (index > -1) {
      ripples.value.splice(index, 1)
    }
  }, 600)
}
</script>

<style scoped>
.x-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: 500;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  white-space: nowrap;
  outline: none;
  overflow: hidden;
  transform: translateY(0);
}

.x-btn:active:not(.x-btn-disabled):not(.x-btn-loading) {
  transform: translateY(1px);
  box-shadow: var(--x-shadow-sm, 0 2px 4px rgba(0, 0, 0, 0.1));
}

/* 波纹效果 */
.x-btn-ripple {
  position: absolute;
  border-radius: var(--x-radius-full, 50%);
  background-color: rgba(255, 255, 255, 0.4);
  width: 0;
  height: 0;
  pointer-events: none;
  animation: ripple-animation 0.6s ease-out;
  transform: translate(-50%, -50%);
}

@keyframes ripple-animation {
  to {
    width: 300px;
    height: 300px;
    opacity: 0;
  }
}

/* 图标和内容布局 */
.x-btn-icon {
  display: inline-flex;
  align-items: center;
  font-size: 1.2em;
  animation: icon-in 0.3s ease-out;
}

.x-btn-content {
  display: inline-flex;
  align-items: center;
}

@keyframes icon-in {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 尺寸 */
.x-btn-small {
  padding: 4px 12px;
  font-size: 14px;
  border-radius: 4px;
  height: 28px;
}

.x-btn-medium {
  padding: 8px 16px;  
  font-size: 14px;
  border-radius: 6px;
  height: 36px;
}

.x-btn-large {
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
  height: 44px;
}

/* 类型 - default */
.x-btn-default {
  background-color: var(--x-color-white, #ffffff);
  border-color: var(--x-color-gray-300, #cacaca);
  color: var(--x-color-black, #1a1a1a);
  box-shadow: var(--x-shadow-sm, 0 1px 2px rgba(26, 26, 26, 0.05));
}

.x-btn-default:hover:not(.x-btn-disabled):not(.x-btn-loading) {
  border-color: var(--x-color-primary, #1a1a1a);
  color: var(--x-color-primary, #1a1a1a);
  box-shadow: var(--x-shadow-primary, 0 4px 12px rgba(26, 26, 26, 0.3));
  transform: translateY(-2px);
}

/* 类型 - primary */
.x-btn-primary {
  background: var(--x-gradient-primary, linear-gradient(135deg, #ff6b35 0%, #ff8c61 100%));
  border-color: var(--x-color-primary, #ff6b35);
  color: var(--x-color-white, #ffffff);
  box-shadow: var(--x-shadow-primary, 0 4px 12px rgba(255, 107, 53, 0.3));
}

.x-btn-primary:hover:not(.x-btn-disabled):not(.x-btn-loading) {
  background: var(--x-gradient-primary-hover, linear-gradient(135deg, #ff8c61 0%, #ffad8d 100%));
  box-shadow: var(--x-shadow-primary-lg, 0 8px 24px rgba(255, 107, 53, 0.4));
  transform: translateY(-2px);
}

/* 类型 - success */
.x-btn-success {
  background: var(--x-gradient-success, linear-gradient(135deg, #10b981 0%, #059669 100%));
  border-color: var(--x-color-success, #10b981);
  color: var(--x-color-white, #ffffff);
  box-shadow: var(--x-shadow-success, 0 4px 12px rgba(16, 185, 129, 0.3));
}

.x-btn-success:hover:not(.x-btn-disabled):not(.x-btn-loading) {
  background: var(--x-gradient-success-hover, linear-gradient(135deg, var(--x-color-success-light, #34d399) 0%, var(--x-color-success, #10b981) 100%));
  box-shadow: var(--x-shadow-success-lg, 0 6px 16px rgba(16, 185, 129, 0.4));
  transform: translateY(-2px);
}

/* 类型 - warning */
.x-btn-warning {
  background: var(--x-gradient-warning, linear-gradient(135deg, #f59e0b 0%, #d97706 100%));
  border-color: var(--x-color-warning, #f59e0b);
  color: var(--x-color-white, #ffffff);
  box-shadow: var(--x-shadow-warning, 0 4px 12px rgba(245, 158, 11, 0.3));
}

.x-btn-warning:hover:not(.x-btn-disabled):not(.x-btn-loading) {
  background: var(--x-gradient-warning-hover, linear-gradient(135deg, var(--x-color-warning-light, #fbbf24) 0%, var(--x-color-warning, #f59e0b) 100%));
  box-shadow: var(--x-shadow-warning-lg, 0 6px 16px rgba(245, 158, 11, 0.4));
  transform: translateY(-2px);
}

/* 类型 - danger */
.x-btn-danger {
  background: var(--x-gradient-danger, linear-gradient(135deg, #ef4444 0%, #dc2626 100%));
  border-color: var(--x-color-danger, #ef4444);
  color: var(--x-color-white, #ffffff);
  box-shadow: var(--x-shadow-danger, 0 4px 12px rgba(239, 68, 68, 0.3));
}

.x-btn-danger:hover:not(.x-btn-disabled):not(.x-btn-loading) {
  background: var(--x-gradient-danger-hover, linear-gradient(135deg, var(--x-color-danger-light, #f87171) 0%, var(--x-color-danger, #ef4444) 100%));
  box-shadow: var(--x-shadow-danger-lg, 0 6px 16px rgba(239, 68, 68, 0.4));
  transform: translateY(-2px);
}

/* 类型 - text */
.x-btn-text {
  background-color: transparent;
  border-color: transparent;
  color: var(--x-color-black, #1a1a1a);
}

.x-btn-text:hover:not(.x-btn-disabled):not(.x-btn-loading) {
  background-color: var(--x-color-gray-100, #f5f5f5);
  color: var(--x-color-primary, #ff6b35);
}

/* 类型 - link */
.x-btn-link {
  background-color: transparent;
  border-color: transparent;
  color: var(--x-color-primary, #1a73e8);
  box-shadow: none;
  padding: 0;
  height: auto;
}

.x-btn-link:hover:not(.x-btn-disabled):not(.x-btn-loading) {
  color: var(--x-color-primary-hover, #1557b0);
  text-decoration: underline;
  transform: none;
}

.x-btn-link:active:not(.x-btn-disabled):not(.x-btn-loading) {
  transform: none;
  box-shadow: none;
}

/* 幽灵按钮 - Ghost Button */
.x-btn-ghost.x-btn-default {
  background-color: transparent;
  background: transparent;
  border-color: var(--x-color-gray-300, #cacaca);
  color: var(--x-color-black, #1a1a1a);
  box-shadow: none;
}

.x-btn-ghost.x-btn-default:hover:not(.x-btn-disabled):not(.x-btn-loading) {
  background-color: var(--x-fill-color-lighter, rgba(26, 26, 26, 0.05));
  background: var(--x-fill-color-lighter, rgba(26, 26, 26, 0.05));
  border-color: var(--x-color-gray-400, #a0a0a0);
}

.x-btn-ghost.x-btn-primary {
  background-color: transparent;
  background: transparent;
  border-color: var(--x-color-primary, #1a1a1a);
  color: var(--x-color-primary, #1a1a1a);
  box-shadow: none;
}

.x-btn-ghost.x-btn-primary:hover:not(.x-btn-disabled):not(.x-btn-loading) {
  background-color: var(--x-fill-color-dark, rgba(26, 26, 26, 0.1));
  background: var(--x-fill-color-dark, rgba(26, 26, 26, 0.1));
  border-color: var(--x-color-primary, #1a1a1a);
  box-shadow: none;
}

.x-btn-ghost.x-btn-success {
  background-color: transparent;
  background: transparent;
  border-color: var(--x-color-success, #10b981);
  color: var(--x-color-success, #10b981);
  box-shadow: none;
}

.x-btn-ghost.x-btn-success:hover:not(.x-btn-disabled):not(.x-btn-loading) {
  background-color: var(--x-fill-color-success-light, rgba(16, 185, 129, 0.1));
  background: var(--x-fill-color-success-light, rgba(16, 185, 129, 0.1));
  border-color: var(--x-color-success, #10b981);
  box-shadow: none;
}

.x-btn-ghost.x-btn-warning {
  background-color: transparent;
  background: transparent;
  border-color: var(--x-color-warning, #f59e0b);
  color: var(--x-color-warning, #f59e0b);
  box-shadow: none;
}

.x-btn-ghost.x-btn-warning:hover:not(.x-btn-disabled):not(.x-btn-loading) {
  background-color: var(--x-fill-color-warning-light, rgba(245, 158, 11, 0.1));
  background: var(--x-fill-color-warning-light, rgba(245, 158, 11, 0.1));
  border-color: var(--x-color-warning, #f59e0b);
  box-shadow: none;
}

.x-btn-ghost.x-btn-danger {
  background-color: transparent;
  background: transparent;
  border-color: var(--x-color-danger, #ef4444);
  color: var(--x-color-danger, #ef4444);
  box-shadow: none;
}

.x-btn-ghost.x-btn-danger:hover:not(.x-btn-disabled):not(.x-btn-loading) {
  background-color: var(--x-fill-color-danger-light, rgba(239, 68, 68, 0.1));
  background: var(--x-fill-color-danger-light, rgba(239, 68, 68, 0.1));
  border-color: var(--x-color-danger, #ef4444);
  box-shadow: none;
}

/* 幽灵按钮波纹效果调整 */
.x-btn-ghost .x-btn-ripple {
  background-color: var(--x-ripple-color, rgba(0, 0, 0, 0.08));
}

.x-btn-ghost.x-btn-primary .x-btn-ripple {
  background-color: var(--x-ripple-color-primary, rgba(26, 26, 26, 0.15));
}

.x-btn-ghost.x-btn-success .x-btn-ripple {
  background-color: var(--x-ripple-color-success, rgba(16, 185, 129, 0.15));
}

.x-btn-ghost.x-btn-warning .x-btn-ripple {
  background-color: var(--x-ripple-color-warning, rgba(245, 158, 11, 0.15));
}

.x-btn-ghost.x-btn-danger .x-btn-ripple {
  background-color: var(--x-ripple-color-danger, rgba(239, 68, 68, 0.15));
}

/* 圆角按钮 */
.x-btn-round.x-btn-small {
  border-radius: var(--x-radius-full, 14px);
}

.x-btn-round.x-btn-medium {
  border-radius: var(--x-radius-full, 18px);
}

.x-btn-round.x-btn-large {
  border-radius: var(--x-radius-full, 22px);
}

/* 块级按钮 */
.x-btn-block {
  display: flex;
  width: 100%;
}

/* 禁用状态 */
.x-btn-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* 加载状态 */
.x-btn-loading {
  cursor: wait;
  opacity: 0.8;
}

.x-btn.x-btn-loading {
  pointer-events: none;
}

.x-btn-loading .x-btn-icon {
  font-size: 1em;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
