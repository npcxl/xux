<template>
  <div 
    v-if="loading"
    class="bg-gray-200"
    :class="[
      widthClass,
      heightClass,
      shapeClass,
      customClass,
      { 'animate-pulse': animated }
    ]"
    :style="customStyle"
  ></div>
  <slot v-else></slot>
</template>
  
  <script setup lang="ts">
import { computed, withDefaults } from 'vue'

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
  
  const widthClass = computed(() => {
    if (typeof props.width === 'string') {
      if (props.width.includes('%') || props.width.includes('px') || props.width.includes('rem')) {
        return ''
      }
      return `w-${props.width}`
    }
    return ''
  })
  
  const heightClass = computed(() => {
    if (typeof props.height === 'string') {
      if (props.height.includes('%') || props.height.includes('px') || props.height.includes('rem')) {
        return ''
      }
      return `h-${props.height}`
    }
    return ''
  })
  
  const shapeClass = computed(() => {
    switch (props.shape) {
      case 'circle':
        return 'rounded-full'
      case 'rounded':
        return 'rounded-lg'
      default:
        return 'rounded'
    }
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
  
  <style scoped>
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  </style> 