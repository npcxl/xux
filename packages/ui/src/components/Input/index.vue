<template>
  <div class="x-input-field" :style="{ width: width }">
    <!-- 顶部标签 -->
    <label 
      v-if="label" 
      :class="[
        'x-input-top-label',
        {
          'x-input-top-label--required': required,
          'x-input-top-label--error': error,
          'x-input-top-label--success': success,
          'x-input-top-label--disabled': disabled
        }
      ]"
    >
      {{ label }}
      <span v-if="required" class="x-input-required-mark">*</span>
    </label>

    <!-- 输入框容器 -->
    <div 
      :class="[
        'x-input-wrapper',
        `x-input-wrapper--${size}`,
        {
          'x-input-wrapper--disabled': disabled,
          'x-input-wrapper--error': error,
          'x-input-wrapper--success': success,
          'x-input-wrapper--focused': isFocused,
          'x-input-wrapper--with-prefix': hasPrefix,
          'x-input-wrapper--with-suffix': hasSuffix || clearable || (type === 'password' && showPasswordToggle)
        }
      ]"
    >
      <!-- 前缀图标 -->
      <span v-if="hasPrefix" class="x-input-prefix">
        <slot name="prefix">
          <Icon v-if="prefixIcon" :icon="prefixIcon" />
        </slot>
      </span>

      <!-- 输入框 -->
      <input
        ref="inputRef"
        :type="actualType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :maxlength="maxlength"
        :minlength="minlength"
        :autocomplete="autocomplete"
        :aria-invalid="error"
        :aria-label="label || placeholder"
        class="x-input"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @keydown="handleKeydown"
        @keyup="handleKeyup"
        @change="handleChange"
      />

      <!-- 后缀区域 -->
      <span v-if="hasSuffix || clearable || (type === 'password' && showPasswordToggle) || (type === 'number' && !disabled && !readonly) || loading" class="x-input-suffix">
        <!-- 加载状态 -->
        <Icon v-if="loading" icon="mdi:loading" class="x-input-icon--loading" />
        
        <!-- 数字步进器 -->
        <div v-else-if="type === 'number' && !disabled && !readonly" class="x-input-number-controls">
          <button
            type="button"
            class="x-input-number-btn x-input-number-btn--up"
            :disabled="isMaxDisabled"
            tabindex="-1"
            @click="handleIncrease"
            @mousedown.prevent
          >
            <Icon icon="mdi:chevron-up" />
          </button>
          <button
            type="button"
            class="x-input-number-btn x-input-number-btn--down"
            :disabled="isMinDisabled"
            tabindex="-1"
            @click="handleDecrease"
            @mousedown.prevent
          >
            <Icon icon="mdi:chevron-down" />
          </button>
        </div>
        
        <!-- 密码可见性切换 -->
        <button
          v-else-if="type === 'password' && showPasswordToggle && !disabled"
          type="button"
          class="x-input-icon-btn"
          tabindex="-1"
          @click="togglePasswordVisibility"
          @mousedown.prevent
        >
          <Icon :icon="passwordVisible ? 'mdi:eye-off' : 'mdi:eye'" />
        </button>
        
        <!-- 清除按钮 -->
        <button
          v-else-if="clearable && modelValue && !disabled && !readonly && type !== 'number'"
          type="button"
          class="x-input-icon-btn x-input-clear"
          tabindex="-1"
          @click="handleClear"
          @mousedown.prevent
        >
          <Icon icon="mdi:close-circle" />
        </button>
        
        <!-- 状态图标 -->
        <Icon 
          v-else-if="error && !loading" 
          icon="mdi:alert-circle" 
          class="x-input-status-icon x-input-status-icon--error" 
        />
        <Icon 
          v-else-if="success && !loading" 
          icon="mdi:check-circle" 
          class="x-input-status-icon x-input-status-icon--success" 
        />
        
        <!-- 自定义后缀 -->
        <slot v-else name="suffix">
          <Icon v-if="suffixIcon" :icon="suffixIcon" />
        </slot>
      </span>
    </div>

    <!-- 底部提示信息 -->
    <div v-if="showHelpText || (showWordLimit && maxlength)" class="x-input-bottom">
      <!-- 帮助文本或错误信息 -->
      <transition name="x-input-message">
        <div 
          v-if="showHelpText"
          :class="[
            'x-input-help-text',
            {
              'x-input-help-text--error': error,
              'x-input-help-text--success': success
            }
          ]"
        >
          <Icon v-if="error" icon="mdi:alert-circle-outline" class="x-input-help-icon" />
          <Icon v-else-if="success" icon="mdi:check-circle-outline" class="x-input-help-icon" />
          {{ currentHelpText }}
        </div>
      </transition>
      
      <!-- 字数统计 -->
      <div 
        v-if="showWordLimit && maxlength" 
        :class="[
          'x-input-count',
          { 'x-input-count--limit': isReachingLimit }
        ]"
      >
        {{ currentLength }} / {{ maxlength }}
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, useSlots } from 'vue'
import { Icon } from '@iconify/vue'
/**
 * Input 输入框组件 - 企业级输入框组件
 * @displayName XInput
 */

