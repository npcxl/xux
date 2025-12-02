<template>
  <div ref="referenceRef" class="x-popover-reference">
    <slot name="reference"></slot>
  </div>
  <Teleport v-if="teleported && renderTeleport" to="body">
    <Transition name="x-popover-fade">
      <div
        v-show="visible"
        ref="popperRef"
        :class="['x-popover', effectClass, popperClass]"
        :style="{
          position: strategy,
          top: y ? `${y}px` : '',
          left: x ? `${x}px` : '',
          width: computedWidth,
          ...popperStyle
        }"
        :data-popper-placement="placement"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @click="handleContentClick"
      >
        <div 
          v-if="showArrow" 
          ref="arrowRef" 
          class="x-popover__arrow"
          :style="{
            left: middlewareData.arrow?.x != null ? `${middlewareData.arrow.x}px` : '',
            top: middlewareData.arrow?.y != null ? `${middlewareData.arrow.y}px` : ''
          }"
        ></div>
        <template v-if="title">
          <div class="x-popover__title">{{ title }}</div>
        </template>
        <template v-if="content">
          <div class="x-popover__content" v-if="!rawContent">{{ content }}</div>
          <div class="x-popover__content" v-else v-html="content"></div>
        </template>
        <slot></slot>
      </div>
    </Transition>
  </Teleport>
  <template v-else>
    <Transition name="x-popover-fade">
      <div
        v-show="visible"
        ref="popperRef"
        :class="['x-popover', effectClass, popperClass]"
        :style="{
          position: strategy,
          top: y ? `${y}px` : '',
          left: x ? `${x}px` : '',
          width: computedWidth,
          ...popperStyle
        }"
        :data-popper-placement="placement"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @click="handleContentClick"
      >
        <div 
          v-if="showArrow" 
          ref="arrowRef" 
          class="x-popover__arrow"
          :style="{
            left: middlewareData.arrow?.x != null ? `${middlewareData.arrow.x}px` : '',
            top: middlewareData.arrow?.y != null ? `${middlewareData.arrow.y}px` : ''
          }"
        ></div>
        <template v-if="title">
          <div class="x-popover__title">{{ title }}</div>
        </template>
        <template v-if="content">
          <div class="x-popover__content" v-if="!rawContent">{{ content }}</div>
          <div class="x-popover__content" v-else v-html="content"></div>
        </template>
        <slot></slot>
      </div>
    </Transition>
  </template>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useFloating, autoUpdate, offset, flip, shift, arrow, type Placement } from '@floating-ui/vue'

/**
 * Popover 弹出框组件 
 * @displayName XPopover
 */

export interface PopoverProps {
  visible?: boolean
  trigger?: 'click' | 'hover' | 'focus' | 'manual' | 'contextmenu'
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
  showArrow?: boolean
  offset?: number
  width?: string | number
  disabled?: boolean
  popperClass?: string
  popperStyle?: Record<string, any>
  title?: string
  content?: string
  rawContent?: boolean
  teleported?: boolean
  persistent?: boolean
  hideOnClick?: boolean
  popperOptions?: Record<string, any>
  virtualRef?: HTMLElement | null
  virtualTriggering?: boolean
  effect?: 'light' | 'dark'
  /** 与 Element 对齐的命名 */
  openDelay?: number
  closeDelay?: number
}

const props = withDefaults(defineProps<PopoverProps>(), {
  visible: false,
  trigger: 'click',
  placement: 'bottom',
  showArrow: true,
  offset: 8,
  disabled: false,
  openDelay: 0,
  closeDelay: 0,
  teleported: true,
  persistent: false,
  rawContent: false,
  hideOnClick: true,
  virtualRef: null,
  virtualTriggering: false,
  effect: 'light'
})

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'show'): void
  (e: 'hide'): void
}>()

const referenceRef = ref<HTMLElement>()
const popperRef = ref<HTMLElement>()
const arrowRef = ref<HTMLElement>()
const internalVisible = ref(props.visible ?? false)
const isMounted = ref(false)
let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null
let cleanup: (() => void) | null = null

// 判断是否使用受控模式
const isControlled = computed(() => props.visible !== undefined)
const visible = computed({
  get: () => isControlled.value ? props.visible! : internalVisible.value,
  set: (val) => {
    if (!isControlled.value) {
      internalVisible.value = val
    }
    emit('update:visible', val)
  }
})

// 使用 floating-ui 进行定位
const anchorRef = computed(() => props.virtualRef ?? referenceRef)
const { x, y, strategy, middlewareData } = useFloating(anchorRef, popperRef, {
  placement: props.placement as Placement,
  middleware: [
    offset(props.offset),
    flip(),
    shift({ padding: 8 }),
    ...(props.showArrow ? [arrow({ element: arrowRef })] : [])
  ],
  ...(props.popperOptions || {})
})

// 更新 visible 状态
const updateVisible = (val: boolean) => {
  if (props.disabled) return
  if (!isControlled.value) {
    internalVisible.value = val
  }
  emit('update:visible', val)
  if (val) {
    emit('show')
  } else {
    emit('hide')
  }
}

// 显示
const show = () => {
  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = null
  }
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
  
  if (props.openDelay > 0) {
    showTimer = setTimeout(() => {
      updateVisible(true)
    }, props.openDelay)
  } else {
    updateVisible(true)
  }
}

// 隐藏
const hide = () => {
  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = null
  }
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
  
  if (props.closeDelay > 0) {
    hideTimer = setTimeout(() => {
      updateVisible(false)
    }, props.closeDelay)
  } else {
    updateVisible(false)
  }
}

