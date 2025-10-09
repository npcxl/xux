<template>
  <div class="thumbnail-container-wrapper relative">
    <!-- 左侧滚动按钮 -->
    <button
      v-if="showLeftArrow"
      @click="scrollLeft"
      class="scroll-arrow scroll-arrow-left"
      aria-label="向左滚动"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>

    <!-- 缩略图容器 -->
    <div 
      ref="thumbnailContainer"
      @scroll="handleThumbnailScroll"
      class="thumbnail-scroll-container"
    >
      <div 
        v-for="(img, index) in images" 
        :key="index"
        :ref="el => setThumbnailRef(el, index)"
        @mouseenter="handleImageHover(index)"
        @mouseleave="handleImageLeave()"
        @click="handleThumbnailClick(index)"
        class="thumbnail-item"
        :class="{
          'thumbnail-item--active': currentIndex === index,
          'thumbnail-item--inactive': currentIndex !== index
        }"
      >
        <img 
          :src="img" 
          :alt="`缩略图 ${index + 1}`"
          class="thumbnail-image"
          :class="{ 
            'thumbnail-image--active': currentIndex === index, 
            'thumbnail-image--inactive': currentIndex !== index 
          }"
        >
        
        <!-- 图片序号 -->
        <div class="thumbnail-index">
          {{ index + 1 }}
        </div>
      </div>
    </div>

    <!-- 右侧滚动按钮 -->
    <button
      v-if="showRightArrow"
      @click="scrollRight"
      class="scroll-arrow scroll-arrow-right"
      aria-label="向右滚动"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import type { ComponentPublicInstance } from 'vue'

/**
 * ThumbnailContainer 缩略图容器组件
 * @displayName XThumbnailContainer
 */

export interface ThumbnailContainerProps {
  images: string[]
  modelValue?: number
  autoScroll?: boolean
  showIndex?: boolean
}

const props = withDefaults(defineProps<ThumbnailContainerProps>(), {
  images: () => [],
  modelValue: 0,
  autoScroll: true,
  showIndex: true
})

const emit = defineEmits<{
  'update:modelValue': [index: number]
  'change': [index: number]
  'hover': [index: number]
}>()

// 响应式状态
const currentIndex = ref(props.modelValue)
const thumbnailContainer = ref<HTMLDivElement | null>(null)
const thumbnailRefs = ref<HTMLElement[]>([])
const canScrollLeft = ref(false)
const canScrollRight = ref(false)
const scrollProgress = ref(0)
const showLeftArrow = ref(false)
const showRightArrow = ref(false)
// 处理滚动事件
const handleThumbnailScroll = () => {
  updateScrollState()
}

// 设置缩略图 ref
const setThumbnailRef = (el: Element | ComponentPublicInstance | null, index: number) => {
  if (el && el instanceof HTMLElement) {
    thumbnailRefs.value[index] = el
  }
}

// 处理鼠标悬停
const handleImageHover = (index: number) => {
  emit('hover', index)
}

// 处理鼠标离开
const handleImageLeave = () => {
  // 可以在这里添加悬停结束的逻辑
}

// 处理缩略图点击
const handleThumbnailClick = (index: number) => {
  currentIndex.value = index
  emit('update:modelValue', index)
  emit('change', index)
  
  // 自动滚动到合适位置
  if (props.autoScroll) {
    nextTick(() => {
      scrollThumbnailToThirdPosition(index)
      setTimeout(() => {
        updateScrollState()
      }, 300)
    })
  }
}

// 左滚动
const scrollLeft = () => {
  if (!thumbnailContainer.value) return
  const container = thumbnailContainer.value
  const scrollAmount = container.clientWidth * 0.8
  container.scrollBy({
    left: -scrollAmount,
    behavior: 'smooth'
  })
}

// 右滚动
const scrollRight = () => {
  if (!thumbnailContainer.value) return
  const container = thumbnailContainer.value
  const scrollAmount = container.clientWidth * 0.8
  container.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  })
}


// 滚动缩略图到第3个位置
const scrollThumbnailToThirdPosition = (clickedIndex: number) => {
    if (!thumbnailContainer.value || thumbnailRefs.value.length === 0) return
    
    const container = thumbnailContainer.value
    const clickedItem = thumbnailRefs.value[clickedIndex]
    
    if (!clickedItem) return
    
    // 计算目标滚动位置：点击项移动到第3个位置（索引2）
    const targetPosition = 2 // 第3个位置的索引
    
    // 获取缩略图的宽度和间距
    const itemWidth = clickedItem.offsetWidth
    const gap = 8 // 默认间距为8px
    
    // 计算每个项目的总宽度（包括间距）
    const itemTotalWidth = itemWidth + gap
    
    // 计算目标滚动距离
    // 如果点击的是前3个项目，滚动到开始位置
    // 否则，将点击项滚动到第3个位置
    let targetScrollLeft = 0
    
    if (clickedIndex >= targetPosition) {
        // 将点击项滚动到第3个位置
        targetScrollLeft = (clickedIndex - targetPosition) * itemTotalWidth
    }
    
    // 边界处理：确保不会滚动超出范围
    const maxScrollLeft = container.scrollWidth - container.clientWidth
    targetScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScrollLeft))
    // 平滑滚动
    container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
    })
}
// 更新滚动状态
const updateScrollState = () => {
  if (!thumbnailContainer.value) return
  
  const container = thumbnailContainer.value
  const scrollLeft = container.scrollLeft
  const maxScrollLeft = container.scrollWidth - container.clientWidth
  
  canScrollLeft.value = scrollLeft > 0
  canScrollRight.value = scrollLeft < maxScrollLeft
  
  // 计算滚动进度
  if (maxScrollLeft > 0) {
    scrollProgress.value = (scrollLeft / maxScrollLeft) * 100
  } else {
    scrollProgress.value = 0
  }
  
  // 判断是否显示箭头
  const visibleCount = getVisibleThumbnailCount()
  showLeftArrow.value = props.images.length > visibleCount && canScrollLeft.value
  showRightArrow.value = props.images.length > visibleCount && canScrollRight.value
}

