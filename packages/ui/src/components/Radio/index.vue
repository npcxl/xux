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
      v-for="option in computedPaymentOptions"
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
import { computed } from 'vue'
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
  mode?: 'default' | 'list',
  /** 支付选项 */
  paymentOptions?:RadioOption[]
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
  mode: 'default',
  paymentOptions: () => []
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

// 默认支付选项配置
const defaultPaymentOptions: RadioOption[] = [
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

// 计算属性：使用传入的或默认的支付选项
const computedPaymentOptions = computed(() => {
  return props.paymentOptions && props.paymentOptions.length > 0 
    ? props.paymentOptions 
    : defaultPaymentOptions
})

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
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: radioSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
}

.x-radio-item:nth-child(1) { animation-delay: 0.03s; }
.x-radio-item:nth-child(2) { animation-delay: 0.06s; }
.x-radio-item:nth-child(3) { animation-delay: 0.09s; }
.x-radio-item:nth-child(4) { animation-delay: 0.12s; }
.x-radio-item:nth-child(5) { animation-delay: 0.15s; }
.x-radio-item:nth-child(6) { animation-delay: 0.18s; }
.x-radio-item:nth-child(7) { animation-delay: 0.21s; }
.x-radio-item:nth-child(8) { animation-delay: 0.24s; }
.x-radio-item:nth-child(9) { animation-delay: 0.27s; }
.x-radio-item:nth-child(10) { animation-delay: 0.30s; }

