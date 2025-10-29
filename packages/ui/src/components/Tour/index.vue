<template>
  <Teleport to="body">
    <Transition name="tour-fade">
      <div v-if="modelValue && currentStepData" class="tour-overlay">
        <!-- 遮罩层 -->
        <svg class="tour-mask" :style="{ pointerEvents: maskClosable ? 'auto' : 'none' }">
          <defs>
            <mask id="tour-hole-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <rect
                :x="maskHole.x"
                :y="maskHole.y"
                :width="maskHole.width"
                :height="maskHole.height"
                :rx="maskHole.radius"
                fill="black"
              />
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            :fill="maskColor"
            mask="url(#tour-hole-mask)"
            @click="handleMaskClick"
          />
        </svg>

        <!-- 高亮边框 -->
        <Transition name="tour-highlight">
          <div
            v-if="maskHole.width > 0"
            class="tour-highlight"
            :style="{
              left: maskHole.x + 'px',
              top: maskHole.y + 'px',
              width: maskHole.width + 'px',
              height: maskHole.height + 'px',
              borderRadius: maskHole.radius + 'px'
            }"
          />
        </Transition>

        <!-- 引导卡片 -->
        <Transition :name="`tour-pop-${placement}`">
          <div
            v-if="cardPosition.left !== 0"
            class="tour-card"
            :class="[`tour-card--${placement}`, { 'tour-card--animated': animated }]"
            :style="{
              left: cardPosition.left + 'px',
              top: cardPosition.top + 'px',
              maxWidth: typeof currentStepData.cardWidth === 'number' 
                ? currentStepData.cardWidth + 'px' 
                : currentStepData.cardWidth
            }"
          >
            <!-- 箭头 -->
            <div class="tour-arrow" :class="`tour-arrow--${placement}`">
              <div class="tour-arrow-inner"></div>
            </div>

            <!-- 头部 -->
            <div v-if="currentStepData.title || showClose" class="tour-header">
              <h3 v-if="currentStepData.title" class="tour-title">
                {{ currentStepData.title }}
              </h3>
              <button v-if="showClose" class="tour-close" @click="handleClose" aria-label="关闭">
                <Icon icon="mdi:close" />
              </button>
            </div>

            <!-- 内容 -->
            <div class="tour-content">
              <div v-if="currentStepData.description" v-html="currentStepData.description" class="tour-description"></div>
              <slot :step="currentStepData" :current="currentStep" :total="steps.length"></slot>
            </div>

            <!-- 底部 -->
            <div class="tour-footer">
              <div class="tour-indicators">
                <span
                  v-for="(_step, index) in steps"
                  :key="index"
                  class="tour-indicator"
                  :class="{ 'tour-indicator--active': index === currentStep }"
                  @click="goToStep(index)"
                />
              </div>
              <div class="tour-actions">
                <XButton
                  v-if="currentStep > 0"
                  size="small"
                  ghost
                  @click="handlePrev"
                >
                  {{ prevButtonText }}
                </XButton>
                <XButton
                  v-if="currentStep < steps.length - 1"
                  size="small"
                  type="primary"
                  ghost
                  @click="handleNext"
                >
                  {{ nextButtonText }}
                </XButton>
                <XButton
                  v-else
                  size="small"
                  type="primary"
                  ghost
                  @click="handleFinish"
                >
                  {{ finishButtonText }}
                </XButton>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { Icon } from '@iconify/vue'

/**
 * Tour 漫游式引导组件
 * @displayName XTour
 */

export interface TourStep {
  target: string | HTMLElement
  title?: string
  description?: string
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  cardWidth?: number | string
  offset?: { x?: number; y?: number }
  beforeEnter?: () => void | Promise<void>
  beforeLeave?: () => void | Promise<void>
}

export interface TourProps {
  modelValue?: boolean
  steps?: TourStep[]
  current?: number
  maskClosable?: boolean
  maskColor?: string
  showClose?: boolean
  animated?: boolean
  gap?: number
  prevButtonText?: string
  nextButtonText?: string
  finishButtonText?: string
}

