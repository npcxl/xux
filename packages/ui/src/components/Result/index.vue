<template>
  <div class="x-result" :class="resultClass">
    <!-- 背景装饰 -->
    <div class="result-background"></div>
    
    <!-- 图标容器 -->
    <div class="result-icon-wrapper">
      <div class="result-icon">
        <slot name="icon">
          <!-- Success Icon -->
          <div v-if="status === 'success'" class="icon-container icon-success">
            <svg viewBox="0 0 64 64" width="72" height="72">
              <circle cx="32" cy="32" r="30" fill="var(--x-color-success, #34C759)" opacity="0.1"/>
              <circle cx="32" cy="32" r="24" fill="none" stroke="var(--x-color-success, #34C759)" stroke-width="2.5"/>
              <path d="M22 32l8 8 12-16" fill="none" stroke="var(--x-color-success, #34C759)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" class="check-path"/>
            </svg>
            <div class="icon-pulse"></div>
          </div>
          
          <!-- Error Icon -->
          <div v-else-if="status === 'error'" class="icon-container icon-error">
            <svg viewBox="0 0 64 64" width="72" height="72">
              <circle cx="32" cy="32" r="30" fill="var(--x-color-danger, #FF3B30)" opacity="0.1"/>
              <circle cx="32" cy="32" r="24" fill="none" stroke="var(--x-color-danger, #FF3B30)" stroke-width="2.5"/>
              <path d="M24 24l16 16M40 24L24 40" stroke="var(--x-color-danger, #FF3B30)" stroke-width="3.5" stroke-linecap="round" class="cross-path"/>
            </svg>
            <div class="icon-shake"></div>
          </div>
          
          <!-- Warning Icon -->
          <div v-else-if="status === 'warning'" class="icon-container icon-warning">
            <svg viewBox="0 0 64 64" width="72" height="72">
              <circle cx="32" cy="32" r="30" fill="var(--x-color-warning, #FF9500)" opacity="0.1"/>
              <path d="M32 8L8 56h48L32 8z" fill="none" stroke="var(--x-color-warning, #FF9500)" stroke-width="2.5" stroke-linejoin="round"/>
              <path d="M32 24v16M32 44v4" stroke="var(--x-color-warning, #FF9500)" stroke-width="3.5" stroke-linecap="round" class="warning-path"/>
            </svg>
            <div class="icon-bounce"></div>
          </div>
          
          <!-- Info Icon -->
          <div v-else-if="status === 'info'" class="icon-container icon-info">
            <svg viewBox="0 0 64 64" width="72" height="72">
              <circle cx="32" cy="32" r="30" fill="var(--x-color-primary, #007AFF)" opacity="0.1"/>
              <circle cx="32" cy="32" r="24" fill="none" stroke="var(--x-color-primary, #007AFF)" stroke-width="2.5"/>
              <path d="M32 28v16M32 20v4" stroke="var(--x-color-primary, #007AFF)" stroke-width="3.5" stroke-linecap="round" class="info-path"/>
            </svg>
            <div class="icon-glow"></div>
          </div>
          
          <!-- 404 状态码 -->
          <div v-else-if="status === '404'" class="result-status-code status-404">
            <span class="status-number">404</span>
            <div class="status-decoration"></div>
          </div>
          
          <!-- 403 状态码 -->
          <div v-else-if="status === '403'" class="result-status-code status-403">
            <span class="status-number">403</span>
            <div class="status-decoration"></div>
          </div>
          
          <!-- 500 状态码 -->
          <div v-else-if="status === '500'" class="result-status-code status-500">
            <span class="status-number">500</span>
            <div class="status-decoration"></div>
          </div>
        </slot>
      </div>
    </div>
    
    <!-- 标题 -->
    <div class="result-title">
      <slot name="title">{{ title }}</slot>
    </div>
    
    <!-- 副标题 -->
    <div v-if="$slots.subTitle || subTitle" class="result-subtitle">
      <slot name="subTitle">{{ subTitle }}</slot>
    </div>
    
    <!-- 额外内容 -->
    <div v-if="$slots.extra" class="result-extra">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Result 结果组件
 * @displayName XResult
 */

