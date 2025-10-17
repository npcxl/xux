<template>
  <div 
    class="x-carousel" 
    :class="[`carousel-${effect}`, { 'carousel-vertical': direction === 'vertical' }]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div 
      class="carousel-container"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @click="handleClick"
    >
      <!-- 所有轮播项 -->
      <div
        v-for="(item, index) in items"
        :key="item.key || index"
        class="carousel-item"
        :class="getItemClass(index)"
        :style="getItemStyle(index)"
      >
        <slot :item="item" :index="index">
          <img v-if="item.image" :src="item.image" :alt="item.title" class="carousel-image" />
          <div v-if="item.title || item.description" class="carousel-content">
            <h3 v-if="item.title" class="carousel-title">{{ item.title }}</h3>
            <p v-if="item.description" class="carousel-description">{{ item.description }}</p>
          </div>
        </slot>
      </div>
    </div>

    <!-- 左右箭头 -->
    <button
      v-if="arrow !== 'never' && direction === 'horizontal'"
      v-show="arrow === 'always' || isHovering"
      class="carousel-arrow carousel-arrow-left"
      @click.stop="handlePrev"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
    <button
      v-if="arrow !== 'never' && direction === 'horizontal'"
      v-show="arrow === 'always' || isHovering"
      class="carousel-arrow carousel-arrow-right"
      @click.stop="handleNext"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>

    <!-- 上下箭头 -->
    <button
      v-if="arrow !== 'never' && direction === 'vertical'"
      v-show="arrow === 'always' || isHovering"
      class="carousel-arrow carousel-arrow-up"
      @click.stop="handlePrev"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
    <button
      v-if="arrow !== 'never' && direction === 'vertical'"
      v-show="arrow === 'always' || isHovering"
      class="carousel-arrow carousel-arrow-down"
      @click.stop="handleNext"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>

    <!-- 指示器 -->
    <div v-if="indicator" class="carousel-indicators" :class="`indicators-${indicatorPosition}`">
      <button
        v-for="(_item, index) in items"
        :key="index"
        class="carousel-indicator"
        :class="{ active: index === activeIndex }"
        @click.stop="handleIndicatorClick(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

export interface CarouselItem {
  key?: string | number
  image?: string
  title?: string
  description?: string
  [key: string]: any
}

export interface CarouselProps {
  /** 轮播项数据 */
  items: CarouselItem[]
  /** 初始索引 */
  initialIndex?: number
  /** 自动播放 */
  autoplay?: boolean
  /** 自动播放间隔（毫秒） */
  interval?: number
  /** 切换动画效果 */
  effect?: 'slide' | 'fade' | 'cube' | '3d-coverflow' | 'flip' | 'zoom' | 'cards' | 'creative'
  /** 方向 */
  direction?: 'horizontal' | 'vertical'
  /** 高度 */
  height?: string
  /** 箭头显示时机 */
  arrow?: 'always' | 'hover' | 'never'
  /** 是否显示指示器 */
  indicator?: boolean
  /** 指示器位置 */
  indicatorPosition?: 'bottom' | 'top' | 'left' | 'right'
  /** 是否循环播放 */
  loop?: boolean
  /** 动画持续时间（毫秒） */
  duration?: number
  /** 是否暂停在hover */
  pauseOnHover?: boolean
}

const props = withDefaults(defineProps<CarouselProps>(), {
  items: () => [],
  initialIndex: 0,
  autoplay: true,
  interval: 3000,
  effect: 'slide',
  direction: 'horizontal',
  height: '400px',
  arrow: 'hover',
  indicator: true,
  indicatorPosition: 'bottom',
  loop: true,
  duration: 600,
  pauseOnHover: true
})

const emit = defineEmits<{
  change: [current: number, prev: number]
}>()

const activeIndex = ref(props.initialIndex)
const isHovering = ref(false)
const timer = ref<number | null>(null)
const touchStartX = ref(0)
const touchStartY = ref(0)
const isTransitioning = ref(false)

