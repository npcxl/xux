<template>
  <div 
    class="accordion-container"
    :class="{ 'accordion-container--bordered': bordered }"
  >
    <div 
      v-for="(item, index) in items" 
      :key="item.id || index" 
      class="accordion-item"
      :class="{ 
        'is-open': isOpen(index),
        'is-disabled': disabled || item.disabled
      }"
    >

      <button
        @click="toggle(index)"
        class="accordion-header"
        :disabled="disabled || item.disabled"
        :aria-expanded="isOpen(index)"
        :aria-controls="`accordion-content-${index}`"
      >
        <span class="accordion-title">{{ item.title }}</span>
        <div class="accordion-icon">
          <svg
            class="accordion-arrow"
            :class="{ 'accordion-arrow--rotate': isOpen(index) }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      <div
        :id="`accordion-content-${index}`"
        class="accordion-content"
        :style="{ maxHeight: isOpen(index) ? `${contentHeights[index]}px` : '0px' }"
        :ref="(el: any) => setContentRef(el as HTMLElement, index)"
      >
        <div class="accordion-body">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  
import { withDefaults, watch, nextTick, ref } from 'vue'

/**
 * Accordion 手风琴组件
 * @displayName XAccordion
 */

export interface AccordionItem {
  id?: string | number
  title: string
  content: string
  disabled?: boolean
}

export interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean // 是否允许同时展开多个项目
  defaultOpen?: number[] // 默认展开的项目索引
  bordered?: boolean // 是否显示边框
  disabled?: boolean // 是否禁用
}

const props = withDefaults(defineProps<AccordionProps>(), {
  allowMultiple: false,
  defaultOpen: () => [],
  bordered: true,
  disabled: false
})

const emit = defineEmits<{
  'change': [openItems: number[]]
  'item-click': [index: number, isOpen: boolean]
}>()

// 管理展开状态
const openItems = ref<Set<number>>(new Set(props.defaultOpen))
// 存储内容高度
const contentHeights = ref<Record<number, number>>({})
// 存储内容元素引用
const contentRefs = ref<Record<number, HTMLElement>>({})

// 设置内容元素引用
const setContentRef = (el: HTMLElement | null, index: number) => {
    if (el) {
        contentRefs.value[index] = el
        // 计算内容高度
        nextTick(() => {
            const body = el.querySelector('.accordion-body') as HTMLElement
            if (body) {
                contentHeights.value[index] = body.scrollHeight
            }
        })
    }
}

// 切换展开/收起状态
const toggle = (index: number) => {
  if (props.disabled || props.items[index]?.disabled) {
    return
  }

  const wasOpen = openItems.value.has(index)
  
  if (props.allowMultiple) {
    // 允许多个展开
    if (wasOpen) {
      openItems.value.delete(index)
    } else {
      openItems.value.add(index)
    }
  } else {
    // 只允许一个展开
    if (wasOpen) {
      openItems.value.clear()
    } else {
      openItems.value.clear()
      openItems.value.add(index)
    }
  }
  
  // 触发事件
  emit('item-click', index, !wasOpen)
  emit('change', Array.from(openItems.value))
}

// 检查是否展开
const isOpen = (index: number): boolean => {
    return openItems.value.has(index)
}

// 监听默认展开项的变化
watch(() => props.defaultOpen, (newDefault) => {
    openItems.value = new Set(newDefault)
}, { deep: true })

// 监听items变化，重新计算高度
watch(() => props.items, () => {
  nextTick(() => {
    // 重新计算所有内容高度
    Object.keys(contentRefs.value).forEach(key => {
      const index = parseInt(key)
      const el = contentRefs.value[index]
      if (el) {
        const body = el.querySelector('.accordion-body') as HTMLElement
        if (body) {
          contentHeights.value[index] = body.scrollHeight
        }
      }
    })
  })
}, { deep: true })

