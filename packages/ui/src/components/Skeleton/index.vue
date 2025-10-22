<template>
  <div 
    v-if="loading"
    :class="[
      'x-skeleton',
      `shape-${shape}`,
      { 'is-animated': animated },
      customClass
    ]"
    :style="customStyle"
  ></div>
  <slot v-else></slot>
</template>
  
<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import './index.css'

/**
 * Skeleton 骨架屏组件
 * @displayName XSkeleton
 */

export interface SkeletonProps {
  width?: string | number
  height?: string | number
  shape?: 'rectangle' | 'circle' | 'rounded'
  animated?: boolean
  loading?: boolean
  class?: string
  style?: Record<string, any>
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  width: '100%',
  height: '1rem',
  shape: 'rectangle',
  animated: true,
  loading: true,
  class: '',
  style: () => ({})
})
  
const customClass = computed(() => props.class)
  
const customStyle = computed(() => {
  const style: Record<string, any> = { ...props.style }
  
  if (typeof props.width === 'string' && (props.width.includes('%') || props.width.includes('px') || props.width.includes('rem'))) {
    style.width = props.width
  } else if (typeof props.width === 'number') {
    style.width = `${props.width}px`
  }
  
  if (typeof props.height === 'string' && (props.height.includes('%') || props.height.includes('px') || props.height.includes('rem'))) {
    style.height = props.height
  } else if (typeof props.height === 'number') {
    style.height = `${props.height}px`
  }
  
  return style
})
</script> 