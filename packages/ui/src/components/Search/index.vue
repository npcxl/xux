<template>
  <div class="x-search" :class="{ 'x-search--expanded': isExpanded }">
    <div class="x-search__container" :class="`x-search__container--${buttonPosition}`">
      <!-- 左侧按钮（展开后显示） -->
      <Transition name="x-search-button">
        <button 
          v-if="isExpanded && buttonPosition === 'left'" 
          class="x-search__button x-search__button--left"
          @click="handleButtonClick"
          type="button"
        >
          <slot name="icon">
            <Icon v-if="customIcon" :icon="customIcon" />
            <Icon v-else icon="material-symbols:search" />
          </slot>
        </button>
      </Transition>

      <!-- 输入框 -->
      <input
        ref="inputRef"
        v-model="searchValue"
        type="text"
        class="x-search__input"
        :class="{ 
          'x-search__input--expanded': isExpanded,
          'x-search__input--left': isExpanded && buttonPosition === 'left',
          'x-search__input--right': isExpanded && buttonPosition === 'right'
        }"
        :placeholder="placeholder"
        @input="handleInput"
        @keyup.enter="handleEnter"
        @keyup.esc="handleEsc"
        @keydown="handleKeydown"
        @keyup="handleKeyup"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- 加载状态 / 清空按钮 -->
      <Transition name="x-search-action">
        <div v-if="isExpanded" class="x-search__actions">
          <div v-if="loading" class="x-search__loading">
            <Icon icon="eos-icons:loading" />
          </div>
          <button 
            v-else-if="searchValue && showClear" 
            class="x-search__clear" 
            @click="handleClear"
            type="button"
          >
            <Icon icon="material-symbols:close-rounded" />
          </button>
        </div>
      </Transition>

      <!-- 右侧按钮（展开后显示） -->
      <Transition name="x-search-button">
        <button 
          v-if="isExpanded && buttonPosition === 'right'" 
          class="x-search__button x-search__button--right"
          @click="handleButtonClick"
          type="button"
        >
          <slot name="icon">
            <Icon v-if="customIcon" :icon="customIcon" />
            <Icon v-else icon="material-symbols:search" />
          </slot>
        </button>
      </Transition>
    </div>

    <!-- 搜索结果下拉 -->
    <Transition name="x-search-results">
      <div 
        v-if="showResults && results.length > 0" 
        class="x-search__results"
      >
        <div
          v-for="(item, index) in results"
          :key="index"
          class="x-search__result-item"
          @click="handleSelectResult(item)"
        >
          <slot name="result" :item="item">
            {{ typeof item === 'string' ? item : item.label || item.value }}
          </slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { Icon } from '@iconify/vue'

export interface SearchProps {
  /** 占位符文本 */
  placeholder?: string
  /** 防抖延迟（毫秒） */
  debounce?: number
  /** 是否显示搜索结果 */
  showResults?: boolean
  /** 异步搜索函数 */
  onSearch?: (value: string) => Promise<any[]> | any[]
  /** 默认是否展开（显示按钮） */
  defaultExpanded?: boolean
  /** 搜索按钮位置 */
  buttonPosition?: 'left' | 'right'
  /** 自定义图标类名（例如：iconify 图标） */
  customIcon?: string
  /** 是否显示清空按钮 */
  showClear?: boolean
}

const props = withDefaults(defineProps<SearchProps>(), {
  placeholder: '搜索...',
  debounce: 300,
  showResults: true,
  defaultExpanded: true,
  buttonPosition: 'left',
  customIcon: '',
  showClear: true
})

const emit = defineEmits<{
  search: [value: string]
  select: [item: any]
  buttonClick: []
  expand: []
  collapse: []
  enter: [value: string]
  esc: []
  keydown: [event: KeyboardEvent]
  keyup: [event: KeyboardEvent]
  inputFocus: [event: FocusEvent]
  inputBlur: [event: FocusEvent]
}>()

const isExpanded = ref(props.defaultExpanded)
const searchValue = ref('')
const loading = ref(false)
const results = ref<any[]>([])
const inputRef = ref<HTMLInputElement>()
let debounceTimer: NodeJS.Timeout | null = null

// 聚焦展开
const handleFocus = (event: FocusEvent) => {
  emit('inputFocus', event)
  if (!isExpanded.value) {
    isExpanded.value = true
    emit('expand')
  }
}

// 回车处理
const handleEnter = () => {
  const value = searchValue.value.trim()
  emit('enter', value)
  if (value) {
    handleSearch()
  }
}

// Esc 处理
const handleEsc = () => {
  emit('esc')
  if (!searchValue.value && !props.defaultExpanded) {
    isExpanded.value = false
    emit('collapse')
  }
}

// Keydown 处理
const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
}

// Keyup 处理
const handleKeyup = (event: KeyboardEvent) => {
  emit('keyup', event)
}

// 按钮点击处理
const handleButtonClick = () => {
  emit('buttonClick')
  if (searchValue.value.trim()) {
    handleSearch()
  }
}

// 输入处理（带防抖）
const handleInput = () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  debounceTimer = setTimeout(() => {
    handleSearch()
  }, props.debounce) 
}

// 执行搜索
const handleSearch = async () => {
  const value = searchValue.value.trim()
  if (!value) {
    results.value = []
    return
  }

  emit('search', value)

  if (props.onSearch) {
    loading.value = true
    try {
      const res = await props.onSearch(value)
      results.value = res || []
    } catch (error) {
      console.error('Search error:', error)
      results.value = []
    } finally {
      loading.value = false
    }
  }
}

