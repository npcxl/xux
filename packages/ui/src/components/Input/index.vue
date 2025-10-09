<template>
  <div class="x-input-group" :style="{ width: width }">
    <input
      ref="inputRef"
      :type="type"
      :value="modelValue"
      :placeholder="hasLabel ? '' : placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :maxlength="maxlength"
      :minlength="minlength"
      :autocomplete="autocomplete"
      :class="[
        'x-input',
        {
          'x-input--disabled': disabled,
          'x-input--error': error,
          'x-input--clearable': clearable && modelValue,
          'x-input--with-label': hasLabel
        }
      ]"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
      @keydown="handleKeydown"
      @keyup="handleKeyup"
      @change="handleChange"
    />
    <label 
      v-if="label" 
      :class="[
        'x-input-label',
        {
          'x-input-label--active': isFocused || hasValue,
          'x-input-label--error': error
        }
      ]"
    >
      {{ label }}
    </label>
    
    <!-- 清除按钮 -->
    <button
      v-if="clearable && modelValue && !disabled"
      type="button"
      class="x-input-clear"
      @click="handleClear"
      @mousedown.prevent
    >
      <Icon icon="bi:x-circle"></Icon>
    </button>
    
    <!-- 字数统计 -->
    <div v-if="showWordLimit && maxlength" class="x-input-count">
      {{ currentLength }} / {{ maxlength }}
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
/**
 * Input 输入框组件 适用于表单输入
 * @displayName XInput
 */

export interface InputProps {
  modelValue?: string | number
  type?: string
  placeholder?: string
  label?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  clearable?: boolean
  showWordLimit?: boolean
  maxlength?: number
  minlength?: number
  autocomplete?: string
  error?: boolean
  width?: string
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
  width: '100%'
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

const inputRef = ref<HTMLInputElement>()
const isFocused = ref(false)

// 计算属性
const hasLabel = computed(() => !!props.label)

const hasValue = computed(() => {
  const value = props.modelValue
  return value !== undefined && value !== null && value !== ''
})

const currentLength = computed(() => {
  return String(props.modelValue || '').length
})

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
.x-input-group {
  font-family: var(--x-font-family, 'Segoe UI', sans-serif);
  position: relative;
  display: inline-block;
}

.x-input {
  width: 100%;
  font-size: var(--x-font-size-sm, 14px);
  padding: 0.8em 1em;
  outline: none;
  border: 2px solid var(--x-color-gray-300, rgb(200, 200, 200));
  background-color: transparent;
  border-radius: var(--x-radius-lg, 12px);
  transition: all var(--x-transition, 0.3s ease);
  color: var(--x-color-gray-900, #1a1a1a);
}

.x-input:hover:not(:disabled) {
  border-color: var(--x-color-gray-400, rgb(170, 170, 170));
}

.x-input:focus {
  border-color: var(--x-color-primary, #1a1a1a);
  box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
}

.x-input--disabled {
  background-color: var(--x-color-gray-100, #f5f5f5);
  cursor: not-allowed;
  opacity: 0.6;
}

.x-input--error {
  border-color: var(--x-color-danger, #ef4444);
}

.x-input--error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.x-input--clearable {
  padding-right: 2.5em;
}

.x-input-label {
  position: absolute;
  left: 1em;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 0.4em;
  font-size: var(--x-font-size-sm, 14px);
  color: var(--x-color-gray-500, rgb(100, 100, 100));
  background-color: white;
  pointer-events: none;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: left center;
  white-space: nowrap;
  z-index: 1;
}

/* Label 浮动状态 */
.x-input-label--active {
  top: 0;
  transform: translateY(-50%) scale(0.85);
  font-size: var(--x-font-size-xs, 12px);
  color: var(--x-color-primary, #1a1a1a);
  font-weight: 500;
}

/* Label 错误状态 */
.x-input-label--error.x-input-label--active {
  color: var(--x-color-danger, #ef4444);
}

/* 禁用状态的 label */
.x-input--disabled ~ .x-input-label {
  color: var(--x-color-gray-400, #aaa);
  opacity: 0.6;
}

.x-input-clear {
  position: absolute;
  right: 0.8em;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.2em;
  color: var(--x-color-gray-400, #aaa);
  transition: color 0.2s;
  font-size: 1.2em;
  line-height: 1;
}

.x-input-clear:hover {
  color: var(--x-color-gray-600, #666);
}

.x-input-count {
  position: absolute;
  right: 0.8em;
  bottom: -1.5em;
  font-size: var(--x-font-size-xs, 12px);
  color: var(--x-color-gray-500, #888);
}
</style>