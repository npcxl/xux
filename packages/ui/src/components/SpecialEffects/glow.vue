<template>
  <div class="glow-button-wrapper">
    <button 
      class="glow-button"
      :style="buttonStyle"
      @click="handleClick"
    >
      <span class="spark"></span>
      <span class="backdrop"></span>
      
      <!-- 星星图标 -->
      <svg class="sparkle" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
      
      <span class="text">
        <slot>{{ text }}</slot>
      </span>
    </button>
    
    <div class="bodydrop"></div>
    
    <!-- 粒子效果 -->
    <span aria-hidden="true" class="particle-pen">
      <svg v-for="i in 20" :key="i" class="particle" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.937 3.846L7.75 1L8.563 3.846C8.77313 4.58114 9.1671 5.25062 9.70774 5.79126C10.2484 6.3319 10.9179 6.72587 11.653 6.936L14.5 7.75L11.654 8.563C10.9189 8.77313 10.2494 9.1671 9.70874 9.70774C9.1681 10.2484 8.77413 10.9179 8.564 11.653L7.75 14.5L6.937 11.654C6.72687 10.9189 6.3329 10.2494 5.79226 9.70874C5.25162 9.1681 4.58214 8.77413 3.847 8.564L1 7.75L3.846 6.937C4.58114 6.72687 5.25062 6.3329 5.79126 5.79226C6.3319 5.25162 6.72587 4.58214 6.936 3.847L6.937 3.846Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    </span>
  </div>
</template>

<script setup lang="ts">
/**
 * GButton 发光按钮组件
 * @displayName XGButton
 * 
 * 使用方法：
 * <XGButton color="#8b5cf6">点击我</XGButton>
 */
import { computed } from 'vue'

