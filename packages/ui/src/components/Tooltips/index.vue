<template>
  <ElPopover
    :placement="placement"
    trigger="hover"
    :teleported="true"
    :show-arrow="showArrow"
    :offset="offset"
    popper-class="x-tooltip-popper"
    :popper-style="{ padding: '8px 12px' }"
  >
    <template #reference>
      <div class="x-tooltip-trigger">
        <slot></slot>
      </div>
    </template>
    <template #default>
      <div class="x-tooltip-content">{{ content }}</div>
    </template>
  </ElPopover>
</template>

<script setup lang="ts">
import { ElPopover } from 'element-plus'

/**
 * Tooltips 提示框组件
 * @displayName XTooltips
 */

export interface TooltipsProps {
  /** Tooltip 显示的内容 */
  content: string
  /** Tooltip 显示的位置 */
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
  /** 是否显示箭头 */
  showArrow?: boolean
  /** 偏移距离 */
  offset?: number
}

withDefaults(defineProps<TooltipsProps>(), {
  placement: 'top',
  showArrow: true,
  offset: 8
})
</script>

<style scoped>
.x-tooltip-trigger {
  display: inline-block;
  cursor: pointer;
}

.x-tooltip-content {
  font-size: 14px;
  line-height: 1.5;
  color: var(--x-text-color-white, #ffffff);
  white-space: nowrap;
}
</style>

<style>
/* 全局样式，用于 ElPopover 的 popper */
.x-tooltip-popper {
  background-color: var(--x-color-primary, #1a1a1a) !important;
  color: var(--x-text-color-white, #ffffff) !important;
  border-radius: 6px !important;
  box-shadow: var(--x-shadow-md, 0 4px 12px rgba(0, 0, 0, 0.15)) !important;
  font-size: 14px !important;
  padding: 8px 12px !important;
  max-width: 300px;
  word-wrap: break-word;
  white-space: normal;
}

/* 暗色模式支持 */
.dark .x-tooltip-popper {
  background-color: var(--x-color-primary, #1a1a1a) !important;
  color: var(--x-text-color-white, #ffffff) !important;
}

/* 箭头颜色 */
.x-tooltip-popper .el-popper__arrow::before {
  background-color: var(--x-color-primary, #1a1a1a) !important;
  border-color: var(--x-color-primary, #1a1a1a) !important;
}
</style>