export interface InputProps {
  /** 输入框绑定值 */
  modelValue?: string | number
  /** 输入框类型 */
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
  /** 占位文本 */
  placeholder?: string
  /** 标签文本 */
  label?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否只读 */
  readonly?: boolean
  /** 是否必填 */
  required?: boolean
  /** 是否显示清除按钮 */
  clearable?: boolean
  /** 是否显示字数统计 */
  showWordLimit?: boolean
  /** 最大输入长度 */
  maxlength?: number
  /** 最小输入长度 */
  minlength?: number
  /** 自动完成 */
  autocomplete?: string
  /** 错误状态 */
  error?: boolean
  /** 成功状态 */
  success?: boolean
  /** 宽度 */
  width?: string
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large'
  /** 前缀图标 */
  prefixIcon?: string
  /** 后缀图标 */
  suffixIcon?: string
  /** 加载状态 */
  loading?: boolean
  /** 帮助文本 */
  helpText?: string
  /** 错误提示文本 */
  errorText?: string
  /** 成功提示文本 */
  successText?: string
  /** 密码可见性切换按钮 */
  showPasswordToggle?: boolean
  // 数字步进器相关
  /** 步进值 */
  step?: number
  /** 最小值 */
  min?: number
  /** 最大值 */
  max?: number
  /** 精度 */
  precision?: number
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  placeholder: '',
  label: '',
  disabled: false,
  readonly: false,
  required: false,
  clearable: false,
  showWordLimit: false,
  autocomplete: 'off',
  error: false,
  success: false,
  width: '100%',
  size: 'medium',
  loading: false,
  showPasswordToggle: true,
  step: 1,
  min: -Infinity,
  max: Infinity,
  precision: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'input': [value: string | number, event: Event]
  'change': [value: string | number, event: Event]
  'blur': [event: FocusEvent]
  'focus': [event: FocusEvent]
  'clear': []
  'keydown': [event: KeyboardEvent]
  'keyup': [event: KeyboardEvent]
}>()

const slots = useSlots()
const inputRef = ref<HTMLInputElement>()
const isFocused = ref(false)
const passwordVisible = ref(false)

// 计算属性
const currentLength = computed(() => {
  return String(props.modelValue || '').length
})

const hasPrefix = computed(() => {
  return !!slots.prefix || !!props.prefixIcon
})

const hasSuffix = computed(() => {
  return !!slots.suffix || !!props.suffixIcon
})

const actualType = computed(() => {
  if (props.type === 'password' && passwordVisible.value) {
    return 'text'
  }
  return props.type
})

const isReachingLimit = computed(() => {
  if (!props.maxlength) return false
  return currentLength.value >= props.maxlength * 0.9
})

