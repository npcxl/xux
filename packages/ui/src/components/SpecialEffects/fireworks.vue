<template>
  <div 
    class="fireworks-wrapper" 
    @click="handleClick"
  >
    <!-- 插槽：包裹任何内容 -->
    <slot></slot>
    
    <!-- 烟花效果容器 -->
    <div 
      v-for="(firework, index) in activeFireworks" 
      :key="index"
      class="firework-effect"
      :style="{
        left: `${firework.x}px`,
        top: `${firework.y}px`,
      }"
    >
      <div class="firework-particle"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Fireworks 烟花特效包裹组件
 * @displayName XFireworks
 */
import { ref } from 'vue'

interface Firework {
  x: number
  y: number
  id: number
}

const activeFireworks = ref<Firework[]>([])
let fireworkId = 0

// 处理点击事件
const handleClick = (event: MouseEvent) => {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  const firework: Firework = {
    x,
    y,
    id: fireworkId++
  }
  
  activeFireworks.value.push(firework)
  
  // 1.25秒后移除烟花
  setTimeout(() => {
    const index = activeFireworks.value.findIndex(f => f.id === firework.id)
    if (index > -1) {
      activeFireworks.value.splice(index, 1)
    }
  }, 1250)
}
</script>

<style scoped>
/* 烟花包裹容器 */
.fireworks-wrapper {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

/* 烟花效果定位 */
.firework-effect {
  position: absolute;
  pointer-events: none;
  z-index: 9999;
}

/* 烟花粒子 */
.firework-particle {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: fireworks-bang 1.25s ease-out forwards, 
             fireworks-gravity 1.25s ease-in forwards;
}

/* 烟花爆炸动画 */
@keyframes fireworks-bang {
  to {
    box-shadow: 
      114px -107px #8800ff, 
      212px -166px #a600ff, 
      197px -6px #ff006a, 
      179px -329px #3300ff, 
      -167px -262px #ff0062, 
      233px 66px #ff008c, 
      81px 43px #0051ff, 
      -13px 55px #00ff2b, 
      -60px -183px #0900ff, 
      127px -259px #ff00e6, 
      117px -122px #00b7ff, 
      95px 21px #ff8000, 
      115px 2px #0004ff, 
      -160px -328px #00ff40, 
      69px -242px #000dff, 
      -208px -230px #ff0400, 
      30px -15px #e6ff00, 
      235px -15px #fb00ff, 
      80px -232px #d5ff00, 
      175px -173px #00ff3c, 
      -187px -176px #aaff00, 
      4px 27px #ff6f00, 
      227px -106px #ff0099, 
      119px 18px #00ffd5, 
      -102px 5px #ff0088, 
      -16px -4px #00fff7, 
      -201px -310px #00ffdd, 
      64px -181px #f700ff, 
      -234px -15px #00fffb, 
      -184px -263px #aa00ff;
  }
}

/* 重力下落动画 */
@keyframes fireworks-gravity {
  to {
    transform: translate(-50%, -50%) translateY(200px);
    opacity: 0;
  }
}
</style>
