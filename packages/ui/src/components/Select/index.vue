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
                       <i class="bi bi-x"></i>
                     </button>
                   </span>
                </template>
              </div>
            </div>
            <Icon
              :class="['x-select-arrow', { 'is-open': isOpen }]"
              icon="mdi:chevron-down"
            ></Icon>
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
  import './index.css'
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
    placeholder: '请选择...',
    multiple: false,
    searchable: false,
    disabled: false,
    labelKey: 'label',
    valueKey: 'value',
    noOptionsText: '暂无选项',
    clearable: false,
    borderless: false,
    width: '200px'
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
    return selectedOption.value !== null
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
  