export interface ResultProps {
  /**
   * 结果状态
   * @values success, error, warning, info, 404, 403, 500
   */
  status?: 'success' | 'error' | 'warning' | 'info' | '404' | '403' | '500'
  /**
   * 标题内容
   */
  title?: string
  /**
   * 副标题内容
   */
  subTitle?: string
}

const props = withDefaults(defineProps<ResultProps>(), {
  status: 'info',
  title: '',
  subTitle: ''
})

// 计算类名
const resultClass = computed(() => {
  return [
    `x-result-${props.status}`
  ]
})
</script>

<style scoped>
/* iOS 风格结果组件 */
.x-result {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 40px;
  text-align: center;
  font-family: var(--x-font-family, -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif);
  animation: result-fade-in 0.4s ease-out;
  overflow: hidden;
}

/* 入场动画 */
@keyframes result-fade-in {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 背景装饰 */
.result-background {
  position: absolute;
  inset: 0;
  opacity: 0.02;
  pointer-events: none;
  background: radial-gradient(circle at 50% 0%, var(--x-color-primary, #007AFF) 0%, transparent 70%);
}

/* 图标容器 */
.result-icon-wrapper {
  position: relative;
  margin-bottom: 32px;
  animation: icon-scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both;
}

@keyframes icon-scale-in {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.result-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 图标通用容器 */
.icon-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-container svg {
  display: block;
  filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.06));
}

/* Success 动画 */
.icon-success .check-path {
  stroke-dasharray: 50;
  stroke-dashoffset: 50;
  animation: check-draw 0.6s ease-out 0.4s forwards;
}

@keyframes check-draw {
  to {
    stroke-dashoffset: 0;
  }
}

.icon-success .icon-pulse {
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--x-color-success, #34C759), transparent);
  opacity: 0;
  animation: pulse-success 1.5s ease-out 0.8s;
}

@keyframes pulse-success {
  to {
    transform: scale(1.5);
    opacity: 0;
  }
}

/* Error 动画 */
.icon-error .cross-path {
  stroke-dasharray: 40;
  stroke-dashoffset: 40;
  animation: cross-draw 0.5s ease-out 0.3s forwards;
}

@keyframes cross-draw {
  to {
    stroke-dashoffset: 0;
  }
}

.icon-error .icon-shake {
  position: absolute;
  inset: 0;
  animation: shake-error 0.5s ease-in-out 0.6s;
}

@keyframes shake-error {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-4px); }
  40% { transform: translateX(4px); }
  60% { transform: translateX(-2px); }
  80% { transform: translateX(2px); }
}

/* Warning 动画 */
.icon-warning .warning-path {
  stroke-dasharray: 60;
  stroke-dashoffset: 60;
  animation: warning-draw 0.6s ease-out 0.3s forwards;
}

@keyframes warning-draw {
  to {
    stroke-dashoffset: 0;
  }
}

.icon-warning .icon-bounce {
  position: absolute;
  inset: 0;
  animation: bounce-warning 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.5s;
}

