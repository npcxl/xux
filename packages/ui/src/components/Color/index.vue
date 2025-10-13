<template>
  <div class="x-color-picker">
    <input 
      v-if="showInput"
      type="color" 
      :value="modelValue || defaultColor"
      class="x-color-input"
      @input="handleInput"
    />
    <div 
      class="x-color-container" 
      :class="{ 'show-tooltips': showTooltips }"
    >
      <button
        v-for="color in colorList"
        :key="color"
        class="x-color-item"
        :class="{ active: modelValue === color }"
        :style="{ '--color': color }"
        :aria-label="color"
        :disabled="disabled"
        @click="selectColor(color)"
      >
        <span class="x-color-tooltip" v-if="showTooltips">{{ color }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Color 颜色选择器组件
 * @displayName XColor
 */

export interface ColorProps {
  modelValue?: string
  colors?: string[]
  showInput?: boolean
  showTooltips?: boolean
  disabled?: boolean
  defaultColor?: string
}

const props = withDefaults(defineProps<ColorProps>(), {
  showInput: true,
  showTooltips: true,
  disabled: false,
  defaultColor: '#3b82f6'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const defaultColors = [
  '#e11d48',
  '#f472b6',
  '#fb923c',
  '#facc15',
  '#84cc16',
  '#10b981',
  '#0ea5e9',
  '#3b82f6',
  '#8b5cf6',
  '#a78bfa'
]

const colorList = computed(() => props.colors || defaultColors)

const selectColor = (color: string) => {
  if (props.disabled) return
  emit('update:modelValue', color)
  emit('change', color)
}

const handleInput = (e: Event) => {
  if (props.disabled) return
  const value = (e.target as HTMLInputElement).value
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style scoped>
.x-color-picker {
  display: flex;
  align-items: center;
  gap: 12px;
}

.x-color-input {
  width: 50px;
  height: 50px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: transparent;
}

.x-color-input:hover {
  border-color: #3b82f6;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
}

.x-color-input:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.x-color-container {
  display: flex;
  gap: 4px;
  transform-style: preserve-3d;
  transform: perspective(1000px);
}

.x-color-item {
  position: relative;
  flex-shrink: 0;
  width: 32px;
  height: 40px;
  border: none;
  outline: none;
  background: transparent;
  transition: all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.1);
  cursor: pointer;
}

.x-color-item:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.x-color-item::after {
  position: absolute;
  content: "";
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color);
  border-radius: 6px;
  transition: all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.x-color-tooltip {
  position: absolute;
  left: 50%;
  bottom: 52px;
  font-size: 11px;
  line-height: 1.2;
  transform: translateX(-50%);
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: all 300ms cubic-bezier(0.175, 0.885, 0.32, 1.1);
  z-index: 1000;
}

.x-color-tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.8);
}

.x-color-item:hover {
  transform: scale(1.4);
  z-index: 999;
}

.x-color-item:hover .x-color-tooltip {
  opacity: 1;
  visibility: visible;
}

.x-color-item:active::after {
  transform: scale(0.95);
}

.x-color-item.active::after {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  transform: scale(1.1);
}

.x-color-item:disabled:hover {
  transform: none;
}

/* 相邻元素联动效果 */
.x-color-item:hover + .x-color-item {
  transform: scale(1.25);
  z-index: 99;
}

.x-color-item:hover + .x-color-item + .x-color-item {
  transform: scale(1.1);
  z-index: 9;
}

.x-color-item:has(+ .x-color-item:hover) {
  transform: scale(1.25);
  z-index: 99;
}

.x-color-item:has(+ .x-color-item + .x-color-item:hover) {
  transform: scale(1.1);
  z-index: 9;
}

/* 响应式 */
@media (max-width: 768px) {
  .x-color-picker {
    flex-wrap: wrap;
  }
  
  .x-color-input {
    width: 44px;
    height: 44px;
  }
  
  .x-color-item {
    width: 28px;
    height: 36px;
  }
  
  .x-color-item:hover {
    transform: scale(1.3);
  }
  
  .x-color-item:hover + .x-color-item {
    transform: scale(1.15);
  }
  
  .x-color-item:hover + .x-color-item + .x-color-item {
    transform: scale(1.05);
  }
}
</style>