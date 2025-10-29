<template>
  <ElDropdown
    ref="dropdownRef"
    :trigger="trigger"
    :disabled="disabled"
    :placement="normalizedPlacement"
    :popper-class="popperClass"
    :popper-options="{ modifiers: [{ name: 'offset', options: { offset: [0, offset] } }] }"
    :hide-on-click="closeOnClick"
    :teleported="true"
    @visible-change="handleVisibleChange"
  >
    <span class="x-dropdown-reference">
      <slot></slot>
    </span>
    <template #dropdown>
      <div 
        class="x-dropdown-content"
        :style="contentStyle"
      >
        <slot name="dropdown"></slot>
      </div>
    </template>
  </ElDropdown>
</template>

<script setup lang="ts">
import { ref, computed, type CSSProperties, nextTick } from 'vue'
import { ElDropdown } from 'element-plus'

export interface DropdownProps {
  /** 触发方式 */
  trigger?: 'hover' | 'click'
  /** 下拉菜单位置 */
  placement?: 'bottom-start' | 'bottom-end' | 'bottom-center' | 'top-start' | 'top-end' | 'top-center' | 'left' | 'right' | 'bottom' | 'top'
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

const dropdownRef = ref()
const isVisible = ref(false)

// 转换 placement
const normalizedPlacement = computed(() => {
  const map: Record<string, any> = {
    'bottom-center': 'bottom',
    'top-center': 'top',
  }
  return map[props.placement] || props.placement
})

// 计算 popper class
const popperClass = computed(() => {
  let classes = 'x-dropdown-popper'
  if (props.minWidth || props.maxWidth) {
    // 通过类名应用样式
  }
  return classes
})

// 计算内容样式（用于宽度、高度）
const contentStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  
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
    style.overflowY = 'auto'
  }
  
  return style
})

// 可见性变化
function handleVisibleChange(visible: boolean) {
  isVisible.value = visible
  emit('toggle', visible)
  if (visible) {
    emit('open')
  } else {
    emit('close')
  }
}

// 打开下拉菜单
async function openDropdown() {
  if (dropdownRef.value && dropdownRef.value.handleOpen) {
    await nextTick()
    dropdownRef.value.handleOpen()
  }
}

// 关闭下拉菜单
async function closeDropdown() {
  if (dropdownRef.value && dropdownRef.value.handleClose) {
    await nextTick()
    dropdownRef.value.handleClose()
  }
}

// 切换下拉菜单
async function toggleDropdown() {
  if (isVisible.value) {
    await closeDropdown()
  } else {
    await openDropdown()
  }
}

// 暴露方法
defineExpose({
  isVisible,
  open: openDropdown,
  close: closeDropdown,
  toggle: toggleDropdown
})
</script>

<style>
/* 全局样式 - 自定义 Element Plus Dropdown */
.x-dropdown-popper.el-popper {
  padding: 0 !important;
  background: var(--x-bg-color, #ffffff) !important;
  border: 1px solid var(--x-border-color, #e5e7eb) !important;
  border-radius: var(--x-radius-md, 8px) !important;
  box-shadow: var(--x-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
               var(--x-shadow-sm, 0 2px 4px -1px rgba(0, 0, 0, 0.06))) !important;
}

.x-dropdown-popper .el-dropdown-menu {
  padding: 0 !important;
  border: none !important;
  box-shadow: none !important;
}

.x-dropdown-popper .el-popper__arrow {
  display: none !important;
}

/* 暗色模式 */
.dark .x-dropdown-popper.el-popper {
  background: var(--x-bg-color-dark, #1a1a1a) !important;
  border: 1px solid var(--x-border-color-dark, #333) !important;
  box-shadow: var(--x-shadow-lg, 0 6px 16px rgba(0, 0, 0, 0.32)) !important;
}
</style>

<style scoped>
/* 组件内部样式 */
.x-dropdown-reference {
  display: inline-block;
  cursor: pointer;
}
</style>