const showHelpText = computed(() => {
  if (props.error && props.errorText) return true
  if (props.success && props.successText) return true
  if (props.helpText && !props.error && !props.success) return true
  return false
})

const currentHelpText = computed(() => {
  if (props.error && props.errorText) return props.errorText
  if (props.success && props.successText) return props.successText
  return props.helpText || ''
})

// 数字步进器相关
const numericValue = computed(() => {
  const val = Number(props.modelValue)
  return isNaN(val) ? 0 : val
})

const isMaxDisabled = computed(() => {
  return numericValue.value >= props.max
})

const isMinDisabled = computed(() => {
  return numericValue.value <= props.min
})

const toPrecision = (num: number, precision?: number) => {
  if (precision === undefined) return num
  return Number(num.toFixed(precision))
}

const handleIncrease = () => {
  if (props.disabled || props.readonly || isMaxDisabled.value) return
  
  const newValue = numericValue.value + props.step
  const result = Math.min(newValue, props.max)
  const finalValue = toPrecision(result, props.precision)
  
  emit('update:modelValue', finalValue)
  emit('change', finalValue, new Event('change'))
}

const handleDecrease = () => {
  if (props.disabled || props.readonly || isMinDisabled.value) return
  
  const newValue = numericValue.value - props.step
  const result = Math.max(newValue, props.min)
  const finalValue = toPrecision(result, props.precision)
  
  emit('update:modelValue', finalValue)
  emit('change', finalValue, new Event('change'))
}

// 事件处理
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  emit('update:modelValue', value)
  emit('input', value, event)
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  emit('change', value, event)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
}

const handleKeyup = (event: KeyboardEvent) => {
  emit('keyup', event)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value
}

// 暴露方法
const focus = () => {
  inputRef.value?.focus()
}

const blur = () => {
  inputRef.value?.blur()
}

const select = () => {
  inputRef.value?.select()
}

defineExpose({
  focus,
  blur,
  select,
  ref: inputRef
})
</script>
<style scoped>
/* ================================
   字段容器
   ================================ */
.x-input-field {
  font-family: var(--x-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif);
  width: 100%;
  margin-bottom: 0;
}

/* ================================
   顶部标签
   ================================ */
