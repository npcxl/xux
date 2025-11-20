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

/**
 * Search 搜索框组件
 * @displayName XSearch
 */

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
/* ============================================
   Search 搜索框组件 - iOS 17 设计语言
   ============================================ */

.x-search {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', sans-serif;
}

/* 容器 */
.x-search__container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 280px;
  height: 44px;
  border: 1.5px solid rgba(0, 0, 0, 0.04);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow: visible;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02), 
              inset 0 1px 1px rgba(255, 255, 255, 0.8);
  transform: translateZ(0);
  will-change: transform, box-shadow;
}

.x-search__container:focus-within {
  background: rgba(255, 255, 255, 0.98);
  border-color: rgba(0, 122, 255, 0.4);
  box-shadow: 0 0 0 3.5px rgba(0, 122, 255, 0.15), 
              0 4px 12px rgba(0, 122, 255, 0.08),
              inset 0 1px 1px rgba(255, 255, 255, 0.9);
  transform: scale(1.01);
}

/* 输入框 */
.x-search__input {
  flex: 1;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: -0.24px;
  -webkit-font-smoothing: antialiased;
  background: transparent;
  color: #000000;
  padding: 0 20px;
  transition: padding 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  caret-color: #007AFF;
}

.x-search__input--expanded {
  padding-right: 52px;
}

.x-search__input--left {
  padding-left: 48px;
}

.x-search__input--right {
  padding-right: 92px;
}

.x-search__input::placeholder {
  color: rgba(60, 60, 67, 0.6);
  font-weight: 400;
}

