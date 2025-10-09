<template>
  <!-- 标准版本 -->
  <div v-if="variant === 'standard'" class="x-radio-group" :class="[`radio-${size}`, `radio-${direction}`, `radio-${mode}`, { 'radio-disabled': disabled }]">
  <label
      v-for="option in options"
      :key="option.value"
      class="x-radio-item"
      :class="[
        { 'radio-item-checked': modelValue === option.value },
        { 'radio-item-disabled': disabled || option.disabled }
      ]"
    >
    <input
      type="radio"
        :name="name"
        :value="option.value"
        :disabled="disabled || option.disabled"
        :checked="modelValue === option.value"
        @change="handleChange(option.value)"
        class="radio-input"
      />
      
      <!-- 传统单选按钮模式 -->
      <div v-if="mode === 'default'" class="radio-button">
        <div class="radio-button-inner"></div>
      </div>
      
      <div class="radio-content">
        <!-- 图标 -->
        <div v-if="option.icon || showIcon" class="radio-icon">
          <slot name="icon" :option="option">
            <Icon v-if="option.icon" :icon="option.icon" />
          </slot>
        </div>
        
        <!-- 内容 -->
        <div class="radio-text">
          <div class="radio-label">{{ option.label }}</div>
          <div v-if="option.description" class="radio-description">{{ option.description }}</div>
        </div>
        
        <!-- 自定义内容插槽 -->
        <slot name="content" :option="option"></slot>
      </div>
  </label>
  </div>

  <!-- 电商支付版本 -->
  <div v-else class="payment-method-container">
    <p class="payment-title">Payment method</p>
    <p class="payment-subtitle">
      This component is made by using
      <span class="payment-highlight">`:has() pseudo-class`</span>
    </p>
    
  <label
      v-for="option in paymentOptions"
      :key="option.value"
      class="payment-option"
      :class="{ 'payment-option-checked': modelValue === option.value }"
    >
      <div class="payment-content">
        <div class="payment-icon">
          <Icon :icon="option.icon" />
    </div>
        <p class="payment-label">{{ option.label }}</p>
    </div>
    <input
      type="radio"
        :name="name"
        :value="option.value"
        :disabled="disabled"
        :checked="modelValue === option.value"
        @change="handleChange(option.value)"
        class="payment-input"
    />
  </label>
</div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
export interface RadioOption {
  /** 选项值 */
  value: string | number
  /** 选项标签 */
  label: string
  /** 选项描述 */
  description?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 图标组件 */
  icon?: any
}

export interface RadioProps {
  /** 当前选中的值 */
  modelValue?: string | number
  /** 选项列表 */
  options?: RadioOption[]
  /** 组件尺寸 */
  size?: 'small' | 'medium' | 'large'
  /** 是否禁用 */
  disabled?: boolean
  /** 是否显示图标 */
  showIcon?: boolean
  /** 单选组名称 */
  name?: string
  /** 布局方向 */
  direction?: 'horizontal' | 'vertical'
  /** 组件变体 */
  variant?: 'standard' | 'payment'
  /** 显示模式 */
  mode?: 'default' | 'list'
}

