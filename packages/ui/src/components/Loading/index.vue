<template>
  <Teleport to="body">
    <div
      v-if="visible"
      :class="['xl-loading-overlay', { 'xl-loading-fullscreen': fullscreen }]"
      :style="overlayStyle"
      @click.self="handleClick"
    >
      <div class="xl-loading-content">
        <!-- 图片加载 -->
        <img
          v-if="image"
          :src="image"
          alt="loading"
          class="xl-loading-image"
        />
        <!-- 图标加载 -->
        <XIcon
          v-else
          :name="icon"
          :size="48"
          class="xl-loading-icon"
        />
        
        <!-- 加载文本 -->
        <div v-if="text" class="xl-loading-text">
          {{ text }}
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import XIcon from '../Icon/index.vue'

export interface LoadingProps {
  /** 加载文本 */
  text?: string
  /** 是否全屏加载 */
  fullscreen?: boolean
  /** 加载图标名称 */
  icon?: 'loading' | 'loading-2' | 'loading-3' | 'loading-4' | 'loading-5' | 'loading-6'
  /** 自定义图片 URL */
  image?: string
  /** 背景遮罩透明度 0-1 */
  opacity?: number
  /** 是否显示背景遮罩 */
  background?: boolean
}

const props = withDefaults(defineProps<LoadingProps>(), {
  text: '加载中...',
  fullscreen: true,
  icon: 'loading',
  opacity: 0.7,
  background: true
})

const visible = ref(false)

const overlayStyle = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.background) {
    styles.background = `rgba(255, 255, 255, ${props.opacity})`
    styles['backdrop-filter'] = 'blur(4px)'
    styles['-webkit-backdrop-filter'] = 'blur(4px)'
  } else {
    styles.background = 'transparent'
  }
  
  return styles
})

const handleClick = () => {
  // 可以添加点击遮罩层的处理逻辑
}

onMounted(() => {
  setTimeout(() => {
    visible.value = true
  }, 10)
})

defineExpose({
  visible
})
</script>

<style scoped>
.xl-loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  opacity: 0;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.xl-loading-overlay[style*="visible"] {
  opacity: 1;
}

.xl-loading-fullscreen {
  position: fixed;
}

.xl-loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.xl-loading-icon {
  color: #3b82f6;
}

.xl-loading-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
  animation: xl-loading-bounce 1s ease-in-out infinite;
}

.xl-loading-text {
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  animation: xl-loading-fade 1.5s ease-in-out infinite;
}

@keyframes xl-loading-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes xl-loading-fade {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}
</style>

