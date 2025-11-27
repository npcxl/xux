<template>
  <div 
    class="x-virtual-list" 
    ref="containerRef"
    :style="{ height: height }"
    @scroll="handleScroll"
  >
    <!-- 加载状态 -->
    <div v-if="loading" class="x-virtual-list-loading">
      <div class="x-virtual-list-loading-spinner">
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
      </div>
      <div v-if="loadingText" class="x-virtual-list-loading-text">{{ loadingText }}</div>
    </div>

    <!-- 空状态 -->
    <div v-else-if="!dataSource || dataSource.length === 0" class="x-virtual-list-empty">
      <slot name="empty">
        <div class="x-virtual-list-empty-icon">
          <svg viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
              <ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse>
              <g fill-rule="nonzero" stroke="#d9d9d9">
                <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                <path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path>
              </g>
            </g>
          </svg>
        </div>
        <div class="x-virtual-list-empty-text">{{ emptyText }}</div>
      </slot>
    </div>

    <!-- 虚拟滚动容器 -->
    <div 
      v-else
      class="x-virtual-list-scroll"
      :style="scrollStyle"
    >
      <!-- 上方占位 -->
      <div :style="{ height: `${startOffset}px` }"></div>
      
      <!-- 可见区域列表项 -->
      <div
        v-for="(item, index) in visibleItems"
        :key="getItemKey(item, startIndex + index)"
        class="x-virtual-list-item"
      >
        <slot :item="item" :index="startIndex + index">
          <div class="x-virtual-list-item-default">
            {{ item }}
          </div>
        </slot>
      </div>
      
      <!-- 下方占位 -->
      <div :style="{ height: `${endOffset}px` }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

/**
 * VirtualList 虚拟滚动列表组件
 * @displayName XVirtualList
 */

export interface VirtualListProps {
  /** 数据源 */
  dataSource?: any[]
  /** 容器高度 */
  height?: string
  /** 每项高度（固定高度模式） */
  itemHeight?: number
  /** 是否启用动态高度（需要提供 getItemHeight 函数） */
  dynamicHeight?: boolean
  /** 获取每项高度的函数（动态高度模式） */
  getItemHeight?: (item: any, index: number) => number
  /** 缓冲区大小（上下各预渲染的项目数） */
  buffer?: number
  /** 是否加载中 */
  loading?: boolean
  /** 加载提示文字 */
  loadingText?: string
  /** 空状态提示文字 */
  emptyText?: string
  /** 项的唯一标识字段 */
  itemKey?: string | ((item: any, index: number) => string | number)
}

const props = withDefaults(defineProps<VirtualListProps>(), {
  dataSource: () => [],
  height: '400px',
  itemHeight: 60,
  dynamicHeight: false,
  buffer: 10,
  loading: false,
  loadingText: '加载中...',
  emptyText: '暂无数据',
  itemKey: 'id'
})

const emit = defineEmits<{
  'scroll': [scrollTop: number, scrollLeft: number]
  'scroll-end': []
}>()

// Refs
const containerRef = ref<HTMLDivElement>()
const scrollTop = ref(0)
const containerHeight = ref(0)

// 不再需要 RAF，直接同步更新

// 计算总高度
const totalHeight = computed(() => {
  if (props.dynamicHeight && props.getItemHeight) {
    return props.dataSource.reduce((sum, item, index) => {
      return sum + props.getItemHeight!(item, index)
    }, 0)
  }
  return props.dataSource.length * props.itemHeight
})

// 计算可见范围（完全参考表格组件的实现）
const updateVirtualRange = (scrollTopValue: number) => {
  if (!containerRef.value || props.dataSource.length === 0) {
    return { start: 0, end: 0 }
  }

  // 确保容器高度有效
  let containerHeightValue = containerHeight.value
  if (containerHeightValue === 0 && containerRef.value) {
    containerHeightValue = containerRef.value.clientHeight || 400
  }

  if (props.dynamicHeight && props.getItemHeight) {
    // 动态高度模式
    let accumulatedHeight = 0
    let start = 0
    let end = props.dataSource.length
    
    // 找到起始索引
    for (let i = 0; i < props.dataSource.length; i++) {
      const itemHeight = props.getItemHeight!(props.dataSource[i], i)
      if (accumulatedHeight + itemHeight >= scrollTopValue) {
        start = Math.max(0, i - props.buffer)
        break
      }
      accumulatedHeight += itemHeight
    }
    
    // 找到结束索引
    accumulatedHeight = 0
    const visibleHeight = scrollTopValue + containerHeightValue
    for (let i = 0; i < props.dataSource.length; i++) {
      accumulatedHeight += props.getItemHeight!(props.dataSource[i], i)
      if (accumulatedHeight >= visibleHeight) {
        end = Math.min(props.dataSource.length, i + props.buffer + 1)
        break
      }
    }
    
    return { start, end }
  } else {
    // 固定高度模式（完全按照表格组件的实现）
    const itemHeight = props.itemHeight
    const totalCount = props.dataSource.length
    
    // 计算可见区域能显示多少项
    const visibleCount = Math.ceil(containerHeightValue / itemHeight)
    
    // 计算起始索引（添加缓冲区）
    const startIndex = Math.max(0, Math.floor(scrollTopValue / itemHeight) - props.buffer)
    // 计算结束索引（添加缓冲区，注意是 buffer * 2）
    const endIndex = Math.min(totalCount, startIndex + visibleCount + props.buffer * 2)
    
    return { start: startIndex, end: endIndex }
  }
}

// 使用 computed 计算可见范围
const visibleRange = computed(() => {
  return updateVirtualRange(scrollTop.value)
})

