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
    hovered.value = i
  }
  
  function handleMouseLeave() {
    hovered.value = 0
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
    transition: grid-template-columns 0.5s ease-out, 
                grid-template-rows 0.5s ease-out;
    overflow: hidden;
  }

  .item {
    transition: filter 0.3s ease, 
                box-shadow 0.3s ease, 
                opacity 0.3s ease;
    will-change: filter, box-shadow;
    overflow: hidden;
    border-radius: 4px;
  }

  /* 生成最多36个格子的颜色 */
  @for $i from 1 through 36 {
    .item:nth-child(#{$i}) {
      background-color: hsl($i * 10, 100%, 74%);
    }
  }

  /* Hover效果：通过JS添加的class控制 */
  .item.dim {
    filter: brightness(0.6);
    opacity: 0.85;
  }

  .item.active {
    filter: brightness(1.1);
    box-shadow: 0 0 20px 4px rgba(255, 255, 255, 0.7),
                0 0 40px 8px rgba(255, 255, 255, 0.3);
    z-index: 10;
    position: relative;
  }

  .item.neighbor {
    filter: brightness(1.05);
    box-shadow: 0 0 12px 3px rgba(255, 255, 255, 0.6);
    z-index: 5;
    position: relative;
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
  }
</style>