const props = withDefaults(defineProps<TourProps>(), {
  modelValue: false,
  steps: () => [],
  current: 0,
  maskClosable: false,
  maskColor: 'rgba(0, 0, 0, 0.5)',
  showClose: true,
  animated: true,
  gap: 12,
  prevButtonText: '上一步',
  nextButtonText: '下一步',
  finishButtonText: '完成'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'update:current': [value: number]
  'change': [current: number]
  'close': []
  'finish': []
}>()

const currentStep = ref(props.current)
const maskHole = ref({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  radius: 8
})

const cardPosition = ref({
  left: 0,
  top: 0
})

const placement = ref<'top' | 'bottom' | 'left' | 'right' | 'center'>('bottom')

const currentStepData = computed(() => {
  return props.steps[currentStep.value]
})

// 获取目标元素
const getTargetElement = (target: string | HTMLElement): HTMLElement | null => {
  if (typeof target === 'string') {
    return document.querySelector(target)
  }
  return target
}

// 计算遮罩镂空位置
const calculateMaskHole = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  const padding = 8

  maskHole.value = {
    x: rect.left - padding,
    y: rect.top - padding,
    width: rect.width + padding * 2,
    height: rect.height + padding * 2,
    radius: 8
  }
}

// 计算卡片位置
const calculateCardPosition = (element: HTMLElement, cardPlacement: string) => {
  const rect = element.getBoundingClientRect()
  const cardWidth = typeof currentStepData.value?.cardWidth === 'number' 
    ? currentStepData.value.cardWidth 
    : 360
  const cardHeight = 200 // 估算高度
  const gap = props.gap
  const offset = currentStepData.value?.offset || {}

  let left = 0
  let top = 0

  switch (cardPlacement) {
    case 'top':
      left = rect.left + rect.width / 2 - cardWidth / 2
      top = rect.top - cardHeight - gap
      break
    case 'bottom':
      left = rect.left + rect.width / 2 - cardWidth / 2
      top = rect.bottom + gap
      break
    case 'left':
      left = rect.left - cardWidth - gap
      top = rect.top + rect.height / 2 - cardHeight / 2
      break
    case 'right':
      left = rect.right + gap
      top = rect.top + rect.height / 2 - cardHeight / 2
      break
    case 'center':
      left = window.innerWidth / 2 - cardWidth / 2
      top = window.innerHeight / 2 - cardHeight / 2
      break
  }

  // 应用自定义偏移
  left += offset.x || 0
  top += offset.y || 0

  // 边界检测
  const padding = 16
  left = Math.max(padding, Math.min(left, window.innerWidth - cardWidth - padding))
  top = Math.max(padding, Math.min(top, window.innerHeight - cardHeight - padding))

  cardPosition.value = { left, top }
}

// 更新位置
const updatePosition = async (needScroll = false) => {
  if (!currentStepData.value) return

  const element = getTargetElement(currentStepData.value.target)
  if (!element) return

  // 只在需要时滚动到视图
  if (needScroll) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    })
  }

  await nextTick()

  setTimeout(() => {
    calculateMaskHole(element)
    const stepPlacement = currentStepData.value?.placement || 'bottom'
    placement.value = stepPlacement
    calculateCardPosition(element, stepPlacement)
  }, needScroll ? 300 : 0)
}

// 前往指定步骤
const goToStep = async (index: number) => {
  if (index < 0 || index >= props.steps.length) return
  
  const nextStep = props.steps[index]
  if (nextStep.beforeEnter) {
    await nextStep.beforeEnter()
  }

  currentStep.value = index
  emit('update:current', index)
  emit('change', index)
  updatePosition(true) // 切换步骤时需要滚动
}

// 上一步
const handlePrev = () => {
  goToStep(currentStep.value - 1)
}

// 下一步
const handleNext = () => {
  goToStep(currentStep.value + 1)
}

// 完成
const handleFinish = () => {
  emit('update:modelValue', false)
  emit('finish')
}

// 关闭
const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

// 点击遮罩
const handleMaskClick = () => {
  if (props.maskClosable) {
    handleClose()
  }
}

// 监听窗口大小变化
let resizeObserver: ResizeObserver | null = null

const handlePositionUpdate = () => {
  updatePosition(false) // 窗口变化不滚动
}

