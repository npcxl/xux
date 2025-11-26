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
        :ref="animated ? (el) => setItemRef(el, startIndex + index) : undefined"
        class="x-virtual-list-item"
        :class="{
          'x-virtual-list-item--animated': animated,
          'x-virtual-list-item--visible': animated && isItemVisible(startIndex + index)
        }"
        :style="animated ? { '--animation-delay': `${index * animationDelay}ms` } : undefined"
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
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'

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
  /** 是否启用滚动动画 */
  animated?: boolean
  /** 动画延迟间隔（ms） */
  animationDelay?: number
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
  itemKey: 'id',
  animated: true,
  animationDelay: 30
})

const emit = defineEmits<{
  'scroll': [scrollTop: number, scrollLeft: number]
  'scroll-end': []
}>()

// Refs
const containerRef = ref<HTMLDivElement>()
const scrollTop = ref(0)
const containerHeight = ref(0)
const itemRefs = ref<Map<number, HTMLElement>>(new Map())
const visibleItemsSet = ref<Set<number>>(new Set())

// 滚动优化
let rafId: number | null = null
let lastScrollTop = 0
let scrollVelocity = 0
let lastUpdateTime = 0
const velocityHistory: number[] = [] // 速度历史，用于平滑计算

// 计算总高度
const totalHeight = computed(() => {
  if (props.dynamicHeight && props.getItemHeight) {
    return props.dataSource.reduce((sum, item, index) => {
      return sum + props.getItemHeight!(item, index)
    }, 0)
  }
  return props.dataSource.length * props.itemHeight
})

// 计算可见范围（优化版本，增加动态缓冲区）
const visibleRange = computed(() => {
  if (!containerRef.value || props.dataSource.length === 0) {
    return { start: 0, end: 0 }
  }

  const scrollTopValue = scrollTop.value
  // 确保容器高度有效，如果为0则使用默认值
  let containerHeightValue = containerHeight.value
  if (containerHeightValue === 0 && containerRef.value) {
    containerHeightValue = containerRef.value.clientHeight || 400
  }
  
  // 根据滚动速度动态调整缓冲区大小
  // 滚动越快，缓冲区越大，防止空白
  const absVelocity = Math.abs(scrollVelocity)
  // 限制缓冲区最大为 buffer * 5，最小为 buffer
  const dynamicBuffer = absVelocity > 1 
    ? Math.max(props.buffer, Math.min(props.buffer * 5, Math.ceil(absVelocity * 1.5)))
    : props.buffer
  
  let start = 0
  let end = props.dataSource.length

  if (props.dynamicHeight && props.getItemHeight) {
    // 动态高度模式
    let accumulatedHeight = 0
    for (let i = 0; i < props.dataSource.length; i++) {
      const itemHeight = props.getItemHeight!(props.dataSource[i], i)
      if (accumulatedHeight + itemHeight >= scrollTopValue) {
        start = Math.max(0, i - dynamicBuffer)
        break
      }
      accumulatedHeight += itemHeight
    }
    
    accumulatedHeight = 0
    for (let i = 0; i < props.dataSource.length; i++) {
      accumulatedHeight += props.getItemHeight!(props.dataSource[i], i)
      if (accumulatedHeight >= scrollTopValue + containerHeightValue) {
        end = Math.min(props.dataSource.length, i + dynamicBuffer + 1)
        break
      }
    }
  } else {
    // 固定高度模式 - 优化计算
    const itemHeight = props.itemHeight
    
    // 计算可见区域的起始和结束索引（基于滚动位置）
    // 注意：索引从0开始，所以需要确保计算正确
    const firstVisibleIndex = Math.max(0, Math.floor(scrollTopValue / itemHeight))
    const lastVisibleIndex = Math.min(
      props.dataSource.length - 1, // 确保不超过最大索引
      Math.ceil((scrollTopValue + containerHeightValue) / itemHeight) - 1
    )
    
    // 应用缓冲区，扩大渲染范围
    start = Math.max(0, firstVisibleIndex - dynamicBuffer)
    // end 应该是 exclusive 的，所以需要 +1
    end = Math.min(props.dataSource.length, lastVisibleIndex + dynamicBuffer + 1)
    
    // 确保至少渲染可见区域的项目
    if (end <= start) {
      // 如果计算出的范围无效，至少渲染可见区域
      start = Math.max(0, firstVisibleIndex)
      end = Math.min(props.dataSource.length, Math.max(lastVisibleIndex + 1, firstVisibleIndex + 1))
    }
    
    // 确保 end 至少比 start 大 1
    if (end <= start) {
      end = Math.min(props.dataSource.length, start + 1)
    }
  }

  // 最终安全检查：确保范围有效且不超出数据源
  start = Math.max(0, start)
  end = Math.min(props.dataSource.length, Math.max(end, start + 1))
  
  // 如果数据源为空，返回空范围
  if (props.dataSource.length === 0) {
    return { start: 0, end: 0 }
  }
  
  // 最后的保险：确保范围始终有效
  if (start >= end) {
    start = 0
    end = Math.min(1, props.dataSource.length)
  }

  return { start, end }
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

// 设置项引用
const setItemRef = (el: any, index: number) => {
  if (el) {
    itemRefs.value.set(index, el)
  }
}

// 判断项是否可见
const isItemVisible = (index: number): boolean => {
  return visibleItemsSet.value.has(index)
}

// 处理滚动（使用 requestAnimationFrame + 节流优化）
const handleScroll = (e: Event) => {
  const target = e.target as HTMLDivElement
  const currentScrollTop = target.scrollTop
  const currentTime = Date.now()
  
  // 更新容器高度（可能在滚动过程中变化）
  if (containerRef.value) {
    const newHeight = containerRef.value.clientHeight
    if (newHeight > 0 && newHeight !== containerHeight.value) {
      containerHeight.value = newHeight
    }
  }
  
  // 计算滚动速度（用于动态调整缓冲区）
  const timeDelta = currentTime - lastUpdateTime
  if (timeDelta > 0 && timeDelta < 100) { // 防止异常时间差
    const instantVelocity = (currentScrollTop - lastScrollTop) / timeDelta * 16 // 归一化到16ms
    
    // 使用滑动平均平滑速度计算，减少抖动
    velocityHistory.push(instantVelocity)
    if (velocityHistory.length > 3) {
      velocityHistory.shift()
    }
    scrollVelocity = velocityHistory.reduce((sum, v) => sum + v, 0) / velocityHistory.length
  }
  lastScrollTop = currentScrollTop
  lastUpdateTime = currentTime
  
  // 使用 requestAnimationFrame 优化，减少抖动
  // 快速滚动时立即更新，慢速滚动时节流
  if (Math.abs(scrollVelocity) > 5) {
    // 快速滚动：立即更新
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
    }
    scrollTop.value = currentScrollTop
  } else {
    // 慢速滚动：使用 RAF 节流
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
    }
    
    rafId = requestAnimationFrame(() => {
      scrollTop.value = currentScrollTop
      rafId = null
    })
  }
  
  emit('scroll', currentScrollTop, target.scrollLeft)
  
  // 检查是否滚动到底部
  const scrollHeight = target.scrollHeight
  const clientHeight = target.clientHeight
  if (currentScrollTop + clientHeight >= scrollHeight - 10) {
    emit('scroll-end')
  }
}

