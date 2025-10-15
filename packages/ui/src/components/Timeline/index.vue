<template>
  <div :class="mode === 'vertical' ? 'flex flex-col py-5' : 'flex py-5 overflow-x-auto'">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="[
        'relative',
        mode === 'vertical' ? 'flex pb-6 last:pb-0' : 'flex flex-col items-center flex-1 min-w-30'
      ]"
    >
      <!-- 节点 -->
      <div :class="mode === 'vertical' ? 'relative flex-shrink-0 w-8 flex justify-center z-2' : 'relative flex-shrink-0 h-8 flex items-center z-2'">
        <slot :name="`icon-${index}`" :item="item" :index="index" :is-current="currentStep === index">
          <div 
            class="w-3 h-3 rounded-full flex items-center justify-center transition-all"
            :class="[
              getNodeClass(item.type || 'default', index),
              currentStep === index ? 'scale-140 ring-2 ring-blue-300' : 'hover:scale-120'
            ]"
            :style="item.color ? { backgroundColor: item.color, boxShadow: `0 0 0 4px ${item.color}20` } : {}"
          >
            <Icon v-if="item.icon" :icon="item.icon" class="w-2 h-2 text-white" />
          </div>
        </slot>
      </div>

      <!-- 连接线 -->
      <div 
        v-if="index < items.length - 1" 
        :class="mode === 'vertical' 
          ? 'absolute left-4 top-3 h-full w-0.5 bg-gray-200 dark:bg-gray-700 z-1'
          : 'absolute left-1/2 top-4 right--50% h-0.5 bg-gray-200 dark:bg-gray-700 z-1'"
      ></div>

      <!-- 内容 -->
      <div 
        :class="[
          mode === 'vertical' ? 'flex-1 pl-4' : 'text-center pt-4 max-w-50',
          'transition-opacity',
          currentStep === index ? 'opacity-100' : 'opacity-60'
        ]"
      >
        <slot :name="`content-${index}`" :item="item" :index="index" :is-current="currentStep === index">
          <div v-if="item.time" class="text-xs text-gray-400 mb-1">{{ item.time }}</div>
          <div 
            v-if="item.title" 
            class="text-sm font-600 mb-1 transition-colors"
            :class="currentStep === index ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'"
          >
            {{ item.title }}
          </div>
          <div v-if="item.description" class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{{ item.description }}</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'

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
  const isActive = currentStep.value === index
  const classes: Record<string, string> = {
    default: isActive ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600',
    primary: 'bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]',
    success: 'bg-green-500 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]',
    warning: 'bg-orange-500 shadow-[0_0_0_4px_rgba(245,158,11,0.1)]',
    danger: 'bg-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.1)]'
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
