<template>
  <div 
    class="x-autocomplete"
    :class="{
      'is-disabled': disabled,
      'is-focus': isFocus
    }"
    v-click-outside="handleClickOutside"
  >
    <!-- 输入框 -->
    <div class="x-autocomplete__wrapper">
      <div v-if="$slots.prepend" class="x-autocomplete__prepend">
        <slot name="prepend" />
      </div>
      
      <div class="x-autocomplete__inner">
        <span v-if="$slots.prefix || prefixIcon" class="x-autocomplete__prefix">
          <slot name="prefix">
            <XIcon v-if="prefixIcon" :name="prefixIcon" :size="16" />
          </slot>
        </span>
        
        <input
          ref="inputRef"
          class="x-autocomplete__input"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :name="name"
          :aria-label="ariaLabel"
          :autocomplete="'off'"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown="handleKeyDown"
        />
        
        <span v-if="showClear || showLoading || $slots.suffix || suffixIcon" class="x-autocomplete__suffix">
          <XIcon 
            v-if="showLoading && !hideLoading" 
            name="loading" 
            :size="16" 
            class="x-autocomplete__loading"
          />
          <XIcon 
            v-if="showClear" 
            name="close-circle" 
            :size="16"
            class="x-autocomplete__clear"
            @click="handleClear"
          />
          <slot name="suffix">
            <XIcon v-if="suffixIcon && !showClear && !showLoading" :name="suffixIcon" :size="16" />
          </slot>
        </span>
      </div>
      
      <div v-if="$slots.append" class="x-autocomplete__append">
        <slot name="append" />
      </div>
    </div>
    
    <!-- 下拉建议 -->
    <Teleport :to="teleported ? 'body' : null">
      <Transition name="x-autocomplete-dropdown">
        <div
          v-show="showSuggestions"
          ref="dropdownRef"
          class="x-autocomplete__dropdown"
          :class="[popperClass, { 'is-teleported': teleported }]"
          :style="[dropdownStyle, popperStyle]"
        >
          <!-- 头部插槽 -->
          <div v-if="$slots.header" class="x-autocomplete__header">
            <slot name="header" />
          </div>
          
          <!-- 建议列表 -->
          <ul v-if="suggestions.length > 0" class="x-autocomplete__suggestions">
            <li
              v-for="(item, index) in suggestions"
              :key="index"
              class="x-autocomplete__suggestion"
              :class="{
                'is-highlighted': index === highlightedIndex,
                'is-disabled': item.disabled
              }"
              @click="handleSelect(item, index)"
              @mouseenter="highlightedIndex = index"
            >
              <slot :item="item">
                <span>{{ getItemValue(item) }}</span>
              </slot>
            </li>
          </ul>
          
          <!-- 空状态 -->
          <div v-else-if="!loading" class="x-autocomplete__empty">
            <slot name="empty">
              <span>暂无数据</span>
            </slot>
          </div>
          
          <!-- 加载状态 -->
          <div v-if="loading && !hideLoading" class="x-autocomplete__loading-wrapper">
            <slot name="loading">
              <XIcon name="loading" :size="24" class="x-autocomplete__loading-icon" />
              <span>加载中...</span>
            </slot>
          </div>
          
          <!-- 底部插槽 -->
          <div v-if="$slots.footer" class="x-autocomplete__footer">
            <slot name="footer" />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted, useSlots } from 'vue'
import XIcon from '../Icon/index.vue'
import { vClickOutside } from '../../directives/click-outside'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: String,
  disabled: Boolean,
  clearable: Boolean,
  valueKey: {
    type: String,
    default: 'value'
  },
  debounce: {
    type: Number,
    default: 300
  },
  placement: {
    type: String,
    default: 'bottom-start'
  },
  fetchSuggestions: {
    type: Function,
    required: true
  },
  triggerOnFocus: {
    type: Boolean,
    default: true
  },
  selectWhenUnmatched: Boolean,
  name: String,
  ariaLabel: String,
  hideLoading: Boolean,
  popperClass: [String, Object],
  popperStyle: [String, Object],
  teleported: {
    type: Boolean,
    default: true
  },
  highlightFirstItem: Boolean,
  fitInputWidth: {
    type: Boolean,
    default: true
  },
  loopNavigation: {
    type: Boolean,
    default: true
  },
  prefixIcon: String,
  suffixIcon: String
})

