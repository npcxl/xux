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
/* iOS 风格按钮 */
.x-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: 600;
  font-family: var(--x-font-family);
  border: none;
  cursor: pointer;
  transition: all var(--x-transition);
  user-select: none;
  white-space: nowrap;
  outline: none;
  overflow: hidden;
  transform: scale(1);
  letter-spacing: -0.3px;
}

/* iOS 点击效果 - 轻柔缩放 */
.x-btn:active:not(.x-btn-disabled):not(.x-btn-loading) {
  transform: scale(0.96);
  transition: transform 0.1s ease-out;
}

/* iOS 波纹效果 - 更轻柔 */
.x-btn-ripple {
  position: absolute;
  border-radius: var(--x-radius-full, 50%);
  background-color: rgba(255, 255, 255, 0.25);
  width: 0;
  height: 0;
  pointer-events: none;
  animation: ripple-animation 0.5s ease-out;
  transform: translate(-50%, -50%);
}

@keyframes ripple-animation {
  to {
    width: 250px;
    height: 250px;
    opacity: 0;
  }
}

/* 图标和内容布局 */
.x-btn-icon {
  display: inline-flex;
  align-items: center;
  font-size: 1.15em;
  animation: icon-in 0.25s ease-out;
}

.x-btn-content {
  display: inline-flex;
  align-items: center;
  line-height: 1.2;
}

