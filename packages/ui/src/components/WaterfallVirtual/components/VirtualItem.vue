<template>
  <div class="x-virtual-item" :style="style" ref="rootRef">
    <slot :item="props.item" :index="props.index">
      <img v-if="src" v-lazy="{ src, key: indexKey, loader }" class="x-virtual-item-img" />
    </slot>
  </div>
</template>

<script setup lang="ts">
import { inject, computed, onMounted, onUnmounted, ref, nextTick } from 'vue'
import type { CSSProperties } from 'vue'
import { vLazy } from '../directives/vLazy'
defineOptions({ directives: { lazy: vLazy } })
const props = defineProps<{ item: any; index: number; position: { left: number; top: number; width: number }; src?: string }>()
const loader = inject<(key: string, src: string) => Promise<any>>('x-waterfall-loader', () => Promise.resolve())
const ctx = inject<any>('x-waterfall-context', null)
const rootRef = ref<HTMLElement | null>(null)
const indexKey = computed(() => String(props.index))
const style = computed<CSSProperties>(() => {
  if (!props.position) {
    return { position: 'absolute', visibility: 'hidden' }
  }
  return { position: 'absolute', left: props.position.left + 'px', top: props.position.top + 'px', width: props.position.width + 'px' }
})

let ro: ResizeObserver | null = null
let lastHeight = 0
let resizeTimer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  if (rootRef.value && typeof ResizeObserver !== 'undefined' && ctx?.updateHeight) {
    // 初始测量高度（延迟一下，确保元素已渲染）
    nextTick(() => {
      if (rootRef.value) {
        const initialHeight = rootRef.value.offsetHeight || rootRef.value.scrollHeight || 0
        if (initialHeight > 0) {
          lastHeight = initialHeight
          ctx.updateHeight(props.index, initialHeight)
        }
      }
    })
    
    // 监听高度变化（使用防抖，避免频繁更新）
    ro = new ResizeObserver(() => {
      if (resizeTimer) {
        clearTimeout(resizeTimer)
      }
      resizeTimer = setTimeout(() => {
        if (rootRef.value) {
          const h = rootRef.value.offsetHeight || rootRef.value.scrollHeight || 0
          // 只有当高度变化超过阈值时才更新
          if (h > 0 && Math.abs(h - lastHeight) > 5) {
            lastHeight = h
            ctx.updateHeight(props.index, h)
          }
        }
      }, 100)
    })
    ro.observe(rootRef.value)
    
    // 监听图片加载完成
    const images = rootRef.value.querySelectorAll('img')
    images.forEach(img => {
      if (!img.complete) {
        img.onload = () => {
          nextTick(() => {
            if (rootRef.value) {
                  const newHeight = rootRef.value.offsetHeight || rootRef.value.scrollHeight || 0
                  if (newHeight > 0 && Math.abs(newHeight - lastHeight) > 5) {
                lastHeight = newHeight
                ctx.updateHeight(props.index, newHeight)
              }
            }
          })
        }
      }
    })
  }
})

onUnmounted(() => {
  if (ro) {
    ro.disconnect()
    ro = null
  }
  if (resizeTimer) {
    clearTimeout(resizeTimer)
    resizeTimer = null
  }
})
</script>

<style scoped>
.x-virtual-item {
  box-sizing: border-box
}

.x-virtual-item-img {
  display: block;
  width: 100%
}
</style>
