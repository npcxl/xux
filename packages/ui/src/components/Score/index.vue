<template>
  <div class="x-score" :class="[`score-${size}`, { 'score-disabled': disabled }]">
    <div class="rating">
      <label
        v-for="star in maxStars"
        :key="star"
        :class="{ 'star-filled': star <= modelValue }"
        :title="getStarTitle(star)"
        @click="handleChange(star)"
      >
        <input
          type="radio"
          :name="`star-radio-${uniqueId}`"
          :value="star"
          :disabled="disabled"
          :checked="modelValue === star"
          style="display: none;"
        />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            pathLength="360"
            d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
          ></path>
        </svg>
      </label>
    </div>
    
    <!-- 显示评分文字 -->
    <div v-if="showText" class="score-text">
      {{ getScoreText() }}
    </div>
    
    <!-- 显示数值 -->
    <div v-if="showValue" class="score-value">
      {{ modelValue }}/{{ maxStars }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface ScoreProps {
  /** 当前评分值 */
  modelValue?: number
  /** 最大星数 */
  maxStars?: number
  /** 组件尺寸 */
  size?: 'small' | 'medium' | 'large'
  /** 是否禁用 */
  disabled?: boolean
  /** 是否显示评分文字 */
  showText?: boolean
  /** 是否显示数值 */
  showValue?: boolean
  /** 自定义评分文字 */
  texts?: string[]
  /** 是否允许半星评分 */
  allowHalf?: boolean
  /** 自定义颜色 */
  color?: string
}

const props = withDefaults(defineProps<ScoreProps>(), {
  modelValue: 0,
  maxStars: 5,
  size: 'medium',
  disabled: false,
  showText: false,
  showValue: false,
  texts: () => ['极差', '差', '一般', '好', '极好'],
  allowHalf: false,
  color: '#ffc73a'
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
}>()

// 生成唯一ID避免多个组件冲突
const uniqueId = computed(() => Math.random().toString(36).substr(2, 9))

// 处理评分变化
const handleChange = (value: number) => {
  if (props.disabled) return
  
  emit('update:modelValue', value)
  emit('change', value)
}

// 获取星星标题
const getStarTitle = (star: number) => {
  if (props.texts && props.texts[star - 1]) {
    return `${star}星 - ${props.texts[star - 1]}`
  }
  return `${star}星`
}

// 获取评分文字
const getScoreText = () => {
  if (props.modelValue === 0) return '未评分'
  if (props.texts && props.texts[props.modelValue - 1]) {
    return props.texts[props.modelValue - 1]
  }
  return `${props.modelValue}星`
}
</script>


<style scoped>
.x-score {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.rating {
  display: flex;
  gap: 0.3rem;
  --stroke: #666;
  --fill: v-bind(color);
}

.rating label {
  cursor: pointer;
  transition: transform 0.2s ease;
  position: relative;
}

.rating label:hover {
  transform: scale(1.1);
}

.rating svg {
  width: 2rem;
  height: 2rem;
  overflow: visible;
  fill: transparent;
  stroke: var(--stroke);
  stroke-linejoin: bevel;
  stroke-dasharray: 12;
  animation: idle 4s linear infinite;
  transition: stroke 0.2s, fill 0.5s;
}

@keyframes idle {
  from {
    stroke-dashoffset: 24;
  }
}

.rating label:hover svg {
  stroke: var(--fill);
}

/* 填充的星星样式 */
.rating label.star-filled svg {
  transition: 0s;
  animation: idle 4s linear infinite, yippee 0.75s backwards;
  fill: var(--fill);
  stroke: var(--fill);
  stroke-opacity: 0;
  stroke-dasharray: 0;
  stroke-linejoin: miter;
  stroke-width: 8px;
}

@keyframes yippee {
  0% {
    transform: scale(1);
    fill: var(--fill);
    fill-opacity: 0;
    stroke-opacity: 1;
    stroke: var(--stroke);
    stroke-dasharray: 10;
    stroke-width: 1px;
    stroke-linejoin: bevel;
  }

  30% {
    transform: scale(0);
    fill: var(--fill);
    fill-opacity: 0;
    stroke-opacity: 1;
    stroke: var(--stroke);
    stroke-dasharray: 10;
    stroke-width: 1px;
    stroke-linejoin: bevel;
  }

  30.1% {
    stroke: var(--fill);
    stroke-dasharray: 0;
    stroke-linejoin: miter;
    stroke-width: 8px;
  }

  60% {
    transform: scale(1.2);
    fill: var(--fill);
  }
}

/* 尺寸变体 */
.score-small .rating svg {
  width: 1.2rem;
  height: 1.2rem;
}

.score-medium .rating svg {
  width: 2rem;
  height: 2rem;
}

.score-large .rating svg {
  width: 2.8rem;
  height: 2.8rem;
}

/* 禁用状态 */
.score-disabled .rating label {
  cursor: not-allowed;
  opacity: 0.6;
}

.score-disabled .rating label:hover {
  transform: none;
}

.score-disabled .rating label:hover svg {
  stroke: var(--stroke);
}

/* 文字样式 */
.score-text {
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
}

.score-value {
  font-size: 0.75rem;
  color: #999;
  font-weight: 400;
}

.score-small .score-text {
  font-size: 0.75rem;
}

.score-small .score-value {
  font-size: 0.625rem;
}

.score-large .score-text {
  font-size: 1rem;
}

.score-large .score-value {
  font-size: 0.875rem;
}
</style>