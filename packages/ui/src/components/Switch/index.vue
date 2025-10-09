<template>
  <div class="switch" :class="[`size-${size}`, { 'disabled': disabled }]" :style="colorStyle">
    <input 
      :id="switchId"
      :checked="modelValue"
      @change="handleChange"
      :disabled="disabled"
      type="checkbox"
    >
    <label :for="switchId" class="slider"></label>
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
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 'medium',
  color: '#0974f1',
  shadowColor: '#0974f1',
  thumbColor: '#ffffff'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
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
  return '9, 117, 241' // 默认蓝色
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
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
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
  border: none;
  border-radius: 50px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
  transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
}

.switch input:checked + .slider {
  box-shadow: 0 0 20px rgba(var(--switch-shadow-color-rgb), 0.8);
  border: 2px solid var(--switch-active-color);
  background-color: var(--switch-active-color);
}

.switch input:checked + .slider:before {
  transform: translateX(1.5em);
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
.switch:not(.disabled):hover .slider {
  box-shadow: 0 0 20px rgba(var(--switch-shadow-color-rgb), 0.8);
}

.switch:not(.disabled) input:checked + .slider:hover {
  box-shadow: 0 0 20px rgba(var(--switch-shadow-color-rgb), 0.8);
}

/* 点击后移除边框 */
.switch input:active + .slider {
  box-shadow: none;
}

.switch input:checked:active + .slider {
  box-shadow: 0 0 20px rgba(var(--switch-shadow-color-rgb), 0.8);
}

/* 焦点状态 */
.switch input:focus-visible + .slider {
  box-shadow: 0 0 0 3px rgba(var(--switch-shadow-color-rgb), 0.3);
}

.switch input:checked:focus-visible + .slider {
  box-shadow: 0 0 20px rgba(var(--switch-shadow-color-rgb), 0.8), 0 0 0 3px rgba(var(--switch-shadow-color-rgb), 0.3);
}
</style>