// 清空搜索
const handleClear = () => {
  searchValue.value = ''
  results.value = []
  inputRef.value?.focus()
}

// 选择结果
const handleSelectResult = (item: any) => {
  emit('select', item)
  searchValue.value = typeof item === 'string' ? item : item.label || item.value || ''
  results.value = []
}

// 失焦处理
const handleBlur = (event: FocusEvent) => {
  emit('inputBlur', event)
  setTimeout(() => {
    if (!searchValue.value && !props.defaultExpanded) {
      isExpanded.value = false
      emit('collapse')
    }
  }, 200)
}

// 监听展开状态
watch(isExpanded, (val) => {
  if (!val) {
    results.value = []
    loading.value = false
  }
})

// 暴露方法
defineExpose({
  expand: () => {
    isExpanded.value = true
    emit('expand')
    nextTick(() => inputRef.value?.focus())
  },
  collapse: () => {
    isExpanded.value = false
    searchValue.value = ''
    results.value = []
    emit('collapse')
  },
  focus: () => inputRef.value?.focus(),
  clear: handleClear
})
</script>

<style scoped>
.x-search {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
}

/* 容器 */
.x-search__container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 280px;
  height: 40px;
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 20px;
  background: var(--vp-c-bg, #ffffff);
  transition: all 0.3s ease;
  overflow: visible;
}

.x-search__container:focus-within {
  border-color: var(--x-color-primary, #1a1a1a);
  box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
}

/* 输入框 */
.x-search__input {
  flex: 1;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
  color: var(--vp-c-text-1, #111827);
  padding: 0 16px;
  transition: padding 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.x-search__input--expanded {
  padding-right: 48px;
}

.x-search__input--left {
  padding-left: 44px;
}

.x-search__input--right {
  padding-right: 88px;
}

.x-search__input::placeholder {
  color: var(--vp-c-text-3, #9ca3af);
}

/* 搜索按钮（嵌入） */
.x-search__button {
  position: absolute;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2, #6b7280);
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s ease;
  padding: 0;
  z-index: 2;
}

.x-search__button--left {
  left: 6px;
}

.x-search__button--right {
  right: 6px;
}

.x-search__button:hover {
  background: var(--vp-c-bg-soft, #f3f4f6);
  color: var(--x-color-primary, #1a1a1a);
  transform: scale(1.1);
}

.x-search__button:active {
  transform: scale(0.95);
}

.x-search__button svg {
  width: 16px;
  height: 16px;
}

.x-search__button span[class*="iconify"] {
  font-size: 16px;
}

/* 按钮展开动画 */
.x-search-button-enter-active {
  animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.x-search-button-leave-active {
  animation: slideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 左侧按钮动画：从中间到左侧 */
.x-search__button--left.x-search-button-enter-active {
  animation: slideFromCenterToLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideFromCenterToLeft {
  0% {
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    scale: 0.5;
  }
  100% {
    left: 6px;
    transform: translateX(0);
    opacity: 1;
    scale: 1;
  }
}

/* 右侧按钮动画：从中间到右侧 */
.x-search__button--right.x-search-button-enter-active {
  animation: slideFromCenterToRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideFromCenterToRight {
  0% {
    right: 50%;
    transform: translateX(50%);
    opacity: 0;
    scale: 0.5;
  }
  100% {
    right: 6px;
    transform: translateX(0);
    opacity: 1;
    scale: 1;
  }
}

/* 按钮消失动画 */
@keyframes slideOut {
  0% {
    opacity: 1;
    scale: 1;
  }
  100% {
    opacity: 0;
    scale: 0.5;
  }
}

/* 操作按钮区域 */
.x-search__actions {
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 1;
}

.x-search__loading,
.x-search__clear {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  color: var(--vp-c-text-3, #6b7280);
  transition: color 0.2s ease;
}

.x-search__clear:hover {
  color: var(--vp-c-text-1, #111827);
}

.x-search__spinner {
  width: 16px;
  height: 16px;
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

/* 操作按钮动画 */
.x-search-action-enter-active,
.x-search-action-leave-active {
  transition: all 0.3s ease;
}

.x-search-action-enter-from,
.x-search-action-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

/* 搜索结果 */
.x-search__results {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  max-height: 300px;
  overflow-y: auto;
  background: var(--vp-c-bg, #ffffff);
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.x-search__result-item {
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 14px;
  color: var(--vp-c-text-1, #374151);
}

.x-search__result-item:hover {
  background: var(--vp-c-bg-soft, #f9fafb);
}

.x-search__result-item:not(:last-child) {
  border-bottom: 1px solid var(--vp-c-divider, #f3f4f6);
}

/* 结果动画 */
.x-search-results-enter-active,
.x-search-results-leave-active {
  transition: all 0.2s ease;
}

.x-search-results-enter-from,
.x-search-results-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* 暗色模式 */
.dark .x-search__button:hover {
  background: var(--vp-c-bg-soft, #374151);
}

/* 滚动条样式 */
.x-search__results::-webkit-scrollbar {
  width: 6px;
}

.x-search__results::-webkit-scrollbar-track {
  background: transparent;
}

.x-search__results::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.x-search__results::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .x-search__container {
    min-width: 240px;
  }
  
  .x-search__input {
    font-size: 14px;
  }
  
  .x-search__button {
    width: 28px;
    height: 28px;
  }
  
  .x-search__button svg {
    width: 14px;
    height: 14px;
  }
}
</style>