export interface GButtonProps {
  /** 按钮文字 */
  text?: string
  /** 发光颜色（Hex格式） */
  color?: string
  /** 按钮大小 */
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<GButtonProps>(), {
  text: 'Button',
  color: '#8b5cf6', // 默认紫色
  size: 'medium'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// 将hex颜色转换为HSL
const hexToHsl = (hex: string) => {
  // 移除 # 号
  hex = hex.replace('#', '')
  
  // 转换为RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}

const hslColor = computed(() => hexToHsl(props.color))

const sizeMap = {
  small: '0.9rem',
  medium: '1.2rem',
  large: '1.5rem'
}

const buttonStyle = computed(() => ({
  '--hue': hslColor.value.h,
  '--saturation': `${hslColor.value.s}%`,
  '--lightness': `${hslColor.value.l}%`,
  '--font-size': sizeMap[props.size]
}))

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<style scoped>
.glow-button-wrapper {
  position: relative;
  display: inline-block;
}

.glow-button {
  --active: 0;
  --hue: 260;
  --saturation: 97%;
  --lightness: 50%;
  
  --bg: radial-gradient(
    40% 50% at center 100%,
    hsl(var(--hue) calc(var(--active) * var(--saturation)) 72% / var(--active)),
    transparent
  ),
  radial-gradient(
    80% 100% at center 120%,
    hsl(var(--hue) calc(var(--active) * var(--saturation)) 70% / var(--active)),
    transparent
  ),
  hsl(var(--hue) calc(var(--active) * var(--saturation)) calc((var(--active) * 44%) + 12%));
  
  background: var(--bg);
  font-size: var(--font-size, 1.2rem);
  font-weight: 500;
  border: 0;
  cursor: pointer;
  padding: 1em 1.5em;
  display: flex;
  align-items: center;
  gap: 0.5em;
  white-space: nowrap;
  border-radius: 100px;
  position: relative;
  box-shadow: 
    0 0 calc(var(--active) * 3em) calc(var(--active) * 1em) hsl(var(--hue) var(--saturation) 61% / 0.75),
    0 0em 0 0 hsl(var(--hue) calc(var(--active) * var(--saturation)) calc((var(--active) * 50%) + 30%)) inset,
    0 -0.05em 0 0 hsl(var(--hue) calc(var(--active) * var(--saturation)) calc(var(--active) * 60%)) inset;
  transition: box-shadow 0.3s, scale 0.3s, background 0.3s;
  scale: calc(1 + (var(--active) * 0.1));
}

.glow-button:active {
  scale: 1;
}

.glow-button:hover,
.glow-button:focus-visible {
  --active: 1;
}

.glow-button:before {
  content: "";
  position: absolute;
  inset: -0.2em;
  z-index: -1;
  border: 0.25em solid hsl(var(--hue) var(--saturation) var(--lightness) / 0.5);
  border-radius: 100px;
  opacity: var(--active, 0);
  transition: opacity 0.3s;
}

.spark {
  position: absolute;
  inset: 0;
  border-radius: 100px;
  rotate: 0deg;
  overflow: hidden;
  mask: linear-gradient(white, transparent 50%);
  animation: flip 2s infinite steps(2, end);
}

@keyframes flip {
  to {
    rotate: 360deg;
  }
}

.spark:before {
  content: "";
  position: absolute;
  width: 200%;
  aspect-ratio: 1;
  top: 0%;
  left: 50%;
  z-index: -1;
  translate: -50% -15%;
  rotate: 0;
  transform: rotate(-90deg);
  opacity: calc((var(--active)) + 0.4);
  background: conic-gradient(
    from 0deg,
    transparent 0 340deg,
    white 360deg
  );
  transition: opacity 0.3s;
  animation: rotate 2s linear infinite both;
}

.spark:after {
  content: "";
  position: absolute;
  inset: 0.1em;
  border-radius: 100px;
}

.backdrop {
  position: absolute;
  inset: 0.1em;
  background: var(--bg);
  border-radius: 100px;
  transition: background 0.3s;
}

@keyframes rotate {
  to {
    transform: rotate(90deg);
  }
}

.sparkle {
  inline-size: 1.25em;
  translate: -25% -5%;
  color: hsl(0 0% calc((var(--active, 0) * 70%) + 40%));
  fill: currentColor;
  stroke: currentColor;
  transition: color 0.3s;
  z-index: 1;
}

.sparkle path {
  transform-box: fill-box;
  transform-origin: center;
  animation-delay: calc(0.45s + (var(--delay, 0) * 1s));
  animation-duration: 0.6s;
}

.glow-button:is(:hover, :focus-visible) .sparkle path {
  animation-name: bounce;
}

@keyframes bounce {
  35%, 65% {
    scale: var(--scale, 1);
  }
}

.sparkle path:nth-of-type(1) {
  --scale: 0.5;
  --delay: 0.1;
}

.sparkle path:nth-of-type(2) {
  --scale: 1.5;
  --delay: 0.2;
}

.sparkle path:nth-of-type(3) {
  --scale: 2.5;
  --delay: 0.35;
}

.text {
  translate: 2% -6%;
  letter-spacing: 0.01ch;
  background: linear-gradient(
    90deg, 
    hsl(0 0% calc((var(--active) * 100%) + 65%)), 
    hsl(0 0% calc((var(--active) * 100%) + 26%))
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  transition: background 0.3s;
  z-index: 1;
}

.bodydrop {
  display: none;
}

.particle-pen {
  position: absolute;
  width: 200%;
  aspect-ratio: 1;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  -webkit-mask: radial-gradient(white, transparent 65%);
  mask: radial-gradient(white, transparent 65%);
  z-index: -1;
  opacity: var(--active, 0);
  transition: opacity 0.3s;
  pointer-events: none;
}

.glow-button:is(:hover, :focus-visible) ~ .particle-pen {
  --active: 1;
}

.particle {
  fill: white;
  width: 0.25rem;
  aspect-ratio: 1;
  position: absolute;
  opacity: 0.8;
  animation: float-out 1s infinite linear;
  transform-origin: 1000% 1000%;
  z-index: -1;
  animation-play-state: paused;
}

.glow-button:is(:hover, :focus-visible) ~ .particle-pen .particle {
  animation-play-state: running;
}

.particle path {
  fill: hsl(0 0% 90%);
  stroke: none;
}

.particle:nth-of-type(even) {
  animation-direction: reverse;
}

/* 为每个粒子设置不同的位置和延迟 */
.particle:nth-of-type(1) { --x: 20; --y: 10; --delay: -0.1s; }
.particle:nth-of-type(2) { --x: 80; --y: 15; --delay: -0.2s; }
.particle:nth-of-type(3) { --x: 50; --y: 5; --delay: -0.3s; }
.particle:nth-of-type(4) { --x: 10; --y: 30; --delay: -0.4s; }
.particle:nth-of-type(5) { --x: 90; --y: 35; --delay: -0.5s; }
.particle:nth-of-type(6) { --x: 30; --y: 85; --delay: -0.6s; }
.particle:nth-of-type(7) { --x: 70; --y: 90; --delay: -0.7s; }
.particle:nth-of-type(8) { --x: 15; --y: 60; --delay: -0.8s; }
.particle:nth-of-type(9) { --x: 85; --y: 65; --delay: -0.9s; }
.particle:nth-of-type(10) { --x: 45; --y: 95; --delay: -1s; }
.particle:nth-of-type(11) { --x: 25; --y: 45; --delay: -1.1s; }
.particle:nth-of-type(12) { --x: 75; --y: 50; --delay: -1.2s; }
.particle:nth-of-type(13) { --x: 5; --y: 75; --delay: -1.3s; }
.particle:nth-of-type(14) { --x: 95; --y: 80; --delay: -1.4s; }
.particle:nth-of-type(15) { --x: 55; --y: 25; --delay: -1.5s; }
.particle:nth-of-type(16) { --x: 35; --y: 70; --delay: -1.6s; }
.particle:nth-of-type(17) { --x: 65; --y: 20; --delay: -1.7s; }
.particle:nth-of-type(18) { --x: 40; --y: 55; --delay: -1.8s; }
.particle:nth-of-type(19) { --x: 60; --y: 40; --delay: -1.9s; }
.particle:nth-of-type(20) { --x: 50; --y: 50; --delay: -2s; }

.particle {
  top: calc(var(--y) * 1%);
  left: calc(var(--x) * 1%);
  animation-delay: var(--delay);
}

@keyframes float-out {
  to {
    rotate: 360deg;
  }
}
</style>
