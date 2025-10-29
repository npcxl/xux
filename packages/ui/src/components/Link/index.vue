<template>
  <component
    :is="tag"
    :class="[
      'x-link',
      `x-link--${type}`,
      {
        'x-link--underline': underline,
        'x-link--disabled': disabled,
        'x-link--icon': icon
      }
    ]"
    :href="disabled ? undefined : href"
    :to="disabled ? undefined : to"
    :target="target"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    @click="handleClick"
  >
    <Icon v-if="icon" :icon="icon" class="x-link__icon" />
    <span class="x-link__content">
      <slot></slot>
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

/**
 * Link 链接组件
 * @displayName XLink
 */

export interface LinkProps {
  href?: string
  to?: string | object
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  underline?: boolean
  disabled?: boolean
  icon?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
}

const props = withDefaults(defineProps<LinkProps>(), {
  type: 'default',
  underline: true,
  disabled: false,
  target: '_self'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// 判断使用什么标签
const tag = computed(() => {
  if (props.to) return 'router-link'
  return 'a'
})

const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  emit('click', event)
}

defineExpose({
  // 暴露元素引用等
})
</script>

<style scoped>
.x-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: var(--x-font-size-base, 14px);
  font-weight: 500;
  text-decoration: none !important;
  cursor: pointer;
  transition: all var(--x-transition-base, 0.3s ease);
  outline: none;
  padding: 2px 0;
}

.x-link:focus-visible {
  outline: 2px solid var(--x-color-primary, #1a1a1a);
  outline-offset: 2px;
  border-radius: var(--x-radius-sm, 4px);
}

/* 默认类型 */
.x-link--default {
  color: var(--x-text-color-regular, #374151);
}

.x-link--default:hover {
  color: var(--x-color-primary, #1a1a1a);
}

.x-link--default:active {
  color: var(--x-color-primary-dark, #0d0d0d);
}

/* 主要类型 */
.x-link--primary {
  color: var(--x-color-primary, #1a1a1a);
}

.x-link--primary:hover {
  color: var(--x-color-primary-light, #3a3a3a);
}

.x-link--primary:active {
  color: var(--x-color-primary-dark, #0d0d0d);
}

/* 成功类型 */
.x-link--success {
  color: var(--x-color-success, #10b981);
}

.x-link--success:hover {
  color: var(--x-color-success-light, #34d399);
}

.x-link--success:active {
  color: var(--x-color-success-dark, #059669);
}

/* 警告类型 */
.x-link--warning {
  color: var(--x-color-warning, #f59e0b);
}

.x-link--warning:hover {
  color: var(--x-color-warning-light, #fbbf24);
}

.x-link--warning:active {
  color: var(--x-color-warning-dark, #d97706);
}

/* 危险类型 */
.x-link--danger {
  color: var(--x-color-danger, #ef4444);
}

.x-link--danger:hover {
  color: var(--x-color-danger-light, #f87171);
}

.x-link--danger:active {
  color: var(--x-color-danger-dark, #dc2626);
}

/* 信息类型 */
.x-link--info {
  color: var(--x-color-secondary, #4a90e2);
}

.x-link--info:hover {
  color: var(--x-color-secondary-light, #6ba8ed);
}

.x-link--info:active {
  color: var(--x-color-secondary-dark, #3a7bc8);
}

/* 下划线 */
.x-link--underline::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--x-transition-base, 0.3s ease);
  opacity: 0.3;
}

.x-link--underline:hover::after {
  transform: scaleX(1);
}

/* 禁用状态 */
.x-link--disabled {
  color: var(--x-text-color-disabled, #d1d5db);
  cursor: not-allowed;
  opacity: 0.6;
}

.x-link--disabled:hover::after {
  transform: scaleX(0);
}

/* 图标 */
.x-link__icon {
  font-size: 1.2em;
  transition: transform var(--x-transition-base, 0.3s ease);
}

.x-link:hover .x-link__icon {
  transform: translateX(2px);
}

.x-link--disabled:hover .x-link__icon {
  transform: none;
}

.x-link__content {
  display: inline-flex;
  align-items: center;
}

/* 响应式 */
@media (max-width: 768px) {
  .x-link {
    font-size: var(--x-font-size-sm, 13px);
  }
}
</style>

