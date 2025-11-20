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
  font-size: var(--x-font-size, 15px);
  font-family: var(--x-font-family);
  font-weight: 400;
  letter-spacing: -0.3px;
  text-decoration: none !important;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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
  color: var(--x-color-primary, #007AFF);
}

.x-link--primary:hover {
  color: var(--x-color-primary-light, #3395FF);
}

.x-link--primary:active {
  color: var(--x-color-primary-dark, #0051D5);
}

/* 成功类型 */
.x-link--success {
  color: var(--x-color-success, #34C759);
}

.x-link--success:hover {
  opacity: 0.8;
}

.x-link--success:active {
  opacity: 0.6;
}

/* 警告类型 */
.x-link--warning {
  color: var(--x-color-warning, #FF9500);
}

.x-link--warning:hover {
  opacity: 0.8;
}

.x-link--warning:active {
  opacity: 0.6;
}

/* 危险类型 */
.x-link--danger {
  color: var(--x-color-danger, #FF3B30);
}

.x-link--danger:hover {
  opacity: 0.8;
}

.x-link--danger:active {
  opacity: 0.6;
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

