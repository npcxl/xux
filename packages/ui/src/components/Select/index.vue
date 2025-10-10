<template>
    <div class="relative" :style="{ width: width }" ref="selectContainer">
      <!-- 触发器 -->
      <div
        @click="toggleDropdown"
        @keydown.enter="toggleDropdown"
        @keydown.space="toggleDropdown"
        @keydown.escape="closeDropdown"
                :class="[
            'flex items-center justify-between w-full px-4 py-1.5 text-sm bg-white rounded-md cursor-pointer transition-all duration-200 border ',
            'focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/50 focus:ring-offset-1',
            {
              'shadow-sm hover:shadow-md border border-gray-200/60 hover:border-gray-300/80': !disabled && !borderless,
              'shadow-sm hover:shadow-md': !disabled && borderless,
              'bg-gray-50/50 cursor-not-allowed border border-gray-100': disabled,
              'ring-1 ring-[#1a1a1a]/50 border-[#1a1a1a]/50 shadow-md': isOpen && !borderless,
              'ring-1 ring-[#1a1a1a]/50 shadow-md': isOpen && borderless
            }
          ]"
        :tabindex="disabled ? -1 : 0"
        role="combobox"
        :aria-expanded="isOpen"
        :aria-haspopup="true"
        :aria-labelledby="labelId"
      >
        <div class="flex items-center gap-2 min-h-0 flex-1">
          <span v-if="placeholder && !hasSelection" class="text-gray-500">
            {{ placeholder }}
          </span>
          <div v-else class="flex flex-wrap gap-1">
            <!-- 单选显示 -->
            <template v-if="!multiple">
              <span v-if="selectedOption" class="text-gray-900">
                {{ getOptionLabel(selectedOption) }}
              </span>
            </template>
            <!-- 多选显示 -->
            <template v-else>
              <span
                 v-for="option in selectedOptions"
                 :key="getOptionValue(option)"
                 class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-[#FFF] text-[#1a1a1a] rounded-full border border-[#1a1a1a]/50"
               >
                 {{ getOptionLabel(option) }}
                 <button
                   @click.stop="removeOption(option)"
                   class="rounded-full p-0.5 transition-colors duration-150"
                   type="button"
                 >
                   <i class="bi bi-x text-xs text-[#1a1a1a]"></i>
                 </button>
               </span>
            </template>
          </div>
        </div>
               <i
           :class="[
             'bi text-gray-400 transition-transform duration-200 text-lg',
             {
               'bi-chevron-down': !isOpen,
               'bi-chevron-up': isOpen
             }
           ]"
         ></i>
      </div>
  
      <!-- 下拉菜单 -->
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
               <div
           v-if="isOpen"
           class="absolute z-[9999] w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100/50 max-h-60 overflow-auto backdrop-blur-sm"
           role="listbox"
         >
                   <!-- 搜索框 -->
           <div v-if="searchable" class="p-3 border-b border-gray-50/80">
             <input
               ref="searchInput"
               v-model="searchQuery"
               type="text"
               class="w-full px-3 py-2 text-sm bg-gray-50/50 border border-gray-200/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1a1a1a]/50 focus:border-[#1a1a1a]/50 transition-all duration-200"
               placeholder="搜索..."
               @keydown.escape="closeDropdown"
             />
           </div>
  
                   <!-- 选项列表 -->
           <div class="py-1">
             <div
               v-if="filteredOptions.length === 0"
               class="px-4 py-3 text-sm text-gray-400 text-center"
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
                 'px-4 py-3 text-sm cursor-pointer transition-all duration-150',
                 {
                   'bg-[#f2f2f2] text-[#1a1a1a] font-medium': isSelected(option),
                   'hover:bg-[#f2f2f2] text-gray-700': !isSelected(option)
                 }
               ]"
               role="option"
               :aria-selected="isSelected(option)"
               :tabindex="0"
             >
                           <div class="flex items-center gap-3">
                <!-- 多选复选框 -->
                <div v-if="multiple" class="flex items-center">
                  <div
                    :class="[
                      'w-4 h-4 rounded border flex items-center justify-center transition-all duration-150',
                      {
                        'border-[#1a1a1a] ': isSelected(option),
                        'border-gray-300 bg-white': !isSelected(option)
                      }
                    ]"
                  >
                    <Icon
                      v-if="isSelected(option)"
                      icon="mdi:check"
                      class="text-[#1a1a1a] text-xs font-bold"
                    ></Icon>
                  </div>
                </div>
                 <!-- 单选单选框 -->
                 <div v-else class="flex items-center">
                   <div
                     :class="[
                       'w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-150',
                       {
                         'border-[#1a1a1a] bg-[#1a1a1a]': isSelected(option),
                         'border-gray-300 bg-white': !isSelected(option)
                       }
                     ]"
                   >
                     <div
                       v-if="isSelected(option)"
                       class="w-1.5 h-1.5 bg-white rounded-full"
                     ></div>
                   </div>
                 </div>
                 <span class="flex-1">{{ getOptionLabel(option) }}</span>
               </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { Icon } from '@iconify/vue'
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
  
  // 点击外部关闭下拉框
  const handleClickOutside = (event: Event) => {
    if (selectContainer.value && !selectContainer.value.contains(event.target as Node)) {
      closeDropdown()
    }
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
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleKeydown)
  })
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
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
  /* 自定义滚动条样式 */
  .overflow-auto::-webkit-scrollbar {
    width: 4px;
  }
  
  .overflow-auto::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .overflow-auto::-webkit-scrollbar-thumb {
    background: rgba(156, 163, 175, 0.3);
    border-radius: 2px;
  }
  
  .overflow-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(156, 163, 175, 0.5);
  }
  </style>
  