onMounted(() => {
  window.addEventListener('resize', handlePositionUpdate)
  window.addEventListener('scroll', handlePositionUpdate, true)

  resizeObserver = new ResizeObserver(handlePositionUpdate)
  if (currentStepData.value) {
    const element = getTargetElement(currentStepData.value.target)
    if (element) {
      resizeObserver.observe(element)
    }
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handlePositionUpdate)
  window.removeEventListener('scroll', handlePositionUpdate, true)
  resizeObserver?.disconnect()
})

watch(() => props.modelValue, (val: boolean) => {
  if (val) {
    nextTick(() => {
      updatePosition(true) // 初始显示时滚动
    })
  }
})

watch(() => props.current, (val: number) => {
  currentStep.value = val
  updatePosition(false) // 外部控制步骤变化时不滚动，避免重复
})

defineExpose({
  goToStep,
  next: handleNext,
  prev: handlePrev,
  finish: handleFinish,
  close: handleClose
})
</script>

<style scoped>
/* 遮罩层淡入淡出 */
.tour-fade-enter-active,
.tour-fade-leave-active {
  transition: opacity 0.3s ease;
}

.tour-fade-enter-from,
.tour-fade-leave-to {
  opacity: 0;
}

.tour-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
}

.tour-mask {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: auto;
}

/* 高亮边框动画 */
.tour-highlight {
  position: fixed;
  pointer-events: none;
  border: 2px solid var(--x-color-primary, #1a1a1a);
  background: transparent;
  box-shadow: 
    0 0 0 2px var(--x-color-primary, #1a1a1a),
    0 0 20px var(--x-color-primary-alpha-50, rgba(26, 26, 26, 0.5)),
    0 4px 12px var(--x-shadow-color, rgba(0, 0, 0, 0.1)),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  animation: tourHighlightPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  z-index: 10000;
}

@keyframes tourHighlightPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 
      0 0 0 2px var(--x-color-primary, #1a1a1a),
      0 0 20px var(--x-color-primary-alpha-50, rgba(26, 26, 26, 0.5)),
      0 4px 12px var(--x-shadow-color, rgba(0, 0, 0, 0.1)),
      inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  }
  50% {
    opacity: 1;
    transform: scale(1.005);
    box-shadow: 
      0 0 0 3px var(--x-color-primary, #1a1a1a),
      0 0 30px var(--x-color-primary-alpha-60, rgba(26, 26, 26, 0.6)),
      0 6px 16px var(--x-shadow-color, rgba(0, 0, 0, 0.15)),
      inset 0 0 0 2px rgba(255, 255, 255, 0.15);
  }
}

.tour-highlight-enter-active,
.tour-highlight-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tour-highlight-enter-from,
.tour-highlight-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* 卡片弹出动画 - 不同方向 */
.tour-card {
  position: fixed;
  background: var(--x-bg-color, white);
  border-radius: var(--x-radius-lg, 16px);
  box-shadow: var(--x-shadow-xl, 
    0 20px 25px rgba(0, 0, 0, 0.15),
    0 10px 10px rgba(0, 0, 0, 0.04));
  max-width: 360px;
  pointer-events: auto;
  z-index: 10001;
  border: 1px solid var(--x-border-color, rgba(0, 0, 0, 0.1));
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.tour-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: var(--x-color-primary, #1a1a1a);
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0.2;
}

/* 底部弹出 */
.tour-pop-bottom-enter-active,
.tour-pop-bottom-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tour-pop-bottom-enter-from {
  opacity: 0;
  transform: translateY(-30px) scale(0.9);
  filter: blur(10px);
}

.tour-pop-bottom-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
  filter: blur(8px);
}

/* 顶部弹出 */
.tour-pop-top-enter-active,
.tour-pop-top-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tour-pop-top-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
  filter: blur(10px);
}

.tour-pop-top-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  filter: blur(8px);
}

/* 左侧弹出 */
.tour-pop-left-enter-active,
.tour-pop-left-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tour-pop-left-enter-from {
  opacity: 0;
  transform: translateX(30px) scale(0.9);
  filter: blur(10px);
}

.tour-pop-left-leave-to {
  opacity: 0;
  transform: translateX(20px) scale(0.95);
  filter: blur(8px);
}