@keyframes bounce-warning {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* Info 动画 */
.icon-info .info-path {
  stroke-dasharray: 60;
  stroke-dashoffset: 60;
  animation: info-draw 0.6s ease-out 0.3s forwards;
}

@keyframes info-draw {
  to {
    stroke-dashoffset: 0;
  }
}

.icon-info .icon-glow {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--x-color-primary, #007AFF), transparent);
  opacity: 0;
  animation: glow-info 2s ease-in-out 0.8s infinite;
}

@keyframes glow-info {
  50% {
    opacity: 0.15;
    transform: scale(1.1);
  }
}

/* 状态码样式 */
.result-status-code {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
}

.status-number {
  font-size: 80px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -2px;
  font-feature-settings: 'tnum';
  background: linear-gradient(135deg, currentColor, currentColor 60%, transparent);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: status-number-in 0.6s ease-out 0.2s both;
}

@keyframes status-number-in {
  from {
    opacity: 0;
    transform: scale(0.8) rotateX(30deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotateX(0);
  }
}

.status-decoration {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  opacity: 0.1;
  animation: status-decoration 3s ease-in-out infinite;
}

.status-404 .status-decoration {
  background: conic-gradient(from 0deg, transparent, var(--x-text-color-secondary, #8E8E93), transparent);
}

.status-403 .status-decoration {
  background: conic-gradient(from 0deg, transparent, var(--x-color-warning, #FF9500), transparent);
}

.status-500 .status-decoration {
  background: conic-gradient(from 0deg, transparent, var(--x-color-danger, #FF3B30), transparent);
}

@keyframes status-decoration {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
}

/* 标题样式 */
.result-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
  line-height: 1.4;
  letter-spacing: -0.5px;
  animation: title-slide-up 0.5s ease-out 0.3s both;
  transition: color var(--x-transition, 0.3s ease);
}

@keyframes title-slide-up {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 副标题样式 */
.result-subtitle {
  font-size: var(--x-font-size, 15px);
  color: var(--x-text-color-secondary, #8E8E93);
  margin-bottom: 32px;
  line-height: 1.7;
  max-width: 520px;
  letter-spacing: -0.2px;
  animation: subtitle-fade-in 0.5s ease-out 0.4s both;
}

@keyframes subtitle-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 额外内容区域 */
.result-extra {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  animation: extra-slide-up 0.5s ease-out 0.5s both;
}

@keyframes extra-slide-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* iOS 状态颜色 */
.x-result-success {
  .result-title {
    color: var(--x-color-success, #34C759);
  }
  
  .status-number {
    color: var(--x-color-success, #34C759);
  }
}

.x-result-error {
  .result-title {
    color: var(--x-color-danger, #FF3B30);
  }
  
  .status-number {
    color: var(--x-color-danger, #FF3B30);
  }
}

.x-result-warning {
  .result-title {
    color: var(--x-color-warning, #FF9500);
  }
  
  .status-number {
    color: var(--x-color-warning, #FF9500);
  }
}

.x-result-info {
  .result-title {
    color: var(--x-color-primary, #007AFF);
  }
  
  .status-number {
    color: var(--x-color-primary, #007AFF);
  }
}

.x-result-404,
.x-result-403,
.x-result-500 {
  .result-title {
    color: var(--x-text-color-primary, #1C1C1E);
  }
}

.x-result-404 .status-number {
  color: var(--x-text-color-secondary, #8E8E93);
}

.x-result-403 .status-number {
  color: var(--x-color-warning, #FF9500);
}

.x-result-500 .status-number {
  color: var(--x-color-danger, #FF3B30);
}

/* 响应式优化 */
@media (max-width: 768px) {
  .x-result {
    padding: 40px 24px;
  }
  
  .result-icon-wrapper {
    margin-bottom: 24px;
  }
  
  .icon-container svg {
    width: 64px;
    height: 64px;
  }
  
  .result-title {
    font-size: 20px;
    margin-bottom: 8px;
  }
  
  .result-subtitle {
    font-size: 14px;
    margin-bottom: 24px;
  }
  
  .status-number {
    font-size: 64px;
  }
  
  .result-status-code {
    width: 100px;
    height: 100px;
  }
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .result-background {
    opacity: 0.03;
  }
  
  .icon-container svg {
    filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.2));
  }
  
  .x-result-404,
  .x-result-403,
  .x-result-500 {
    .result-title {
      color: var(--x-text-color-primary, #FFFFFF);
    }
  }
}

/* 减少动画 */
@media (prefers-reduced-motion: reduce) {
  .x-result,
  .result-icon-wrapper,
  .result-title,
  .result-subtitle,
  .result-extra,
  .status-number {
    animation: none;
  }
  
  .icon-success .check-path,
  .icon-error .cross-path,
  .icon-warning .warning-path,
  .icon-info .info-path {
    animation: none;
    stroke-dashoffset: 0;
  }
  
  .icon-pulse,
  .icon-shake,
  .icon-bounce,
  .icon-glow,
  .status-decoration {
    display: none;
  }
}
</style>

