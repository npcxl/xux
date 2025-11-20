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
  border-radius: var(--x-radius-full, 12px);
  font-weight: 500;
  font-family: var(--x-font-family);
  letter-spacing: -0.2px;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  white-space: nowrap;
  
  /* 大小 */
  &.tag-small {
    padding: 2px 8px;
    font-size: var(--x-font-size-xs, 11px);
    line-height: 1.4;
  }
  
  &.tag-medium {
    padding: 4px 10px;
    font-size: var(--x-font-size-sm, 13px);
    line-height: 1.4;
  }
  
  &.tag-large {
    padding: 6px 14px;
    font-size: var(--x-font-size, 15px);
    line-height: 1.4;
  }
  
  /* 类型 - 默认 */
  &.tag-default {
    background: var(--x-fill-color, #F2F2F7);
    color: var(--x-text-color-primary, #000000);
    
    &.tag-bordered {
      border: 1px solid var(--x-border-color-dark, #C7C7CC);
      background: var(--x-bg-color, #ffffff);
    }
  }
  
  /* 类型 - 主要 */
  &.tag-primary {
    background: var(--x-fill-color-primary-lighter, rgba(0, 122, 255, 0.15));
    color: var(--x-color-primary, #007AFF);
    
    &.tag-bordered {
      border: 1px solid var(--x-color-primary, #007AFF);
      background: var(--x-bg-color, #ffffff);
    }
  }
  
  /* 类型 - 成功 */
  &.tag-success {
    background: var(--x-fill-color-success-lighter, rgba(52, 199, 89, 0.15));
    color: var(--x-color-success, #34C759);
    
    &.tag-bordered {
      border: 1px solid var(--x-color-success, #34C759);
      background: var(--x-bg-color, #ffffff);
    }
  }
  
  /* 类型 - 警告 */
  &.tag-warning {
    background: var(--x-fill-color-warning-lighter, rgba(255, 159, 10, 0.15));
    color: var(--x-color-warning, #FF9F0A);
    
    &.tag-bordered {
      border: 1px solid var(--x-color-warning, #FF9F0A);
      background: var(--x-bg-color, #ffffff);
    }
  }
  
  /* 类型 - 危险 */
  &.tag-danger {
    background: var(--x-fill-color-danger-lighter, rgba(255, 59, 48, 0.15));
    color: var(--x-color-danger, #FF3B30);
    
    &.tag-bordered {
      border: 1px solid var(--x-color-danger, #FF3B30);
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

