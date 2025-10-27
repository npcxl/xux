<template>
  <div
    :class="[
      variant === 'basic' ? 'x-tooltip-wrapper' : 'x-tooltip-rich-wrapper',
      variant === 'rich' && `rich-${placement}`
    ]"
  >
    <!-- 基本版本 -->
    <template v-if="variant === 'basic'">
      <div class="x-tooltip-trigger">
        <slot></slot>
      </div>
      <div :class="['x-tooltip', `tooltip-${placement}`]">
        {{ content }}
        <div :class="['tooltip-arrow', `arrow-${placement}`]"></div>
      </div>
    </template>

    <!-- 丰富版本 (基于 CSS Buttons) -->
    <template v-else>
      <span class="tooltip-label">{{ label }}</span>
      <span class="tooltip-text">{{ content }}</span>
      <span class="tooltip-hover-text">{{ hoverText || label }}</span>
    </template>
  </div>
</template>

<script setup lang="ts">
export interface TooltipsProps {
  /** Tooltip 显示的内容 */
  content: string
  /** Tooltip 显示的位置: 'top' | 'bottom' | 'left' | 'right' */
  placement?: 'top' | 'bottom' | 'left' | 'right'
  /** 变体类型: 'basic' | 'rich' */
  variant?: 'basic' | 'rich'
  /** 丰富版本的标签文字 */
  label?: string
  /** 丰富版本的悬停文字 */
  hoverText?: string
}

withDefaults(defineProps<TooltipsProps>(), {
  placement: 'top',
  variant: 'basic',
  label: 'Hover',
  hoverText: ''
})
</script>

<style scoped>
/* ===== 基本版本样式 ===== */
.x-tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.x-tooltip-trigger {
  cursor: pointer;
}

.x-tooltip {
  position: absolute;
  background-color: var(--x-color-primary, #1a1a1a);
  color: var(--x-text-color-white, #ffffff);
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
  z-index: 1000;
  box-shadow: var(--x-shadow-md, 0 4px 12px rgba(0, 0, 0, 0.15));
  pointer-events: none;
}

.tooltip-arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: var(--x-color-primary, #1a1a1a);
  transform: rotate(45deg);
}

/* 上方 */
.tooltip-top {
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, -8px);
  margin-bottom: 8px;
}

.arrow-top {
  bottom: -4px;
  left: 50%;
  margin-left: -4px;
}

.x-tooltip-wrapper:hover .tooltip-top {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 0);
}

/* 下方 */
.tooltip-bottom {
  top: 100%;
  left: 50%;
  transform: translate(-50%, 8px);
  margin-top: 8px;
}

.arrow-bottom {
  top: -4px;
  left: 50%;
  margin-left: -4px;
}

.x-tooltip-wrapper:hover .tooltip-bottom {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 0);
}

/* 左侧 */
.tooltip-left {
  right: 100%;
  top: 50%;
  transform: translate(-8px, -50%);
  margin-right: 8px;
}

.arrow-left {
  right: -4px;
  top: 50%;
  margin-top: -4px;
}

.x-tooltip-wrapper:hover .tooltip-left {
  opacity: 1;
  visibility: visible;
  transform: translate(0, -50%);
}

/* 右侧 */
.tooltip-right {
  left: 100%;
  top: 50%;
  transform: translate(8px, -50%);
  margin-left: 8px;
}

.arrow-right {
  left: -4px;
  top: 50%;
  margin-top: -4px;
}

.x-tooltip-wrapper:hover .tooltip-right {
  opacity: 1;
  visibility: visible;
  transform: translate(0, -50%);
}

