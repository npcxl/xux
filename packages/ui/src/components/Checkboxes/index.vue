<template>
  <div class="x-checkboxes">
    <!-- 汉堡菜单控制按钮 -->
    <label v-if="collapsible" class="hamburger">
      <input type="checkbox" v-model="isExpanded">
      <svg viewBox="0 0 32 32">
        <path class="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
        <path class="line" d="M7 16 27 16"></path>
      </svg>
    </label>

    <!-- 选项列表 -->
    <transition name="options-slide">
      <div 
        v-show="!collapsible || isExpanded"
        class="options-container"
        :class="[
          `options-container--${layout}`,
          { 'options-container--disabled': disabled }
        ]"
        :style="layout === 'grid' ? { gridTemplateColumns: `repeat(${columns}, 1fr)` } : {}"
      >
        <div 
          v-for="option in options" 
          :key="option.value"
          class="option-item"
          :class="{ 
            'option-selected': isSelected(option.value),
            'option-disabled': disabled || option.disabled
          }"
          @click="handleOptionClick(option)"
         >
         
          <div class="checkbox-wrapper">
            <input 
              type="checkbox" 
              :checked="isSelected(option.value)"
              :disabled="disabled || option.disabled"
              @change.stop="toggleOption(option.value)"
              class="checkbox-input"
            />
            <div class="checkbox-custom">
              <svg v-if="isSelected(option.value)" class="check-icon" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
          </div>
          <div class="option-content">
            <Icon v-if="option.icon" :icon="option.icon" class="option-icon" />
            <span class="option-label">{{ option.label }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
/**
 * Checkboxes 多选框组件
 * @displayName XCheckboxes
 */

export interface CheckboxOption {
  value: string | number
  label: string
  icon?: string
  disabled?: boolean
}

export interface CheckboxesProps {
  options: CheckboxOption[]
  modelValue?: (string | number)[]
  placeholder?: string
  maxSelections?: number
  disabled?: boolean
  layout?: 'vertical' | 'horizontal' | 'grid'
  columns?: number
  /** 是否可折叠 */
  collapsible?: boolean
  /** 默认是否展开 */
  defaultExpanded?: boolean
}

const props = withDefaults(defineProps<CheckboxesProps>(), {
  modelValue: () => [],
  placeholder: '请选择选项',
  maxSelections: 0, // 0表示无限制
  disabled: false,
  layout: 'vertical',
  columns: 3,
  collapsible: false,
  defaultExpanded: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: (string | number)[]): void
  (e: 'change', value: (string | number)[]): void
}>()

// 展开/折叠状态
const isExpanded = ref(props.defaultExpanded)

// 检查选项是否被选中
const isSelected = (value: string | number) => {
  return props.modelValue && props.modelValue.includes(value)
}

// 切换选项
const toggleOption = (value: string | number) => {
  if (props.disabled) return
  
  const option = props.options.find(opt => opt.value === value)
  if (option?.disabled) return
  
  const newValue = [...props.modelValue]
  const index = newValue.indexOf(value)
  
  if (index > -1) {
    // 移除选项
    newValue.splice(index, 1)
  } else {
    // 添加选项
    if (props.maxSelections > 0 && newValue.length >= props.maxSelections) {
      return // 达到最大选择数量
    }
    newValue.push(value)
  }
  
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

// 处理选项点击
const handleOptionClick = (option: CheckboxOption) => {
  if (!props.disabled && !option.disabled) {
    toggleOption(option.value)
  }
}

// 移除单个选项
const removeOption = (value: string | number) => {
  toggleOption(value)
}

// 清除所有选项
const clearAll = () => {
  if (!props.disabled) {
    emit('update:modelValue', [])
    emit('change', [])
  }
}

// 全选
const selectAll = () => {
  if (props.disabled) return
  
  const enabledOptions = props.options.filter(opt => !opt.disabled)
  const allValues = enabledOptions.map(opt => opt.value)
  
  if (props.maxSelections > 0) {
    emit('update:modelValue', allValues.slice(0, props.maxSelections))
    emit('change', allValues.slice(0, props.maxSelections))
  } else {
    emit('update:modelValue', allValues)
    emit('change', allValues)
  }
}

// 暴露方法
defineExpose({
  clearAll,
  selectAll,
  removeOption,
  toggle: () => { isExpanded.value = !isExpanded.value },
  expand: () => { isExpanded.value = true },
  collapse: () => { isExpanded.value = false }
})
</script>

<style lang="scss" scoped>
/* 汉堡菜单图标 */
.hamburger {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

.hamburger:hover {
  transform: scale(1.1);
}

.hamburger input {
  display: none;
}

.hamburger svg {
  /* The size of the SVG defines the overall size */
  height: 1.5em;
  width: 1.5em;
  /* Define the transition for transforming the SVG */
  transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

.line {
  fill: none;
  stroke: var(--x-text-color-primary, #1a1a1a);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 3;
  /* Define the transition for transforming the Stroke */
  transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
              stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

.line-top-bottom {
  stroke-dasharray: 12 63;
}

.hamburger input:checked + svg {
  transform: rotate(-45deg);
}

.hamburger input:checked + svg .line-top-bottom {
  stroke-dasharray: 20 300;
  stroke-dashoffset: -32.42;
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
  .line {
    stroke: var(--x-text-color-primary, #f3f4f6);
  }
}

/* 选项容器过渡动画 */
.options-slide-enter-active,
.options-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top;
}

.options-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px) scaleY(0.9);
  max-height: 0;
}

.options-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px) scaleY(0.9);
  max-height: 0;
}

.x-checkboxes {
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 标签容器 */
.tags-container {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background-color: var(--x-fill-color, #f8f9fa);
  border: 1px solid var(--x-border-color, #e9ecef);
  border-radius: var(--x-radius-md, 8px);
  margin-bottom: 8px;
  min-height: 48px;
}

.tags-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  flex: 1;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: var(--x-gradient-primary, linear-gradient(135deg, #1a1a1a, #333));
  color: var(--x-color-white, white);
  border-radius: var(--x-radius-full, 16px);
  font-size: var(--x-font-size-sm, 14px);
  font-weight: 500;
  transition: all var(--x-transition, 0.3s cubic-bezier(0.4, 0, 0.2, 1));
  position: relative;
  box-shadow: var(--x-shadow-sm, 0 2px 4px rgba(0, 0, 0, 0.1));
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
}

.tag-item:hover {
  background: var(--x-gradient-primary-hover, linear-gradient(135deg, #333, #1a1a1a));
  transform: translateY(-2px) scale(1.05);
  box-shadow: var(--x-shadow, 0 4px 8px rgba(0, 0, 0, 0.15));
  
  &::before {
    opacity: 1;
  }
}

.tag-text {
  white-space: nowrap;
}

.tag-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: none;
  background: none;
  color: white;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: scale(0);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
}

.tag-remove:hover {
  transform: scale(1.2) rotate(90deg);
  
  &::before {
    transform: scale(1);
  }
}

.tag-remove:active {
  transform: scale(0.9) rotate(90deg);
}

.clear-all-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  color: var(--x-text-color-secondary, #6c757d);
  cursor: pointer;
  border-radius: var(--x-radius, 6px);
  transition: all var(--x-transition, 0.3s cubic-bezier(0.4, 0, 0.2, 1));
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 6px;
    background: linear-gradient(135deg, #e9ecef, #f8f9fa);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
}

.clear-all-btn:hover {
  color: var(--x-text-color-regular, #495057);
  transform: scale(1.1) rotate(15deg);
  
  &::before {
    opacity: 1;
  }
}

.clear-all-btn:active {
  transform: scale(0.95) rotate(15deg);
}

/* 选项容器 */
.options-container {
  border: 1px solid var(--x-color-gray-200, #e9ecef);
  border-radius: var(--x-radius-lg, 8px);
  overflow: hidden;
}

/* 垂直布局（默认） */
.options-container--vertical {
  display: flex;
  flex-direction: column;
}

/* 水平布局 */
.options-container--horizontal {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  border: none;
  padding: 0;
}

.options-container--horizontal .option-item {
  border: 1px solid var(--x-color-gray-200, #e9ecef);
  border-radius: var(--x-radius-md, 6px);
  flex: 0 0 auto;
}

/* 网格布局 */
.options-container--grid {
  display: grid;
  gap: 12px;
  border: none;
  padding: 0;
}

.options-container--grid .option-item {
  border: 1px solid var(--x-color-gray-200, #e9ecef);
  border-radius: var(--x-radius-md, 6px);
}

/* 选项项 */
.option-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: all var(--x-transition, 0.3s cubic-bezier(0.4, 0, 0.2, 1));
  border-bottom: 1px solid var(--x-border-color-light, #f8f9fa);
  user-select: none;
  position: relative;
  animation: slideInFade 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
}

.options-container--vertical .option-item:nth-child(1) { animation-delay: 0.03s; }
.options-container--vertical .option-item:nth-child(2) { animation-delay: 0.06s; }
.options-container--vertical .option-item:nth-child(3) { animation-delay: 0.09s; }
.options-container--vertical .option-item:nth-child(4) { animation-delay: 0.12s; }
.options-container--vertical .option-item:nth-child(5) { animation-delay: 0.15s; }
.options-container--vertical .option-item:nth-child(6) { animation-delay: 0.18s; }
.options-container--vertical .option-item:nth-child(7) { animation-delay: 0.21s; }
.options-container--vertical .option-item:nth-child(8) { animation-delay: 0.24s; }
.options-container--vertical .option-item:nth-child(9) { animation-delay: 0.27s; }
.options-container--vertical .option-item:nth-child(10) { animation-delay: 0.30s; }

.options-container--horizontal .option-item:nth-child(1),
.options-container--grid .option-item:nth-child(1) { animation-delay: 0.05s; }
.options-container--horizontal .option-item:nth-child(2),
.options-container--grid .option-item:nth-child(2) { animation-delay: 0.10s; }
.options-container--horizontal .option-item:nth-child(3),
.options-container--grid .option-item:nth-child(3) { animation-delay: 0.15s; }
.options-container--horizontal .option-item:nth-child(4),
.options-container--grid .option-item:nth-child(4) { animation-delay: 0.20s; }
.options-container--horizontal .option-item:nth-child(5),
.options-container--grid .option-item:nth-child(5) { animation-delay: 0.25s; }
.options-container--horizontal .option-item:nth-child(6),
.options-container--grid .option-item:nth-child(6) { animation-delay: 0.30s; }
.options-container--horizontal .option-item:nth-child(7),
.options-container--grid .option-item:nth-child(7) { animation-delay: 0.35s; }
.options-container--horizontal .option-item:nth-child(8),
.options-container--grid .option-item:nth-child(8) { animation-delay: 0.40s; }
.options-container--horizontal .option-item:nth-child(9),
.options-container--grid .option-item:nth-child(9) { animation-delay: 0.45s; }
.options-container--horizontal .option-item:nth-child(10),
.options-container--grid .option-item:nth-child(10) { animation-delay: 0.50s; }

.options-container--vertical .option-item:last-child {
  border-bottom: none;
}

.option-item:hover:not(.option-disabled) {
  background-color: var(--x-fill-color, #f8f9fa);
  transform: translateY(-2px);
  box-shadow: var(--x-shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08));
}

.option-selected {
  background-color: var(--x-fill-color-dark, rgba(26, 26, 26, 0.04));
}

.option-selected:hover:not(.option-disabled) {
  background-color: var(--x-fill-color-dark, rgba(26, 26, 26, 0.08));
  transform: translateY(-2px) scale(1.02);
  box-shadow: var(--x-shadow-md, 0 6px 16px rgba(0, 0, 0, 0.12));
}

.option-disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.options-container--disabled {
  opacity: 0.6;
  pointer-events: none;
}

/* 复选框样式 */
.checkbox-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid var(--x-border-color-dark, #d1d5db);
  border-radius: var(--x-radius-sm, 4px);
  background-color: var(--x-color-white, white);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--x-transition, 0.3s cubic-bezier(0.4, 0, 0.2, 1));
  position: relative;
  flex-shrink: 0;
  
  &::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 6px;
    background: radial-gradient(circle, rgba(26, 26, 26, 0.1), transparent);
    opacity: 0;
    transform: scale(0);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--x-radius-sm, 4px);
    background: linear-gradient(135deg, rgba(26, 26, 26, 0.05), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
}

.option-item:hover:not(.option-disabled) .checkbox-custom {
  border-color: var(--x-color-gray-500, #9ca3af);
  transform: scale(1.1) rotate(5deg);
  
  &::after {
    opacity: 1;
  }
}

.checkbox-input:checked + .checkbox-custom {
  background: var(--x-gradient-primary, linear-gradient(135deg, #1a1a1a, #333));
  border-color: var(--x-color-primary, #1a1a1a);
  animation: checkboxPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  &::before {
    opacity: 1;
    transform: scale(1.5);
    animation: rippleEffect 0.6s ease-out;
  }
}

.checkbox-input:focus + .checkbox-custom {
  box-shadow: 0 0 0 4px rgba(26, 26, 26, 0.12), var(--x-shadow, 0 2px 8px rgba(26, 26, 26, 0.15));
}

.checkbox-input:disabled + .checkbox-custom {
  background-color: var(--x-fill-color, #f3f4f6);
  border-color: var(--x-border-color, #d1d5db);
  cursor: not-allowed;
}

.check-icon {
  width: 14px;
  height: 14px;
  fill: var(--x-color-white, white);
  opacity: 0;
  transform: scale(0) rotate(-45deg);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
}

.checkbox-input:checked + .checkbox-custom .check-icon {
  opacity: 1;
  transform: scale(1) rotate(0deg);
  animation: checkBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s;
}

.option-content {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.option-icon {
  width: 16px;
  height: 16px;
  color: var(--x-text-color-secondary, #6b7280);
  transition: all var(--x-transition, 0.3s ease);
  flex-shrink: 0;
}

.option-label {
  font-size: var(--x-font-size-sm, 14px);
  color: var(--x-text-color-regular, #374151);
  font-weight: 500;
  flex: 1;
  transition: all var(--x-transition, 0.3s ease);
}

.option-selected .option-label {
  color: var(--x-text-color-primary, #1a1a1a);
  font-weight: 600;
}

.option-selected .option-icon {
  color: var(--x-text-color-primary, #1a1a1a);
}

.option-item:hover:not(.option-disabled) .option-label {
  color: var(--x-text-color-primary, #1a1a1a);
}

.option-item:hover:not(.option-disabled) .option-icon {
  color: var(--x-text-color-primary, #1a1a1a);
  transform: scale(1.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tags-container {
      padding: 10px 12px;
  }
  
  .option-item {
      padding: 10px 12px;
  }
  
  .tag-item {
      font-size: 13px;
      padding: 3px 6px;
  }
}

/* 动画效果 */
@keyframes slideInFade {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes checkboxPop {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.2) rotate(-5deg);
  }
  50% {
    transform: scale(0.9) rotate(3deg);
  }
  70% {
    transform: scale(1.05) rotate(-2deg);
  }
  100% {
    transform: scale(1) rotate(0);
  }
}

@keyframes checkBounce {
  0% {
    transform: scale(0) rotate(-45deg);
  }
  50% {
    transform: scale(1.2) rotate(5deg);
  }
  100% {
    transform: scale(1) rotate(0);
  }
}

@keyframes rippleEffect {
  0% {
    opacity: 0.8;
    transform: scale(0);
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 0;
    transform: scale(2);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-8px) scale(0.95);
  }
  50% {
    transform: translateY(2px) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.tag-item {
  animation: fadeIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>