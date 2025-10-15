<template>
  <div 
    ref="containerRef"
    class="drag-sort-container"
    :class="[`layout-${layout}`, { 'dragging': isDragging }]"
    :style="containerStyle"
  >
    <div
      v-for="(item, index) in localItems"
      :key="getItemKey(item, index)"
      class="drag-item"
      :class="{ 
        'drag-over': dragOverIndex === index,
        'drag-over-before': dragOverIndex === index && shouldInsertBefore,
        'drag-over-after': dragOverIndex === index && !shouldInsertBefore,
        'dragging-item': draggingIndex === index,
        'disabled': item.disabled,
        'will-move': willMoveIndex === index
      }"
      :draggable="!item.disabled && !disabled"
      @dragstart="handleDragStart(index, $event)"
      @dragend="handleDragEnd"
      @dragover.prevent="handleDragOver(index, $event)"
      @dragenter="handleDragEnter(index, $event)"
      @dragleave="handleDragLeave($event)"
      @drop.prevent="handleDrop(index)"
    >
      <!-- 占位符 -->
      <div v-if="draggingIndex === index" class="drag-placeholder">
        <div class="placeholder-content">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M7 11h10v2H7z"/>
          </svg>
        </div>
      </div>
      
      <!-- 实际内容 -->
      <div class="drag-item-inner">
        <div class="drag-handle" v-if="showHandle">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M9 3h2v2H9V3m4 0h2v2h-2V3M9 7h2v2H9V7m4 0h2v2h-2V7m-4 4h2v2H9v-2m4 0h2v2h-2v-2m-4 4h2v2H9v-2m4 0h2v2h-2v-2m-4 4h2v2H9v-2m4 0h2v2h-2v-2Z"/>
          </svg>
        </div>
        <div class="drag-content">
          <slot :item="item" :index="index">
            {{ item.label || item }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, CSSProperties } from 'vue'

export interface DragSortItem {
  id?: string | number
  label?: string
  disabled?: boolean
  [key: string]: any
}

export interface DragSortProps {
  modelValue: any[]
  layout?: 'grid' | 'vertical' | 'horizontal'
  cols?: number
  itemWidth?: string
  itemHeight?: string
  gap?: string
  showHandle?: boolean
  disabled?: boolean
  itemKey?: string | ((item: any, index: number) => string | number)
  animationDuration?: number
}

const props = defineProps({
  /** 数据列表 */
  modelValue: {
    type: Array as () => any[],
    default: () => []
  },
  /** 布局模式：grid(网格), vertical(垂直列表), horizontal(水平列表) */
  layout: {
    type: String as () => 'grid' | 'vertical' | 'horizontal',
    default: 'grid',
    validator: (value: string) => ['grid', 'vertical', 'horizontal'].includes(value)
  },
  /** 网格列数（仅在 grid 布局下生效） */
  cols: {
    type: Number,
    default: 4
  },
  /** 项目宽度 */
  itemWidth: {
    type: String,
    default: 'auto'
  },
  /** 项目高度 */
  itemHeight: {
    type: String,
    default: 'auto'
  },
  /** 间距 */
  gap: {
    type: String,
    default: '16px'
  },
  /** 显示拖拽手柄 */
  showHandle: {
    type: Boolean,
    default: true
  },
  /** 禁用拖拽 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 获取项目唯一键的函数 */
  itemKey: {
    type: [String, Function] as any,
    default: null
  },
  /** 动画持续时间 */
  animationDuration: {
    type: Number,
    default: 300
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'dragStart', 'dragEnd'])

const containerRef = ref<HTMLDivElement | null>(null)
const localItems = ref<any[]>([...props.modelValue])
const draggingIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)
const isDragging = ref<boolean>(false)
const shouldInsertBefore = ref<boolean>(false)
const willMoveIndex = ref<number | null>(null)
const dragOverTimer = ref<number | null>(null)