const emit = defineEmits([
  'update:modelValue',
  'input',
  'change',
  'focus',
  'blur',
  'clear',
  'select'
])

// 插槽
const $slots = useSlots()

// 状态
const inputRef = ref()
const dropdownRef = ref()
const isFocus = ref(false)
const loading = ref(false)
const suggestions = ref([])
const highlightedIndex = ref(-1)
const activated = ref(false)
const dropdownStyle = ref({})

// 计算属性
const showClear = computed(() => {
  return props.clearable && 
         props.modelValue && 
         !props.disabled && 
         isFocus.value
})

const showLoading = computed(() => {
  return loading.value && !props.hideLoading
})

const showSuggestions = computed(() => {
  return activated.value && (
    suggestions.value.length > 0 || 
    loading.value || 
    $slots.header || 
    $slots.footer ||
    $slots.empty
  )
})

// 防抖函数
let debounceTimer = null
const debounceSearch = (value) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    getData(value)
  }, props.debounce)
}

// 获取数据
const getData = async (queryString = '') => {
  loading.value = true
  
  try {
    await props.fetchSuggestions(queryString, (data) => {
      suggestions.value = Array.isArray(data) ? data : []
      loading.value = false
      
      if (props.highlightFirstItem && suggestions.value.length > 0) {
        highlightedIndex.value = 0
      }
    })
  } catch (error) {
    suggestions.value = []
    loading.value = false
    console.error('Failed to fetch suggestions:', error)
  }
}

// 获取项目值
const getItemValue = (item) => {
  return typeof item === 'object' ? item[props.valueKey] : item
}

// 处理输入
const handleInput = (event) => {
  const value = event.target.value
  emit('update:modelValue', value)
  emit('input', value)
  
  activated.value = true
  
  if (value) {
    debounceSearch(value)
  } else {
    suggestions.value = []
    highlightedIndex.value = -1
  }
}

// 处理聚焦
const handleFocus = (event) => {
  isFocus.value = true
  emit('focus', event)
  
  if (props.triggerOnFocus) {
    activated.value = true
    if (props.modelValue) {
      getData(props.modelValue)
    } else {
      getData('')
    }
  }
}

// 处理失焦
const handleBlur = (event) => {
  // 延迟处理，确保点击下拉项时能先触发 select 事件
  setTimeout(() => {
    isFocus.value = false
    activated.value = false
    highlightedIndex.value = -1
  }, 200)
  emit('blur', event)
}

// 处理清空
const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
  emit('change', '')
  suggestions.value = []
  highlightedIndex.value = -1
  inputRef.value?.focus()
}

// 处理选择
const handleSelect = (item, index) => {
  if (item.disabled) return
  
  const value = getItemValue(item)
  emit('update:modelValue', value)
  emit('select', item)
  emit('change', value)
  
  nextTick(() => {
    suggestions.value = []
    highlightedIndex.value = -1
    activated.value = false
  })
}

// 处理点击外部
const handleClickOutside = () => {
  activated.value = false
  highlightedIndex.value = -1
}

// 处理键盘事件
const handleKeyDown = (event) => {
  const { key } = event
  
  if (!showSuggestions.value) return
  
  switch (key) {
    case 'ArrowUp':
      event.preventDefault()
      navigate(-1)
      break
    case 'ArrowDown':
      event.preventDefault()
      navigate(1)
      break
    case 'Enter':
      event.preventDefault()
      handleKeyEnter()
      break
    case 'Escape':
      event.preventDefault()
      close()
      break
  }
}

