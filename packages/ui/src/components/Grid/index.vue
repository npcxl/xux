<template>
  <div class="x-grid" :style="gridStyle">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="x-grid-item"
      :style="itemStyle"
    >
      <slot name="item" :item="item" :index="index">
        {{ item }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
export interface GridProps {
  /** 列数 */
  cols?: number
  /** 行数（可选，自动计算） */
  rows?: number
  /** 间距 */
  gap?: string
  /** 列宽（如 '1fr', '200px', 'auto' 等） */
  colWidth?: string
  /** 行高（如 '1fr', '100px', 'auto' 等） */
  rowHeight?: string
  /** 数据源 */
  items?: any[]
  /** 最小列宽（响应式，如 '200px'） */
  minColWidth?: string
  /** 对齐方式 */
  justifyItems?: 'start' | 'end' | 'center' | 'stretch'
  /** 垂直对齐 */
  alignItems?: 'start' | 'end' | 'center' | 'stretch'
  /** 容器宽度 */
  width?: string
  /** 容器高度 */
  height?: string
}

const props = withDefaults(defineProps<GridProps>(), {
  cols: 3,
  gap: '16px',
  colWidth: '1fr',
  rowHeight: 'auto',
  items: () => [],
  justifyItems: 'stretch',
  alignItems: 'stretch',
  width: '100%',
  height: 'auto'
})

const gridStyle = computed(() => {
  const style: Record<string, any> = {
    gap: props.gap,
    justifyItems: props.justifyItems,
    alignItems: props.alignItems,
    width: props.width,
    height: props.height
  }

  // 响应式网格：使用 minmax
  if (props.minColWidth) {
    style.gridTemplateColumns = `repeat(auto-fit, minmax(${props.minColWidth}, 1fr))`
  } else {
    style.gridTemplateColumns = `repeat(${props.cols}, ${props.colWidth})`
  }

  // 行高设置
  if (props.rows) {
    style.gridTemplateRows = `repeat(${props.rows}, ${props.rowHeight})`
  }

  return style
})

const itemStyle = computed(() => {
  return {}
})
</script>

<style lang="scss" scoped>
.x-grid {
  display: grid;
}

.x-grid-item {
  box-sizing: border-box;
}
</style>

