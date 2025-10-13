<template>
  <div 
    class="x-segmented" 
    :class="[
      `direction-${direction}`,
      `size-${size}`,
      { 'block': block },
      { 'icon-invert': iconInvert }
    ]"
    :style="{ '--option-count': options.length }"
  >
    <label
      v-for="option in options"
      :key="option.value"
      :class="{ 'disabled': option.disabled }"
    >
      <input
        :value="option.value"
        :checked="modelValue === option.value"
        :disabled="option.disabled"
        :name="name"
        type="radio"
        @change="handleChange(option.value)"
      />
      <span 
        v-if="option.icon" 
        class="icon"
        :class="`iconify ${option.icon}`"
        :data-icon="option.icon"
      ></span>
      <span v-if="option.label" class="label">{{ option.label }}</span>
  </label>
    <span class="selection" :style="selectionStyle"></span>
</div>
</template>

<script setup lang="ts"> 
import { computed, onMounted } from 'vue'

/**
 * Segmented 分段控制器组件
 * @displayName XSegmented
 */

export interface SegmentedOption {
  label?: string
  value: string | number
  icon?: string
  disabled?: boolean
  color?: string
}

export interface SegmentedProps {
  modelValue: string | number
  options: SegmentedOption[]
  direction?: 'horizontal' | 'vertical'
  size?: 'small' | 'medium' | 'large'
  block?: boolean
  name?: string
  iconInvert?: boolean  // 是否在选中时反色图标（适用于单色图标）
}