const props = withDefaults(defineProps<RadioProps>(), {
  modelValue: '',
  options: () => [],
  size: 'medium',
  disabled: false,
  showIcon: false,
  name: 'radio-group',
  direction: 'vertical',
  variant: 'standard',
  mode: 'default'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

// 支付选项配置
const paymentOptions = [
  {
    value: 'google',
    label: 'Google Pay',
    icon: 'logos:google-pay'
  },
  {
    value: 'apple',
    label: 'Apple Pay',
    icon: 'logos:apple-pay'
  },
  {
    value: 'paypal',
    label: 'Paypal',
    icon: 'logos:paypal'
  },
  {
    value: 'visa',
    label: 'Credit Card',
    icon: 'logos:visa'
  }
]

// 处理选项变化
const handleChange = (value: string | number) => {
  if (props.disabled) return
  
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style scoped>
/* ===== 标准版本样式 ===== */
.x-radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.x-radio-group.radio-horizontal {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.x-radio-item {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  transition: all 0.2s ease;
}

/* 列表模式样式 */
.radio-list .x-radio-item {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: #ffffff;
  margin-bottom: 0.5rem;
}

.radio-list .x-radio-item:hover {
  border-color: #1a1a1a;
  background-color: #f9fafb;
}

.radio-list .x-radio-item.radio-item-checked {
  border-color: #1a1a1a;
  background-color: #f3f4f6;
  box-shadow: 0 0 0 1px #1a1a1a;
}

.radio-list .x-radio-item.radio-item-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #f9fafb;
  border-color: #e5e7eb;
}

.radio-list .x-radio-item.radio-item-disabled:hover {
  border-color: #e5e7eb;
  background-color: #f9fafb;
}

.x-radio-item:hover .radio-button {
  border-color: #1a1a1a;
}

.x-radio-item.radio-item-checked .radio-button {
  border-color: #1a1a1a;
}

.x-radio-item.radio-item-checked .radio-button-inner {
  background-color: #1a1a1a;
  transform: translate(-50%, -50%) scale(1);
}

.x-radio-item.radio-item-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.x-radio-item.radio-item-disabled:hover .radio-button {
  border-color: #d1d5db;
}

.radio-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.radio-button {
  position: relative;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  background-color: #ffffff;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.radio-button-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0.5rem;
  height: 0.5rem;
  background-color: transparent;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: all 0.2s ease;
}

.radio-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.radio-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  color: #6b7280;
  transition: color 0.2s ease;
}

.radio-item-checked .radio-icon {
  color: #1a1a1a;
}

.radio-text {
  flex: 1;
  min-width: 0;
}

.radio-label {
  font-weight: 500;
  color: #1a1a1a;
  transition: color 0.2s ease;
  font-size: 0.875rem;
  line-height: 1.5;
}

.radio-item-checked .radio-label {
  color: #1a1a1a;
  font-weight: 600;
}

.radio-description {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
  line-height: 1.4;
  transition: color 0.2s ease;
}

.radio-item-checked .radio-description {
  color: #4b5563;
}

/* 尺寸变体 */
.radio-small .x-radio-item {
  padding: 0.25rem 0;
  gap: 0.5rem;
}

.radio-small.radio-list .x-radio-item {
  padding: 0.75rem;
}

.radio-small .radio-button {
  width: 1rem;
  height: 1rem;
}

.radio-small .radio-button-inner {
  width: 0.375rem;
  height: 0.375rem;
  transform: translate(-50%, -50%) scale(0);
}

.radio-small .x-radio-item.radio-item-checked .radio-button-inner {
  transform: translate(-50%, -50%) scale(1);
}

.radio-small .radio-content {
  gap: 0.5rem;
}

.radio-small .radio-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.radio-small .radio-label {
  font-size: 0.75rem;
  font-weight: 500;
}

.radio-small .radio-description {
  font-size: 0.625rem;
  margin-top: 0.125rem;
}

.radio-medium .x-radio-item {
  padding: 0.5rem 0;
  gap: 0.75rem;
}

.radio-medium.radio-list .x-radio-item {
  padding: 1rem;
}

.radio-medium .radio-button {
  width: 1.25rem;
  height: 1.25rem;
}

.radio-medium .radio-button-inner {
  width: 0.5rem;
  height: 0.5rem;
  transform: translate(-50%, -50%) scale(0);
}

.radio-medium .x-radio-item.radio-item-checked .radio-button-inner {
  transform: translate(-50%, -50%) scale(1);
}

.radio-medium .radio-content {
  gap: 0.75rem;
}

.radio-medium .radio-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.radio-large .x-radio-item {
  padding: 0.75rem 0;
  gap: 1rem;
}

.radio-large.radio-list .x-radio-item {
  padding: 1.25rem;
}

.radio-large .radio-button {
  width: 1.5rem;
  height: 1.5rem;
}

.radio-large .radio-button-inner {
  width: 0.625rem;
  height: 0.625rem;
  transform: translate(-50%, -50%) scale(0);
}

.radio-large .x-radio-item.radio-item-checked .radio-button-inner {
  transform: translate(-50%, -50%) scale(1);
}

.radio-large .radio-content {
  gap: 1rem;
}

.radio-large .radio-icon {
  width: 1.75rem;
  height: 1.75rem;
}

.radio-large .radio-label {
  font-size: 1rem;
  font-weight: 600;
}

.radio-large .radio-description {
  font-size: 0.875rem;
  margin-top: 0.375rem;
}

/* 水平布局调整 */
.radio-horizontal .x-radio-item {
  flex: 1;
  min-width: 0;
  max-width: 300px;
}

/* 禁用状态 */
.radio-disabled .x-radio-item {
  opacity: 0.5;
  cursor: not-allowed;
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  border-color: #e5e7eb;
}

.radio-disabled .x-radio-item:hover {
  border-color: #e5e7eb;
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transform: none;
}

.radio-disabled .radio-icon {
  background: rgba(243, 244, 246, 0.8);
  color: #9ca3af;
}

.radio-disabled .radio-label {
  color: #9ca3af;
}

.radio-disabled .radio-description {
  color: #9ca3af;
}

/* ===== 电商支付版本样式 ===== */
.payment-method-container {
  width: 320px;
  padding: 1.5rem;
  aspect-ratio: 1;
  border-radius: 1rem;
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.payment-title {
  text-transform: capitalize;
  font-weight: 700;
  align-self: flex-start;
  margin: 0;
  color: #1e293b;
  font-size: 1.125rem;
  letter-spacing: -0.025em;
}

.payment-subtitle {
  font-size: 0.75rem;
  align-self: flex-start;
  text-wrap: wrap;
  color: #64748b;
  padding-bottom: 0.5rem;
  margin: 0;
  line-height: 1.4;
}

.payment-highlight {
  font-weight: 800;
  text-decoration: underline;
  color: #3b82f6;
}

.payment-option {
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  z-index: 10;
  border-radius: 0.75rem;
  padding: 0.875rem;
  border: 1px solid rgba(226, 232, 240, 0.8);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
}

.payment-option:hover {
  background: rgba(240, 249, 255, 0.9);
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px 0 rgba(59, 130, 246, 0.15);
}

.payment-option.payment-option-checked {
  border-color: #3b82f6;
  color: #1e40af;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 197, 253, 0.1) 100%);
  font-weight: 700;
  box-shadow: 0 4px 16px 0 rgba(59, 130, 246, 0.25);
  transform: translateY(-1px);
}

.payment-content {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  position: relative;
  z-index: 10;
}

.payment-icon {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  transition: all 0.2s ease;
}

.payment-option.payment-option-checked .payment-icon {
  background: rgba(59, 130, 246, 0.1);
  transform: scale(1.05);
}

.payment-label {
  font-weight: 600;
  position: absolute;
  inset: 0;
  width: 100%;
  white-space: nowrap;
  transform: translateY(110%) translateX(100%);
  top: 0.25rem;
  left: 3.5rem;
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  margin: 0;
  font-size: 0.875rem;
  letter-spacing: -0.025em;
}

.payment-option.payment-option-checked .payment-label {
  transform: translateY(0);
  opacity: 1;
}

.payment-input {
  color: #3b82f6;
  outline: none;
  box-shadow: none;
}

.payment-input:focus {
  outline: none;
  box-shadow: none;
}

/* 支付图标组件样式 */
.payment-icon svg {
  width: 1.5rem;
  height: 1.5rem;
  fill: currentColor;
}
</style>