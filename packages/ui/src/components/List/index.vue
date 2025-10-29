<template>
  <div 
    class="x-list" 
    :class="[
      `x-list--${size}`,
      `x-list--${variant}`,
      { 'x-list--bordered': bordered },
      { 'x-list--hoverable': hoverable },
      { 'x-list--split': split }
    ]"
  >
    <!-- 头部 -->
    <div v-if="$slots.header || title" class="x-list-header">
      <slot name="header">
        <div class="x-list-header-content">
          <h3 v-if="title" class="x-list-title">{{ title }}</h3>
          <div v-if="extra" class="x-list-extra">{{ extra }}</div>
          <slot name="extra"></slot>
        </div>
      </slot>
    </div>

    <!-- 列表内容 -->
    <div 
      class="x-list-content" 
      :style="{ maxHeight: maxHeight ? `${maxHeight}px` : undefined }"
    >
      <!-- 加载状态 -->
      <div v-if="loading" class="x-list-loading">
        <div class="x-list-loading-spinner">
          <div class="loading-dot"></div>
          <div class="loading-dot"></div>
          <div class="loading-dot"></div>
        </div>
        <div v-if="loadingText" class="x-list-loading-text">{{ loadingText }}</div>
      </div>

      <!-- 空状态 -->
      <div v-else-if="!items || items.length === 0" class="x-list-empty">
        <slot name="empty">
          <div class="x-list-empty-icon">
            <svg viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                <ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse>
                <g fill-rule="nonzero" stroke="#d9d9d9">
                  <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                  <path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path>
                </g>
              </g>
            </svg>
          </div>
          <div class="x-list-empty-text">{{ emptyText }}</div>
        </slot>
      </div>

      <!-- 列表项 -->
      <div v-else class="x-list-items">
        <div
          v-for="(item, index) in items"
          :key="getItemKey(item, index)"
          class="x-list-item"
          :class="{
            'x-list-item--clickable': clickable,
            'x-list-item--selected': isSelected(item, index),
            'x-list-item--disabled': item.disabled
          }"
          @click="handleItemClick(item, index)"
        >
          <!-- 选择框 -->
          <div v-if="selectable" class="x-list-item-checkbox" @click.stop>
            <input
              type="checkbox"
              :checked="isSelected(item, index)"
              @change="toggleSelect(item, index)"
              :disabled="item.disabled"
            />
          </div>

          <!-- 前缀：图片/头像/图标 -->
          <div v-if="$slots.prefix || item.image || item.avatar || item.icon" class="x-list-item-prefix">
            <slot name="prefix" :item="item" :index="index">
              <!-- 图片 -->
              <img 
                v-if="item.image" 
                :src="item.image" 
                :alt="item.title"
                class="x-list-item-image"
              />
              <!-- 头像 -->
              <img 
                v-else-if="item.avatar" 
                :src="item.avatar" 
                :alt="item.title"
                class="x-list-item-avatar"
              />
              <!-- 图标 -->
              <Icon v-else-if="item.icon" :icon="item.icon" />
            </slot>
          </div>

          <!-- 主内容 -->
          <div class="x-list-item-content">
            <slot :item="item" :index="index">
              <div class="x-list-item-main">
                <div class="x-list-item-header">
                  <div v-if="item.title" class="x-list-item-title">
                    {{ item.title }}
                    <!-- 标签 -->
                    <span v-if="item.tag" class="x-list-item-tag" :class="`tag-${item.tagType || 'default'}`">
                      {{ item.tag }}
                    </span>
                  </div>
                  <!-- 右上角额外信息 -->
                  <div v-if="item.meta" class="x-list-item-meta">{{ item.meta }}</div>
                </div>
                <div v-if="item.subtitle" class="x-list-item-subtitle">{{ item.subtitle }}</div>
                <div v-if="item.description" class="x-list-item-description">{{ item.description }}</div>
              </div>
            </slot>
          </div>

          <!-- 后缀：额外内容 -->
          <div v-if="$slots.suffix || item.extra || item.price" class="x-list-item-suffix">
            <slot name="suffix" :item="item" :index="index">
              <div v-if="item.price" class="x-list-item-price">{{ item.price }}</div>
              <span v-else-if="item.extra">{{ item.extra }}</span>
            </slot>
          </div>

          <!-- 操作按钮 -->
          <div v-if="$slots.actions || item.actions" class="x-list-item-actions">
            <slot name="actions" :item="item" :index="index">
              <template v-if="item.actions">
                <button
                  v-for="(action, actionIndex) in item.actions"
                  :key="actionIndex"
                  class="x-list-action-btn"
                  :class="`action-${action.type || 'default'}`"
                  @click.stop="handleActionClick(action, item, index)"
                >
                  <Icon v-if="action.icon" :icon="action.icon" />
                  <span v-if="action.label">{{ action.label }}</span>
                </button>
              </template>
            </slot>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <div v-if="$slots.footer" class="x-list-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

