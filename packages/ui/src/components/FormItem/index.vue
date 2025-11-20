<template>
  <div 
    class="x-form-item" 
    :class="{
      'x-form-item--error': hasError,
      'x-form-item--required': isRequired,
      'x-form-item--validating': validating,
      'x-form-item--inline': formContext?.props.inline
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
  transition: all var(--x-transition);
}

/* 行内表单样式 */
.x-form-item--inline {
  display: inline-flex !important;
  margin-right: 0;
  margin-bottom: 0;
  vertical-align: top;
  flex-wrap: nowrap;
  align-items: center;
}

.x-form-item--inline .x-form-item__label {
  white-space: nowrap;
  padding-top: 0;
  padding-bottom: 0;
  text-align: right;
  min-width: auto;
}

.x-form-item--inline .x-form-item__content {
  flex: 0 0 auto;
  width: auto;
  min-width: 0;
}

.x-form-item__label {
  flex-shrink: 0;
  padding-right: 12px;
  padding-top: 12px;
  font-size: var(--x-font-size-sm);
  color: var(--x-text-color-primary);
  line-height: 1.5;
  font-weight: 500;
  position: relative;
  text-align: right; /* 桌面端默认右对齐 */
}

.x-form-item__asterisk {
  color: var(--x-color-danger);
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
  color: var(--x-color-danger);
  font-size: var(--x-font-size-xs);
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
  background-color: var(--x-color-danger);
  color: var(--x-color-white);
  font-size: 12px;
  font-weight: bold;
  flex-shrink: 0;
}

.x-form-item--error :deep(.x-input-wrapper) {
  border-color: var(--x-color-danger) !important;
  transition: border-color var(--x-transition);
}

.x-form-item--validating :deep(.x-input-wrapper) {
  border-color: var(--x-color-primary);
  transition: border-color var(--x-transition);
}

/* 添加聚焦时的流畅过渡 */
.x-form-item :deep(.x-input-wrapper) {
  transition: all var(--x-transition);
}

.x-form-item :deep(.x-input-wrapper):focus-within {
  box-shadow: var(--x-shadow-focus-primary), var(--x-shadow);
}

.x-form-item--error :deep(.x-input-wrapper):focus-within {
  box-shadow: var(--x-shadow-focus-danger), var(--x-shadow);
}

/* 错误提示进入和离开动画 - 更流畅 */
.x-form-error-enter-active,
.x-form-error-leave-active {
  transition: all var(--x-transition);
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
  .x-form-item:not(.x-form-item--inline) {
    flex-direction: column;
    margin-bottom: 20px;
    align-items: stretch;
  }
  
  .x-form-item:not(.x-form-item--inline) .x-form-item__label {
    width: 100% !important;
    padding: 0 0 8px 0;
    text-align: left !important; /* 移动端强制左对齐 */
  }
  
  .x-form-item:not(.x-form-item--inline) .x-form-item__content {
    width: 100%;
  }
  
  .x-form-item__error {
    font-size: 12px;
    margin-top: 4px;
  }
  
  /* 行内表单在移动端的样式调整 */
  .x-form-item--inline {
    margin-bottom: 12px;
  }
}
</style>