// 导航
const navigate = (direction) => {
  const total = suggestions.value.length
  if (total === 0) return
  
  let nextIndex = highlightedIndex.value + direction
  
  if (props.loopNavigation) {
    if (nextIndex < 0) nextIndex = total - 1
    if (nextIndex >= total) nextIndex = 0
  } else {
    nextIndex = Math.max(0, Math.min(nextIndex, total - 1))
  }
  
  highlightedIndex.value = nextIndex
}

// 处理回车键
const handleKeyEnter = () => {
  if (highlightedIndex.value >= 0 && highlightedIndex.value < suggestions.value.length) {
    handleSelect(suggestions.value[highlightedIndex.value], highlightedIndex.value)
  } else if (props.selectWhenUnmatched) {
    emit('select', { [props.valueKey]: props.modelValue })
    close()
  }
}

// 更新下拉框位置
const updateDropdownPosition = () => {
  if (!inputRef.value || !dropdownRef.value) return
  
  const rect = inputRef.value.getBoundingClientRect()
  const dropdownWidth = props.fitInputWidth ? rect.width : 'auto'
  
  dropdownStyle.value = {
    position: props.teleported ? 'fixed' : 'absolute',
    top: props.teleported ? `${rect.bottom + 8}px` : '100%',
    left: props.teleported ? `${rect.left}px` : '0',
    width: `${dropdownWidth}px`,
    zIndex: 2000
  }
}

// 关闭建议列表
const close = () => {
  activated.value = false
  highlightedIndex.value = -1
}

// 高亮指定项
const highlight = (index) => {
  highlightedIndex.value = index
}

// 监听显示状态变化
watch(showSuggestions, (val) => {
  if (val) {
    nextTick(updateDropdownPosition)
  }
})

// 监听窗口大小变化
onMounted(() => {
  window.addEventListener('resize', updateDropdownPosition)
  window.addEventListener('scroll', updateDropdownPosition)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDropdownPosition)
  window.removeEventListener('scroll', updateDropdownPosition)
})

// 暴露方法
defineExpose({
  activated,
  blur: () => inputRef.value?.blur(),
  close,
  focus: () => inputRef.value?.focus(),
  handleSelect,
  handleKeyEnter,
  highlightedIndex,
  highlight,
  inputRef,
  loading,
  popperRef: dropdownRef,
  suggestions,
  getData
})
</script>

<style scoped>
.x-autocomplete {
  position: relative;
  display: inline-block;
  width: 100%;
  font-family: var(--x-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif);
}

