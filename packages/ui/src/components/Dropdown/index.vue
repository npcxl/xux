<template>
  <div 
    ref="dropdownRef" 
    class="x-dropdown"
    :class="{ 'x-dropdown--disabled': disabled }"
    @mouseenter="trigger === 'hover' && handleOpen()"
    @mouseleave="trigger === 'hover' && handleClose()"
  >
    <!-- 触发器插槽 -->
    <div 
      class="x-dropdown__trigger"
      @click="trigger === 'click' && handleToggle()"
    >
      <slot></slot>
    </div>

    <!-- 下拉内容 -->
    <Transition name="x-dropdown-fade">
      <div
        v-if="isVisible"
        ref="dropdownMenuRef"
        class="x-dropdown__menu"
        :class="[
          `x-dropdown__menu--${placement}`,
          { 'x-dropdown__menu--shadow': showShadow }
        ]"
        :style="menuStyle"
        @click="closeOnClick && handleClose()"
      >
        <slot name="dropdown"></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, type CSSProperties } from 'vue'

export interface DropdownProps {
  /** 触发方式 */
  trigger?: 'hover' | 'click'
  /** 下拉菜单位置 */
  placement?: 'bottom-start' | 'bottom-end' | 'bottom-center' | 'top-start' | 'top-end' | 'top-center' | 'left' | 'right'
  /** 自定义宽度 */
  width?: string | number
  /** 最小宽度 */
  minWidth?: string | number
  /** 最大宽度 */
  maxWidth?: string | number
  /** 自定义高度 */
  height?: string | number
  /** 最大高度 */
  maxHeight?: string | number
  /** 是否禁用 */
  disabled?: boolean
  /** 是否显示阴影 */
  showShadow?: boolean
  /** 点击内容后是否自动关闭 */
  closeOnClick?: boolean
  /** 下拉菜单偏移距离 */
  offset?: number
}

const props = withDefaults(defineProps<DropdownProps>(), {
  trigger: 'hover',
  placement: 'bottom-start',
  showShadow: true,
  closeOnClick: false,
  offset: 8,
  disabled: false
})

const emit = defineEmits<{
  open: []
  close: []
  toggle: [visible: boolean]
}>()

const dropdownRef = ref<HTMLElement>()
const dropdownMenuRef = ref<HTMLElement>()
const isVisible = ref(false)

// 计算菜单样式
const menuStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    '--dropdown-offset': `${props.offset}px`
  }
  
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  if (props.minWidth) {
    style.minWidth = typeof props.minWidth === 'number' ? `${props.minWidth}px` : props.minWidth
  }
  if (props.maxWidth) {
    style.maxWidth = typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth
  }
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  if (props.maxHeight) {
    style.maxHeight = typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
  }
  
  return style
})

// 打开下拉菜单
const handleOpen = () => {
  if (props.disabled) return
  isVisible.value = true
  emit('open')
  emit('toggle', true)
}

// 关闭下拉菜单
const handleClose = () => {
  isVisible.value = false
  emit('close')
  emit('toggle', false)
}

// 切换下拉菜单
const handleToggle = () => {
  if (props.disabled) return
  isVisible.value ? handleClose() : handleOpen()
}

// 点击外部关闭
const handleClickOutside = (event: MouseEvent) => {
  if (!dropdownRef.value || props.trigger !== 'click') return
  
  const target = event.target as Node
  if (!dropdownRef.value.contains(target)) {
    handleClose()
  }
}

// 暴露方法
defineExpose({
  open: handleOpen,
  close: handleClose,
  toggle: handleToggle,
  isVisible
})

onMounted(() => {
  if (props.trigger === 'click') {
    document.addEventListener('click', handleClickOutside)
  }
})

onBeforeUnmount(() => {
  if (props.trigger === 'click') {
    document.removeEventListener('click', handleClickOutside)
  }
})
</script>

<style scoped>
.x-dropdown {
  position: relative;
  display: inline-block;
}

.x-dropdown--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.x-dropdown__trigger {
  cursor: pointer;
  user-select: none;
}

.x-dropdown--disabled .x-dropdown__trigger {
  cursor: not-allowed;
}

.x-dropdown__menu {
  position: absolute;
  z-index: 1000;
  background: var(--dropdown-bg, #ffffff);
  border: 1px solid var(--dropdown-border, #e5e7eb);
  border-radius: 8px;
  overflow: auto;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.x-dropdown__menu--shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* 位置定位 */
.x-dropdown__menu--bottom-start,
.x-dropdown__menu--bottom-center,
.x-dropdown__menu--bottom-end {
  top: calc(100% + var(--dropdown-offset, 8px));
}

.x-dropdown__menu--top-start,
.x-dropdown__menu--top-center,
.x-dropdown__menu--top-end {
  bottom: calc(100% + var(--dropdown-offset, 8px));
}

.x-dropdown__menu--bottom-start,
.x-dropdown__menu--top-start {
  left: 0;
}

.x-dropdown__menu--bottom-end,
.x-dropdown__menu--top-end {
  right: 0;
}

.x-dropdown__menu--bottom-center,
.x-dropdown__menu--top-center {
  left: 50%;
  transform: translateX(-50%);
}

.x-dropdown__menu--left {
  right: calc(100% + var(--dropdown-offset, 8px));
  top: 0;
}

.x-dropdown__menu--right {
  left: calc(100% + var(--dropdown-offset, 8px));
  top: 0;
}

/* 过渡动画 */
.x-dropdown-fade-enter-active,
.x-dropdown-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.x-dropdown-fade-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.x-dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* 从上方出现的动画 */
.x-dropdown__menu--top-start.x-dropdown-fade-enter-from,
.x-dropdown__menu--top-center.x-dropdown-fade-enter-from,
.x-dropdown__menu--top-end.x-dropdown-fade-enter-from {
  transform: translateY(8px);
}

.x-dropdown__menu--top-start.x-dropdown-fade-leave-to,
.x-dropdown__menu--top-center.x-dropdown-fade-leave-to,
.x-dropdown__menu--top-end.x-dropdown-fade-leave-to {
  transform: translateY(8px);
}

/* 从左侧出现的动画 */
.x-dropdown__menu--left.x-dropdown-fade-enter-from,
.x-dropdown__menu--left.x-dropdown-fade-leave-to {
  transform: translateX(8px);
}

/* 从右侧出现的动画 */
.x-dropdown__menu--right.x-dropdown-fade-enter-from,
.x-dropdown__menu--right.x-dropdown-fade-leave-to {
  transform: translateX(-8px);
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
  .x-dropdown__menu {
    --dropdown-bg: #1f2937;
    --dropdown-border: #374151;
  }
}

/* 滚动条样式 */
.x-dropdown__menu::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.x-dropdown__menu::-webkit-scrollbar-track {
  background: transparent;
}

.x-dropdown__menu::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.x-dropdown__menu::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

@media (prefers-color-scheme: dark) {
  .x-dropdown__menu::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
  }
  
  .x-dropdown__menu::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .x-dropdown__menu {
    max-width: calc(100vw - 32px);
  }
}
</style>