const props = withDefaults(defineProps<SegmentedProps>(), {
  direction: 'vertical',
  size: 'medium',
  block: false,
  name: 'segmented',
  iconInvert: false  // 默认不反色，保持彩色 logo 原色
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
}>()

// 计算选中项的索引
const selectedIndex = computed(() => {
  return props.options.findIndex(opt => opt.value === props.modelValue)
})

// 计算选中块的样式
const selectionStyle = computed(() => {
  const index = selectedIndex.value
  if (index === -1) return {}
  
  const option = props.options[index]
  const gap = props.size === 'small' ? 3 : props.size === 'large' ? 6 : 4
  
  if (props.direction === 'horizontal') {
    return {
      transform: `translateX(calc(${index} * (100% + ${gap}px)))`,
      backgroundColor: option.color || getDefaultColor(index)
    }
  } else {
    return {
      transform: `translateY(calc(${index} * (100% + ${gap}px)))`,
      backgroundColor: option.color || getDefaultColor(index)
    }
  }
})

// 获取默认颜色
const getDefaultColor = (index: number) => {
  const colors = ['#000000', '#1f9cf1', '#ff9801', '#10b981', '#8b5cf6', '#ef4444']
  return colors[index % colors.length]
}

const handleChange = (value: string | number) => {
  emit('update:modelValue', value)
  emit('change', value)
}

// 动态加载 iconify
onMounted(() => {
  if (typeof window !== 'undefined' && !document.querySelector('#iconify-script')) {
    const script = document.createElement('script')
    script.id = 'iconify-script'
    script.src = 'https://code.iconify.design/3/3.1.0/iconify.min.js'
    document.head.appendChild(script)
  }
})
</script>

<style scoped>
.x-segmented {
  position: relative;
  display: inline-flex;
  align-items: stretch;
  border-radius: 10px;
  padding: 6px;
  gap: 4px;
  background-color: #fff;
  color: #000000;
  overflow: hidden;
  border: 1px solid rgba(53, 52, 52, 0.226);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.x-segmented input {
  display: none;
}

/* 纵向布局 */
.x-segmented.direction-vertical {
  flex-direction: column;
  min-height: 180px;
}

/* 横向布局 */
.x-segmented.direction-horizontal {
  flex-direction: row;
  min-width: fit-content;
}

/* 块级元素 */
.x-segmented.block {
  display: flex;
  width: 100%;
}

.x-segmented label {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  z-index: 2;
  font-weight: 600;
  padding: 10px 16px;
  transition: all 0.2s ease;
  border-radius: 6px;
  user-select: none;
  flex: 1;
  min-height: 48px;
  position: relative;
}

.x-segmented.direction-vertical label {
  width: 100%;
  min-height: 56px;
}

.x-segmented.direction-horizontal label {
  flex-direction: row;
  gap: 6px;
  padding: 8px 20px;
  min-height: auto;
}

/* 横向布局只有图标时的样式 */
.x-segmented.direction-horizontal label:not(:has(.label)) {
  padding: 8px 16px;
}

.x-segmented label.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.x-segmented label:not(.disabled):hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.x-segmented label:not(.disabled):hover .icon {
  opacity: 0.9;
}

.x-segmented label .icon {
  font-size: 20px;
  line-height: 1;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  opacity: 0.75;  /* 未选中状态稍微降低透明度 */
  position: relative;
  z-index: 3;
}

/* 只有图标时的样式 */
.x-segmented label:not(:has(.label)) .icon {
  font-size: 22px;
  width: 32px;
  height: 32px;
}

.x-segmented label .label {
  font-size: 13px;
  line-height: 1.2;
  white-space: nowrap;
  font-weight: 500;
  position: relative;
  z-index: 3;
}

/* 选中状态 - 文字必须是白色 */
.x-segmented label:has(input:checked) {
  color: #fff !important;
}

.x-segmented label:has(input:checked) .label {
  color: #fff !important;
}

/* 兼容初始加载 - 确保 checked 状态下文字为白色 */
.x-segmented label:has(input[checked]) {
  color: #fff !important;
}

.x-segmented label:has(input[checked]) .label {
  color: #fff !important;
}

/* 图标选中状态 - 彩色 logo 保持原色，不做反色处理 */
.x-segmented label:has(input:checked) .icon,
.x-segmented label:has(input[checked]) .icon {
  /* 移除反色效果，让彩色 logo 保持原色 */
  opacity: 1 !important;
}

/* 如果需要单色图标反白效果，添加特定类名 */
.x-segmented.icon-invert label:has(input:checked) .icon,
.x-segmented.icon-invert label:has(input[checked]) .icon {
  filter: brightness(0) invert(1) !important;
}

/* 选中块样式 */
.selection {
  position: absolute;
  z-index: 1;
  border-radius: 6px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.x-segmented.direction-vertical .selection {
  left: 6px;
  right: 6px;
  top: 6px;
}

.x-segmented.direction-horizontal .selection {
  top: 6px;
  bottom: 6px;
  left: 6px;
}

/* 动态计算选中块尺寸 - 纵向 */
.x-segmented.direction-vertical.size-small .selection {
  height: calc((100% - 8px - (var(--option-count) - 1) * 3px) / var(--option-count));
}

.x-segmented.direction-vertical.size-medium .selection {
  height: calc((100% - 12px - (var(--option-count) - 1) * 4px) / var(--option-count));
}

.x-segmented.direction-vertical.size-large .selection {
  height: calc((100% - 16px - (var(--option-count) - 1) * 6px) / var(--option-count));
}

/* 动态计算选中块尺寸 - 横向 */
.x-segmented.direction-horizontal.size-small .selection {
  width: calc((100% - 8px - (var(--option-count) - 1) * 3px) / var(--option-count));
}

.x-segmented.direction-horizontal.size-medium .selection {
  width: calc((100% - 12px - (var(--option-count) - 1) * 4px) / var(--option-count));
}

.x-segmented.direction-horizontal.size-large .selection {
  width: calc((100% - 16px - (var(--option-count) - 1) * 6px) / var(--option-count));
}

/* 选中块始终显示 */
.selection {
  display: block !important;
}

/* 初始状态也要显示选中块 */
.x-segmented label:has(input:checked) ~ .selection,
.x-segmented label:has(input[checked]) ~ .selection {
  display: block !important;
}

/* 尺寸变体 */
.x-segmented.size-small {
  padding: 4px;
  gap: 3px;
  min-height: 140px;
}

.x-segmented.size-small.direction-horizontal {
  min-height: auto;
}

.x-segmented.size-small.direction-vertical label {
  min-height: 44px;
  padding: 8px 12px;
}

.x-segmented.size-small.direction-horizontal label {
  padding: 6px 16px;
  min-height: 36px;
}

.x-segmented.size-small.direction-horizontal label:not(:has(.label)) {
  padding: 6px 12px;
}

.x-segmented.size-small label .icon {
  font-size: 18px;
  width: 24px;
  height: 24px;
}

.x-segmented.size-small label:not(:has(.label)) .icon {
  font-size: 20px;
  width: 28px;
  height: 28px;
}

.x-segmented.size-small label .label {
  font-size: 12px;
}

.x-segmented.size-medium {
  padding: 6px;
  gap: 4px;
  min-height: 200px;
}

.x-segmented.size-medium.direction-horizontal {
  min-height: auto;
}

.x-segmented.size-medium.direction-vertical label {
  padding: 10px 16px;
  min-height: 56px;
}

.x-segmented.size-medium.direction-horizontal label {
  padding: 8px 20px;
  min-height: 44px;
}

.x-segmented.size-medium.direction-horizontal label:not(:has(.label)) {
  padding: 8px 16px;
}

.x-segmented.size-medium label .icon {
  font-size: 20px;
  width: 28px;
  height: 28px;
}

.x-segmented.size-medium label:not(:has(.label)) .icon {
  font-size: 22px;
  width: 32px;
  height: 32px;
}

.x-segmented.size-medium label .label {
  font-size: 13px;
}

.x-segmented.size-large {
  padding: 8px;
  gap: 6px;
  min-height: 260px;
}

.x-segmented.size-large.direction-horizontal {
  min-height: auto;
}

.x-segmented.size-large.direction-vertical label {
  padding: 14px 20px;
  min-height: 72px;
}

.x-segmented.size-large.direction-horizontal label {
  padding: 10px 24px;
  min-height: 52px;
}

.x-segmented.size-large.direction-horizontal label:not(:has(.label)) {
  padding: 10px 20px;
}

.x-segmented.size-large label .icon {
  font-size: 24px;
  width: 32px;
  height: 32px;
}

.x-segmented.size-large label:not(:has(.label)) .icon {
  font-size: 26px;
  width: 36px;
  height: 36px;
}

.x-segmented.size-large label .label {
  font-size: 15px;
}

/* 响应式 */
@media (max-width: 768px) {
  .x-segmented.direction-horizontal {
    flex-direction: column;
    min-width: auto;
  }
  
  .x-segmented.direction-horizontal .selection {
    top: auto;
    bottom: auto;
    left: 6px;
    right: 6px;
    width: auto;
    height: calc((100% - 12px - (var(--option-count, 3) - 1) * 4px) / var(--option-count, 3));
  }
  
  .x-segmented.direction-horizontal label {
    flex-direction: column;
  }
}
</style>