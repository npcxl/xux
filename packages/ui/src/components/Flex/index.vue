<template>
  <component
    :is="tag"
    :class="[
      inline ? 'x-flex-inline' : 'x-flex',
      vertical && 'x-flex-vertical'
    ]"
    :style="flexStyle"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface FlexProps {
  /** 是否为 inline-flex */
  inline?: boolean
  /** 是否垂直布局 */
  vertical?: boolean
  /** 主轴对齐方式 */
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  /** 交叉轴对齐方式 */
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline'
  /** 是否换行 */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  /** 间距 */
  gap?: string | number
  /** 行间距（wrap 时生效） */
  rowGap?: string | number
  /** 列间距 */
  columnGap?: string | number
  /** flex 属性（子元素） */
  flex?: string | number
  /** 自定义渲染标签 */
  tag?: string
}

const props = withDefaults(defineProps<FlexProps>(), {
  inline: false,
  vertical: false,
  justify: 'start',
  align: 'start',
  wrap: 'nowrap',
  tag: 'div'
})

// 将简写的对齐值转换为完整的 flex 值
const getJustifyValue = (value: string) => {
  const map: Record<string, string> = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    'space-between': 'space-between',
    'space-around': 'space-around',
    'space-evenly': 'space-evenly'
  }
  return map[value] || value
}

const getAlignValue = (value: string) => {
  const map: Record<string, string> = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    stretch: 'stretch',
    baseline: 'baseline'
  }
  return map[value] || value
}

// 处理间距值：如果是纯数字字符串或数字，添加 px 单位
const formatGapValue = (value: string | number | undefined): string | undefined => {
  if (value === undefined) return undefined
  
  // 如果是数字，直接添加 px
  if (typeof value === 'number') {
    return `${value}px`
  }
  
  // 如果是字符串
  if (typeof value === 'string') {
    // 如果已经有单位（px, rem, em, %, vh, vw 等），直接返回
    if (/^[\d.]+[a-z%]+$/i.test(value)) {
      return value
    }
    // 如果是纯数字字符串，添加 px
    if (/^\d+$/.test(value)) {
      return `${value}px`
    }
    // 其他情况直接返回
    return value
  }
  
  return undefined
}

const flexStyle = computed(() => {
  const styles: Record<string, string> = {
    justifyContent: getJustifyValue(props.justify),
    alignItems: getAlignValue(props.align),
    flexWrap: props.wrap
  }

  // 处理 gap
  const gapValue = formatGapValue(props.gap)
  if (gapValue) {
    styles.gap = gapValue
  }

  // 处理 rowGap 和 columnGap
  const rowGapValue = formatGapValue(props.rowGap)
  if (rowGapValue) {
    styles.rowGap = rowGapValue
  }

  const columnGapValue = formatGapValue(props.columnGap)
  if (columnGapValue) {
    styles.columnGap = columnGapValue
  }

  // 处理 flex
  if (props.flex !== undefined) {
    styles.flex = typeof props.flex === 'number' ? String(props.flex) : props.flex
  }

  return styles
})
</script>

<style>
.x-flex {
  display: flex !important;
  box-sizing: border-box;
}

.x-flex-inline {
  display: inline-flex !important;
  box-sizing: border-box;
}

.x-flex-vertical {
  flex-direction: column !important;
}
</style>

