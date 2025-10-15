<template>
    <div 
      ref="containerRef"
      class="container" 
      :class="[{ dynamic }, { 'no-color': disableColor }, { 'content-fill': contentFill }]" 
      :style="containerStyle"
    >
      <div
        v-for="i in total"
        :key="i"
        class="item"
        :class="itemClass(i)"
        @mouseenter="handleMouseEnter(i)"
        @mouseleave="handleMouseLeave"
      >
        <slot :index="i"></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, ref } from 'vue'
  
  const props = defineProps({
    cols: { type: Number, default: 3 },
    rows: { type: Number, default: 3 },
    width: { type: String, default: '500px' },
    height: { type: String, default: '500px' },
    gap: { type: String, default: '10px' },
    dynamic: { type: Boolean, default: false },
    /** 关闭内置背景色，便于自定义图片/内容 */
    disableColor: { type: Boolean, default: false },
    /** 让直接子元素(如 img、video)自适应填充格子 */
    contentFill: { type: Boolean, default: false },
    /** 锁定网格大小（悬停时不改变行列尺寸，只改变视觉效果） */
    lockGrid: { type: Boolean, default: false }
  })
  
  const containerRef = ref(null)
  const hovered = ref(0)
  const throttleTimer = ref(null)
  const rafId = ref(null)
  
  const containerStyle = computed(() => {
    const baseStyle = {
      width: props.width,
      height: props.height,
      display: 'grid',
      gap: props.gap,
      '--grid-cols': props.cols,
      '--grid-rows': props.rows
    }
    
    // 如果锁定网格，则不改变行列尺寸
    if (props.lockGrid) {
      return {
        ...baseStyle,
        gridTemplateColumns: `repeat(${props.cols}, 1fr)`,
        gridTemplateRows: `repeat(${props.rows}, 1fr)`
      }
    }
    
    // 计算grid-template（hover时会放大对应行列）
    if (hovered.value > 0) {
      const r = Math.floor((hovered.value - 1) / props.cols) + 1
      const c = ((hovered.value - 1) % props.cols) + 1
      
      const cols = Array.from({ length: props.cols }, (_, i) => 
        i + 1 === c ? '2fr' : '1fr'
      ).join(' ')
      
      const rows = Array.from({ length: props.rows }, (_, i) => 
        i + 1 === r ? '2fr' : '1fr'
      ).join(' ')
      
      return {
        ...baseStyle,
        gridTemplateColumns: cols,
        gridTemplateRows: rows
      }
    }
    
    return {
      ...baseStyle,
      gridTemplateColumns: `repeat(${props.cols}, 1fr)`,
      gridTemplateRows: `repeat(${props.rows}, 1fr)`
    }
  })

  const dynamic = computed(() => props.dynamic)
  const total = computed(() => Math.max(1, props.rows * props.cols))

  // 悬停与邻居计算（上/下/左/右）
  function isNeighbor(i) {
    if (!hovered.value) return false
    const r = Math.floor((i - 1) / props.cols)
    const c = (i - 1) % props.cols
    const hr = Math.floor((hovered.value - 1) / props.cols)
    const hc = (hovered.value - 1) % props.cols
    return (r === hr && Math.abs(c - hc) === 1) || (c === hc && Math.abs(r - hr) === 1)
  }
  
  function itemClass(i) {
    if (!hovered.value) return props.dynamic ? undefined : ''
    
    if (props.dynamic) {
      return {
        dim: hovered.value !== i && !isNeighbor(i),
        active: hovered.value === i,
        neighbor: isNeighbor(i)
      }
    }
    
    // 非dynamic模式也需要class来控制亮度
    return {
      'dim': hovered.value !== i && !isNeighbor(i),
      'active': hovered.value === i,
      'neighbor': isNeighbor(i)
    }
  }
  
  function handleMouseEnter(i) {
    // 添加节流，避免快速移动时频繁触发导致抖动
    if (throttleTimer.value) return
    
    // 使用 requestAnimationFrame 确保动画帧同步，减少抖动
    if (rafId.value) {
      cancelAnimationFrame(rafId.value)
    }
    
    rafId.value = requestAnimationFrame(() => {
      hovered.value = i
      rafId.value = null
    })
    
    throttleTimer.value = setTimeout(() => {
      throttleTimer.value = null
    }, 30) // 减少到30ms节流，更快响应但仍避免过度触发
  }
  
  function handleMouseLeave() {
    if (throttleTimer.value) {
      clearTimeout(throttleTimer.value)
      throttleTimer.value = null
    }
    
    if (rafId.value) {
      cancelAnimationFrame(rafId.value)
      rafId.value = null
    }
    
    // 使用 requestAnimationFrame 确保离开动画也流畅
    requestAnimationFrame(() => {
      hovered.value = 0
    })
  }
  </script>
  