/* 列表模式样式 */
.radio-list .x-radio-item {
  border: 1px solid var(--x-border-color, #e5e7eb);
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: var(--x-bg-color, #ffffff);
  margin-bottom: 0.5rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(26, 26, 26, 0.02), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
}

.radio-list .x-radio-item:hover {
  border-color: var(--x-color-primary, #1a1a1a);
  background-color: var(--x-fill-color-lighter, #f9fafb);
  transform: translateY(-2px) scale(1.01);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  
  &::before {
    opacity: 1;
  }
}

.radio-list .x-radio-item.radio-item-checked {
  border-color: var(--x-color-primary, #1a1a1a);
  background: var(--x-gradient-bg-light, linear-gradient(135deg, #fafafa, #f3f4f6));
  box-shadow: 0 0 0 2px var(--x-shadow-primary-light, rgba(26, 26, 26, 0.15)), 0 4px 12px var(--x-shadow-primary-lighter, rgba(26, 26, 26, 0.1));
  animation: radioPulse 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
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
  transform: none;
  box-shadow: none;
}

.x-radio-item:hover .radio-button {
  border-color: var(--x-color-primary, #1a1a1a);
  transform: scale(1.15) rotate(10deg);
  box-shadow: 0 0 0 4px rgba(26, 26, 26, 0.08);
}

.x-radio-item.radio-item-checked .radio-button {
  border-color: var(--x-color-primary, #1a1a1a);
  background: var(--x-gradient-primary, linear-gradient(135deg, #1a1a1a 0%, #333 100%));
  animation: radioBtnPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 0 0 4px var(--x-shadow-primary, rgba(26, 26, 26, 0.12)), 0 2px 8px var(--x-shadow-primary-lg, rgba(26, 26, 26, 0.15));
}

.x-radio-item.radio-item-checked .radio-button-inner {
  background-color: var(--x-color-white, #ffffff);
  transform: translate(-50%, -50%) scale(1);
  animation: radioDotBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s;
  box-shadow: 0 0 4px var(--x-color-white, #ffffff);
}

.x-radio-item.radio-item-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.x-radio-item.radio-item-disabled:hover .radio-button {
  border-color: var(--x-border-color-light, #d1d5db);
  transform: none;
  box-shadow: none;
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
  border: 2px solid var(--x-border-color-light, #d1d5db);
  border-radius: 50%;
  background-color: var(--x-color-white, #ffffff);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  flex-shrink: 0;
  
  &::before {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--x-fill-color-primary-lighter, rgba(26, 26, 26, 0.1)), transparent);
    opacity: 0;
    transform: scale(0);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
}

.x-radio-item.radio-item-checked .radio-button::before {
  opacity: 1;
  transform: scale(1);
  animation: radioRipple 0.6s ease-out;
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
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
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
  color: var(--x-text-color-secondary, #6b7280);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.x-radio-item:hover .radio-icon {
  transform: scale(1.1) rotate(5deg);
}

.radio-item-checked .radio-icon {
  color: var(--x-text-color-primary, #1a1a1a);
  animation: iconPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.radio-text {
  flex: 1;
  min-width: 0;
}

.radio-label {
  font-weight: 500;
  color: var(--x-text-color-primary, #1a1a1a);
  transition: all 0.3s ease;
  font-size: 0.875rem;
  line-height: 1.5;
}

.x-radio-item:hover .radio-label {
  color: var(--x-text-color-primary, #1a1a1a);
  transform: translateX(2px);
}

.radio-item-checked .radio-label {
  color: var(--x-text-color-primary, #1a1a1a);
  font-weight: 600;
  transform: translateX(4px);
}

.radio-description {
  font-size: 0.75rem;
  color: var(--x-text-color-secondary, #6b7280);
  margin-top: 0.25rem;
  line-height: 1.4;
  transition: all 0.3s ease;
}

.x-radio-item:hover .radio-description {
  color: var(--x-text-color-regular, #4b5563);
  transform: translateX(2px);
}

.radio-item-checked .radio-description {
  color: var(--x-text-color-regular, #4b5563);
  transform: translateX(4px);
}

@keyframes iconPop {
  0% {
    transform: scale(1) rotate(0);
  }
  50% {
    transform: scale(1.3) rotate(10deg);
  }
  100% {
    transform: scale(1) rotate(0);
  }
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
  background: var(--x-gradient-bg-light, linear-gradient(135deg, #fafafa, #f3f4f6));
  border-color: var(--x-border-color, #e5e7eb);
}

.radio-disabled .x-radio-item:hover {
  border-color: var(--x-border-color, #e5e7eb);
  background: var(--x-gradient-bg-light, linear-gradient(135deg, #fafafa, #f3f4f6));
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transform: none;
}

.radio-disabled .radio-icon {
  background: rgba(243, 244, 246, 0.8);
  color: var(--x-text-color-placeholder, #9ca3af);
}

.radio-disabled .radio-label {
  color: var(--x-text-color-placeholder, #9ca3af);
}

.radio-disabled .radio-description {
  color: var(--x-text-color-placeholder, #9ca3af);
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
  background: var(--x-gradient-bg-light, linear-gradient(135deg, #fafafa, #f3f4f6));
  backdrop-filter: blur(10px);
  border: 1px solid var(--x-border-color-lighter, rgba(255, 255, 255, 0.2));
}

.payment-title {
  text-transform: capitalize;
  font-weight: 700;
  align-self: flex-start;
  margin: 0;
  color: var(--x-text-color-primary, #1a1a1a);
  font-size: 1.125rem;
  letter-spacing: -0.025em;
}

.payment-subtitle {
  font-size: 0.75rem;
  align-self: flex-start;
  text-wrap: wrap;
  color: var(--x-text-color-secondary, #6b7280);
  padding-bottom: 0.5rem;
  margin: 0;
  line-height: 1.4;
}

.payment-highlight {
  font-weight: 800;
  text-decoration: underline;
  color: #1a1a1a;
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
  background: rgba(249, 250, 251, 0.9);
  border-color: rgba(26, 26, 26, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px 0 rgba(26, 26, 26, 0.15);
}

.payment-option.payment-option-checked {
  border-color: var(--x-color-primary, #1a1a1a);
  color: var(--x-color-primary, #1a1a1a);
  background: var(--x-gradient-primary-lighter, linear-gradient(135deg, rgba(26, 26, 26, 0.08) 0%, rgba(26, 26, 26, 0.04) 100%));
  font-weight: 700;
  box-shadow: 0 4px 16px 0 rgba(26, 26, 26, 0.25);
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
  background: rgba(26, 26, 26, 0.08);
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
  accent-color: #1a1a1a;
  outline: none;
  box-shadow: none;
}

.payment-input:focus {
  outline: none;
  box-shadow: none;
}

.payment-input:checked {
  accent-color: #1a1a1a;
}

/* 支付图标组件样式 */
.payment-icon svg {
  width: 1.5rem;
  height: 1.5rem;
  fill: currentColor;
}

/* ===== 动画关键帧 ===== */
@keyframes radioSlideIn {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes radioBtnPop {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.25) rotate(-8deg);
  }
  50% {
    transform: scale(0.9) rotate(5deg);
  }
  70% {
    transform: scale(1.08) rotate(-3deg);
  }
  100% {
    transform: scale(1) rotate(0);
  }
}

@keyframes radioDotBounce {
  0% {
    transform: translate(-50%, -50%) scale(0) rotate(-180deg);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.3) rotate(20deg);
  }
  100% {
    transform: translate(-50%, -50%) scale(1) rotate(0);
  }
}

@keyframes radioRipple {
  0% {
    opacity: 0.8;
    transform: scale(0);
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 0;
    transform: scale(2);
  }
}

@keyframes radioPulse {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.03);
  }
  50% {
    transform: scale(0.98);
  }
  70% {
    transform: scale(1.01);
  }
  100% {
    transform: scale(1);
  }
}
</style>