/* 搜索按钮（嵌入） */
.x-search__button {
  position: absolute;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: rgba(0, 122, 255, 0.1);
  color: #007AFF;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  padding: 0;
  z-index: 2;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.x-search__button--left {
  left: 4px;
}

.x-search__button--right {
  right: 4px;
}

.x-search__button:hover {
  background: linear-gradient(135deg, #007AFF 0%, #0051D5 100%);
  color: #FFFFFF;
  transform: scale(1.08);
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.25);
}

.x-search__button:active {
  transform: scale(0.96);
}

.x-search__button svg {
  width: 18px;
  height: 18px;
}

.x-search__button span[class*="iconify"] {
  font-size: 18px;
}

/* 按钮展开动画 */
.x-search-button-enter-active {
  animation: iosButtonIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.x-search-button-leave-active {
  animation: iosButtonOut 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* 左侧按钮动画：从中间到左侧 */
.x-search__button--left.x-search-button-enter-active {
  animation: slideFromCenterToLeft 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes slideFromCenterToLeft {
  0% {
    left: 50%;
    transform: translateX(-50%) scale(0.3);
    opacity: 0;
    filter: blur(10px);
  }
  50% {
    filter: blur(5px);
  }
  100% {
    left: 4px;
    transform: translateX(0) scale(1);
    opacity: 1;
    filter: blur(0);
  }
}

/* 右侧按钮动画：从中间到右侧 */
.x-search__button--right.x-search-button-enter-active {
  animation: slideFromCenterToRight 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes slideFromCenterToRight {
  0% {
    right: 50%;
    transform: translateX(50%) scale(0.3);
    opacity: 0;
    filter: blur(10px);
  }
  50% {
    filter: blur(5px);
  }
  100% {
    right: 4px;
    transform: translateX(0) scale(1);
    opacity: 1;
    filter: blur(0);
  }
}

/* 按钮消失动画 */
@keyframes iosButtonOut {
  0% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
  100% {
    opacity: 0;
    transform: scale(0.5);
    filter: blur(10px);
  }
}

/* 操作按钮区域 */
.x-search__actions {
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 1;
}

.x-search__loading,
.x-search__clear {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: rgba(142, 142, 147, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 0;
  cursor: pointer;
  color: rgba(60, 60, 67, 0.6);
  border-radius: 50%;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.x-search__clear:hover {
  background: rgba(255, 59, 48, 0.1);
  color: #FF3B30;
  transform: scale(1.1);
}

.x-search__clear:active {
  transform: scale(0.9);
}

.x-search__loading {
  color: #007AFF;
  animation: iosLoadingPulse 1.5s ease-in-out infinite;
}

@keyframes iosLoadingPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(0.95);
  }
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
  max-height: 320px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(30px) saturate(180%);
  -webkit-backdrop-filter: blur(30px) saturate(180%);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 
              0 4px 16px rgba(0, 0, 0, 0.08),
              inset 0 1px 1px rgba(255, 255, 255, 0.8);
  z-index: 1000;
  padding: 4px;
  scrollbar-width: thin;
  scrollbar-color: rgba(142, 142, 147, 0.3) transparent;
}

.x-search__result-item {
  padding: 12px 16px;
  margin: 2px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  font-size: 15px;
  font-weight: 400;
  letter-spacing: -0.24px;
  -webkit-font-smoothing: antialiased;
  color: #000000;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.x-search__result-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(0, 122, 255, 0.03) 100%);
  opacity: 0;
  transition: opacity 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  pointer-events: none;
}

.x-search__result-item:hover {
  background: rgba(0, 122, 255, 0.06);
  transform: scale(0.995);
}

.x-search__result-item:hover::before {
  opacity: 1;
}

.x-search__result-item:active {
  transform: scale(0.985);
  background: rgba(0, 122, 255, 0.1);
}

.x-search__result-item:not(:last-child) {
  border-bottom: none;
}

/* 结果动画 */
.x-search-results-enter-active,
.x-search-results-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.x-search-results-enter-from {
  opacity: 0;
  transform: translateY(-12px) scale(0.96);
  filter: blur(4px);
}

.x-search-results-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
  filter: blur(2px);
}

/* 滚动条样式 */
.x-search__results::-webkit-scrollbar {
  width: 6px;
}

.x-search__results::-webkit-scrollbar-track {
  background: transparent;
}

.x-search__results::-webkit-scrollbar-thumb {
  background: rgba(142, 142, 147, 0.3);
  border-radius: 3px;
}

.x-search__results::-webkit-scrollbar-thumb:hover {
  background: rgba(142, 142, 147, 0.5);
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
  .x-search__container {
    background: rgba(30, 30, 30, 0.9);
    border-color: rgba(255, 255, 255, 0.05);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 
                inset 0 1px 1px rgba(255, 255, 255, 0.03);
  }
  
  .x-search__container:focus-within {
    background: rgba(35, 35, 35, 0.98);
    box-shadow: 0 0 0 3.5px rgba(0, 122, 255, 0.2), 
                0 4px 12px rgba(0, 122, 255, 0.1),
                inset 0 1px 1px rgba(255, 255, 255, 0.05);
  }
  
  .x-search__input {
    color: #FFFFFF;
  }
  
  .x-search__input::placeholder {
    color: rgba(235, 235, 245, 0.6);
  }
  
  .x-search__button {
    background: rgba(0, 122, 255, 0.2);
  }
  
  .x-search__button:hover {
    box-shadow: 0 4px 12px rgba(0, 122, 255, 0.35);
  }
  
  .x-search__loading,
  .x-search__clear {
    background: rgba(142, 142, 147, 0.2);
    color: rgba(235, 235, 245, 0.6);
  }
  
  .x-search__clear:hover {
    background: rgba(255, 59, 48, 0.2);
  }
  
  .x-search__results {
    background: rgba(30, 30, 30, 0.98);
    border-color: rgba(255, 255, 255, 0.05);
  }
  
  .x-search__result-item {
    color: #FFFFFF;
  }
  
  .x-search__result-item:hover {
    background: rgba(0, 122, 255, 0.1);
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .x-search__container {
    min-width: 260px;
    height: 40px;
  }
  
  .x-search__input {
    font-size: 16px; /* 防止iOS缩放 */
    padding: 0 16px;
  }
  
  .x-search__button {
    width: 32px;
    height: 32px;
  }
  
  .x-search__button svg {
    width: 16px;
    height: 16px;
  }
  
  .x-search__results {
    max-height: 60vh;
  }
}

/* 辅助功能 */
@media (prefers-reduced-motion: reduce) {
  .x-search__container,
  .x-search__input,
  .x-search__button,
  .x-search__loading,
  .x-search__clear,
  .x-search__result-item,
  .x-search-button-enter-active,
  .x-search-button-leave-active,
  .x-search-action-enter-active,
  .x-search-action-leave-active,
  .x-search-results-enter-active,
  .x-search-results-leave-active {
    transition: none !important;
    animation: none !important;
  }
  
  @keyframes slideFromCenterToLeft,
  @keyframes slideFromCenterToRight,
  @keyframes iosButtonOut,
  @keyframes iosLoadingPulse {
    0%, 100% {
      opacity: 1;
      transform: none;
      filter: none;
    }
  }
}
</style>
