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

/**
 * Card 卡片组件 - iOS风格
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

<style scoped>
/* iOS 17 风格卡片 */

/* 基础卡片容器 */
.x-card {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 3px 8px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  cursor: pointer;
  border: 0.5px solid rgba(0, 0, 0, 0.04);
  will-change: transform, box-shadow;
  transform: translateZ(0);
}

.x-card:hover {
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.15),
    0 4px 8px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  transform: translateY(-4px) scale(1.02) translateZ(0);
}

/* 图片容器包装 */
.x-card-image-wrapper {
  position: relative;
  padding: 10px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.02) 0%, transparent 100%);
}

/* 图片容器 */
.x-card-image {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  background: linear-gradient(135deg, #F2F2F7 0%, #E5E5EA 100%);
  aspect-ratio: 1 / 1;
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.x-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.x-card:hover .x-card-image img {
  transform: scale(1.1);
}

/* 标签徽章 - iOS风格 */
.x-card-label {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 2;
}

.x-card-badge {
  display: inline-block;
  background: linear-gradient(135deg, #0A84FF 0%, #0073E6 100%);
  color: #FFFFFF;
  font-size: 11px;
  padding: 5px 12px;
  border-radius: 14px;
  font-weight: 600;
  letter-spacing: -0.41px;
  box-shadow: 
    0 2px 6px rgba(10, 132, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  -webkit-font-smoothing: antialiased;
}

/* 卡片内容 */
.x-card-content {
  padding: 16px;
}

.x-card-title {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: #000000;
  line-height: 1.47;
  margin: 0 0 6px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  letter-spacing: -0.41px;
  -webkit-font-smoothing: antialiased;
}

.x-card-description {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
  font-size: 14px;
  color: #8E8E93;
  line-height: 1.57;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  letter-spacing: -0.08px;
}

.x-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 12px;
}

.x-card-price {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
  font-size: 19px;
  font-weight: 700;
  background: linear-gradient(135deg, #0A84FF 0%, #5856D6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.45px;
}

/* 收藏按钮 - iOS风格 */
.x-card-like-btn {
  min-width: 0 !important;
  padding: 6px !important;
  border-radius: 50% !important;
  background: transparent !important;
}

.x-card-like-btn:hover {
  background: rgba(255, 59, 48, 0.08) !important;
}

.x-card-like-icon {
  font-size: 22px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.x-card-like-icon.is-liked {
  color: #FF3B30;
  filter: drop-shadow(0 2px 4px rgba(255, 59, 48, 0.2));
}

.x-card-like-icon:not(.is-liked) {
  color: #C7C7CC;
}

.x-card-like-btn:hover .x-card-like-icon {
  transform: scale(1.15);
}

.x-card-like-btn:active .x-card-like-icon {
  transform: scale(0.95);
}

/* 光效蒙版动画 - 更柔和 */
.x-card-light-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    105deg,
    transparent 0%,
    transparent 40%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0.5) 55%,
    rgba(255, 255, 255, 0.3) 60%,
    transparent 70%,
    transparent 100%
  );
  transform: translateX(-100%) translateY(-100%);
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 1;
}

.x-card:hover .x-card-light-effect {
  transform: translateX(100%) translateY(100%);
}

/* ========== 商品卡片 ========== */
.x-card-product .x-card-content {
  padding: 14px 16px 16px;
}

/* ========== 信息卡片 ========== */
.x-card-info {
  display: flex;
  gap: 14px;
  padding: 16px;
}

.x-card-info .x-card-icon {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #0A84FF;
  background: rgba(10, 132, 255, 0.12);
  border-radius: 14px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 
    0 1px 2px rgba(10, 132, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.x-card-info .x-card-content {
  flex: 1;
  padding: 0;
}

.x-card-info .x-card-title {
  font-size: 16px;
  margin-bottom: 4px;
}

.x-card-info .x-card-description {
  font-size: 13px;
  margin-bottom: 8px;
  color: #8E8E93;
}

.x-card-extra {
  font-size: 12px;
  color: #AEAEB2;
  margin-top: 8px;
  letter-spacing: -0.08px;
}

/* ========== 基础卡片 ========== */
.x-card-basic .x-card-body {
  margin-top: 12px;
}

/* ========== 响应式 ========== */
@media (min-width: 1024px) {
  .x-card-title {
    font-size: 18px;
  }
  
  .x-card-description {
    font-size: 15px;
  }
  
  .x-card-price {
    font-size: 21px;
  }
}

/* ========== 暗色模式 ========== */
@media (prefers-color-scheme: dark) {
  .x-card {
    background: rgba(28, 28, 30, 0.8);
    border-color: rgba(142, 142, 147, 0.12);
    box-shadow: 
      0 3px 8px rgba(0, 0, 0, 0.3),
      0 1px 2px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }
  
  .x-card:hover {
    box-shadow: 
      0 10px 30px rgba(0, 0, 0, 0.4),
      0 4px 8px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  
  .x-card-title {
    color: #FFFFFF;
  }
  
  .x-card-description {
    color: #98989D;
  }
  
  .x-card-image {
    background: linear-gradient(135deg, #2C2C2E 0%, #1C1C1E 100%);
  }
  
  .x-card-info .x-card-icon {
    background: rgba(10, 132, 255, 0.18);
  }
}

/* ========== 辅助功能 ========== */
@media (prefers-reduced-motion: reduce) {
  .x-card,
  .x-card-image img,
  .x-card-light-effect,
  .x-card-like-icon {
    transition: none;
  }
  
  .x-card:hover {
    transform: translateY(-2px) scale(1.01) translateZ(0);
  }
  
  .x-card:hover .x-card-image img {
    transform: scale(1.05);
  }
}
</style>