<style lang="scss" scoped>
  .container {
    width: 500px;
    height: 500px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 10px;
    /* 优化网格过渡：使用更平滑的缓动，减少抖动 */
    transition: grid-template-columns 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                grid-template-rows 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    overflow: hidden;
    /* 启用硬件加速 */
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
    /* CSS containment 优化性能，减少重排影响范围 */
    contain: layout style paint;
    /* 隔离层叠上下文 */
    isolation: isolate;
  }

  .item {
    /* 优化过渡效果：减少时间，使用更平滑的缓动 */
    transition: filter 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                box-shadow 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                opacity 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    /* 优化 will-change，只在需要时启用 */
    will-change: auto;
    overflow: hidden;
    border-radius: 4px;
    /* 默认状态 */
    filter: brightness(1);
    opacity: 1;
    transform: scale(1) translateZ(0);
    /* 启用硬件加速，防止闪烁 */
    backface-visibility: hidden;
    -webkit-font-smoothing: subpixel-antialiased;
    /* 强制 GPU 渲染 */
    transform-style: preserve-3d;
    /* CSS containment 优化单个格子的重绘性能 */
    contain: layout style paint;
    /* 创建合成层，减少重绘 */
    will-change: auto;
  }
  
  /* 鼠标悬停时才启用 will-change */
  .container:hover .item {
    will-change: filter, box-shadow, opacity, transform;
  }

  /* 生成最多36个格子的颜色 */
  @for $i from 1 through 36 {
    .item:nth-child(#{$i}) {
      background-color: hsl($i * 10, 100%, 74%);
    }
  }

  /* Hover效果：通过JS添加的class控制，优化GPU加速 */
  .item.dim {
    filter: brightness(0.65);
    opacity: 0.88;
    transform: scale(0.98) translateZ(0);
  }

  .item.active {
    filter: brightness(1.12);
    box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.75),
                0 0 40px 10px rgba(255, 255, 255, 0.35);
    z-index: 10;
    position: relative;
    transform: scale(1.01) translateZ(0);
  }

  .item.neighbor {
    filter: brightness(1.06);
    box-shadow: 0 0 12px 3px rgba(255, 255, 255, 0.6);
    z-index: 5;
    position: relative;
    transform: scale(1.005) translateZ(0);
  }

  /* 关闭内置颜色（用于自定义图片/内容） */
  .container.no-color .item {
    background: transparent !important;
    border: none;
  }

  /* 让插入的内容自适应填充格子（如图片/视频） */
  .container.content-fill .item > * {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    /* 优化图片/视频过渡，防止闪烁和抖动 */
    transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                filter 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                opacity 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    /* 强制GPU加速，减少重绘 */
    transform: translateZ(0);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    /* 优化图片渲染 */
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    /* 防止图片抖动 */
    will-change: auto;
    pointer-events: none; /* 图片本身不响应鼠标事件，由父元素处理 */
  }
  
  /* 鼠标悬停时启用 will-change */
  .container.content-fill:hover .item > * {
    will-change: transform, filter, opacity;
  }

  /* 锁定网格模式下，通过transform实现视觉放大效果 */
  .container.lock-grid .item.active {
    transform: scale(1.03) translateZ(0);
  }

  .container.lock-grid .item.neighbor {
    transform: scale(1.015) translateZ(0);
  }
  
  .container.lock-grid .item.dim {
    transform: scale(0.98) translateZ(0);
  }
  
  /* 优化图片在不同状态下的表现 */
  .container.content-fill .item.active > * {
    transform: scale(1) translateZ(0);
    filter: brightness(1);
  }
  
  .container.content-fill .item.dim > * {
    opacity: 0.9;
  }
  
  /* 针对图片和视频的特殊优化 */
  .container.content-fill .item > img,
  .container.content-fill .item > video {
    /* 防止图片在缩放时产生锯齿 */
    transform-origin: center center;
    /* 使用更好的图片缩放算法 */
    image-rendering: auto;
  }
</style>