// 监听外部数据变化
watch(() => props.modelValue, (newVal) => {
  localItems.value = [...newVal]
}, { deep: true })

// 容器样式
const containerStyle = computed(() => {
  const styles: CSSProperties & Record<string, string> = {
    gap: props.gap,
    '--animation-duration': `${props.animationDuration}ms`
  }
  
  if (props.layout === 'grid') {
    styles.gridTemplateColumns = `repeat(${props.cols}, 1fr)`
  }
  
  if (props.itemWidth !== 'auto') {
    styles['--item-width'] = props.itemWidth
  }
  
  if (props.itemHeight !== 'auto') {
    styles['--item-height'] = props.itemHeight
  }
  
  return styles
})

// 获取项目的唯一键
function getItemKey(item: any, index: number): string | number {
  if (typeof props.itemKey === 'function') {
    return props.itemKey(item, index)
  }
  if (typeof props.itemKey === 'string' && item[props.itemKey]) {
    return item[props.itemKey]
  }
  if (item?.id !== undefined) {
    return item.id
  }
  return index
}

// 拖拽开始
function handleDragStart(index: number, event: DragEvent) {
  if (props.disabled || localItems.value[index]?.disabled) {
    event.preventDefault()
    return
  }
  
  draggingIndex.value = index
  isDragging.value = true
  
  // 设置拖拽数据
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', String(index))
    
    // 创建优化的拖拽图像
    const target = event.target as HTMLElement
    const itemInner = target.querySelector('.drag-item-inner') as HTMLElement
    
    if (itemInner) {
      const dragImage = itemInner.cloneNode(true) as HTMLElement
      dragImage.style.cssText = `
        position: absolute;
        top: -9999px;
        left: -9999px;
        width: ${target.offsetWidth}px;
        height: ${target.offsetHeight}px;
        opacity: 0.9;
        transform: rotate(3deg) scale(1.05);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        border-radius: 8px;
        background: white;
        padding: 12px;
      `
      document.body.appendChild(dragImage)
      
      const rect = target.getBoundingClientRect()
      event.dataTransfer.setDragImage(dragImage, rect.width / 2, rect.height / 2)
      
      setTimeout(() => {
        if (document.body.contains(dragImage)) {
          document.body.removeChild(dragImage)
        }
      }, 0)
    }
  }
  
  emit('dragStart', { index, item: localItems.value[index] })
}

// 拖拽结束
function handleDragEnd() {
  isDragging.value = false
  draggingIndex.value = null
  dragOverIndex.value = null
  shouldInsertBefore.value = false
  willMoveIndex.value = null
  
  if (dragOverTimer.value) {
    clearTimeout(dragOverTimer.value)
    dragOverTimer.value = null
  }
  
  emit('dragEnd', { items: localItems.value })
}

// 拖拽经过
function handleDragOver(index: number, event: DragEvent) {
  if (draggingIndex.value === null || draggingIndex.value === index) {
    return
  }
  
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
  
  // 计算插入位置（鼠标在元素的前半部分还是后半部分）
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  
  if (props.layout === 'horizontal') {
    const midpoint = rect.left + rect.width / 2
    shouldInsertBefore.value = event.clientX < midpoint
  } else {
    const midpoint = rect.top + rect.height / 2
    shouldInsertBefore.value = event.clientY < midpoint
  }
}

// 拖拽进入
function handleDragEnter(index: number, _event: DragEvent) {
  if (draggingIndex.value === null || draggingIndex.value === index) {
    return
  }
  
  dragOverIndex.value = index
  
  // 清除之前的定时器
  if (dragOverTimer.value) {
    clearTimeout(dragOverTimer.value)
  }
  
  // 延迟显示"即将移动"的效果
  dragOverTimer.value = window.setTimeout(() => {
    if (dragOverIndex.value === index && draggingIndex.value !== null) {
      // 计算哪个元素会被移动
      if (draggingIndex.value < index) {
        willMoveIndex.value = index
      } else {
        willMoveIndex.value = index
      }
    }
  }, 150)
}