// 获取可见缩略图数量
const getVisibleThumbnailCount = () => {
  if (!thumbnailContainer.value || thumbnailRefs.value.length === 0) return 4
  
  const container = thumbnailContainer.value
  const containerWidth = container.clientWidth - 32
  const itemWidth = thumbnailRefs.value[0]?.offsetWidth || 80
  const gap = 12 // gap-3 对应12px
  const itemTotalWidth = itemWidth + gap
  
  return Math.floor(containerWidth / itemTotalWidth)
}

// 切换到指定索引
const setCurrentIndex = (index: number) => {
  if (index >= 0 && index < props.images.length) {
    handleThumbnailClick(index)
  }
}

// 监听 modelValue 变化
watch(() => props.modelValue, (newValue) => {
  if (newValue !== undefined && newValue !== currentIndex.value) {
    currentIndex.value = newValue
    if (props.autoScroll) {
      nextTick(() => {
        scrollThumbnailToThirdPosition(newValue)
      })
    }
  }
})

// 监听 images 变化
watch(() => props.images, () => {
  nextTick(() => {
    updateScrollState()
  })
}, { deep: true })

onMounted(() => {
  nextTick(() => {
    updateScrollState()
  })
})

// 暴露方法
defineExpose({
  setCurrentIndex,
  scrollLeft,
  scrollRight,
  updateScrollState
})
</script>

<style scoped>
.thumbnail-container-wrapper {
  position: relative;
  width: 100%;
}

/* 滚动容器 */
.thumbnail-scroll-container {
  display: flex;
  overflow-x: auto;
  gap: 0.75rem; /* 12px */
  padding: 0.5rem 1rem;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.thumbnail-scroll-container::-webkit-scrollbar {
  display: none;
}

/* 缩略图项 */
.thumbnail-item {
  position: relative;
  width: 80px;
  height: 80px;
  border: 2px solid var(--x-color-gray-300, #d1d5db);
  border-radius: var(--x-radius-lg, 12px);
  cursor: pointer;
  flex-shrink: 0;
  transition: all var(--x-transition, 0.2s ease);
  overflow: hidden;
}

/* 移除向下动画，只保留边框和阴影变化 */
.thumbnail-item:hover {
  border-color: var(--x-color-gray-400, #9ca3af);
  box-shadow: var(--x-shadow-md, 0 4px 6px rgba(0, 0, 0, 0.1));
}

.thumbnail-item--active {
  border-color: var(--x-color-primary, #1a1a1a);
  box-shadow: 0 0 0 1px var(--x-color-primary, #1a1a1a), 
              var(--x-shadow-lg, 0 10px 15px rgba(0, 0, 0, 0.1));
}

.thumbnail-item--inactive {
  border-color: var(--x-color-gray-300, #d1d5db);
}

/* 缩略图图片 */
.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  transition: opacity var(--x-transition, 0.2s ease);
}

.thumbnail-image--active {
  opacity: 1;
}

.thumbnail-image--inactive {
  opacity: 0.75;
}

/* 图片序号 */
.thumbnail-index {
  position: absolute;
  bottom: 0.25rem;
  left: 0.25rem;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: var(--x-font-size-xs, 12px);
  padding: 0.125rem 0.375rem;
  border-radius: var(--x-radius-sm, 4px);
  line-height: 1;
}

/* 滚动按钮 - 去掉 active 向下动画 */
.scroll-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%); /* 只保持垂直居中，不再有 active 时的 translateY 变化 */
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid var(--x-color-gray-200, #e5e7eb);
  border-radius: 50%;
  cursor: pointer;
  transition: all var(--x-transition-fast, 0.15s ease);
  box-shadow: var(--x-shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.05));
}

.scroll-arrow:hover {
  background: white;
  border-color: var(--x-color-primary, #1a1a1a);
  box-shadow: var(--x-shadow-md, 0 4px 6px rgba(0, 0, 0, 0.1));
}

/* 移除 active 状态的向下动画 */
.scroll-arrow:active {
  /* 不再改变 transform，只改变背景色 */
  background: var(--x-color-gray-100, #f3f4f6);
}

.scroll-arrow:focus-visible {
  outline: 2px solid var(--x-color-primary, #1a1a1a);
  outline-offset: 2px;
}

.scroll-arrow-left {
  left: 0.5rem;
}

.scroll-arrow-right {
  right: 0.5rem;
}

.scroll-arrow svg {
  width: 24px;
  height: 24px;
  color: var(--x-color-gray-700, #374151);
  transition: color var(--x-transition-fast, 0.15s ease);
}

.scroll-arrow:hover svg {
  color: var(--x-color-primary, #1a1a1a);
}

/* 响应式设计 */
@media (min-width: 640px) {
  .thumbnail-item {
    width: 96px;
    height: 96px;
  }
}

@media (min-width: 1024px) {
  .thumbnail-item {
    width: 123px;
    height: 122px;
  }
}

@media (max-width: 640px) {
  .scroll-arrow {
    width: 36px;
    height: 36px;
  }
  
  .scroll-arrow svg {
    width: 20px;
    height: 20px;
  }
}

/* 优化动画性能 */
@media (prefers-reduced-motion: reduce) {
  .thumbnail-item,
  .thumbnail-image,
  .scroll-arrow {
    transition: none;
  }
}
</style>