.x-input-top-label {
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  color: var(--x-text-color-regular, #374151);
  margin-bottom: 8px;
  line-height: 1.4;
  user-select: none;
  transition: color 0.2s ease;
}

.x-input-top-label--error {
  color: var(--x-color-danger, #ef4444);
}

.x-input-top-label--success {
  color: var(--x-color-success, #10b981);
}

.x-input-top-label--disabled {
  color: var(--x-text-color-placeholder, #9ca3af);
  opacity: 0.7;
}

.x-input-required-mark {
  color: var(--x-color-danger, #ef4444);
  margin-left: 4px;
  font-weight: 600;
}

/* ================================
   输入框容器
   ================================ */
.x-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  background: var(--x-bg-color, #ffffff);
  border: 2px solid var(--x-border-color, #e5e7eb);
  border-radius: 10px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
}

.x-input-wrapper:hover:not(.x-input-wrapper--disabled) {
  border-color: var(--x-border-color-light, #d1d5db);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.x-input-wrapper--focused {
  border-color: var(--x-color-primary, #1a1a1a);
  background: var(--x-bg-color, #ffffff);
  box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.08), 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* ================================
   输入框主体
   ================================ */
.x-input {
  flex: 1;
  width: 100%;
  font-size: inherit;
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  background: transparent;
  color: var(--x-text-color-primary, #1f2937);
  font-family: inherit;
  line-height: 1.5;
  font-weight: 400;
  transition: all 0.2s ease;
}

.x-input::placeholder {
  color: var(--x-text-color-placeholder, #9ca3af);
  opacity: 1;
  font-weight: 400;
}

.x-input:disabled {
  cursor: not-allowed;
  color: var(--x-text-color-placeholder, #9ca3af) !important;
  -webkit-text-fill-color: var(--x-text-color-placeholder, #9ca3af);
}

/* 隐藏浏览器默认的数字输入框箭头 */
.x-input[type="number"]::-webkit-inner-spin-button,
.x-input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.x-input[type="number"] {
  appearance: textfield;
  -moz-appearance: textfield;
}

/* ================================
   尺寸变体
   ================================ */
.x-input-wrapper--small {
  min-height: 36px;
  font-size: 13px;
}

.x-input-wrapper--small .x-input {
  padding: 8px 12px;
}

.x-input-wrapper--small.x-input-wrapper--with-prefix .x-input {
  padding-left: 36px;
}

.x-input-wrapper--small.x-input-wrapper--with-suffix .x-input {
  padding-right: 36px;
}

.x-input-wrapper--medium {
  min-height: 42px;
  font-size: 14px;
}

.x-input-wrapper--medium .x-input {
  padding: 10px 14px;
}

.x-input-wrapper--medium.x-input-wrapper--with-prefix .x-input {
  padding-left: 42px;
}

.x-input-wrapper--medium.x-input-wrapper--with-suffix .x-input {
  padding-right: 42px;
}

.x-input-wrapper--medium .x-input[type="number"] {
  padding-right: 50px;
}

.x-input-wrapper--large {
  min-height: 48px;
  font-size: 16px;
}

.x-input-wrapper--large .x-input {
  padding: 12px 16px;
}

.x-input-wrapper--large.x-input-wrapper--with-prefix .x-input {
  padding-left: 48px;
}

.x-input-wrapper--large.x-input-wrapper--with-suffix .x-input {
  padding-right: 48px;
}

.x-input-wrapper--large .x-input[type="number"] {
  padding-right: 56px;
}

.x-input-wrapper--small .x-input[type="number"] {
  padding-right: 44px;
}

/* ================================
   状态样式
   ================================ */
/* 禁用状态 */
.x-input-wrapper--disabled {
  background-color: var(--x-bg-color-disabled, #f9fafb);
  border-color: var(--x-border-color, #e5e7eb);
  cursor: not-allowed;
  opacity: 0.6;
}

.x-input-wrapper--disabled:hover {
  border-color: var(--x-border-color, #e5e7eb);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
}

/* 错误状态 */
.x-input-wrapper--error {
  border-color: #fca5a5;
  background: var(--x-fill-color-danger-lighter, #fef2f2);
}

.x-input-wrapper--error:hover:not(.x-input-wrapper--disabled) {
  border-color: var(--x-border-color-danger-light, #f87171);
  box-shadow: 0 2px 6px rgba(239, 68, 68, 0.08);
}

.x-input-wrapper--error.x-input-wrapper--focused {
  border-color: var(--x-border-color-danger, #ef4444);
  background: var(--x-bg-color, #ffffff);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.10), 0 4px 12px rgba(239, 68, 68, 0.12);
}

/* 成功状态 */
.x-input-wrapper--success {
  border-color: var(--x-border-color-success, #86efac);
  background: var(--x-fill-color-success-lighter, #f0fdf4);
}

.x-input-wrapper--success:hover:not(.x-input-wrapper--disabled) {
  border-color: var(--x-border-color-success-light, #4ade80);
  box-shadow: 0 2px 6px rgba(16, 185, 129, 0.08);
}

.x-input-wrapper--success.x-input-wrapper--focused {
  border-color: var(--x-border-color-success, #10b981);
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.10), 0 4px 12px rgba(16, 185, 129, 0.12);
}

/* ================================
   前缀和后缀
   ================================ */
.x-input-prefix,
.x-input-suffix {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--x-text-color-placeholder, #6b7280);
  font-size: 18px;
  line-height: 1;
  pointer-events: none;
  z-index: 2;
  transition: color 0.2s ease;
}

.x-input-prefix {
  left: 14px;
}

.x-input-wrapper--small .x-input-prefix {
  left: 12px;
  font-size: 16px;
}

.x-input-wrapper--large .x-input-prefix {
  left: 16px;
  font-size: 20px;
}

.x-input-wrapper--focused .x-input-prefix {
  color: var(--x-color-primary, #1a1a1a);
}

.x-input-suffix {
  right: 14px;
  pointer-events: auto;
  display: flex;
  gap: 4px;
}

.x-input-wrapper--small .x-input-suffix {
  right: 12px;
  gap: 3px;
  font-size: 16px;
}

.x-input-wrapper--large .x-input-suffix {
  right: 16px;
  gap: 6px;
  font-size: 20px;
}

/* ================================
   图标按钮
   ================================ */
.x-input-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--x-text-color-placeholder, #9ca3af);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 6px;
  line-height: 1;
  flex-shrink: 0;
}

.x-input-icon-btn:hover {
  color: var(--x-text-color-primary, #1f2937);
  background-color: rgba(0, 0, 0, 0.05);
  transform: scale(1.05);
}

.x-input-icon-btn:active {
  transform: scale(0.95);
}

.x-input-clear {
  color: var(--x-text-color-placeholder, #9ca3af);
}

.x-input-clear:hover {
  color: var(--x-color-danger, #ef4444);
  background-color: rgba(239, 68, 68, 0.08);
}

/* ================================
   状态图标
   ================================ */
.x-input-status-icon {
  pointer-events: none;
  line-height: 1;
  flex-shrink: 0;
}

.x-input-status-icon--error {
  color: var(--x-color-danger, #ef4444);
}

.x-input-status-icon--success {
  color: var(--x-color-success, #10b981);
}

/* ================================
   加载图标
   ================================ */
.x-input-icon--loading {
  animation: x-input-rotate 1s linear infinite;
  color: var(--x-color-primary, #1a1a1a);
}

@keyframes x-input-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* ================================
   数字步进器
   ================================ */
.x-input-number-controls {
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin-left: 4px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform: translateX(4px);
}

.x-input-wrapper--focused .x-input-number-controls {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(0);
}

.x-input-number-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 16px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--x-text-color-placeholder, #6b7280);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 4px;
  font-size: 14px;
  line-height: 1;
}

.x-input-number-btn:hover:not(:disabled) {
  color: var(--x-color-primary, #1a1a1a);
  background-color: rgba(0, 0, 0, 0.06);
  transform: scale(1.1);
}

.x-input-number-btn:active:not(:disabled) {
  transform: scale(0.95);
}

.x-input-number-btn:disabled {
  cursor: not-allowed;
  opacity: 0.3;
  color: var(--x-border-color-light, #d1d5db);
}

/* ================================
   底部区域
   ================================ */
.x-input-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 8px;
  gap: 12px;
  min-height: 20px;
}

/* ================================
   帮助文本和错误提示
   ================================ */
.x-input-help-text {
  font-size: 13px;
  color: var(--x-text-color-placeholder, #6b7280);
  line-height: 1.6;
  display: flex;
  align-items: flex-start;
  gap: 6px;
  flex: 1;
  font-weight: 400;
}

.x-input-help-text--error {
  color: var(--x-color-danger, #ef4444);
}

.x-input-help-text--success {
  color: var(--x-color-success, #10b981);
}

.x-input-help-icon {
  flex-shrink: 0;
  margin-top: 2px;
  font-size: 15px;
}

/* 消息过渡动画 */
.x-input-message-enter-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.x-input-message-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.x-input-message-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}

.x-input-message-leave-to {
  opacity: 0;
  transform: translateY(-3px);
}

/* ================================
   字数统计
   ================================ */
.x-input-count {
  font-size: 13px;
  color: var(--x-text-color-placeholder, #9ca3af);
  line-height: 1.6;
  white-space: nowrap;
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
  font-weight: 500;
  transition: color 0.2s ease;
}

.x-input-count--limit {
  color: var(--x-color-warning, #f59e0b);
  font-weight: 600;
  animation: x-input-count-pulse 2s ease-in-out infinite;
}

@keyframes x-input-count-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>