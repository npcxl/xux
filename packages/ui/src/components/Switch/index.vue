<template>
  <div 
    class="switch" 
    :class="[
      `size-${size}`, 
      { 'disabled': disabled }, 
      { 'loading': loading },
      { 'checked': modelValue }
    ]" 
    :style="colorStyle"
  >
    <input 
      :id="switchId"
      :checked="modelValue"
      @change="handleChange"
      :disabled="disabled || loading"
      type="checkbox"
    >
    <label :for="switchId" class="slider">
      <span v-if="loading" class="loading-spinner">
        <span class="spinner-inner"></span>
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Switch 开关组件
 * @displayName XSwitch
 */

interface Props {
  modelValue: boolean
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  color?: string
  shadowColor?: string
  thumbColor?: string
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 'medium',
  color: '#1a1a1a',
  shadowColor: '#1a1a1a',
  thumbColor: '#ffffff',
  loading: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

// 生成唯一的 ID 避免冲突
const switchId = computed(() => `switch-${Math.random().toString(36).substr(2, 9)}`)

// 计算颜色相关的样式
const colorStyle = computed(() => {
  const color = props.color || '#0974f1'
  const shadowColor = props.shadowColor || color
  const thumbColor = props.thumbColor || '#ffffff'
  
  // 计算浅色背景
  const lightBackgroundColor = lightenColor(color, 0.9)
  // 计算激活状态的浅色版本
  const activeColor = lightenColor(color, 0.2)
  
  return {
    '--switch-color': color,
    '--switch-color-rgb': hexToRgb(color),
    '--switch-shadow-color': shadowColor,
    '--switch-shadow-color-rgb': hexToRgb(shadowColor),
    '--switch-thumb-color': thumbColor,
    '--switch-bg-color': lightBackgroundColor,
    '--switch-active-color': activeColor
  }
})

// 将十六进制颜色转换为 RGB
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (result) {
    const r = parseInt(result[1], 16)
    const g = parseInt(result[2], 16)
    const b = parseInt(result[3], 16)
    return `${r}, ${g}, ${b}`
  }
  return '26, 26, 26' // 默认深灰色 #1a1a1a
}

// 将颜色变浅
const lightenColor = (hex: string, factor: number) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (result) {
    const r = parseInt(result[1], 16)
    const g = parseInt(result[2], 16)
    const b = parseInt(result[3], 16)
    
    // 计算浅色版本
    const lightR = Math.round(r + (255 - r) * factor)
    const lightG = Math.round(g + (255 - g) * factor)
    const lightB = Math.round(b + (255 - b) * factor)
    
    return `#${lightR.toString(16).padStart(2, '0')}${lightG.toString(16).padStart(2, '0')}${lightB.toString(16).padStart(2, '0')}`
  }
  return '#e5e7eb' // 默认浅灰色
}

const handleChange = () => {
  if (!props.disabled && !props.loading) {
    const newValue = !props.modelValue
    
    // 发出 change 事件供父组件处理异步逻辑
    emit('change', newValue)
    
    // 注意：在异步模式下，父组件应该在 @change 事件中阻止默认更新
    // 通过在异步操作成功后手动更新 v-model
    // 同步模式下，直接更新即可
    emit('update:modelValue', newValue)
  }
}
</script>

<style scoped>
/* The switch - the box around the slider */
.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: 2em;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  border: 2px solid transparent;
  border-radius: 50px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: var(--switch-bg-color);
}

.slider:before {
  position: absolute;
  content: "";
  height: 1.4em;
  width: 1.4em;
  left: 0.2em;
  bottom: 0.2em;
  background-color: var(--switch-thumb-color);
  border-radius: inherit;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.switch input:checked + .slider {
  box-shadow: 0 0 12px rgba(var(--switch-shadow-color-rgb), 0.5);
  border-color: var(--switch-color);
  background-color: var(--switch-color);
}

.switch input:checked + .slider:before {
  transform: translateX(1.5em);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

/* 尺寸变体 */
.switch.size-small {
  width: 2.5em;
  height: 1.4em;
  font-size: 14px;
}

.switch.size-small .slider:before {
  height: 1em;
  width: 1em;
}

.switch.size-small input:checked + .slider:before {
  transform: translateX(1.1em);
}

.switch.size-medium {
  width: 3.5em;
  height: 2em;
  font-size: 17px;
}

.switch.size-large {
  width: 4.5em;
  height: 2.6em;
  font-size: 20px;
}

.switch.size-large .slider:before {
  height: 1.8em;
  width: 1.8em;
}

.switch.size-large input:checked + .slider:before {
  transform: translateX(1.9em);
}

/* 禁用状态 */
.switch.disabled .slider {
  cursor: not-allowed;
  opacity: 0.5;
  border-color: #9ca3af;
}

.switch.disabled .slider:before {
  background-color: #9ca3af;
}

.switch.disabled input:checked + .slider {
  border-color: #9ca3af;
  box-shadow: none;
}

/* 悬停效果 */
.switch:not(.disabled):not(.loading):hover .slider {
  border-color: rgba(var(--switch-color-rgb), 0.4);
  box-shadow: 0 0 8px rgba(var(--switch-shadow-color-rgb), 0.3);
}

.switch:not(.disabled):not(.loading) input:checked + .slider:hover {
  box-shadow: 0 0 16px rgba(var(--switch-shadow-color-rgb), 0.6);
}

/* 点击效果 */
.switch:not(.disabled):not(.loading) input:active + .slider {
  transform: scale(0.96);
}

.switch:not(.disabled):not(.loading) input:active + .slider:before {
  width: 1.6em;
}

.switch:not(.disabled):not(.loading) input:checked:active + .slider:before {
  width: 1.6em;
  transform: translateX(1.3em);
}

/* 焦点状态 */
.switch input:focus-visible + .slider {
  outline: 2px solid rgba(var(--switch-color-rgb), 0.5);
  outline-offset: 2px;
}

.switch input:checked:focus-visible + .slider {
  outline: 2px solid rgba(var(--switch-color-rgb), 0.5);
  outline-offset: 2px;
}

/* 加载状态 */
.switch.loading .slider {
  cursor: wait;
  opacity: 0.9;
}

.switch.loading .slider:before {
  opacity: 0.6;
}

.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.spinner-inner {
  display: block;
  width: 0.8em;
  height: 0.8em;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: var(--switch-thumb-color);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

.switch.checked .spinner-inner {
  border-color: rgba(var(--switch-color-rgb), 0.3);
  border-top-color: var(--switch-color);
}

.switch.size-small .spinner-inner {
  width: 0.6em;
  height: 0.6em;
  border-width: 1.5px;
}

.switch.size-large .spinner-inner {
  width: 1em;
  height: 1em;
  border-width: 2.5px;
}

/* 加载状态下禁用悬停效果 */
.switch.loading:hover .slider {
  transform: none;
  border-color: transparent;
}

.switch.loading input:checked + .slider {
  box-shadow: 0 0 12px rgba(var(--switch-shadow-color-rgb), 0.5);
}

.switch.loading input:checked + .slider:hover {
  box-shadow: 0 0 12px rgba(var(--switch-shadow-color-rgb), 0.5);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