const startAutoplay = () => {
  if (!props.autoplay || props.items.length <= 1) return
  
  stopAutoplay()
  
  // 自动切换
  timer.value = window.setTimeout(() => {
    next()
  }, props.interval)
}

const stopAutoplay = () => {
  if (timer.value) {
    clearTimeout(timer.value)
    timer.value = null
  }
}

const prev = () => {
  if (isTransitioning.value) return
  
  const prevIndex = activeIndex.value
  if (activeIndex.value === 0) {
    activeIndex.value = props.loop ? props.items.length - 1 : 0
  } else {
    activeIndex.value--
  }
  
  if (prevIndex !== activeIndex.value) {
    isTransitioning.value = true
    emit('change', activeIndex.value, prevIndex)
    setTimeout(() => {
      isTransitioning.value = false
    }, props.duration)
  }
}

const next = () => {
  if (isTransitioning.value) return
  
  const prevIndex = activeIndex.value
  if (activeIndex.value === props.items.length - 1) {
    activeIndex.value = props.loop ? 0 : props.items.length - 1
  } else {
    activeIndex.value++
  }
  
  if (prevIndex !== activeIndex.value) {
    isTransitioning.value = true
    emit('change', activeIndex.value, prevIndex)
    setTimeout(() => {
      isTransitioning.value = false
    }, props.duration)
  }
}

const goTo = (index: number) => {
  if (isTransitioning.value || index === activeIndex.value) return
  
  const prevIndex = activeIndex.value
  activeIndex.value = index
  isTransitioning.value = true
  emit('change', activeIndex.value, prevIndex)
  setTimeout(() => {
    isTransitioning.value = false
  }, props.duration)
}

const handlePrev = () => {
  prev()
  startAutoplay() // 重新开始自动播放
}

const handleNext = () => {
  next()
  startAutoplay() // 重新开始自动播放
}

const handleIndicatorClick = (index: number) => {
  goTo(index)
  startAutoplay() // 重新开始自动播放
}

const handleMouseEnter = () => {
  isHovering.value = true
  if (props.pauseOnHover) {
    stopAutoplay()
  }
}

const handleMouseLeave = () => {
  isHovering.value = false
  if (props.pauseOnHover) {
    startAutoplay()
  }
}

const handleClick = () => {
  if (props.pauseOnHover && props.autoplay) {
    stopAutoplay()
    setTimeout(() => {
      startAutoplay()
    }, 100)
  }
}

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX
  touchStartY.value = e.touches[0].clientY
  stopAutoplay()
}

const handleTouchMove = (_e: TouchEvent) => {
  // 可以添加跟随效果
}

const handleTouchEnd = (e: TouchEvent) => {
  const touchEndX = e.changedTouches[0].clientX
  const touchEndY = e.changedTouches[0].clientY
  const diffX = touchStartX.value - touchEndX
  const diffY = touchStartY.value - touchEndY

  if (props.direction === 'horizontal') {
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        next()
      } else {
        prev()
      }
    }
  } else {
    if (Math.abs(diffY) > 50) {
      if (diffY > 0) {
        next()
      } else {
        prev()
      }
    }
  }
  
  startAutoplay()
}

const getItemClass = (index: number) => {
  const classes = []
  
  if (index === activeIndex.value) {
    classes.push('active')
  } else if (index === (activeIndex.value - 1 + props.items.length) % props.items.length) {
    classes.push('prev')
  } else if (index === (activeIndex.value + 1) % props.items.length) {
    classes.push('next')
  } else {
    classes.push('inactive')
  }
  
  return classes
}