// 切换显示/隐藏
const toggle = () => {
  if (visible) {
    hide()
  } else {
    show()
  }
}

// 处理鼠标进入
const handleMouseEnter = () => {
  if (props.trigger === 'hover') {
    if (hideTimer) {
      clearTimeout(hideTimer)
      hideTimer = null
    }
  }
}

// 处理鼠标离开
const handleMouseLeave = () => {
  if (props.trigger === 'hover') {
    hide()
  }
}

// 初始化定位
const initFloating = async () => {
  if (!referenceRef.value || !popperRef.value) return
  
  await nextTick()
  
  // 自动更新位置
  if (visible.value) {
    cleanup = autoUpdate(referenceRef.value, popperRef.value, () => {
      // floating-ui 会自动更新
    })
  }
}

// 销毁定位
const destroyFloating = () => {
  if (cleanup) {
    cleanup()
    cleanup = null
  }
}

// 处理点击事件
const handleClick = (e: MouseEvent) => {
  if (props.disabled) return
  if (props.trigger !== 'click') return
  
  const target = e.target as HTMLElement
  if (referenceRef.value?.contains(target)) {
    toggle()
  } else if (popperRef.value && !popperRef.value.contains(target)) {
    hide()
  }
}

// 右键触发
const handleContextMenu = (e: MouseEvent) => {
  if (props.disabled || props.trigger !== 'contextmenu') return
  e.preventDefault()
  show()
}

// 处理焦点事件
const handleFocus = () => {
  if (props.trigger === 'focus' && !props.disabled) {
    show()
  }
}

const handleBlur = () => {
  if (props.trigger === 'focus' && !props.disabled) {
    hide()
  }
}

// 内容点击处理（hide-on-click）
const handleContentClick = () => {
  if (props.hideOnClick) {
    hide()
  }
}

// 监听 props.visible 变化（受控模式）
watch(() => props.visible, (val) => {
  if (isControlled.value && val !== undefined) {
    internalVisible.value = val
  }
}, { immediate: true })

// 监听 visible 变化，更新定位
watch(() => visible.value, (val) => {
  if (val) {
    nextTick(() => {
      initFloating()
    })
  } else {
    destroyFloating()
  }
})

const computedWidth = computed(() => typeof props.width === 'number' ? `${props.width}px` : (props.width || ''))
const effectClass = computed(() => props.effect === 'dark' ? 'x-popover--dark' : 'x-popover--light')

const renderTeleport = computed(() => props.persistent ? true : visible.value)

onMounted(() => {
  isMounted.value = true
  
  if (!props.virtualTriggering) {
    if (props.trigger === 'click') {
      document.addEventListener('click', handleClick, true)
    } else if (props.trigger === 'focus') {
      referenceRef.value?.addEventListener('focus', handleFocus)
      referenceRef.value?.addEventListener('blur', handleBlur)
    } else if (props.trigger === 'hover') {
      referenceRef.value?.addEventListener('mouseenter', show)
      referenceRef.value?.addEventListener('mouseleave', hide)
    } else if (props.trigger === 'contextmenu') {
      referenceRef.value?.addEventListener('contextmenu', handleContextMenu)
    }
  }
  
  if (visible) {
    initFloating()
  }
})

onBeforeUnmount(() => {
  if (showTimer) {
    clearTimeout(showTimer)
  }
  if (hideTimer) {
    clearTimeout(hideTimer)
  }
  
  if (!props.virtualTriggering) {
    if (props.trigger === 'click') {
      document.removeEventListener('click', handleClick, true)
    } else if (props.trigger === 'focus') {
      referenceRef.value?.removeEventListener('focus', handleFocus)
      referenceRef.value?.removeEventListener('blur', handleBlur)
    } else if (props.trigger === 'hover') {
      referenceRef.value?.removeEventListener('mouseenter', show)
      referenceRef.value?.removeEventListener('mouseleave', hide)
    } else if (props.trigger === 'contextmenu') {
      referenceRef.value?.removeEventListener('contextmenu', handleContextMenu)
    }
  }
  
  destroyFloating()
})

// 暴露方法
defineExpose({
  show,
  hide,
  toggle
})
</script>

<style scoped>
.x-popover-reference {
  display: inline-block;
}

.x-popover {
  position: absolute;
  z-index: 2000;
  background: var(--x-bg-color, #ffffff);
  border: 1px solid var(--x-border-color, #e4e7ed);
  border-radius: 6px;
  box-shadow: var(--x-shadow-md, 0 4px 12px rgba(0, 0, 0, 0.15));
  padding: 12px;
  min-width: 150px;
  word-wrap: break-word;
}

.x-popover--dark {
  background: #1f2329;
  color: #e5e7eb;
  border-color: #30363d;
}

.x-popover__title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
}

.x-popover__content {
  font-size: 14px;
}

.x-popover__arrow {
  position: absolute;
  width: 10px;
  height: 10px;
  z-index: -1;
}

.x-popover__arrow::before {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  background: var(--x-bg-color, #ffffff);
  border: 1px solid var(--x-border-color, #e4e7ed);
  transform: rotate(45deg);
}

/* 箭头位置 */
.x-popover[data-popper-placement^='top'] .x-popover__arrow {
  bottom: -5px;
}

.x-popover[data-popper-placement^='bottom'] .x-popover__arrow {
  top: -5px;
}

.x-popover[data-popper-placement^='left'] .x-popover__arrow {
  right: -5px;
}

.x-popover[data-popper-placement^='right'] .x-popover__arrow {
  left: -5px;
}

/* 动画 */
.x-popover-fade-enter-active,
.x-popover-fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.x-popover-fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.x-popover-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>

