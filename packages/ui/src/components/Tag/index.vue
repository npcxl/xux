<template>
  <span 
    class="x-tag"
    :class="[
      `tag-${type}`,
      `tag-${size}`,
      { 'tag-closable': closable },
      { 'tag-bordered': bordered }
    ]"
  >
    <slot></slot>
    <svg 
      v-if="closable"
      class="tag-close"
      viewBox="0 0 24 24" 
      width="14" 
      height="14"
      @click="handleClose"
    >
      <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  </span>
</template>

<script setup lang="ts">
export interface TagProps {
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'small' | 'medium' | 'large'
  closable?: boolean
  bordered?: boolean
}

const props = withDefaults(defineProps<TagProps>(), {
  type: 'default',
  size: 'medium',
  closable: false,
  bordered: false
})

const emit = defineEmits(['close'])

function handleClose(e: MouseEvent) {
  e.stopPropagation()
  emit('close')
}
</script>

<style lang="scss" scoped>
.x-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  white-space: nowrap;
  
  /* 大小 */
  &.tag-small {
    padding: 2px 8px;
    font-size: 12px;
    line-height: 1.5;
  }
  
  &.tag-medium {
    padding: 4px 12px;
    font-size: 14px;
    line-height: 1.5;
  }
  
  &.tag-large {
    padding: 6px 16px;
    font-size: 16px;
    line-height: 1.5;
  }
  
  /* 类型 - 默认 */
  &.tag-default {
    background: #f3f4f6;
    color: #1a1a1a;
    
    &.tag-bordered {
      border: 1px solid #d1d5db;
      background: #ffffff;
    }
  }
  
  /* 类型 - 主要 */
  &.tag-primary {
    background: #eff6ff;
    color: #1e40af;
    
    &.tag-bordered {
      border: 1px solid #93c5fd;
      background: #ffffff;
    }
  }
  
  /* 类型 - 成功 */
  &.tag-success {
    background: #f0fdf4;
    color: #15803d;
    
    &.tag-bordered {
      border: 1px solid #86efac;
      background: #ffffff;
    }
  }
  
  /* 类型 - 警告 */
  &.tag-warning {
    background: #fef3c7;
    color: #92400e;
    
    &.tag-bordered {
      border: 1px solid #fcd34d;
      background: #ffffff;
    }
  }
  
  /* 类型 - 危险 */
  &.tag-danger {
    background: #fee2e2;
    color: #991b1b;
    
    &.tag-bordered {
      border: 1px solid #fca5a5;
      background: #ffffff;
    }
  }
  
  /* 关闭按钮 */
  .tag-close {
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.2s ease;
    flex-shrink: 0;
    
    &:hover {
      opacity: 1;
    }
  }
}
</style>