/* ===== 丰富版本样式 (基于 CSS Buttons) ===== */
.x-tooltip-rich-wrapper {
  --background: #1a1a1a;
  --color: var(--x-text-color-white, #ffffff);
  --border-color: var(--x-border-color, #333333);
  position: relative;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  font-size: 18px;
  font-weight: 600;
  color: var(--x-text-color-regular, #333333);
  background-color: var(--x-bg-color, #ffffff);
  padding: 0.7em 1.8em;
  border-radius: 8px;
  text-transform: uppercase;
  height: 60px;
  width: 180px;
  display: grid;
  place-items: center;
  border: 2px solid var(--border-color);
  box-shadow: var(--x-shadow-sm, 0 2px 4px rgba(0, 0, 0, 0.1));
}

.tooltip-text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  transform-origin: -100%;
  transform: scale(1);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 2;
  color: var(--x-text-color-regular, #333333);
}

.x-tooltip-rich-wrapper .tooltip-hover-text {
  position: absolute;
  top: 0%;
  left: 100%;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  opacity: 1;
  background-color: var(--background);
  color: var(--color);
  z-index: 1;
  border: 2px solid var(--background);
  transform: scale(0);
  transform-origin: 0;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  display: grid;
  place-items: center;
}

.tooltip-label {
  position: absolute;
  padding: 0.3em 0.6em;
  opacity: 0;
  pointer-events: none;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  background: var(--background);
  z-index: 10;
  border-radius: 8px;
  scale: 0;
  text-transform: capitalize;
  font-weight: 400;
  font-size: 16px;
  box-shadow: var(--x-shadow-lg, rgba(0, 0, 0, 0.25) 0 8px 15px);
}

.tooltip-label::before {
  position: absolute;
  content: "";
  height: 0.6em;
  width: 0.6em;
  background: var(--background);
}

/* 丰富版本 - 上方 */
.rich-top .tooltip-label {
  top: -0.5em;
  left: 50%;
  transform: translateX(-50%);
  transform-origin: 0 0;
}

.rich-top .tooltip-label::before {
  bottom: -0.2em;
  left: 50%;
  transform: translate(-50%) rotate(45deg);
}

.rich-top:hover .tooltip-label {
  top: calc(-100% - 1em);
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  scale: 1;
  animation: shake 0.5s ease-in-out both;
}

/* 丰富版本 - 下方 */
.rich-bottom .tooltip-label {
  bottom: -0.5em;
  left: 50%;
  transform: translateX(-50%);
  transform-origin: 50% 100%;
}

.rich-bottom .tooltip-label::before {
  top: -0.2em;
  left: 50%;
  transform: translate(-50%) rotate(45deg);
}

.rich-bottom:hover .tooltip-label {
  bottom: calc(-100% - 1em);
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  scale: 1;
  animation: shake 0.5s ease-in-out both;
}

/* 丰富版本 - 左侧 */
.rich-left .tooltip-label {
  top: 50%;
  right: calc(100% + 0.5em);
  transform: translateY(-50%);
  transform-origin: 100% 50%;
}

.rich-left .tooltip-label::before {
  right: -0.2em;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.rich-left:hover .tooltip-label {
  right: calc(100% + 1em);
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  scale: 1;
  animation: shake 0.5s ease-in-out both;
}

/* 丰富版本 - 右侧 */
.rich-right .tooltip-label {
  top: 50%;
  left: calc(100% + 0.5em);
  transform: translateY(-50%);
  transform-origin: 0 50%;
}

.rich-right .tooltip-label::before {
  left: -0.2em;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.rich-right:hover .tooltip-label {
  left: calc(100% + 1em);
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  scale: 1;
  animation: shake 0.5s ease-in-out both;
}

/* 丰富版本 - 悬停效果 */
.x-tooltip-rich-wrapper:hover {
  box-shadow: var(--x-shadow-lg, rgba(0, 0, 0, 0.25) 0 8px 15px);
  color: var(--x-text-color-white, #ffffff);
  border-color: transparent;
}

.x-tooltip-rich-wrapper:hover .tooltip-hover-text {
  transform: scale(1);
  left: 0;
}

.x-tooltip-rich-wrapper:hover .tooltip-text {
  opacity: 0;
  top: 0%;
  left: 100%;
  transform: scale(0);
}

@keyframes shake {
  0% {
    rotate: 0;
  }
  25% {
    rotate: 7deg;
  }
  50% {
    rotate: -7deg;
  }
  75% {
    rotate: 1deg;
  }
  100% {
    rotate: 0;
  }
}
</style>