/* 输入框容器 - 使用与 Input 相同的样式 */
.x-autocomplete__wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  background: var(--x-bg-color, #FFFFFF);
  border: 1.5px solid var(--x-border-color, #C6C6C8);
  border-radius: var(--x-radius, 10px);
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.x-autocomplete__wrapper:hover:not(.is-disabled) {
  border-color: var(--x-border-color-dark, #AEAEB2);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.x-autocomplete.is-focus .x-autocomplete__wrapper {
  border-color: var(--x-color-primary, #007AFF);
  background: var(--x-bg-color, #FFFFFF);
  box-shadow: var(--x-shadow-focus-primary), 0 4px 12px rgba(0, 122, 255, 0.08);
}

.x-autocomplete.is-disabled .x-autocomplete__wrapper {
  background-color: var(--x-fill-color, #F2F2F7);
  border-color: var(--x-border-color-lighter, #E5E5EA);
  cursor: not-allowed;
  opacity: 0.5;
}

.x-autocomplete.is-disabled .x-autocomplete__wrapper:hover {
  border-color: var(--x-border-color-lighter, #E5E5EA);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

/* 输入框内部 */
.x-autocomplete__inner {
  flex: 1;
  display: flex;
  align-items: center;
  min-height: 40px;
  position: relative;
}

/* 输入框 */
.x-autocomplete__input {
  flex: 1;
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: var(--x-font-size, 15px);
  color: var(--x-text-color-primary, #1f2937);
  padding: 10px 14px;
  font-family: inherit;
  line-height: 1.5;
  font-weight: 400;
  transition: none;
}

.x-autocomplete__input::placeholder {
  color: var(--x-text-color-placeholder, #9ca3af);
  opacity: 1;
  font-weight: 400;
}

.x-autocomplete__input:disabled {
  cursor: not-allowed;
  color: var(--x-text-color-placeholder, #9ca3af) !important;
  -webkit-text-fill-color: var(--x-text-color-placeholder, #9ca3af);
}

/* 前后缀 */
.x-autocomplete__prefix,
.x-autocomplete__suffix {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--x-text-color-placeholder, #6b7280);
  font-size: 18px;
  line-height: 1;
  z-index: 2;
  transition: color 0.2s ease;
  gap: 4px;
}

.x-autocomplete__prefix {
  left: 14px;
  pointer-events: none;
}

.x-autocomplete__suffix {
  right: 14px;
  pointer-events: auto;
}

.x-autocomplete.is-focus .x-autocomplete__prefix {
  color: var(--x-color-primary, #007AFF);
}

/* 带前缀时调整输入框 padding */
.x-autocomplete__wrapper:has(.x-autocomplete__prefix) .x-autocomplete__input {
  padding-left: 42px;
}

/* 带后缀时调整输入框 padding */
.x-autocomplete__wrapper:has(.x-autocomplete__suffix) .x-autocomplete__input {
  padding-right: 42px;
}

/* 清空按钮 */
.x-autocomplete__clear {
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--x-text-color-placeholder, #9ca3af);
}

.x-autocomplete__clear:hover {
  color: var(--x-color-danger, #ef4444);
  transform: scale(1.1);
}

.x-autocomplete__clear:active {
  transform: scale(0.95);
}

/* 加载动画 */
.x-autocomplete__loading {
  animation: x-autocomplete-rotate 0.8s linear infinite;
  color: var(--x-color-primary, #007AFF);
}

@keyframes x-autocomplete-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 前后置元素 */
.x-autocomplete__prepend,
.x-autocomplete__append {
  padding: 0 14px;
  background: var(--x-fill-color, #F2F2F7);
  color: var(--x-text-color-primary, #1f2937);
  white-space: nowrap;
  display: flex;
  align-items: center;
  font-size: var(--x-font-size, 15px);
}

.x-autocomplete__prepend {
  border-right: 1.5px solid var(--x-border-color, #C6C6C8);
}

.x-autocomplete__append {
  border-left: 1.5px solid var(--x-border-color, #C6C6C8);
}

/* 下拉框 */
.x-autocomplete__dropdown {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 12px;
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.12),
    0 2px 10px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  margin-top: 8px;
  overflow: hidden;
  max-height: 300px;
  overflow-y: auto;
}

/* iOS风格滚动条 */
.x-autocomplete__dropdown::-webkit-scrollbar {
  width: 6px;
}

.x-autocomplete__dropdown::-webkit-scrollbar-track {
  background: transparent;
}

.x-autocomplete__dropdown::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

/* 头部和底部 */
.x-autocomplete__header,
.x-autocomplete__footer {
  padding: 8px 12px;
  border-bottom: 1px solid #e5e5ea;
  font-size: 14px;
  color: #86868b;
}

.x-autocomplete__footer {
  border-bottom: none;
  border-top: 1px solid #e5e5ea;
}

/* 建议列表 */
.x-autocomplete__suggestions {
  list-style: none;
  padding: 4px 0;
  margin: 0;
}

.x-autocomplete__suggestion {
  padding: 10px 16px;
  cursor: pointer;
  font-size: 16px;
  color: #1d1d1f;
  transition: background-color 0.2s;
  position: relative;
}

.x-autocomplete__suggestion:hover {
  background: rgba(74, 144, 226, 0.04);  /* 更轻的悬停背景，保持一致的配色方案 */
}

.x-autocomplete__suggestion.is-highlighted {
  background: rgba(74, 144, 226, 0.08);  /* 使用与地区级联选择器相同的浅蓝色背景 */
  color: #1d1d1f;  /* 深色文字，确保可读性 */
  font-weight: 600;
}

.x-autocomplete__suggestion.is-disabled {
  color: #c7c7cc;
  cursor: not-allowed;
  background: transparent;
}

/* 空状态 */
.x-autocomplete__empty {
  padding: 20px;
  text-align: center;
  color: #86868b;
  font-size: 14px;
}

/* 加载状态 */
.x-autocomplete__loading-wrapper {
  padding: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #86868b;
  font-size: 14px;
}

.x-autocomplete__loading-icon {
  animation: rotate 1s linear infinite;
}

/* 过渡动画 - 与 Input 保持一致 */
.x-autocomplete-dropdown-enter-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center top;
}

.x-autocomplete-dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center top;
}

.x-autocomplete-dropdown-enter-from {
  opacity: 0;
  transform: translateY(-6px) scaleY(0.9);
}

.x-autocomplete-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-3px) scaleY(0.95);
}

/* 暗黑模式 */
.dark .x-autocomplete__wrapper {
  background: var(--x-bg-color-dark, #1c1c1e);
  border-color: var(--x-border-color-dark, #38383a);
}

.dark .x-autocomplete__wrapper:hover:not(.is-disabled) {
  border-color: var(--x-border-color-darker, #48484a);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.dark .x-autocomplete.is-focus .x-autocomplete__wrapper {
  border-color: var(--x-color-primary-dark, #0a84ff);
  box-shadow: 0 0 0 4px rgba(10, 132, 255, 0.2), 0 4px 12px rgba(10, 132, 255, 0.15);
}

.dark .x-autocomplete.is-disabled .x-autocomplete__wrapper {
  background-color: var(--x-fill-color-dark, #2c2c2e);
  border-color: var(--x-border-color-lighter-dark, #3a3a3c);
}

.dark .x-autocomplete__input {
  color: var(--x-text-color-primary-dark, #f5f5f7);
}

.dark .x-autocomplete__input::placeholder {
  color: var(--x-text-color-placeholder-dark, #98989d);
}

.dark .x-autocomplete__prefix,
.dark .x-autocomplete__suffix {
  color: var(--x-text-color-placeholder-dark, #98989d);
}

.dark .x-autocomplete.is-focus .x-autocomplete__prefix {
  color: var(--x-color-primary-dark, #0a84ff);
}

.dark .x-autocomplete__prepend,
.dark .x-autocomplete__append {
  background: var(--x-fill-color-dark, #2c2c2e);
  color: var(--x-text-color-primary-dark, #f5f5f7);
  border-color: var(--x-border-color-dark, #38383a);
}

.dark .x-autocomplete__dropdown {
  background: rgba(28, 28, 30, 0.98);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .x-autocomplete__header,
.dark .x-autocomplete__footer {
  border-color: var(--x-border-color-dark, #38383a);
  color: var(--x-text-color-placeholder-dark, #98989d);
}

.dark .x-autocomplete__suggestion {
  color: var(--x-text-color-primary-dark, #f5f5f7);
}

.dark .x-autocomplete__suggestion:hover {
  background: rgba(74, 144, 226, 0.08);
}

.dark .x-autocomplete__suggestion.is-highlighted {
  background: rgba(74, 144, 226, 0.15);
  color: var(--x-text-color-primary-dark, #f5f5f7);
}

.dark .x-autocomplete__empty,
.dark .x-autocomplete__loading-wrapper {
  color: var(--x-text-color-placeholder-dark, #98989d);
}

.dark .x-autocomplete__clear:hover {
  color: var(--x-color-danger-dark, #ff453a);
}

.dark .x-autocomplete__loading {
  color: var(--x-color-primary-dark, #0a84ff);
}
</style>
