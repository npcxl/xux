<template>
  <div 
    class="x-form-item" 
    :class="{
      'x-form-item--error': hasError,
      'x-form-item--required': isRequired,
      'x-form-item--validating': validating
    }"
  >
    <label 
      v-if="label" 
      class="x-form-item__label" 
      :style="labelStyle"
    >
      <span v-if="isRequired" class="x-form-item__asterisk">*</span>
      {{ label }}
    </label>
    <div class="x-form-item__content">
      <slot></slot>
      <transition name="x-form-error">
        <div v-if="hasError" class="x-form-item__error">
          <span class="x-form-item__error-icon">!</span>
          {{ errorMessage }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref, watch } from 'vue'
import type { FormRule } from '../Form/index.vue'

/**
 * FormItem 表单项组件
 * @displayName XFormItem
 */

export interface FormItemProps {
  label?: string
  prop?: string
  required?: boolean
  rules?: FormRule | FormRule[]
}

const props = defineProps<FormItemProps>()

const formContext = inject<any>('xForm', null)

const validating = ref(false)
const errorMessage = ref('')

const isRequired = computed(() => {
  if (props.required) return true
  
  if (!props.prop || !formContext?.props.rules) return false
  
  const rules = formContext.props.rules[props.prop]
  if (!rules) return false
  
  const ruleArray = Array.isArray(rules) ? rules : [rules]
  return ruleArray.some(rule => rule.required)
})

const hasError = computed(() => {
  if (!props.prop || !formContext) return false
  return formContext.errors.has(props.prop)
})

const labelStyle = computed(() => {
  if (!formContext) return {}
  
  return {
    width: formContext.props.labelWidth
  }
})

// 监听错误信息
watch(() => formContext?.errors.get(props.prop), (newError) => {
  errorMessage.value = newError || ''
})

// 触发验证
const validate = async (trigger?: string) => {
  if (!props.prop || !formContext) return true
  
  const rules = formContext.props.rules?.[props.prop]
  if (!rules) return true
  
  // 检查触发条件
  const ruleArray = Array.isArray(rules) ? rules : [rules]
  const shouldValidate = ruleArray.some(rule => 
    !rule.trigger || rule.trigger === trigger || trigger === 'submit'
  )
  
  if (!shouldValidate) return true
  
  validating.value = true
  try {
    const result = await formContext.validateField(props.prop)
    return result
  } finally {
    validating.value = false
  }
}

onMounted(() => {
  if (props.prop && formContext) {
    formContext.registerField(props.prop, { validate })
  }
})

onUnmounted(() => {
  if (props.prop && formContext) {
    formContext.unregisterField(props.prop)
  }
})

defineExpose({
  validate
})
</script>

<style scoped>
.x-form-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 24px;
  position: relative;
  transition: all 0.3s ease;
}

.x-form-item__label {
  flex-shrink: 0;
  padding-right: 12px;
  padding-top: 12px;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  font-weight: 500;
  position: relative;
}

.x-form-item__asterisk {
  color: #ff4d4f;
  margin-right: 4px;
  font-size: 16px;
  line-height: 1;
  position: relative;
  top: 1px;
}

.x-form-item__content {
  flex: 1;
  position: relative;
  min-width: 0;
}

.x-form-item__error {
  color: #ff4d4f;
  font-size: 13px;
  line-height: 1.5;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.x-form-item__error-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #ff4d4f;
  color: white;
  font-size: 12px;
  font-weight: bold;
  flex-shrink: 0;
}

.x-form-item--error :deep(.x-input),
.x-form-item--error :deep(.x-radio-group),
.x-form-item--error :deep(.x-checkboxes-group) {
  border-color: #ff4d4f !important;
  transition: border-color 0.3s ease;
}

.x-form-item--validating :deep(.x-input) {
  border-color: #1890ff;
  transition: border-color 0.3s ease;
}

/* 添加聚焦时的流畅过渡 */
.x-form-item :deep(.x-input) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.x-form-item :deep(.x-input:focus) {
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

.x-form-item--error :deep(.x-input:focus) {
  box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.1);
}

/* 错误提示进入和离开动画 - 更流畅 */
.x-form-error-enter-active,
.x-form-error-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.x-form-error-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

.x-form-error-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.x-form-error-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.x-form-error-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

/* 必填项标签 */
.x-form-item--required .x-form-item__label {
  position: relative;
}

/* 响应式 */
@media (max-width: 768px) {
  .x-form-item {
    flex-direction: column;
    margin-bottom: 20px;
  }
  
  .x-form-item__label {
    width: 100% !important;
    padding: 0 0 8px 0;
  }
}
</style>

