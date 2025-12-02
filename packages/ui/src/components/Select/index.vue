<template>
    <div class="x-select-container" :style="{ width: width }" ref="selectContainer">
      <ElPopover
        v-model:visible="isOpen"
        placement="bottom-start"
        trigger="click"
        :disabled="disabled"
        :width="selectWidth"
        :offset="8"
        :show-arrow="false"
        :teleported="true"
        popper-class="x-select-popper"
      >
        <template #reference>
          <!-- 触发器 -->
          <div
            @keydown.enter="toggleDropdown"
            @keydown.space="toggleDropdown"
            @keydown.escape="closeDropdown"
            :class="[
              'x-select-trigger',
              {
                'is-disabled': disabled,
                'is-borderless': borderless,
                'is-open': isOpen
              }
            ]"
            :tabindex="disabled ? -1 : 0"
            role="combobox"
            :aria-expanded="isOpen"
            :aria-haspopup="true"
            :aria-labelledby="labelId"
          >
            <div class="x-select-content">
              <span v-if="placeholder && !hasSelection" class="x-select-placeholder">
                {{ placeholder }}
              </span>
              <div v-else class="x-select-tags">
                <!-- 单选显示 -->
                <template v-if="!multiple">
                  <span v-if="selectedOption" class="x-select-single-value">
                    {{ getOptionLabel(selectedOption) }}
                  </span>
                </template>
                <!-- 多选显示 -->
                <template v-else>
                  <span
                     v-for="option in selectedOptions"
                     :key="getOptionValue(option)"
                     class="x-select-tag"
                   >
                     {{ getOptionLabel(option) }}
                     <button
                       @click.stop="removeOption(option)"
                       class="x-select-tag-close"
                       type="button"
                     >
                       <Icon icon="mdi:close-circle"></Icon>
                     </button>
                   </span>
                </template>
              </div>
            </div>
            <div class="x-select-suffix">
              <!-- 清除按钮 -->
              <button
                v-if="clearable && hasSelection && !disabled"
                @click.stop="handleClear"
                class="x-select-clear"
                type="button"
                title="清除"
              >
                <Icon icon="mdi:close-circle"></Icon>
              </button>
              <!-- 箭头图标 - 有清除按钮时不显示 -->
              <Icon
                v-else
                :class="['x-select-arrow', { 'is-open': isOpen }]"
                icon="mdi:chevron-down"
              ></Icon>
            </div>
          </div>
        </template>
  
        <template #default>
          <!-- 下拉菜单 -->
          <div class="x-select-dropdown" role="listbox">
          <!-- 搜索框 -->
          <div v-if="searchable" class="x-select-search">
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              class="x-select-search-input"
              placeholder="搜索..."
              @keydown.escape="closeDropdown"
            />
          </div>
  
          <!-- 选项列表 -->
          <div class="x-select-options">
            <div
              v-if="filteredOptions.length === 0"
              class="x-select-empty"
            >
              {{ noOptionsText }}
            </div>
            <div
              v-for="option in filteredOptions"
              :key="getOptionValue(option)"
              @click="selectOption(option)"
              @keydown.enter="selectOption(option)"
              @keydown.space="selectOption(option)"
              :class="[
                'x-select-option',
                { 'is-selected': isSelected(option) }
              ]"
              role="option"
              :aria-selected="isSelected(option)"
              :tabindex="0"
            >
              <div class="x-select-option-content">
                <!-- 多选复选框 -->
                <div v-if="multiple" class="x-select-checkbox-wrapper">
                  <div
                    :class="[
                      'x-select-checkbox',
                      { 'is-checked': isSelected(option) }
                    ]"
                  >
                    <Icon
                      v-if="isSelected(option)"
                      icon="mdi:check"
                      class="x-select-checkbox-icon"
                    ></Icon>
                  </div>
                </div>
                <!-- 单选单选框 -->
                <div v-else class="x-select-radio-wrapper">
                  <div
                    :class="[
                      'x-select-radio',
                      { 'is-checked': isSelected(option) }
                    ]"
                  >
                    <div
                      v-if="isSelected(option)"
                      class="x-select-radio-dot"
                    ></div>
                  </div>
                </div>
                <span class="x-select-option-label">{{ getOptionLabel(option) }}</span>
              </div>
            </div>
          </div>
        </div>
        </template>
      </ElPopover>
    </div>
  </template>
  
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ElPopover } from 'element-plus'
/**
 * Select 选择器组件
 * @displayName XSelect
 */