const getItemStyle = (index: number) => {
  const isActive = index === activeIndex.value
  const isPrev = index === (activeIndex.value - 1 + props.items.length) % props.items.length
  const isNext = index === (activeIndex.value + 1) % props.items.length
  
  const style: any = {
    transition: `all ${props.duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
  }
  
  switch (props.effect) {
    case 'fade':
      style.opacity = isActive ? 1 : 0
      style.zIndex = isActive ? 1 : 0
      break
      
    case 'zoom':
      if (isActive) {
        style.opacity = 1
        style.transform = 'scale(1)'
        style.zIndex = 1
      } else {
        style.opacity = 0
        style.transform = 'scale(0.8)'
        style.zIndex = 0
      }
      style.transition = `all ${props.duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`
      break
      
    case 'flip':
      style.transition = `all ${props.duration}ms cubic-bezier(0.4, 0, 0.2, 1)`
      if (isActive) {
        style.opacity = 1
        style.transform = 'rotateY(0deg)'
        style.zIndex = 1
      } else {
        style.opacity = 0
        style.transform = 'rotateY(90deg)'
        style.zIndex = 0
      }
      break
      
    case '3d-coverflow':
      style.transition = `all ${props.duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`
      if (isActive) {
        style.transform = 'translateX(-50%) translateZ(0) rotateY(0deg) scale(1)'
        style.zIndex = 10
        style.opacity = 1
      } else if (isPrev) {
        style.transform = 'translateX(-80%) translateZ(-300px) rotateY(50deg) scale(0.75)'
        style.zIndex = 5
        style.opacity = 0.6
      } else if (isNext) {
        style.transform = 'translateX(-20%) translateZ(-300px) rotateY(-50deg) scale(0.75)'
        style.zIndex = 5
        style.opacity = 0.6
      } else {
        style.opacity = 0
        style.zIndex = 0
      }
      break
      
    case 'cards':
      style.transition = `all ${props.duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`
      if (isActive) {
        style.transform = 'translateX(-50%) scale(1) rotateZ(0deg)'
        style.zIndex = 10
        style.opacity = 1
      } else if (isNext) {
        style.transform = 'translateX(-30%) scale(0.9) rotateZ(-2deg)'
        style.zIndex = 9
        style.opacity = 0.8
      } else if (isPrev) {
        style.transform = 'translateX(-70%) scale(0.9) rotateZ(2deg)'
        style.zIndex = 9
        style.opacity = 0.8
      } else {
        style.opacity = 0
        style.zIndex = 0
      }
      break
      
    case 'creative':
      style.transition = `all ${props.duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`
      if (isActive) {
        style.transform = 'translateX(-50%) translateY(0) scale(1) rotateX(0deg)'
        style.zIndex = 10
        style.opacity = 1
      } else if (isPrev) {
        style.transform = 'translateX(-80%) translateY(30px) scale(0.85) rotateX(15deg)'
        style.zIndex = 5
        style.opacity = 0.5
      } else if (isNext) {
        style.transform = 'translateX(-20%) translateY(30px) scale(0.85) rotateX(15deg)'
        style.zIndex = 5
        style.opacity = 0.5
      } else {
        style.opacity = 0
        style.zIndex = 0
      }
      break
      
    default: // slide
      if (props.direction === 'horizontal') {
        if (isActive) {
          style.transform = 'translateX(0)'
          style.opacity = 1
          style.zIndex = 1
        } else if (isPrev) {
          style.transform = 'translateX(-100%)'
          style.opacity = 0
          style.zIndex = 0
        } else if (isNext) {
          style.transform = 'translateX(100%)'
          style.opacity = 0
          style.zIndex = 0
        } else {
          style.opacity = 0
          style.zIndex = 0
        }
      } else {
        if (isActive) {
          style.transform = 'translateY(0)'
          style.opacity = 1
          style.zIndex = 1
        } else if (isPrev) {
          style.transform = 'translateY(-100%)'
          style.opacity = 0
          style.zIndex = 0
        } else if (isNext) {
          style.transform = 'translateY(100%)'
          style.opacity = 0
          style.zIndex = 0
        } else {
          style.opacity = 0
          style.zIndex = 0
        }
      }
  }
  
  return style
}

// 暴露方法
defineExpose({
  prev,
  next,
  goTo,
  getCurrentIndex: () => activeIndex.value
})

watch(() => props.autoplay, (val) => {
  if (val) {
    startAutoplay()
  } else {
    stopAutoplay()
  }
})

watch(() => activeIndex.value, () => {
  if (props.autoplay) {
    startAutoplay()
  }
})

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style lang="scss" scoped>
.x-carousel {
  position: relative;
  width: 100%;
  height: v-bind(height);
  overflow: hidden;
  background: #f5f5f5;
  border-radius: 8px;
  user-select: none;

  &.carousel-3d-coverflow,
  &.carousel-cards,
  &.carousel-creative {
    perspective: 1500px;
  }
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  pointer-events: none;
  
  &.active {
    pointer-events: auto;
  }
  
  .carousel-3d-coverflow &,
  .carousel-cards &,
  .carousel-creative & {
    left: 50%;
    width: 70%;
    height: 85%;
    top: 7.5%;
    transform-style: preserve-3d;
  }
  
  .carousel-cards & {
    width: 80%;
    height: 90%;
    top: 5%;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  }
  
  .carousel-creative & {
    width: 75%;
    height: 88%;
    top: 6%;
  }
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  
  .carousel-cards &,
  .carousel-3d-coverflow &,
  .carousel-creative & {
    border-radius: 8px;
  }
}

.carousel-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 32px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
  text-align: center;
  
  .carousel-cards &,
  .carousel-3d-coverflow &,
  .carousel-creative & {
    border-radius: 0 0 8px 8px;
  }
}

.carousel-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 8px 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.carousel-description {
  font-size: 14px;
  margin: 0;
  opacity: 0.9;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.95);
  color: #1a1a1a;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 20;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);

  &:hover {
    background: white;
    transform: translateY(-50%) scale(1.15);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: translateY(-50%) scale(1.05);
  }

  &.carousel-arrow-left {
    left: 20px;
    animation: pulse-left 2s ease-in-out infinite;
  }

  &.carousel-arrow-right {
    right: 20px;
    animation: pulse-right 2s ease-in-out infinite;
  }

  &.carousel-arrow-up {
    top: 20px;
    left: 50%;
    transform: translateX(-50%);

    &:hover {
      transform: translateX(-50%) scale(1.15);
    }

    &:active {
      transform: translateX(-50%) scale(1.05);
    }
  }

  &.carousel-arrow-down {
    bottom: 20px;
    top: auto;
    left: 50%;
    transform: translateX(-50%);

    &:hover {
      transform: translateX(-50%) scale(1.15);
    }

    &:active {
      transform: translateX(-50%) scale(1.05);
    }
  }
}

@keyframes pulse-left {
  0%, 100% {
    transform: translateY(-50%) translateX(0);
  }
  50% {
    transform: translateY(-50%) translateX(-4px);
  }
}

@keyframes pulse-right {
  0%, 100% {
    transform: translateY(-50%) translateX(0);
  }
  50% {
    transform: translateY(-50%) translateX(4px);
  }
}

.carousel-indicators {
  position: absolute;
  display: flex;
  gap: 10px;
  z-index: 15;

  &.indicators-bottom {
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }

  &.indicators-top {
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
  }

  &.indicators-left {
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    flex-direction: column;
  }

  &.indicators-right {
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    flex-direction: column;
  }
}

.carousel-indicator {
  width: 40px;
  height: 6px;
  border: none;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  padding: 0;
  border-radius: 3px;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  backdrop-filter: blur(4px);

  .indicators-left &,
  .indicators-right & {
    width: 6px;
    height: 40px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.6);
    transform: scale(1.1);
  }

  &.active {
    background: rgba(255, 255, 255, 0.9);
    width: 50px;
    
    .indicators-left &,
    .indicators-right & {
      width: 6px;
      height: 50px;
    }
  }
}
</style>
