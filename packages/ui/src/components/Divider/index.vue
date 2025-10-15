<template>
  <div 
    class="x-divider"
    :class="[
      `divider-${direction}`,
      `divider-align-${contentPosition}`,
      { 'divider-dashed': dashed }
    ]"
    :style="dividerStyle"
  >
    <span v-if="$slots.default" class="divider-content">
      <slot></slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, CSSProperties } from 'vue'

export interface DividerProps {
  direction?: 'horizontal' | 'vertical'
  dashed?: boolean
  contentPosition?: 'left' | 'center' | 'right'
  margin?: string
}

const props = withDefaults(defineProps<DividerProps>(), {
  direction: 'horizontal',
  dashed: false,
  contentPosition: 'center',
  margin: ''
})

const dividerStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.margin) {
    if (props.direction === 'horizontal') {
      style.margin = `${props.margin} 0`
    } else {
      style.margin = `0 ${props.margin}`
    }
  }
  return style
})
</script>

<style lang="scss" scoped>
.x-divider {
  border: 0;
  
  /* 水平分割线 */
  &.divider-horizontal {
    display: flex;
    align-items: center;
    margin: 24px 0;
    color: #6b7280;
    font-size: 14px;
    white-space: nowrap;
    
    &::before,
    &::after {
      content: '';
      flex: 1;
      border-top: 1px solid #e5e7eb;
    }
    
    &.divider-dashed {
      &::before,
      &::after {
        border-top-style: dashed;
      }
    }
    
    /* 无内容时 */
    &:not(:has(.divider-content)) {
      &::before {
        flex: 0;
      }
      &::after {
        flex: 1;
      }
    }
    
    /* 内容居中 */
    &.divider-align-center {
      .divider-content {
        padding: 0 16px;
      }
    }
    
    /* 内容居左 */
    &.divider-align-left {
      &::before {
        flex: 0 0 5%;
        max-width: 60px;
      }
      
      .divider-content {
        padding: 0 16px 0 0;
      }
    }
    
    /* 内容居右 */
    &.divider-align-right {
      &::after {
        flex: 0 0 5%;
        max-width: 60px;
      }
      
      .divider-content {
        padding: 0 0 0 16px;
      }
    }
  }
  
  /* 垂直分割线 */
  &.divider-vertical {
    display: inline-block;
    height: 1em;
    margin: 0 12px;
    vertical-align: middle;
    border-left: 1px solid #e5e7eb;
    
    &.divider-dashed {
      border-left-style: dashed;
    }
  }
}

.divider-content {
  display: inline-block;
}
</style>

