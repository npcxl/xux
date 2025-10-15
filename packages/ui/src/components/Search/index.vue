<template>
  <div class="x-search" :class="{ 'x-search--expanded': isExpanded }">
    <!-- 搜索图标按钮 -->
    <div 
      class="x-search__icon" 
      @click="handleToggle"
      :class="{ 'x-search__icon--active': isExpanded }"
    >
      <svg 
        class="x-search__icon-svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
    </div>

    <!-- 搜索输入框 -->
    <Transition name="x-search-expand">
      <div v-if="isExpanded" class="x-search__input-wrapper">
        <input
          ref="inputRef"
          v-model="searchValue"
          type="text"
          class="x-search__input"
          :placeholder="placeholder"
          @input="handleInput"
          @keyup.enter="handleSearch"
          @blur="handleBlur"
        />
        
        <!-- 加载状态 -->
        <div v-if="loading" class="x-search__loading">
          <svg class="x-search__spinner" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25"/>
            <path fill="currentColor" d="M12 2a10 10 0 0 1 10 10h-4a6 6 0 0 0-6-6V2z" opacity="0.75"/>
          </svg>
        </div>

        <!-- 清空按钮 -->
        <div 
          v-else-if="searchValue" 
          class="x-search__clear" 
          @click="handleClear"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      </div>
    </Transition>

    <!-- 搜索结果下拉 -->
    <Transition name="x-search-results">
      <div 
        v-if="isExpanded && showResults && results.length > 0" 
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

export interface SearchProps {
  /** 占位符文本 */
  placeholder?: string
  /** 防抖延迟（毫秒） */
  debounce?: number
  /** 是否显示搜索结果 */
  showResults?: boolean
  /** 异步搜索函数 */
  onSearch?: (value: string) => Promise<any[]> | any[]
  /** 失焦时是否收起 */
  closeOnBlur?: boolean
}

const props = withDefaults(defineProps<SearchProps>(), {
  placeholder: '搜索...',
  debounce: 300,
  showResults: true,
  closeOnBlur: true
})

const emit = defineEmits<{
  search: [value: string]
  select: [item: any]
  expand: []
  collapse: []
}>()

const isExpanded = ref(false)
const searchValue = ref('')
const loading = ref(false)
const results = ref<any[]>([])
const inputRef = ref<HTMLInputElement>()
let debounceTimer: NodeJS.Timeout | null = null

// 切换展开/收起
const handleToggle = async () => {
  isExpanded.value = !isExpanded.value
  
  if (isExpanded.value) {
    emit('expand')
    await nextTick()
    inputRef.value?.focus()
  } else {
    emit('collapse')
    searchValue.value = ''
    results.value = []
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
const handleBlur = () => {
  if (props.closeOnBlur) {
    setTimeout(() => {
      if (!searchValue.value) {
        isExpanded.value = false
        emit('collapse')
      }
    }, 200)
  }
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
    nextTick(() => inputRef.value?.focus())
  },
  collapse: () => {
    isExpanded.value = false
    searchValue.value = ''
    results.value = []
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
}

.x-search__icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--search-icon-color, #6b7280);
  background: var(--search-icon-bg, transparent);
}

.x-search__icon:hover {
  background: var(--search-icon-hover-bg, #f3f4f6);
  color: var(--search-icon-hover-color, #111827);
  transform: scale(1.1);
}

.x-search__icon--active {
  color: var(--search-icon-active-color, #3b82f6);
  background: var(--search-icon-active-bg, #eff6ff);
}

.x-search__icon-svg {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.x-search__icon--active .x-search__icon-svg {
  transform: rotate(90deg);
}

.x-search__input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 8px;
}

.x-search__input {
  width: 240px;
  height: 40px;
  padding: 0 36px 0 16px;
  border: 1px solid var(--search-border, #e5e7eb);
  border-radius: 20px;
  outline: none;
  font-size: 14px;
  transition: all 0.3s ease;
  background: var(--search-bg, #ffffff);
  color: var(--search-color, #111827);
}

.x-search__input:focus {
  border-color: var(--search-border-focus, #3b82f6);
  box-shadow: 0 0 0 3px var(--search-shadow-focus, rgba(59, 130, 246, 0.1));
}

.x-search__input::placeholder {
  color: var(--search-placeholder, #9ca3af);
}

.x-search__loading,
.x-search__clear {
  position: absolute;
  right: 12px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--search-icon-color, #6b7280);
}

.x-search__clear:hover {
  color: var(--search-icon-hover-color, #111827);
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

.x-search__results {
  position: absolute;
  top: calc(100% + 8px);
  left: 48px;
  right: 0;
  max-height: 300px;
  overflow-y: auto;
  background: var(--search-results-bg, #ffffff);
  border: 1px solid var(--search-border, #e5e7eb);
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 1000;
}

.x-search__result-item {
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 14px;
  color: var(--search-result-color, #374151);
}

.x-search__result-item:hover {
  background: var(--search-result-hover-bg, #f9fafb);
}

.x-search__result-item:not(:last-child) {
  border-bottom: 1px solid var(--search-border, #f3f4f6);
}

/* 展开动画 */
.x-search-expand-enter-active,
.x-search-expand-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.x-search-expand-enter-from {
  opacity: 0;
  transform: translateX(-20px) scale(0.95);
}

.x-search-expand-leave-to {
  opacity: 0;
  transform: translateX(-20px) scale(0.95);
}

/* 结果动画 */
.x-search-results-enter-active,
.x-search-results-leave-active {
  transition: all 0.2s ease;
}

.x-search-results-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.x-search-results-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
  .x-search__icon {
    --search-icon-color: #9ca3af;
    --search-icon-hover-bg: #374151;
    --search-icon-hover-color: #f3f4f6;
    --search-icon-active-color: #60a5fa;
    --search-icon-active-bg: #1e3a8a;
  }

  .x-search__input {
    --search-bg: #1f2937;
    --search-color: #f3f4f6;
    --search-border: #374151;
    --search-border-focus: #3b82f6;
    --search-placeholder: #6b7280;
    --search-shadow-focus: rgba(59, 130, 246, 0.2);
  }

  .x-search__results {
    --search-results-bg: #1f2937;
    --search-border: #374151;
  }

  .x-search__result-item {
    --search-result-color: #d1d5db;
    --search-result-hover-bg: #374151;
  }
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

@media (prefers-color-scheme: dark) {
  .x-search__results::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
  }
  
  .x-search__results::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .x-search__input {
    width: 200px;
  }
}
</style>