@keyframes icon-in {
  from {
    opacity: 0;
    transform: scale(0.85);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* iOS 尺寸 - 更圆润的圆角 */
.x-btn-small {
  padding: 5px 12px;
  font-size: var(--x-font-size-sm, 13px);
  border-radius: var(--x-radius-sm, 6px);
  height: 30px;
  min-width: 60px;
}

.x-btn-medium {
  padding: 8px 16px;  
  font-size: var(--x-font-size, 15px);
  border-radius: var(--x-radius, 10px);
  height: 40px;
  min-width: 80px;
}

.x-btn-large {
  padding: 12px 24px;
  font-size: var(--x-font-size-lg, 17px);
  border-radius: var(--x-radius-md, 12px);
  height: 50px;
  min-width: 100px;
}

/* iOS 类型 - default (灰色填充) */
.x-btn-default {
  background-color: var(--x-color-gray-50, #F2F2F7);
  color: var(--x-color-primary, #007AFF);
  box-shadow: none;
}

.x-btn-default:hover:not(.x-btn-disabled):not(.x-btn-loading) {
  background-color: var(--x-color-gray-100, #E5E5EA);
  opacity: 0.85;
}



/* iOS 类型 - primary (系统蓝) */
.x-btn-primary {
  background-color: var(--x-color-primary, #007AFF);
  color: var(--x-color-white, #FFFFFF);
  box-shadow: 0 2px 8px rgba(0, 122, 255, 0.15);
}

.x-btn-primary:hover:not(.x-btn-disabled):not(.x-btn-loading) {
  background-color: color-mix(in oklab, var(--x-color-primary), black 12%);
  box-shadow: 0 4px 12px color-mix(in oklab, var(--x-color-primary), transparent 80%);
  opacity: 0.9;
}

/* iOS 类型 - success (系统绿) */
.x-btn-success {
  background-color: var(--x-color-success, #34C759);
  color: var(--x-color-white, #FFFFFF);
  box-shadow: 0 2px 8px rgba(52, 199, 89, 0.15);
}

.x-btn-success:hover:not(.x-btn-disabled):not(.x-btn-loading) {
  background-color: color-mix(in oklab, var(--x-color-success), black 12%);
  box-shadow: 0 4px 12px color-mix(in oklab, var(--x-color-success), transparent 80%);
  opacity: 0.9;
}

/* iOS 类型 - warning (系统橙) */
.x-btn-warning {
  background-color: var(--x-color-warning, #FF9500);
  color: var(--x-color-white, #FFFFFF);
  box-shadow: 0 2px 8px rgba(255, 149, 0, 0.15);
}

.x-btn-warning:hover:not(.x-btn-disabled):not(.x-btn-loading) {
  background-color: color-mix(in oklab, var(--x-color-warning), black 12%);
  box-shadow: 0 4px 12px color-mix(in oklab, var(--x-color-warning), transparent 80%);
  opacity: 0.9;
}

/* iOS 类型 - danger (系统红) */
.x-btn-danger {
  background-color: var(--x-color-danger, #FF3B30);
  color: var(--x-color-white, #FFFFFF);
  box-shadow: 0 2px 8px rgba(255, 59, 48, 0.15);
}

.x-btn-danger:hover:not(.x-btn-disabled):not(.x-btn-loading) {
  background-color: color-mix(in oklab, var(--x-color-danger), black 12%);
  box-shadow: 0 4px 12px color-mix(in oklab, var(--x-color-danger), transparent 80%);
  opacity: 0.9;
}

/* iOS 类型 - text (无背景) */
.x-btn-text {
  background-color: transparent;
  color: var(--x-color-primary, #007AFF);
  box-shadow: none;
  min-width: auto;
}

.x-btn-text:hover:not(.x-btn-disabled):not(.x-btn-loading) {
  background-color: var(--x-fill-color-primary-lighter, rgba(0, 122, 255, 0.05));
  opacity: 0.8;
}

/* iOS 类型 - link (链接样式) */
.x-btn-link {
  background-color: transparent;
  color: var(--x-color-primary, #007AFF);
  box-shadow: none;
  padding: 0;
  height: auto;
  min-width: auto;
  text-decoration: none;
}

.x-btn-link:hover:not(.x-btn-disabled):not(.x-btn-loading) {
  opacity: 0.7;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
}

.x-btn-link:active:not(.x-btn-disabled):not(.x-btn-loading) {
  transform: scale(0.98);
}

/* iOS 幽灵按钮 - 边框样式 */
.x-btn-ghost.x-btn-default {
  background-color: transparent;
  border: 1px solid var(--x-color-gray-300, #C7C7CC);
  color: var(--x-text-color-primary, #000000);
  box-shadow: none;
}

.x-btn-ghost.x-btn-default:hover:not(.x-btn-disabled):not(.x-btn-loading) {
  background-color: var(--x-fill-color-light, #F9F9F9);
  border-color: var(--x-color-gray-400, #AEAEB2);
}

.x-btn-ghost.x-btn-primary {
  background-color: transparent;
  border: 1px solid var(--x-color-primary, #007AFF);
  color: var(--x-color-primary, #007AFF);
  box-shadow: none;
}

.x-btn-ghost.x-btn-primary:hover:not(.x-btn-disabled):not(.x-btn-loading) {
  background-color: var(--x-fill-color-primary-lighter, rgba(0, 122, 255, 0.05));
  border-color: color-mix(in oklab, var(--x-color-primary), black 12%);
}

.x-btn-ghost.x-btn-success {
  background-color: transparent;
  border: 1px solid var(--x-color-success, #34C759);
  color: var(--x-color-success, #34C759);
  box-shadow: none;
}

.x-btn-ghost.x-btn-success:hover:not(.x-btn-disabled):not(.x-btn-loading) {
  background-color: var(--x-fill-color-success-lighter, rgba(52, 199, 89, 0.05));
  border-color: color-mix(in oklab, var(--x-color-success), black 12%);
}

.x-btn-ghost.x-btn-warning {
  background-color: transparent;
  border: 1px solid var(--x-color-warning, #FF9500);
  color: var(--x-color-warning, #FF9500);
  box-shadow: none;
}

.x-btn-ghost.x-btn-warning:hover:not(.x-btn-disabled):not(.x-btn-loading) {
  background-color: var(--x-fill-color-warning-lighter, rgba(255, 149, 0, 0.05));
  border-color: color-mix(in oklab, var(--x-color-warning), black 12%);
}

.x-btn-ghost.x-btn-danger {
  background-color: transparent;
  border: 1px solid var(--x-color-danger, #FF3B30);
  color: var(--x-color-danger, #FF3B30);
  box-shadow: none;
}

.x-btn-ghost.x-btn-danger:hover:not(.x-btn-disabled):not(.x-btn-loading) {
  background-color: var(--x-fill-color-danger-lighter, rgba(255, 59, 48, 0.05));
  border-color: color-mix(in oklab, var(--x-color-danger), black 12%);
}

/* iOS 幽灵按钮波纹效果 */
.x-btn-ghost .x-btn-ripple {
  background-color: var(--x-ripple-color, rgba(0, 0, 0, 0.06));
}

.x-btn-ghost.x-btn-primary .x-btn-ripple {
  background-color: var(--x-ripple-color-primary, rgba(0, 122, 255, 0.15));
}

.x-btn-ghost.x-btn-success .x-btn-ripple {
  background-color: var(--x-ripple-color-success, rgba(52, 199, 89, 0.15));
}

.x-btn-ghost.x-btn-warning .x-btn-ripple {
  background-color: var(--x-ripple-color-warning, rgba(255, 149, 0, 0.15));
}

.x-btn-ghost.x-btn-danger .x-btn-ripple {
  background-color: var(--x-ripple-color-danger, rgba(255, 59, 48, 0.15));
}

/* iOS 圆角按钮 - 完全圆形 */
.x-btn-round.x-btn-small {
  border-radius: var(--x-radius-full, 15px);
  padding-left: 14px;
  padding-right: 14px;
}

.x-btn-round.x-btn-medium {
  border-radius: var(--x-radius-full, 20px);
  padding-left: 18px;
  padding-right: 18px;
}

.x-btn-round.x-btn-large {
  border-radius: var(--x-radius-full, 25px);
  padding-left: 26px;
  padding-right: 26px;
}

/* iOS 块级按钮 */
.x-btn-block {
  display: flex;
  width: 100%;
}

/* iOS 禁用状态 */
.x-btn-disabled {
  cursor: not-allowed;
  opacity: 0.4;
  filter: saturate(0.7);
}

.x-btn-disabled:hover {
  opacity: 0.4 !important;
  transform: scale(1) !important;
}

/* iOS 加载状态 */
.x-btn-loading {
  cursor: default;
  opacity: 0.7;
  pointer-events: none;
}

.x-btn-loading .x-btn-icon {
  font-size: 1em;
  animation: spin 0.8s linear infinite;
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