import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
  export interface SelectOption {
    label: string
    value: any
    disabled?: boolean
    [key: string]: any
  }
  
  export interface SelectProps {
    modelValue?: any
    options: SelectOption[]
    placeholder?: string
    multiple?: boolean
    searchable?: boolean
    disabled?: boolean
    labelKey?: string
    valueKey?: string
    noOptionsText?: string
    clearable?: boolean
    borderless?: boolean
    width?: string
  }
  
  interface Emits {
    (e: 'update:modelValue', value: any): void
    (e: 'change', value: any): void
    (e: 'open'): void
    (e: 'close'): void
  }
  
  const props = withDefaults(defineProps<SelectProps>(), {
    options: () => [],
    placeholder: '请选择...',
    multiple: false,
    searchable: false,
    disabled: false,
    labelKey: 'label',
    valueKey: 'value',
    noOptionsText: '暂无选项',
    clearable: false,
    borderless: false,
    width: '100%'
  })
  
  const emit = defineEmits<Emits>()
  
  // 响应式数据
  const isOpen = ref(false)
  const searchQuery = ref('')
  const selectContainer = ref<HTMLElement>()
  
  // 计算 select 容器宽度用于 popover
  const selectWidth = computed(() => {
    if (!selectContainer.value) return 200
    return selectContainer.value.offsetWidth || 200
  })
  const searchInput = ref<HTMLInputElement>()
  
  // 计算属性
  const filteredOptions = computed(() => {
    if (!props.searchable || !searchQuery.value) {
      return props.options
    }
    return props.options.filter(option => 
      getOptionLabel(option).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
  
  const selectedOption = computed(() => {
    if (props.multiple) return null
    return props.options.find(option => getOptionValue(option) === props.modelValue) || null
  })
  
  const selectedOptions = computed(() => {
    if (!props.multiple) return []
    if (Array.isArray(props.modelValue)) {
      return props.options.filter(option => 
        props.modelValue.includes(getOptionValue(option))
      )
    }
    return []
  })
  
  const hasSelection = computed(() => {
    if (props.multiple) {
      return selectedOptions.value.length > 0
    }
    // 单选：检查 modelValue 是否有值（不是 null、undefined 或空字符串）
    return props.modelValue !== null && props.modelValue !== undefined && props.modelValue !== ''
  })
  
  const labelId = computed(() => `select-label-${Math.random().toString(36).substr(2, 9)}`)
  
  // 方法
  const getOptionLabel = (option: SelectOption): string => {
    return typeof option === 'object' ? option[props.labelKey] : option
  }
  
  const getOptionValue = (option: SelectOption): any => {
    return typeof option === 'object' ? option[props.valueKey] : option
  }
  
  const isSelected = (option: SelectOption): boolean => {
    const value = getOptionValue(option)
    if (props.multiple) {
      return Array.isArray(props.modelValue) && props.modelValue.includes(value)
    }
    return props.modelValue === value
  }
  
  const selectOption = (option: SelectOption) => {
    if (option.disabled) return
    
    const value = getOptionValue(option)
    
    if (props.multiple) {
      const currentValues = Array.isArray(props.modelValue) ? [...props.modelValue] : []
      const index = currentValues.indexOf(value)
      
      if (index > -1) {
        currentValues.splice(index, 1)
      } else {
        currentValues.push(value)
      }
      
      emit('update:modelValue', currentValues)
      emit('change', currentValues)
    } else {
      emit('update:modelValue', value)
      emit('change', value)
      closeDropdown()
    }
  }
  
  const removeOption = (option: SelectOption) => {
    if (!props.multiple) return
    
    const value = getOptionValue(option)
    const currentValues = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const index = currentValues.indexOf(value)
    
    if (index > -1) {
      currentValues.splice(index, 1)
      emit('update:modelValue', currentValues)
      emit('change', currentValues)
    }
  }
  
  const handleClear = () => {
    if (props.disabled) return
    
    if (props.multiple) {
      emit('update:modelValue', [])
      emit('change', [])
    } else {
      emit('update:modelValue', null)
      emit('change', null)
      closeDropdown()
    }
  }
  
  const toggleDropdown = () => {
    if (props.disabled) return
    
    if (isOpen.value) {
      closeDropdown()
    } else {
      openDropdown()
    }
  }
  
  const openDropdown = () => {
    isOpen.value = true
    emit('open')
    
    // 聚焦搜索框
    nextTick(() => {
      if (props.searchable && searchInput.value) {
        searchInput.value.focus()
      }
    })
  }
  
  const closeDropdown = () => {

    isOpen.value = false

    searchQuery.value = ''

    emit('close')
    
  }
  
  // 键盘导航
  const handleKeydown = (event: KeyboardEvent) => {
    if (!isOpen.value) return
    
    const options = filteredOptions.value
    const currentIndex = options.findIndex(option => isSelected(option))
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        // 可以添加高亮逻辑
        break
      case 'ArrowUp':
        event.preventDefault()
        // 可以添加高亮逻辑
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (currentIndex >= 0 && options[currentIndex]) {
          selectOption(options[currentIndex])
        }
        break
    }
  }
  
  // 生命周期
  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
  
  // 暴露方法
  defineExpose({
    open: openDropdown,
    close: closeDropdown,
    toggle: toggleDropdown
  })
  </script>

<style scoped>
/* ============================================
   Select 选择器样式 - iOS 17 设计语言
   ============================================ */

/* 容器 */
.x-select-container {
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', sans-serif;
}

/* 触发器 */
.x-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: -0.24px;
  -webkit-font-smoothing: antialiased;
  background: var(--x-bg-color, #FFFFFF);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--x-radius, 12px);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border: 1.5px solid var(--x-border-color, #E5E5EA);
  outline: none;
  min-height: 48px;
  box-shadow: 0 1px 3px var(--x-shadow-light, rgba(0, 0, 0, 0.02)), 
              inset 0 1px 1px var(--x-shadow-inset-light, rgba(255, 255, 255, 0.8));
  transform: translateZ(0);
  will-change: transform, box-shadow;
}

/* 悬停效果 */
.x-select-trigger:not(.is-disabled):hover {
  background: var(--x-bg-color, #FAFAFA);
  transform: translateY(-1px);
  border-color: var(--x-border-color, #D1D1D6);
}

/* 聚焦效果 */
.x-select-trigger:focus {
  outline: none;
  border-color: var(--x-color-primary, #007AFF);
  box-shadow: 0 0 0 3.5px var(--x-shadow-focus-primary, rgba(0, 122, 255, 0.15)), 
              0 4px 12px var(--x-shadow-primary-light, rgba(0, 122, 255, 0.08)),
              inset 0 1px 1px var(--x-shadow-inset-light, rgba(255, 255, 255, 0.9));
}

/* 打开状态 */
.x-select-trigger.is-open {
  background: var(--x-bg-color, #FFFFFF);
  border-color: var(--x-color-primary, #007AFF);
  box-shadow: 0 0 0 3.5px var(--x-shadow-focus-primary, rgba(0, 122, 255, 0.15)), 
              0 4px 16px var(--x-shadow-primary-light, rgba(0, 122, 255, 0.1)),
              inset 0 1px 1px var(--x-shadow-inset-light, rgba(255, 255, 255, 0.9));
  transform: translateY(-1px) scale(0.998);
}

/* 无边框样式 */
.x-select-trigger.is-borderless {
  border-color: transparent;
  background: var(--x-fill-color, #F2F2F7);
  box-shadow: none;
}

.x-select-trigger.is-borderless:hover {
  background: var(--x-fill-color-hover, #E5E5EA);
  transform: translateY(0);
}

/* 禁用状态 */
.x-select-trigger.is-disabled {
  background: var(--x-fill-color-disabled, #F2F2F7);
  cursor: not-allowed;
  border-color: transparent;
  opacity: 0.6;
  box-shadow: none;
}

/* 内容区 */
.x-select-content {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 0;
  flex: 1;
  overflow: hidden;
  max-height: 200px;
}

/* 占位符 */
.x-select-placeholder {
  color: var(--x-text-color-placeholder, #9CA3AF);
  font-weight: 400;
  letter-spacing: -0.24px;
}

/* 标签容器 */
.x-select-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  flex: 1;
  overflow-y: auto;
  max-height: 180px;
  padding-right: 4px;
  scrollbar-width: thin;
  scrollbar-color: var(--x-scrollbar-color, rgba(142, 142, 147, 0.3)) transparent;
}

.x-select-tags::-webkit-scrollbar {
  width: 4px;
}

.x-select-tags::-webkit-scrollbar-track {
  background: transparent;
}

.x-select-tags::-webkit-scrollbar-thumb {
  background: var(--x-scrollbar-color, rgba(142, 142, 147, 0.3));
  border-radius: 2px;
}

/* 标签 */
.x-select-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.08px;
  -webkit-font-smoothing: antialiased;
  border-radius: 12px;
  background: var(--x-tag-bg, linear-gradient(135deg, #E3F2FF 0%, #D1E7FF 100%));
  color: var(--x-color-primary, #007AFF);
  border: 1px solid var(--x-tag-border, rgba(0, 122, 255, 0.12));
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.x-select-tag:hover {
  background: var(--x-tag-bg-hover, linear-gradient(135deg, #D1E7FF 0%, #B9DCFF 100%));
  transform: scale(1.02);
}

/* 标签关闭按钮 */
.x-select-tag-close {
  border-radius: 50%;
  padding: 0;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  background: var(--x-tag-close-bg, rgba(0, 122, 255, 0.1));
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}

.x-select-tag-close:hover {
  background: var(--x-tag-close-bg-hover, rgba(0, 122, 255, 0.2));
  transform: scale(1.1) rotate(90deg);
}

.x-select-tag-close i {
  font-size: 14px;
  color: var(--x-color-primary, #007AFF);
  font-weight: 600;
}

/* 单选值 */
.x-select-single-value {
  color: var(--x-text-color-primary, #1F2937);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  font-weight: 400;
  letter-spacing: -0.3px;
  -webkit-font-smoothing: antialiased;
}

/* 后缀容器 */
.x-select-suffix {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

/* 清除按钮 */
.x-select-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--x-text-color-placeholder, #9CA3AF);
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border-radius: 50%;
  font-size: 18px;
  opacity: 1;
  transform: scale(1);
}

.x-select-clear:hover {
  color: var(--x-color-danger, #FF3B30);
  background: rgba(255, 59, 48, 0.08);
  transform: scale(1.1);
}

.x-select-clear:active {
  transform: scale(0.95);
}

/* 箭头图标 */
.x-select-arrow {
  color: var(--x-text-color-secondary, #6B7280);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  font-size: 20px;
  flex-shrink: 0;
  transform-origin: center;
}

.x-select-arrow.is-open {
  transform: rotate(180deg);
  color: var(--x-color-primary, #007AFF);
}

/* Element Plus Popover 样式覆盖 */
:global(.x-select-popper) {
  padding: 0 !important;
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(30px) saturate(180%);
  -webkit-backdrop-filter: blur(30px) saturate(180%);
  border: 1px solid #E5E5EA !important;
  border-radius: 16px !important;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 
              0 4px 16px rgba(0, 0, 0, 0.08),
              inset 0 1px 1px rgba(255, 255, 255, 0.8) !important;
}

:global(.x-select-popper .el-popper__arrow) {
  display: none !important;
}

/* 下拉菜单 */
.x-select-dropdown {
  display: flex;
  flex-direction: column;
  max-height: 400px;
}

/* 搜索框 - 固定在顶部 */
.x-select-search {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 12px;
  background: var(--x-bg-color, #FFFFFF);
  border-bottom: 1px solid var(--x-border-color-light, #F2F2F7);
  flex-shrink: 0;
  border-radius: 20px;
  border:none;
}

.x-select-search-input {
  width: 100%;
  padding: 10px 14px;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: -0.24px;
  -webkit-font-smoothing: antialiased;
  background: var(--x-bg-color, #FFFFFF);
  border: 1px solid var(--x-border-color, #E5E5EA);
  border-radius: 10px;
  outline: none;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  color: var(--x-text-color-primary, #1F2937);
}

.x-select-search-input::placeholder {
  color: var(--x-text-color-placeholder, #9CA3AF);
  font-weight: 400;
}

.x-select-search-input:focus {
  border-color: var(--x-color-primary, #007AFF);
  background: var(--x-bg-color, #FFFFFF);
  box-shadow: 0 0 0 3px var(--x-shadow-focus-primary, rgba(0, 122, 255, 0.1));
}

/* 选项列表 */
.x-select-options {
  padding: 8px;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  scrollbar-width: thin;
  scrollbar-color: var(--x-scrollbar-color, rgba(142, 142, 147, 0.3)) transparent;
}

.x-select-options::-webkit-scrollbar {
  width: 6px;
}

.x-select-options::-webkit-scrollbar-track {
  background: transparent;
  margin: 4px 0;
}

.x-select-options::-webkit-scrollbar-thumb {
  background: var(--x-scrollbar-color, rgba(142, 142, 147, 0.3));
  border-radius: 3px;
}

/* 空状态 */
.x-select-empty {
  padding: 24px;
  font-size: 15px;
  color: rgba(60, 60, 67, 0.6);
  text-align: center;
  font-weight: 400;
  letter-spacing: -0.24px;
}

/* 选项 */
.x-select-option {
  padding: 12px 14px;
  margin: 2px 0;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: -0.24px;
  -webkit-font-smoothing: antialiased;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  color: #000000;
  transform: translateZ(0);
}

.x-select-option:hover:not(.is-selected) {
  background: var(--x-fill-color-primary-lighter, rgba(0, 122, 255, 0.06));
  transform: scale(0.995);
}

.x-select-option.is-selected {
  background: linear-gradient(135deg, #E3F2FF 0%, #D1E7FF 100%);
  color: var(--x-color-primary, #007AFF);
  font-weight: 500;
  box-shadow: 0 2px 6px var(--x-shadow-primary, rgba(0, 122, 255, 0.1));
}

.x-select-option-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 复选框 */
.x-select-checkbox {
  width: 22px;
  height: 22px;
  border-radius: 7px;
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  background: #FFFFFF;
}

.x-select-checkbox.is-checked {
  border-color: #007AFF;
  background: linear-gradient(135deg, #007AFF 0%, #0051D5 100%);
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 122, 255, 0.25);
}

.x-select-checkbox:not(.is-checked) {
  border-color: rgba(60, 60, 67, 0.25);
}

.x-select-checkbox-icon {
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 700;
  transform: scale(0);
  animation: checkmarkScale 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes checkmarkScale {
  0% { transform: scale(0) rotate(-45deg); }
  50% { transform: scale(1.2) rotate(5deg); }
  100% { transform: scale(1) rotate(0deg); }
}

/* 单选框 */
.x-select-radio {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  background: #FFFFFF;
}

.x-select-radio.is-checked {
  border-color: #007AFF;
  background: linear-gradient(135deg, #FFFFFF 0%, #F5F5F7 100%);
  box-shadow: 0 2px 8px rgba(0, 122, 255, 0.2);
}

.x-select-radio:not(.is-checked) {
  border-color: rgba(60, 60, 67, 0.25);
}

.x-select-radio-dot {
  width: 10px;
  height: 10px;
  background: linear-gradient(135deg, #007AFF 0%, #0051D5 100%);
  border-radius: 50%;
  transform: scale(0);
  animation: radioDotScale 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes radioDotScale {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

/* 标签文本 */
.x-select-option-label {
  flex: 1;
}

/* 尺寸变体 */
.x-select-trigger--small {
  min-height: 36px;
  font-size: 13px;
  padding: 8px 12px;
  border-radius: 9px;
}

.x-select-trigger--large {
  min-height: 56px;
  font-size: 17px;
  padding: 14px 18px;
  border-radius: 14px;
}

/* 暗色模式 - 使用 .dark 类名 */
.dark .x-select-trigger {
  background: rgba(30, 30, 30, 0.9);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 
              inset 0 1px 1px rgba(255, 255, 255, 0.03);
}

.dark .x-select-trigger:not(.is-disabled):hover {
  background: rgba(40, 40, 40, 0.95);
  border-color: rgba(255, 255, 255, 0.15);
}

.dark .x-select-trigger.is-borderless {
  background: rgba(142, 142, 147, 0.2);
}

.dark .x-select-trigger.is-disabled {
  background: rgba(30, 30, 30, 0.4);
  opacity: 0.6;
}

.dark .x-select-placeholder {
  color: rgba(235, 235, 245, 0.5);
}

.dark .x-select-single-value {
  color: rgba(255, 255, 255, 0.95);
}

.dark .x-select-arrow {
  color: rgba(235, 235, 245, 0.6);
}

.dark .x-select-clear {
  color: rgba(235, 235, 245, 0.5);
}

.dark .x-select-clear:hover {
  color: #FF453A;
  background: rgba(255, 69, 58, 0.15);
}

/* 暗色模式 - Element Plus Popover 覆盖 */
.dark :global(.x-select-popper.el-popper) {
  background: var(--x-bg-color) !important;
  border: 1px solid var(--x-border-color) !important;
  box-shadow: 0 12px 40px var(--x-shadow-lg), 
              0 4px 16px var(--x-shadow) !important;
}

.dark .x-select-dropdown {
  background: transparent;
}

.dark .x-select-options {
  background: transparent;
}

.dark .x-select-options::-webkit-scrollbar-thumb {
  background: rgba(235, 235, 245, 0.3);
}

.dark .x-select-search {
  background: var(--x-bg-color-dark, rgba(28, 28, 30, 0.98));
  border-color: rgba(255, 255, 255, 0.08);
}

.dark .x-select-search-input {
  background: rgba(50, 50, 50, 0.95);
  border-color: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.95);
}

.dark .x-select-search-input::placeholder {
  color: rgba(235, 235, 245, 0.4);
}

.dark .x-select-search-input:focus {
  background: rgba(60, 60, 60, 0.95);
  border-color: #0A84FF;
  box-shadow: 0 0 0 3px rgba(10, 132, 255, 0.2);
}

.dark .x-select-option {
  color: rgba(255, 255, 255, 0.9);
}

.dark .x-select-option:hover:not(.is-selected) {
  background: rgba(10, 132, 255, 0.15);
}

.dark .x-select-option.is-selected {
  background: rgba(10, 132, 255, 0.25);
  color: #FFFFFF;
}

.dark .x-select-checkbox:not(.is-checked),
.dark .x-select-radio:not(.is-checked) {
  border-color: rgba(235, 235, 245, 0.2);
  background: rgba(50, 50, 50, 0.6);
}

.dark .x-select-checkbox.is-checked {
  background: linear-gradient(135deg, #0A84FF 0%, #0051D5 100%);
  border-color: #0A84FF;
}

.dark .x-select-radio.is-checked {
  border-color: #0A84FF;
  background: rgba(10, 132, 255, 0.15);
}

/* 系统偏好暗色模式 */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) .x-select-trigger {
    background: rgba(30, 30, 30, 0.9);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
  
  :root:not([data-theme="light"]) :global(.x-select-popper.el-popper) {
    background: rgba(28, 28, 30, 0.98) !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
  }
  
  :root:not([data-theme="light"]) .x-select-option {
    color: rgba(255, 255, 255, 0.9);
  }
  
  :root:not([data-theme="light"]) .x-select-search-input {
    background: rgba(50, 50, 50, 0.95);
    color: rgba(255, 255, 255, 0.95);
  }
}

/* 响应式优化 */
@media (max-width: 768px) {
  .x-select-trigger {
    min-height: 44px;
    font-size: 16px; /* 防止iOS缩放 */
  }
  
  :global(.x-select-popper) {
    border-radius: 12px !important;
  }
}

/* 辅助功能 */
@media (prefers-reduced-motion: reduce) {
  .x-select-trigger,
  .x-select-option,
  .x-select-tag,
  .x-select-checkbox,
  .x-select-radio,
  .x-select-arrow {
    transition: none;
  }
  
  @keyframes checkmarkScale {
    0%, 100% { transform: scale(1) rotate(0deg); }
  }
  
  @keyframes radioDotScale {
    0%, 100% { transform: scale(1); }
  }
}
</style>
  