export interface ListAction {
  label?: string
  icon?: string
  type?: 'default' | 'primary' | 'danger'
  onClick?: (item: ListItem) => void
}

export interface ListItem {
  [key: string]: any
  title?: string
  subtitle?: string
  description?: string
  icon?: string
  image?: string
  avatar?: string
  extra?: string
  price?: string
  tag?: string
  tagType?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  meta?: string
  actions?: ListAction[]
  disabled?: boolean
}

export interface ListProps {
  /** 列表数据 */
  items?: ListItem[]
  /** 列表标题 */
  title?: string
  /** 列表额外内容 */
  extra?: string
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large'
  /** 变体 */
  variant?: 'default' | 'card' | 'timeline'
  /** 是否显示边框 */
  bordered?: boolean
  /** 是否显示分割线 */
  split?: boolean
  /** 是否可悬停 */
  hoverable?: boolean
  /** 是否可点击 */
  clickable?: boolean
  /** 是否可选择 */
  selectable?: boolean
  /** 最大高度（超出滚动） */
  maxHeight?: number
  /** 是否加载中 */
  loading?: boolean
  /** 加载文本 */
  loadingText?: string
  /** 空状态文本 */
  emptyText?: string
  /** 已选中的项 */
  selectedKeys?: (string | number)[]
  /** 项的唯一标识字段 */
  itemKey?: string
}

const props = withDefaults(defineProps<ListProps>(), {
  items: () => [],
  size: 'medium',
  variant: 'default',
  bordered: false,
  split: true,
  hoverable: true,
  clickable: false,
  selectable: false,
  loading: false,
  loadingText: '加载中...',
  emptyText: '暂无数据',
  selectedKeys: () => [],
  itemKey: 'id'
})

const emit = defineEmits<{
  'item-click': [item: ListItem, index: number]
  'update:selectedKeys': [keys: (string | number)[]]
  'selection-change': [selectedItems: ListItem[], selectedKeys: (string | number)[]]
  'action-click': [action: ListAction, item: ListItem, index: number]
}>()

const selectedKeysInternal = ref<(string | number)[]>([...props.selectedKeys])

// 获取项的 key
const getItemKey = (item: ListItem, index: number): string | number => {
  return item[props.itemKey] ?? index
}

// 判断是否选中
const isSelected = (item: ListItem, index: number): boolean => {
  if (!props.selectable) return false
  const key = getItemKey(item, index)
  return selectedKeysInternal.value.includes(key)
}

// 切换选择
const toggleSelect = (item: ListItem, index: number) => {
  if (item.disabled) return
  
  const key = getItemKey(item, index)
  const selectedIndex = selectedKeysInternal.value.indexOf(key)
  
  if (selectedIndex > -1) {
    selectedKeysInternal.value.splice(selectedIndex, 1)
  } else {
    selectedKeysInternal.value.push(key)
  }
  
  const selectedItems = props.items.filter((item, idx) => 
    selectedKeysInternal.value.includes(getItemKey(item, idx))
  )
  
  emit('update:selectedKeys', [...selectedKeysInternal.value])
  emit('selection-change', selectedItems, [...selectedKeysInternal.value])
}

// 处理项点击
const handleItemClick = (item: ListItem, index: number) => {
  if (!item.disabled && props.clickable) {
    emit('item-click', item, index)
  }
}

// 处理操作按钮点击
const handleActionClick = (action: ListAction, item: ListItem, index: number) => {
  if (action.onClick) {
    action.onClick(item)
  }
  emit('action-click', action, item, index)
}

// 暴露方法
defineExpose({
  clearSelection: () => {
    selectedKeysInternal.value = []
    emit('update:selectedKeys', [])
    emit('selection-change', [], [])
  },
  selectAll: () => {
    selectedKeysInternal.value = props.items.map((item, idx) => getItemKey(item, idx))
    emit('update:selectedKeys', [...selectedKeysInternal.value])
    emit('selection-change', [...props.items], [...selectedKeysInternal.value])
  }
})
</script>