// IntersectionObserver 用于动画
let observer: IntersectionObserver | null = null

const initObserver = () => {
  if (!props.animated || typeof window === 'undefined') return

  observer = new IntersectionObserver(
    (entries) => {
      requestAnimationFrame(() => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0')
          if (entry.isIntersecting) {
            visibleItemsSet.value.add(index)
            entry.target.classList.add('x-virtual-list-item--visible')
          } else {
            visibleItemsSet.value.delete(index)
            entry.target.classList.remove('x-virtual-list-item--visible')
          }
        })
      })
    },
    {
      threshold: 0.01,
      rootMargin: '150px'
    }
  )

  // 观察所有可见项
  itemRefs.value.forEach((item, index) => {
    if (item) {
      item.setAttribute('data-index', index.toString())
      observer?.observe(item)
      
      // 首屏元素立即显示
      const rect = item.getBoundingClientRect()
      const containerRect = containerRef.value?.getBoundingClientRect()
      if (containerRect && rect.top < containerRect.bottom && rect.bottom > containerRect.top) {
        visibleItemsSet.value.add(index)
        item.classList.add('x-virtual-list-item--visible')
      }
    }
  })
}

// 监听数据变化
watch(() => props.dataSource, async () => {
  if (props.animated) {
    await nextTick()
    if (observer) {
      itemRefs.value.forEach((item) => {
        if (item) {
          observer?.unobserve(item)
          item.classList.remove('x-virtual-list-item--visible')
        }
      })
    }
    itemRefs.value.clear()
    visibleItemsSet.value.clear()
    await nextTick()
    initObserver()
  }
}, { deep: true })

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
  lastUpdateTime = Date.now()
  
  // 监听窗口大小变化
  window.addEventListener('resize', updateContainerHeight)
  
  if (props.animated) {
    nextTick(() => {
      initObserver()
    })
  }
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
  }
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
  /* 移除可能导致抖动的过渡 */
  will-change: transform, opacity;
}

.x-virtual-list-item-default {
  padding: 12px 20px;
  color: var(--x-text-color-primary, #1a1a1a);
  border-bottom: 1px solid var(--x-border-color-lighter, #f3f4f6);
}

.x-virtual-list-item:last-child .x-virtual-list-item-default {
  border-bottom: none;
}

/* 滚动动画 - 优化性能 */
.x-virtual-list-item--animated {
  opacity: 0;
  transform: translateY(20px) scale(0.96);
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), 
              transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--animation-delay, 0ms);
  will-change: transform, opacity;
}

.x-virtual-list-item--animated.x-virtual-list-item--visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  will-change: auto;
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