// 暴露的方法
const openItem = (index: number) => {
  if (!props.disabled && !props.items[index]?.disabled) {
    if (!openItems.value.has(index)) {
      if (!props.allowMultiple) {
        openItems.value.clear()
      }
      openItems.value.add(index)
      emit('change', Array.from(openItems.value))
    }
  }
}

const closeItem = (index: number) => {
  if (openItems.value.has(index)) {
    openItems.value.delete(index)
    emit('change', Array.from(openItems.value))
  }
}

const openAll = () => {
  if (props.allowMultiple && !props.disabled) {
    props.items.forEach((item, index) => {
      if (!item.disabled) {
        openItems.value.add(index)
      }
    })
    emit('change', Array.from(openItems.value))
  }
}

const closeAll = () => {
  openItems.value.clear()
  emit('change', [])
}

defineExpose({
  openItem,
  closeItem,
  openAll,
  closeAll,
  toggle
})
</script>

<style scoped>
.accordion-container {
  width: 100%;
  font-family: var(--x-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
}

.accordion-container--bordered {
  border: 1px solid var(--x-color-gray-200, #e9ecef);
  border-radius: var(--x-radius-lg, 8px);
  overflow: hidden;
}

.accordion-item {
  border-bottom: 1px solid var(--x-border-color-light, #f1f5f9);
  background: var(--x-bg-color, white);
  transition: all var(--x-transition, 0.2s ease);
}

.accordion-item:last-child {
  border-bottom: none;
}

.accordion-item:hover:not(.is-disabled) {
  background: var(--x-fill-color-light, #fafbfc);
}

.accordion-item.is-open {
  background: var(--x-fill-color-lighter, rgba(26, 26, 26, 0.02));
}

.accordion-item.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.accordion-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  text-align: left;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all var(--x-transition, 0.2s ease);
  font-size: var(--x-font-size, 15px);
  font-weight: 500;
  color: var(--x-text-color-primary, #1e293b);
  outline: none;
  user-select: none;
}

.accordion-header:disabled {
  cursor: not-allowed;
}

.accordion-header:focus-visible {
  outline: 2px solid var(--x-color-primary, #1a1a1a);
  outline-offset: -2px;
}

.accordion-title {
  flex: 1;
  margin-right: 12px;
  line-height: 1.5;
}

.accordion-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--x-radius-full, 50%);
  background: var(--x-fill-color, #f1f5f9);
  transition: all var(--x-transition, 0.3s ease);
  color: var(--x-text-color-secondary, #64748b);
  flex-shrink: 0;
}

.accordion-item:hover:not(.is-disabled) .accordion-icon {
  background: var(--x-fill-color-dark, #e2e8f0);
  color: var(--x-text-color-regular, #475569);
}

.accordion-item.is-open .accordion-icon {
  background: var(--x-fill-color-dark, rgba(26, 26, 26, 0.08));
  color: var(--x-color-primary, #1a1a1a);
}

.accordion-arrow {
  width: 20px;
  height: 20px;
  transition: transform var(--x-transition, 0.3s cubic-bezier(0.4, 0, 0.2, 1));
}

.accordion-arrow--rotate {
  transform: rotate(180deg);
}

.accordion-content {
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--x-fill-color-lighter, rgba(26, 26, 26, 0.01));
}

.accordion-body {
  padding: 0 20px 20px 20px;
  color: var(--x-text-color-regular, #64748b);
  line-height: 1.6;
  font-size: var(--x-font-size-sm, 14px);
}

/* 响应式设计 */
@media (max-width: 768px) {
    .accordion-header {
        padding: 16px 16px;
        font-size: var(--x-font-size-sm, 14px);
    }
    
    .accordion-body {
        padding: 0 16px 16px 16px;
        font-size: var(--x-font-size-xs, 13px);
    }
    
    .accordion-icon {
        width: 28px;
        height: 28px;
    }
    
    .accordion-icon svg {
        width: 16px;
        height: 16px;
    }
}

/* 动画优化 */
@media (prefers-reduced-motion: reduce) {
    .accordion-content,
    .accordion-header,
    .accordion-icon,
    .accordion-item {
        transition: none;
    }
}
</style> 