// 可见项目
const visibleItems = computed(() => {
  return props.dataSource.slice(visibleRange.value.start, visibleRange.value.end)
})

const startIndex = computed(() => visibleRange.value.start)
const endIndex = computed(() => visibleRange.value.end)

// 计算偏移量
const startOffset = computed(() => {
  if (props.dynamicHeight && props.getItemHeight) {
    let offset = 0
    for (let i = 0; i < startIndex.value; i++) {
      offset += props.getItemHeight!(props.dataSource[i], i)
    }
    return offset
  }
  return startIndex.value * props.itemHeight
})

const endOffset = computed(() => {
  if (props.dynamicHeight && props.getItemHeight) {
    let offset = 0
    for (let i = endIndex.value; i < props.dataSource.length; i++) {
      offset += props.getItemHeight!(props.dataSource[i], i)
    }
    return offset
  }
  return (props.dataSource.length - endIndex.value) * props.itemHeight
})

// 滚动样式
const scrollStyle = computed(() => {
  return {
    height: `${totalHeight.value}px`,
    position: 'relative' as const
  }
})

// 获取项的 key
const getItemKey = (item: any, index: number): string | number => {
  if (typeof props.itemKey === 'function') {
    return props.itemKey(item, index)
  }
  return item[props.itemKey] ?? index
}


// 处理滚动（完全按照表格组件的实现，直接同步更新）
const handleScroll = (e: Event) => {
  const target = e.target as HTMLDivElement
  const currentScrollTop = target.scrollTop
  
  // 直接同步更新，不使用 RAF（表格组件就是这样做的）
  scrollTop.value = currentScrollTop
  
  // 更新容器高度（可能在滚动过程中变化）
  if (containerRef.value) {
    const newHeight = containerRef.value.clientHeight
    if (newHeight > 0 && newHeight !== containerHeight.value) {
      containerHeight.value = newHeight
    }
  }
  
  emit('scroll', currentScrollTop, target.scrollLeft)
  
  // 检查是否滚动到底部
  const scrollHeight = target.scrollHeight
  const clientHeight = target.clientHeight
  if (currentScrollTop + clientHeight >= scrollHeight - 10) {
    emit('scroll-end')
  }
}


// 更新容器高度
const updateContainerHeight = () => {
  if (containerRef.value) {
    const newHeight = containerRef.value.clientHeight
    if (newHeight > 0) {
      containerHeight.value = newHeight
    }
  }
}

onMounted(() => {
  updateContainerHeight()
  
  // 监听窗口大小变化
  window.addEventListener('resize', updateContainerHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateContainerHeight)
})

// 暴露方法
defineExpose({
  scrollTo: (index: number) => {
    if (!containerRef.value) return
    
    let offset = 0
    if (props.dynamicHeight && props.getItemHeight) {
      for (let i = 0; i < index && i < props.dataSource.length; i++) {
        offset += props.getItemHeight!(props.dataSource[i], i)
      }
    } else {
      offset = index * props.itemHeight
    }
    
    containerRef.value.scrollTop = offset
  },
  scrollToTop: () => {
    containerRef.value?.scrollTo({ top: 0, behavior: 'smooth' })
  },
  scrollToBottom: () => {
    if (containerRef.value) {
      containerRef.value.scrollTo({ top: containerRef.value.scrollHeight, behavior: 'smooth' })
    }
  },
  getScrollTop: () => scrollTop.value
})
</script>

<style scoped>
.x-virtual-list {
  position: relative;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--x-bg-color, #ffffff);
  border-radius: var(--x-radius-lg, 12px);
}

.x-virtual-list-scroll {
  position: relative;
  width: 100%;
}

.x-virtual-list-item {
  width: 100%;
}

.x-virtual-list-item-default {
  padding: 12px 20px;
  color: var(--x-text-color-primary, #1a1a1a);
  border-bottom: 1px solid var(--x-border-color-lighter, #f3f4f6);
}

.x-virtual-list-item:last-child .x-virtual-list-item-default {
  border-bottom: none;
}


/* 加载状态 */
.x-virtual-list-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  min-height: 200px;
}

.x-virtual-list-loading-spinner {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.loading-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--x-color-primary, #1a1a1a);
  animation: dotPulse 1.4s ease-in-out infinite;
}

.loading-dot:nth-child(1) {
  animation-delay: 0s;
}

.loading-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dotPulse {
  0%, 60%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  30% {
    transform: scale(1.3);
    opacity: 1;
  }
}

.x-virtual-list-loading-text {
  font-size: var(--x-font-size-sm, 14px);
  color: var(--x-text-color-secondary, #6b7280);
}

/* 空状态 */
.x-virtual-list-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  min-height: 200px;
}

.x-virtual-list-empty-icon {
  width: 64px;
  height: 41px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.x-virtual-list-empty-icon svg {
  width: 100%;
  height: 100%;
}

.x-virtual-list-empty-text {
  font-size: var(--x-font-size-sm, 14px);
  color: var(--x-text-color-placeholder, #9ca3af);
}

/* 滚动条样式 */
.x-virtual-list::-webkit-scrollbar {
  width: 8px;
}

.x-virtual-list::-webkit-scrollbar-track {
  background: var(--x-fill-color-lighter, #fafafa);
  border-radius: 4px;
}

.x-virtual-list::-webkit-scrollbar-thumb {
  background: var(--x-border-color, #e5e7eb);
  border-radius: 4px;
  transition: background 0.2s;
}

.x-virtual-list::-webkit-scrollbar-thumb:hover {
  background: var(--x-text-color-placeholder, #9ca3af);
}
</style>