<style scoped>
.x-list {
  width: 100%;
  background: var(--x-bg-color, #ffffff);
  border-radius: var(--x-radius-lg, 12px);
  overflow: hidden;
}

.x-list--bordered {
  border: 1px solid var(--x-border-color, #e5e7eb);
}

/* 头部 */
.x-list-header {
  padding: 16px 20px;
  background: var(--x-fill-color-lighter, #fafafa);
  border-bottom: 1px solid var(--x-border-color, #e5e7eb);
}

.x-list-header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.x-list-title {
  margin: 0;
  font-size: var(--x-font-size-lg, 18px);
  font-weight: 600;
  color: var(--x-text-color-primary, #1a1a1a);
}

.x-list-extra {
  font-size: var(--x-font-size-sm, 14px);
  color: var(--x-text-color-secondary, #6b7280);
}

/* 内容区 */
.x-list-content {
  overflow-y: auto;
}

/* 列表项容器 */
.x-list-items {
  position: relative;
}

/* 列表项 */
.x-list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  transition: all var(--x-transition-fast, 0.2s);
  color: var(--x-text-color-primary, #1a1a1a);
  background: var(--x-bg-color, #ffffff);
}

.x-list--split .x-list-item {
  border-bottom: 1px solid var(--x-border-color-lighter, #f3f4f6);
}

.x-list--split .x-list-item:last-child {
  border-bottom: none;
}

.x-list--hoverable .x-list-item:hover:not(.x-list-item--disabled) {
  background: var(--x-fill-color-lighter, #f9fafb);
}

.x-list-item--clickable {
  cursor: pointer;
}

.x-list-item--clickable:active:not(.x-list-item--disabled) {
  background: var(--x-fill-color, #f3f4f6);
}

.x-list-item--selected {
  background: var(--x-list-selected-bg, #eff6ff) !important;
}

.x-list-item--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 选择框 */
.x-list-item-checkbox {
  display: flex;
  align-items: center;
}

.x-list-item-checkbox input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: var(--x-color-primary, #1a1a1a);
}

/* 前缀 */
.x-list-item-prefix {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 20px;
  color: var(--x-text-color-secondary, #6b7280);
}

/* 图片 */
.x-list-item-image {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: var(--x-radius-md, 8px);
}

.x-list--small .x-list-item-image {
  width: 48px;
  height: 48px;
}

.x-list--large .x-list-item-image {
  width: 80px;
  height: 80px;
}

/* 头像 */
.x-list-item-avatar {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
}

.x-list--small .x-list-item-avatar {
  width: 32px;
  height: 32px;
}

.x-list--large .x-list-item-avatar {
  width: 48px;
  height: 48px;
}

/* 内容 */
.x-list-item-content {
  flex: 1;
  min-width: 0;
}

.x-list-item-main {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.x-list-item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 4px;
}

.x-list-item-title {
  font-size: var(--x-font-size-sm, 14px);
  font-weight: 500;
  color: var(--x-text-color-primary, #1a1a1a);
  display: flex;
  align-items: center;
  gap: 8px;
}

.x-list-item-subtitle {
  font-size: var(--x-font-size-xs, 12px);
  color: var(--x-text-color-regular, #4a4a4a);
  margin-bottom: 4px;
}

.x-list-item-description {
  font-size: var(--x-font-size-xs, 12px);
  color: var(--x-text-color-secondary, #6b7280);
  line-height: 1.5;
}

.x-list-item-meta {
  font-size: var(--x-font-size-xs, 12px);
  color: var(--x-text-color-placeholder, #9ca3af);
  flex-shrink: 0;
}

/* 标签 */
.x-list-item-tag {
  display: inline-flex;
  padding: 2px 8px;
  font-size: 11px;
  border-radius: 9999px;
  font-weight: 500;
}

.tag-default {
  background: var(--x-fill-color, #f3f4f6);
  color: var(--x-text-color-regular, #374151);
}

.tag-primary {
  background: var(--x-color-primary, #1a1a1a);
  color: var(--x-color-white, #ffffff);
}

.tag-success {
  background: var(--x-color-success, #10b981);
  color: var(--x-color-white, #ffffff);
}

.tag-warning {
  background: var(--x-color-warning, #f59e0b);
  color: var(--x-color-white, #ffffff);
}

.tag-danger {
  background: var(--x-color-danger, #ef4444);
  color: var(--x-color-white, #ffffff);
}

/* 后缀 */
.x-list-item-suffix {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  font-size: var(--x-font-size-sm, 14px);
  color: var(--x-text-color-secondary, #6b7280);
}

/* 价格 */
.x-list-item-price {
  font-size: var(--x-font-size-lg, 18px);
  font-weight: 700;
  color: var(--x-color-danger, #ef4444);
}

/* 操作按钮 */
.x-list-item-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.x-list-action-btn {
  padding: 6px 12px;
  border: 1px solid var(--x-border-color, #e5e7eb);
  border-radius: var(--x-radius-sm, 4px);
  background: var(--x-bg-color, #ffffff);
  color: var(--x-text-color-regular, #374151);
  font-size: var(--x-font-size-xs, 12px);
  cursor: pointer;
  transition: all var(--x-transition-fast, 0.2s);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.x-list-action-btn:hover:not(:disabled) {
  border-color: var(--x-color-primary, #1a1a1a);
  color: var(--x-color-primary, #1a1a1a);
}

.x-list-action-btn.action-primary {
  background: var(--x-color-primary, #1a1a1a);
  border-color: var(--x-color-primary, #1a1a1a);
  color: var(--x-color-white, #ffffff);
}

.x-list-action-btn.action-primary:hover {
  background: var(--x-color-primary-dark, #0d0d0d);
}

.x-list-action-btn.action-danger {
  color: var(--x-color-danger, #ef4444);
  border-color: var(--x-color-danger, #ef4444);
}

.x-list-action-btn.action-danger:hover {
  background: var(--x-color-danger, #ef4444);
  color: var(--x-color-white, #ffffff);
}

/* 尺寸变体 */
.x-list--small .x-list-item {
  padding: 8px 16px;
}

.x-list--small .x-list-item-title {
  font-size: var(--x-font-size-xs, 12px);
}

.x-list--small .x-list-item-description {
  font-size: 11px;
}

.x-list--large .x-list-item {
  padding: 16px 24px;
}

.x-list--large .x-list-item-title {
  font-size: var(--x-font-size, 16px);
}

.x-list--large .x-list-item-description {
  font-size: var(--x-font-size-sm, 14px);
}

/* 卡片变体 */
.x-list--card .x-list-item {
  margin: 8px;
  border-radius: var(--x-radius-md, 8px);
  border: 1px solid var(--x-border-color, #e5e7eb);
  box-shadow: var(--x-shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.05));
}

.x-list--card .x-list-item:hover:not(.x-list-item--disabled) {
  box-shadow: var(--x-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
  transform: translateY(-2px);
}

.x-list--card .x-list-item:first-child {
  margin-top: 12px;
}

.x-list--card .x-list-item:last-child {
  margin-bottom: 12px;
}

/* 时间轴变体 */
.x-list--timeline .x-list-items {
  position: relative;
  padding-left: 32px;
}

.x-list--timeline .x-list-items::before {
  content: '';
  position: absolute;
  left: 19px;
  top: 12px;
  bottom: 12px;
  width: 2px;
  background: var(--x-border-color, #e5e7eb);
}

.x-list--timeline .x-list-item {
  position: relative;
  padding-left: 0;
}

.x-list--timeline .x-list-item::before {
  content: '';
  position: absolute;
  left: -20px;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--x-color-primary, #1a1a1a);
  border: 2px solid var(--x-bg-color, #ffffff);
  z-index: 1;
}

.x-list--timeline .x-list-item--selected::before {
  background: var(--x-color-primary, #3b82f6);
  box-shadow: 0 0 0 3px var(--x-timeline-node-shadow, rgba(59, 130, 246, 0.3));
}

/* 底部 */
.x-list-footer {
  padding: 12px 20px;
  background: var(--x-fill-color-lighter, #fafafa);
  border-top: 1px solid var(--x-border-color, #e5e7eb);
}

/* 加载状态 */
.x-list-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.x-list-loading-spinner {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.loading-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--x-color-primary, #1a1a1a);
  animation: dotPulse 1.4s ease-in-out infinite;
}

.loading-dot:nth-child(1) {
  animation-delay: 0s;
}

.loading-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dotPulse {
  0%, 60%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  30% {
    transform: scale(1.3);
    opacity: 1;
  }
}

.x-list-loading-text {
  font-size: var(--x-font-size-sm, 14px);
  color: var(--x-text-color-secondary, #6b7280);
}

/* 空状态 */
.x-list-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.x-list-empty-icon {
  width: 64px;
  height: 41px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.x-list-empty-icon svg {
  width: 100%;
  height: 100%;
}

.x-list-empty-text {
  font-size: var(--x-font-size-sm, 14px);
  color: var(--x-text-color-placeholder, #9ca3af);
}
</style>

