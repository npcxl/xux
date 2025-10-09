<template>
  <div class="x-checkboxes">
    <!-- 选项列表 -->
    <div 
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
        <span class="option-label">{{ option.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Checkboxes 多选框组件
 * @displayName XCheckboxes
 */

export interface CheckboxOption {
  value: string | number
  label: string
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
}

const props = withDefaults(defineProps<CheckboxesProps>(), {
  modelValue: () => [],
  placeholder: '请选择选项',
  maxSelections: 0, // 0表示无限制
  disabled: false,
  layout: 'vertical',
  columns: 3
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: (string | number)[]): void
  (e: 'change', value: (string | number)[]): void
}>()

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
  removeOption
})
</script>

<style scoped>
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
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
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
  background-color: #1a1a1a;
  color: white;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.tag-item:hover {
  background-color: #333333;
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
  transition: background-color 0.2s ease;
}

.tag-remove:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.clear-all-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  color: #6c757d;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.clear-all-btn:hover {
  background-color: #e9ecef;
  color: #495057;
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
  transition: all var(--x-transition, 0.2s ease);
  border-bottom: 1px solid var(--x-color-gray-100, #f8f9fa);
  user-select: none;
}

.options-container--vertical .option-item:last-child {
  border-bottom: none;
}

.option-item:hover:not(.option-disabled) {
  background-color: var(--x-color-gray-50, #f8f9fa);
}

.option-selected {
  background-color: rgba(26, 26, 26, 0.04);
}

.option-selected:hover:not(.option-disabled) {
  background-color: rgba(26, 26, 26, 0.08);
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
  border: 2px solid var(--x-color-gray-400, #d1d5db);
  border-radius: var(--x-radius-sm, 4px);
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--x-transition-fast, 0.15s ease);
  position: relative;
  flex-shrink: 0;
}

.option-item:hover:not(.option-disabled) .checkbox-custom {
  border-color: var(--x-color-gray-500, #9ca3af);
}

.checkbox-input:checked + .checkbox-custom {
  background-color: var(--x-color-primary, #1a1a1a);
  border-color: var(--x-color-primary, #1a1a1a);
}

.checkbox-input:focus + .checkbox-custom {
  box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
}

.checkbox-input:disabled + .checkbox-custom {
  background-color: var(--x-color-gray-100, #f3f4f6);
  border-color: var(--x-color-gray-300, #d1d5db);
  cursor: not-allowed;
}

.check-icon {
  width: 14px;
  height: 14px;
  fill: white;
  opacity: 0;
  transform: scale(0);
  transition: all 0.2s ease;
}

.checkbox-input:checked + .checkbox-custom .check-icon {
  opacity: 1;
  transform: scale(1);
}

.option-label {
  font-size: 14px;
  color: #374151;
  font-weight: 500;
  flex: 1;
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
@keyframes fadeIn {
  from {
      opacity: 0;
      transform: translateY(-4px);
  }
  to {
      opacity: 1;
      transform: translateY(0);
  }
}

.tag-item {
  animation: fadeIn 0.2s ease;
}
</style>