// 拖拽离开
function handleDragLeave(event: DragEvent) {
  // 检查是否真的离开了元素（不是进入子元素）
  const target = event.currentTarget as HTMLElement
  const relatedTarget = event.relatedTarget as HTMLElement
  
  if (!target.contains(relatedTarget)) {
    dragOverIndex.value = null
    willMoveIndex.value = null
    
    if (dragOverTimer.value) {
      clearTimeout(dragOverTimer.value)
      dragOverTimer.value = null
    }
  }
}

// 放置
function handleDrop(targetIndex: number) {
  if (draggingIndex.value === null || draggingIndex.value === targetIndex) {
    return
  }
  
  const newItems = [...localItems.value]
  const [draggedItem] = newItems.splice(draggingIndex.value, 1)
  newItems.splice(targetIndex, 0, draggedItem)
  
  localItems.value = newItems
  dragOverIndex.value = null
  
  emit('update:modelValue', newItems)
  emit('change', {
    items: newItems,
    from: draggingIndex.value,
    to: targetIndex,
    item: draggedItem
  })
}

// 暴露方法
defineExpose({
  reset: () => {
    localItems.value = [...props.modelValue]
  }
})
</script>

<style lang="scss" scoped>
.drag-sort-container {
  display: grid;
  gap: 16px;
  position: relative;
  
  /* 网格布局 */
  &.layout-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  
  /* 垂直列表布局 */
  &.layout-vertical {
    grid-template-columns: 1fr;
  }
  
  /* 水平列表布局 */
  &.layout-horizontal {
    grid-auto-flow: column;
    grid-template-rows: 1fr;
    overflow-x: auto;
  }
}

.drag-item {
  position: relative;
  min-width: var(--item-width, auto);
  min-height: var(--item-height, auto);
  
  /* 硬件加速 */
  transform: translateZ(0);
  backface-visibility: hidden;
  
  &:hover:not(.disabled):not(.dragging-item) .drag-item-inner {
    border-color: #1a1a1a;
    background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
    box-shadow: 0 8px 24px rgba(26, 26, 26, 0.15),
                0 4px 12px rgba(26, 26, 26, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.8);
    transform: translateY(-3px) scale(1.01) translateZ(0);
  }
  
  &.dragging-item {
    .drag-item-inner {
      opacity: 0;
      pointer-events: none;
    }
    
    .drag-placeholder {
      opacity: 1;
    }
  }
  
  &.drag-over {
    .drag-item-inner {
      border-color: #1a1a1a;
      background: linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%);
      box-shadow: 0 0 0 4px rgba(26, 26, 26, 0.15),
                  0 8px 24px rgba(26, 26, 26, 0.2),
                  0 0 32px rgba(26, 26, 26, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.9);
      transform: scale(1.02) translateZ(0);
    }
  }
  
  &.drag-over-before {
    .drag-item-inner {
      animation: shake-before 0.3s ease-in-out;
    }
    
    /* 添加插入指示线 - 简洁黑色 */
    &::before {
      content: '';
      position: absolute;
      background: #1a1a1a;
      border-radius: 3px;
      z-index: 100;
      animation: fade-in 0.2s ease;
      box-shadow: 0 0 12px rgba(26, 26, 26, 0.4),
                  0 0 24px rgba(26, 26, 26, 0.2);
    }
  }
  
  &.drag-over-after {
    .drag-item-inner {
      animation: shake-after 0.3s ease-in-out;
    }
    
    /* 添加插入指示线 - 简洁黑色 */
    &::after {
      content: '';
      position: absolute;
      background: #1a1a1a;
      border-radius: 3px;
      z-index: 100;
      animation: fade-in 0.2s ease;
      box-shadow: 0 0 12px rgba(26, 26, 26, 0.4),
                  0 0 24px rgba(26, 26, 26, 0.2);
    }
  }
}

