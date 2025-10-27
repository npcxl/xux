<template>
  <span 
    class="x-tag"
    :class="[
      `tag-${type}`,
      `tag-${size}`,
      { 'tag-closable': closable },
      { 'tag-bordered': bordered }
    ]"
    :style="{ cursor }"
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
  cursor?: string
}

withDefaults(defineProps<TagProps>(), {
  type: 'default',
  size: 'medium',
  closable: false,
  bordered: false,
  cursor: 'pointer'
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
  border-radius: var(--x-radius, 6px);
  font-weight: 500;
  transition: all var(--x-transition-fast, 0.2s cubic-bezier(0.4, 0, 0.2, 1));
  white-space: nowrap;
  
  /* 大小 */
  &.tag-small {
    padding: 2px 8px;
    font-size: var(--x-font-size-xs, 12px);
    line-height: 1.5;
  }
  
  &.tag-medium {
    padding: 4px 12px;
    font-size: var(--x-font-size-sm, 14px);
    line-height: 1.5;
  }
  
  &.tag-large {
    padding: 6px 16px;
    font-size: var(--x-font-size, 16px);
    line-height: 1.5;
  }
  
  /* 类型 - 默认 */
  &.tag-default {
    background: var(--x-fill-color, #f3f4f6);
    color: var(--x-text-color-primary, #1a1a1a);
    
    &.tag-bordered {
      border: 1px solid var(--x-border-color-dark, #d1d5db);
      background: var(--x-bg-color, #ffffff);
    }
  }
  
  /* 类型 - 主要 */
  &.tag-primary {
    background: var(--x-fill-color-primary-light, #eff6ff);
    color: var(--x-color-primary-darker, #1e40af);
    
    &.tag-bordered {
      border: 1px solid var(--x-color-primary-light, #93c5fd);
      background: var(--x-bg-color, #ffffff);
    }
  }
  
  /* 类型 - 成功 */
  &.tag-success {
    background: var(--x-fill-color-success-lighter, #f0fdf4);
    color: var(--x-color-success-darker, #15803d);
    
    &.tag-bordered {
      border: 1px solid var(--x-color-success-light, #86efac);
      background: var(--x-bg-color, #ffffff);
    }
  }
  
  /* 类型 - 警告 */
  &.tag-warning {
    background: var(--x-fill-color-warning-lighter, #fef3c7);
    color: var(--x-color-warning-darker, #92400e);
    
    &.tag-bordered {
      border: 1px solid var(--x-color-warning-light, #fcd34d);
      background: var(--x-bg-color, #ffffff);
    }
  }
  
  /* 类型 - 危险 */
  &.tag-danger {
    background: var(--x-fill-color-danger-lighter, #fee2e2);
    color: var(--x-color-danger-darker, #991b1b);
    
    &.tag-bordered {
      border: 1px solid var(--x-color-danger-light, #fca5a5);
      background: var(--x-bg-color, #ffffff);
    }
  }
  
  /* 关闭按钮 */
  .tag-close {
    cursor: pointer;
    opacity: 0.6;
    transition: opacity var(--x-transition-fast, 0.2s ease);
    flex-shrink: 0;
    
    &:hover {
      opacity: 1;
    }
  }
}
</style>