/* 右侧弹出 */
.tour-pop-right-enter-active,
.tour-pop-right-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tour-pop-right-enter-from {
  opacity: 0;
  transform: translateX(-30px) scale(0.9);
  filter: blur(10px);
}

.tour-pop-right-leave-to {
  opacity: 0;
  transform: translateX(-20px) scale(0.95);
  filter: blur(8px);
}

/* 中心弹出 */
.tour-pop-center-enter-active,
.tour-pop-center-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tour-pop-center-enter-from,
.tour-pop-center-leave-to {
  opacity: 0;
  transform: scale(0.8);
  filter: blur(10px);
}

/* 箭头 */
.tour-arrow {
  position: absolute;
  width: 16px;
  height: 16px;
  z-index: 1;
}

.tour-arrow-inner {
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--x-bg-color, white);
  transform: rotate(45deg);
  border: 1px solid var(--x-border-color, rgba(0, 0, 0, 0.1));
  box-shadow: var(--x-shadow-sm, 
    0 1px 2px rgba(0, 0, 0, 0.05));
}

.tour-arrow--bottom {
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
}

.tour-arrow--top {
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
}

.tour-arrow--left {
  right: -8px;
  top: 50%;
  transform: translateY(-50%);
}

.tour-arrow--right {
  left: -8px;
  top: 50%;
  transform: translateY(-50%);
}

.tour-arrow--center {
  display: none;
}

/* 头部 */
.tour-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--x-border-color, rgba(0, 0, 0, 0.1));
  background: var(--x-bg-color, white);
  backdrop-filter: blur(10px);
}

.tour-header::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--x-color-primary, #1a1a1a);
  opacity: 0.1;
}

.tour-title {
  font-size: var(--x-font-size-lg, 18px);
  font-weight: 700;
  color: var(--x-text-color-primary, #1a1a1a);
  margin: 0;
  letter-spacing: -0.02em;
}

.tour-close {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 1px solid transparent;
  background: var(--x-color-gray-100, #f3f4f6);
  color: var(--x-text-color-secondary, #6b7280);
  cursor: pointer;
  border-radius: var(--x-radius-md, 8px);
  transition: all var(--x-transition-base, 0.3s ease);
  overflow: hidden;
}

.tour-close:hover {
  background: var(--x-color-danger-lighter, #fca5a5);
  color: var(--x-color-danger, #ef4444);
  border-color: var(--x-color-danger-light, #f87171);
  transform: scale(1.05) rotate(90deg);
  box-shadow: var(--x-shadow-md, 
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06));
}

.tour-close:active {
  transform: scale(0.95) rotate(90deg);
}

/* 内容 */
.tour-content {
  padding: 20px 24px;
  color: var(--x-text-color-regular, #374151);
  line-height: 1.6;
}

.tour-description {
  margin: 0;
}

/* 底部 */
.tour-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-top: 1px solid var(--x-border-color, rgba(0, 0, 0, 0.1));
  background: var(--x-bg-color, white);
  backdrop-filter: blur(10px);
}

.tour-footer::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--x-color-primary, #1a1a1a);
  opacity: 0.1;
}

.tour-indicators {
  display: flex;
  gap: 8px;
}

.tour-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--x-color-gray-300, #d1d5db);
  cursor: pointer;
  transition: all var(--x-transition-base, 0.3s ease);
}

.tour-indicator:hover {
  background: var(--x-color-gray-400, #9ca3af);
  transform: scale(1.2);
}

.tour-indicator--active {
  width: 24px;
  border-radius: var(--x-radius-sm, 4px);
  background: var(--x-color-primary, #1a1a1a);
  box-shadow: 
    0 2px 8px var(--x-color-primary-alpha-40, rgba(26, 26, 26, 0.4)),
    0 0 16px var(--x-color-primary-alpha-30, rgba(26, 26, 26, 0.3));
}

.tour-actions {
  display: flex;
  gap: 8px;
}

/* 动画增强 */
.tour-card--animated {
  animation: tourCardFloat 3s ease-in-out infinite;
}

@keyframes tourCardFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

/* 响应式 */
@media (max-width: 768px) {
  .tour-card {
    max-width: calc(100vw - 32px) !important;
    left: 16px !important;
  }

  .tour-header,
  .tour-content,
  .tour-footer {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>

