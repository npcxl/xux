<template>
  <form 
    class="x-form" 
    :class="[
      `x-form--label-${labelPosition}`,
      { 'x-form--inline': inline }
    ]"
    @submit.prevent="handleSubmit"
  >
    <slot></slot>
    <div v-if="$slots.footer" class="x-form__footer">
      <slot name="footer"></slot>
    </div>
  </form>
</template>

<script setup lang="ts">
import { provide, reactive } from 'vue'

/**
 * Form 表单组件
 * @displayName XForm
 */

export interface FormRule {
  required?: boolean
  message?: string
  pattern?: RegExp
  min?: number
  max?: number
  validator?: (value: any) => boolean | Promise<boolean>
  trigger?: 'blur' | 'change' | 'submit'
}

export interface FormRules {
  [key: string]: FormRule | FormRule[]
}

export interface FormProps {
  model: Record<string, any>
  rules?: FormRules
  labelPosition?: 'left' | 'right' | 'top'
  labelWidth?: string
  inline?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<FormProps>(), {
  labelPosition: 'right',
  labelWidth: '100px',
  inline: false,
  disabled: false
})

const emit = defineEmits<{
  (e: 'submit', model: Record<string, any>): void
  (e: 'validate', valid: boolean, errors: Record<string, string>): void
}>()

// 存储所有 FormItem 的验证状态
const fields = reactive<Map<string, any>>(new Map())
const errors = reactive<Map<string, string>>(new Map())

// 注册 FormItem
const registerField = (prop: string, field: any) => {
  fields.set(prop, field)
}

// 注销 FormItem
const unregisterField = (prop: string) => {
  fields.delete(prop)
  errors.delete(prop)
}

// 验证单个字段
const validateField = async (prop: string): Promise<boolean> => {
  const rules = props.rules?.[prop]
  if (!rules) return true

  const value = props.model[prop]
  const ruleArray = Array.isArray(rules) ? rules : [rules]

  for (const rule of ruleArray) {
    // 必填验证
    if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
      errors.set(prop, rule.message || `${prop}是必填项`)
      return false
    }

    // 正则验证
    if (rule.pattern && !rule.pattern.test(String(value))) {
      errors.set(prop, rule.message || `${prop}格式不正确`)
      return false
    }

    // 最小长度
    if (rule.min && String(value).length < rule.min) {
      errors.set(prop, rule.message || `${prop}最少${rule.min}个字符`)
      return false
    }

    // 最大长度
    if (rule.max && String(value).length > rule.max) {
      errors.set(prop, rule.message || `${prop}最多${rule.max}个字符`)
      return false
    }

    // 自定义验证器
    if (rule.validator) {
      const result = await rule.validator(value)
      if (!result) {
        errors.set(prop, rule.message || `${prop}验证失败`)
        return false
      }
    }
  }

  errors.delete(prop)
  return true
}

// 验证所有字段
const validate = async (): Promise<boolean> => {
  const promises = Array.from(fields.keys()).map(prop => validateField(prop))
  const results = await Promise.all(promises)
  const valid = results.every(result => result)
  
  const errorObj: Record<string, string> = {}
  errors.forEach((msg, prop) => {
    errorObj[prop] = msg
  })
  
  emit('validate', valid, errorObj)
  return valid
}

// 重置表单
const resetFields = () => {
  errors.clear()
  fields.forEach((_field, prop) => {
    if (props.model[prop] !== undefined) {
      props.model[prop] = Array.isArray(props.model[prop]) ? [] : ''
    }
  })
}

// 清除验证
const clearValidate = (props?: string | string[]) => {
  if (!props) {
    errors.clear()
    return
  }
  
  const propsArray = Array.isArray(props) ? props : [props]
  propsArray.forEach(prop => errors.delete(prop))
}

// 提交表单
const handleSubmit = async () => {
  const valid = await validate()
  if (valid) {
    emit('submit', props.model)
  }
}

// 提供给 FormItem 使用
provide('xForm', {
  props,
  registerField,
  unregisterField,
  validateField,
  errors
})

// 暴露方法给父组件
defineExpose({
  validate,
  validateField,
  resetFields,
  clearValidate
})
</script>

<style scoped>
.x-form {
  width: 100%;
}

.x-form--inline {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-start;
}

.x-form--inline :deep(.x-form-item) {
  margin-bottom: 0;
}

.x-form--inline :deep(.x-button),
.x-form--inline :deep(button) {
  margin-top: 0;
  vertical-align: top;
}

.x-form--label-left :deep(.x-form-item__label) {
  text-align: left;
}

.x-form--label-right :deep(.x-form-item__label) {
  text-align: right;
}

.x-form--label-top :deep(.x-form-item) {
  flex-direction: column;
}

.x-form--label-top :deep(.x-form-item__label) {
  text-align: left;
  width: 100% !important;
  padding-bottom: 8px;
}

.x-form__footer {
  width: 100%;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
}

/* 确保 footer 内的内容可以使用 flex 布局 */
.x-form__footer > * {
  width: 100%;
}
</style>

