<template>
  <div :class="['x-timeline-container', mode === 'vertical' ? 'x-timeline-vertical' : 'x-timeline-horizontal']">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="x-timeline-item"
    >
      <!-- 节点 -->
      <div class="x-timeline-node-wrapper">
        <slot :name="`icon-${index}`" :item="item" :index="index" :is-current="currentStep === index">
          <div 
            :class="[
              'x-timeline-node',
              getNodeClass(item.type || 'default', index),
              { 'is-current': currentStep === index },
              { 'is-active': currentStep === index && !item.type }
            ]"
            :style="item.color ? { backgroundColor: item.color, boxShadow: `0 0 0 4px ${item.color}20` } : {}"
          >
            <Icon v-if="item.icon" :icon="item.icon" class="x-timeline-node-icon" />
          </div>
        </slot>
      </div>

      <!-- 连接线 -->
      <div 
        v-if="index < items.length - 1" 
        class="x-timeline-line"
      ></div>

      <!-- 内容 -->
      <div 
        :class="[
          'x-timeline-content',
          { 'is-current': currentStep === index }
        ]"
      >
        <slot :name="`content-${index}`" :item="item" :index="index" :is-current="currentStep === index">
          <div v-if="item.time" class="x-timeline-time">{{ item.time }}</div>
          <div 
            v-if="item.title" 
            :class="[
              'x-timeline-title',
              { 'is-current': currentStep === index }
            ]"
          >
            {{ item.title }}
          </div>
          <div v-if="item.description" class="x-timeline-description">{{ item.description }}</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import './index.css'

export interface TimelineItem {
  /** 时间 */
  time?: string
  /** 标题 */
  title?: string
  /** 描述 */
  description?: string
  /** 图标 */
  icon?: string
  /** 节点颜色 */
  color?: string
  /** 类型 */
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
}

export interface TimelineProps {
  /** 时间轴数据 */
  items: TimelineItem[]
  /** 模式：vertical 垂直 | horizontal 水平 */
  mode?: 'vertical' | 'horizontal'
  /** 当前步骤（从 0 开始） */
  current?: number
}

const props = withDefaults(defineProps<TimelineProps>(), {
  items: () => [],
  mode: 'vertical',
  current: -1
})

const emit = defineEmits<{
  'update:current': [value: number]
  'change': [current: number, prev: number]
}>()

const currentStep = ref(props.current)

watch(() => props.current, (val) => {
  currentStep.value = val
})

const getNodeClass = (type: string, index: number) => {
  const classes: Record<string, string> = {
    default: 'type-default',
    primary: 'type-primary',
    success: 'type-success',
    warning: 'type-warning',
    danger: 'type-danger'
  }
  return classes[type] || classes.default
}

// 上一步
const prev = () => {
  if (currentStep.value > 0) {
    const prevStep = currentStep.value
    currentStep.value--
    emit('update:current', currentStep.value)
    emit('change', currentStep.value, prevStep)
  }
}

// 下一步
const next = () => {
  if (currentStep.value < props.items.length - 1) {
    const prevStep = currentStep.value
    currentStep.value++
    emit('update:current', currentStep.value)
    emit('change', currentStep.value, prevStep)
  }
}

// 跳转到指定步骤
const goTo = (step: number) => {
  if (step >= 0 && step < props.items.length && step !== currentStep.value) {
    const prevStep = currentStep.value
    currentStep.value = step
    emit('update:current', currentStep.value)
    emit('change', currentStep.value, prevStep)
  }
}

// 暴露方法
defineExpose({
  prev,
  next,
  goTo,
  getCurrentStep: () => currentStep.value
})
</script>
