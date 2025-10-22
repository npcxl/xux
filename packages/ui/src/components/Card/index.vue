<template>
  <div :class="['x-card', `x-card-${type}`]" @click="handleClick">
    <!-- 商品卡片 -->
    <template v-if="type === 'product'">
      <div class="x-card-image-wrapper">
        <div class="x-card-image">
          <img
            :src="image"
            :alt="title"
            loading="lazy"
          />
          <div class="x-card-light-effect"></div>
        </div>
        
        <div v-if="label" class="x-card-label">
          <span class="x-card-badge">{{ label }}</span>
        </div>
      </div>

      <div class="x-card-content">
        <h3 class="x-card-title">{{ title }}</h3>
        <p v-if="description && showDescription" class="x-card-description">{{ description }}</p>
        <div class="x-card-footer">
          <span class="x-card-price">{{ price }}</span>
          <XButton
            v-if="showLike"
            @click.stop="handleLike"
            type="text"
            size="small"
            class="x-card-like-btn"
          >
            <Icon v-if="!isLiked" icon="bi:heart" class="x-card-like-icon"></Icon>
            <Icon v-else icon="bi:heart-fill" class="x-card-like-icon is-liked"></Icon>
          </XButton>
        </div>
      </div>
    </template>

    <!-- 信息卡片 -->
    <template v-else-if="type === 'info'">
      <div v-if="icon" class="x-card-icon">
        <Icon :icon="icon" />
      </div>
      <div class="x-card-content">
        <h3 v-if="title" class="x-card-title">{{ title }}</h3>
        <p v-if="description" class="x-card-description">{{ description }}</p>
        <div v-if="extra" class="x-card-extra">{{ extra }}</div>
      </div>
    </template>

    <!-- 基础卡片 -->
    <template v-else>
      <div v-if="image" class="x-card-image-wrapper">
        <div class="x-card-image">
          <img :src="image" :alt="title" loading="lazy" />
          <div class="x-card-light-effect"></div>
        </div>
      </div>
      <div class="x-card-content">
        <h3 v-if="title" class="x-card-title">{{ title }}</h3>
        <p v-if="description" class="x-card-description">{{ description }}</p>
        <div v-if="$slots.default" class="x-card-body">
          <slot></slot>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import XButton from '../Button/index.vue'
import { Icon } from '@iconify/vue'
import './index.css'
/**
 * Card 卡片组件
 * @displayName XCard
 */

export interface CardProps {
  /** 卡片类型: product(商品) | info(信息) | basic(基础) */
  type?: 'product' | 'info' | 'basic'
  /** 标题 */
  title?: string
  /** 描述 */
  description?: string
  /** 图片地址 */
  image?: string
  /** 标签（商品卡片） */
  label?: string
  /** 价格（商品卡片） */
  price?: string
  /** 是否显示描述（商品卡片） */
  showDescription?: boolean
  /** 是否显示收藏按钮（商品卡片） */
  showLike?: boolean
  /** 是否已收藏（商品卡片） */
  isLiked?: boolean
  /** 图标（信息卡片） */
  icon?: string
  /** 额外信息（信息卡片） */
  extra?: string
}

const props = withDefaults(defineProps<CardProps>(), {
  type: 'basic',
  showDescription: false,
  showLike: true,
  isLiked: false
})

const emit = defineEmits<{
  /** 点击卡片时触发 */
  click: []
  /** 点击收藏按钮时触发（商品卡片） */
  like: []
}>()

// 点击卡片
const handleClick = () => {
  emit('click')
}

// 点击收藏
const handleLike = () => {
  emit('like')
}
</script>