/* 垂直布局的插入指示线 */
.layout-vertical .drag-item.drag-over-before::before,
.layout-grid .drag-item.drag-over-before::before {
  top: -3px;
  left: -4px;
  right: -4px;
  height: 4px;
}

.layout-vertical .drag-item.drag-over-after::after,
.layout-grid .drag-item.drag-over-after::after {
  bottom: -3px;
  left: -4px;
  right: -4px;
  height: 4px;
}

/* 水平布局的插入指示线 */
.layout-horizontal .drag-item.drag-over-before::before {
  top: -4px;
  bottom: -4px;
  left: -3px;
  width: 4px;
}

.layout-horizontal .drag-item.drag-over-after::after {
  top: -4px;
  bottom: -4px;
  right: -3px;
  width: 4px;
}

.drag-item-inner {
  position: relative;
  background: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 14px;
  cursor: move;
  user-select: none;
  transition: all var(--animation-duration, 300ms) cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  align-items: center;
  gap: 10px;
  will-change: transform, box-shadow, opacity;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.08),
              0 1px 2px rgba(26, 26, 26, 0.06);
}

.drag-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f9fafb;
  border: 2px dashed #1a1a1a;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 1;
  box-shadow: inset 0 2px 8px rgba(26, 26, 26, 0.1);
  
  .placeholder-content {
    color: #1a1a1a;
    opacity: 0.5;
    animation: bounce 1s ease-in-out infinite;
  }
}

.drag-handle {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  cursor: grab;
  padding: 6px;
  border-radius: 8px;
  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  
  &:hover {
    color: #1a1a1a;
    background: #f3f4f6;
    border-color: #d1d5db;
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(26, 26, 26, 0.15);
  }
  
  &:active {
    cursor: grabbing;
    transform: scale(0.95);
    color: #000000;
    background: #e5e7eb;
    box-shadow: inset 0 2px 4px rgba(26, 26, 26, 0.1);
  }
  
  svg {
    display: block;
    transition: transform 0.2s ease;
  }
}

.dragging-item .drag-handle {
  cursor: grabbing;
  background: #e5e7eb;
}

.drag-content {
  flex: 1;
  min-width: 0;
  word-break: break-word;
}

/* 拖拽中的容器状态 */
.drag-sort-container.dragging {
  .drag-item:not(.dragging-item):not(.drag-over) {
    .drag-item-inner {
      opacity: 0.4;
      transform: scale(0.97) translateZ(0);
      filter: grayscale(0.5);
    }
  }
  
  /* 拖拽中给容器添加简洁的背景提示 */
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    background: radial-gradient(circle at center, 
      rgba(26, 26, 26, 0.03) 0%, 
      transparent 70%);
    border-radius: 16px;
    pointer-events: none;
    z-index: -1;
  }
}

/* 响应式 */
@media (max-width: 768px) {
  .drag-sort-container.layout-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .drag-sort-container.layout-grid {
    grid-template-columns: 1fr;
  }
}

/* 动画关键帧 */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes shake-before {
  0%, 100% {
    transform: translateX(0) translateZ(0);
  }
  25% {
    transform: translateX(-6px) translateZ(0);
  }
  75% {
    transform: translateX(-2px) translateZ(0);
  }
}

@keyframes shake-after {
  0%, 100% {
    transform: translateX(0) translateZ(0);
  }
  25% {
    transform: translateX(6px) translateZ(0);
  }
  75% {
    transform: translateX(2px) translateZ(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1) translateZ(0);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
  }
  50% {
    transform: scale(1.02) translateZ(0);
    box-shadow: 0 0 0 6px rgba(59, 130, 246, 0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: scaleX(0);
  }
  to {
    opacity: 1;
    transform: scaleX(1);
  }
}

</style>

