<template>
  <div ref="containerRef" class="x-waterfall-container" :style="containerStyle" @scroll="onScroll">
    <div v-if="virtualScroll && startOffset > 0" :style="{ height: startOffset + 'px' }"></div>
    <Suspense v-for="(it, i) in visibleItems" :key="getKey(it, startIndex + i)">
      <template #default>
        <ErrorBoundary :index="startIndex + i">
          <AsyncVirtualItem v-if="positions[startIndex + i]" :item="it" :index="startIndex + i"
            :position="positions[startIndex + i]">
            <template v-if="slots.default" #default="{ item, index }">
              <slot :item="item" :index="index" />
            </template>
          </AsyncVirtualItem>
        </ErrorBoundary>
      </template>
      <template #fallback>
        <div :style="getSkeletonStyle(startIndex + i)" class="x-skeleton-block"></div>
      </template>
    </Suspense>
    <div v-if="virtualScroll && endOffset > 0" :style="{ height: endOffset + 'px' }"></div>
    <div v-if="loading" class="x-waterfall-footer">
      <div class="x-waterfall-spinner">
        <div class="d"></div>
        <div class="d"></div>
        <div class="d"></div>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <div v-show="isCalculating" class="x-wf-global-overlay">
      <div class="x-wf-global-spinner">
        <div class="d"></div>
        <div class="d"></div>
        <div class="d"></div>
      </div>
    </div>
  </Teleport>
  <Teleport to="body" v-if="props.showErrorToast">
    <div v-show="errorCount > 0" class="x-wf-error-toast">渲染失败项 {{ errorCount }}</div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, provide, onMounted, onUnmounted, watch, defineAsyncComponent, useSlots } from 'vue'
import type { CSSProperties } from 'vue'
import { useElementSize, useThrottleFn } from '@vueuse/core'
import ErrorBoundary from './components/ErrorBoundary.vue'
const AsyncVirtualItem = defineAsyncComponent(() => import('./components/VirtualItem.vue'))
import { useVirtualScroll } from './composables/useVirtualScroll'
import { useLazyLoad } from './composables/useLazyLoad'
import { useWaterfallLayout } from './composables/useWaterfallLayout'
const props = withDefaults(defineProps<{ items: any[]; cols?: number; gap?: number; rowGap?: number; buffer?: number; virtualScroll?: boolean; width?: string; height?: string; loading?: boolean; loadMoreThreshold?: number; estimateItemHeight?: number; breakpoints?: Array<{ width: number; cols: number }>; showErrorToast?: boolean }>(), { cols: 3, gap: 16, rowGap: 16, buffer: 5, virtualScroll: true, width: '100%', height: '600px', loading: false, loadMoreThreshold: 200, estimateItemHeight: 200, breakpoints: () => ([{ width: 0, cols: 1 }, { width: 768, cols: 2 }, { width: 1200, cols: 3 }]), showErrorToast: false })
const emit = defineEmits(['load-more', 'layout', 'error'])
const slots = useSlots()

const containerRef = ref<HTMLElement | null>(null)
const { width: containerWidth } = useElementSize(containerRef)
const estimateItemHeight = (index: number) => props.estimateItemHeight as number
const { loadingStates, loadImage } = useLazyLoad()
provide('x-waterfall-loader', loadImage)
const scheduleLayout = useThrottleFn(() => calculateLayout(), 100)
const updateHeight = (index: number, height: number) => {
  if (height > 0) {
    // 只有当新高度大于当前高度或估算高度时，才更新（避免图片加载后高度变小导致重叠）
    const currentHeight = itemHeights.value[index] || estimateItemHeight(index)
    const estimatedHeight = estimateItemHeight(index)
    // 使用较大的值作为安全区
    const safeHeight = Math.max(height, estimatedHeight)
    // 只有当高度变化超过阈值时才更新，避免频繁重新计算
    if (Math.abs(safeHeight - currentHeight) > 5) {
      itemHeights.value[index] = safeHeight
      scheduleLayout()
    }
  }
}
const errorCount = ref(0)
const reportError = (payload?: number) => { errorCount.value++; if (typeof payload === 'number') emit('error', { index: payload }) }
provide('x-waterfall-context', { loadingStates, calculateLayout: () => calculateLayout(), requestMore: () => emit('load-more'), updateHeight, reportError })

const effectiveCols = computed(() => {
  const w = containerWidth.value
  const bps = props.breakpoints!
  let cols = props.cols!
  for (let i = 0; i < bps.length; i++) {
    if (w >= bps[i].width) cols = bps[i].cols
  }
  return cols
})

const { columnHeights, itemPositions, itemHeights, containerHeight, isCalculating, calculateLayout } = useWaterfallLayout({ items: props.items, getCols: () => effectiveCols.value, gap: props.gap!, rowGap: props.rowGap!, containerRef, estimateItemHeight })
const { startIndex, endIndex, visibleItems, handleScroll } = useVirtualScroll({ items: props.items, positions: itemPositions.value, itemHeights: itemHeights.value, buffer: props.buffer, containerRef, virtualScroll: props.virtualScroll })

const onScroll = (e: Event) => {
  const el = e.target as HTMLElement
  handleScroll(el.scrollTop)
  const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight
  if (distanceToBottom <= (props.loadMoreThreshold || 200)) emit('load-more')
}

const getKey = (item: any, index: number) => (item && typeof item === 'object' && item.id != null ? item.id : index)
const positions = computed(() => itemPositions.value)
const startOffset = computed(() => { const p = positions.value[startIndex.value]; return p ? p.top : 0 })
const endOffset = computed(() => { const last = positions.value[endIndex.value - 1]; if (!last) return 0; return Math.max(0, containerHeight.value - (last.top + (itemHeights.value[endIndex.value - 1] || 0))) })
const containerStyle = computed<CSSProperties>(() => ({
  width: props.width as string,
  height: props.height as string,
  position: 'relative',
  overflowY: 'auto',
  overflowX: 'hidden'
}))

const getItemStyle = (index: number): CSSProperties => {
  const p = positions.value[index]
  if (!p) return { position: 'absolute', visibility: 'hidden' }
  return { position: 'absolute', left: p.left + 'px', top: p.top + 'px', width: p.width + 'px', visibility: 'visible' }
}

const getSkeletonStyle = (index: number): CSSProperties => {
  const p = positions.value[index]
  const h = itemHeights.value[index] || (props.estimateItemHeight as number)
  if (!p) return { position: 'absolute', visibility: 'hidden' }
  return { position: 'absolute', left: p.left + 'px', top: p.top + 'px', width: p.width + 'px', height: h + 'px' }
}

onMounted(() => {
  calculateLayout()
})

onUnmounted(() => { })

watch(() => [props.items, props.cols, props.gap, props.rowGap], () => {
  calculateLayout()
}, { deep: true })

watch(containerWidth, () => {
  scheduleLayout()
})

watch([containerHeight, effectiveCols, () => itemPositions.value.length], () => {
  emit('layout', { height: containerHeight.value, cols: effectiveCols.value, count: itemPositions.value.length })
})

const scrollToIndex = (index: number) => {
  const p = positions.value[index]
  if (p && containerRef.value) containerRef.value.scrollTop = p.top
}
const scrollToTop = () => { if (containerRef.value) containerRef.value.scrollTop = 0 }
defineExpose({ calculateLayout, scrollToIndex, scrollToTop })

</script>

<style scoped>
.x-waterfall-container {
  box-sizing: border-box
}

.x-waterfall-img {
  display: block;
  width: 100%
}

.x-skeleton-block {
  position: absolute;
  background: linear-gradient(90deg, rgba(0, 0, 0, .05) 25%, rgba(0, 0, 0, .08) 37%, rgba(0, 0, 0, .05) 63%);
  background-size: 400% 100%;
  animation: sk 1.2s ease-in-out infinite;
  border-radius: 8px;
  height: 100%
}

.x-waterfall-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px
}

.x-waterfall-spinner {
  display: flex;
  gap: 8px
}

.x-waterfall-spinner .d {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--x-color-primary, #007AFF);
  animation: wfs 1.2s infinite ease-in-out
}

.x-waterfall-spinner .d:nth-child(2) {
  animation-delay: .2s
}

.x-waterfall-spinner .d:nth-child(3) {
  animation-delay: .4s
}

@keyframes wfs {

  0%,
  60%,
  100% {
    transform: scale(1);
    opacity: .6
  }

  30% {
    transform: scale(1.3);
    opacity: 1
  }
}

@keyframes sk {
  0% {
    background-position: 100% 0
  }

  100% {
    background-position: 0 0
  }
}

.x-wf-global-overlay {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.x-wf-global-spinner {
  display: flex;
  gap: 10px
}

.x-wf-global-spinner .d {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--x-color-primary, #007AFF);
  animation: wfs 1.2s infinite ease-in-out
}

.x-wf-global-spinner .d:nth-child(2) {
  animation-delay: .2s
}

.x-wf-global-spinner .d:nth-child(3) {
  animation-delay: .4s
}

.x-wf-error-toast {
  position: fixed;
  top: 12px;
  right: 12px;
  padding: 8px 12px;
  background: rgba(211, 47, 47, 0.1);
  color: #D32F2F;
  border: 1px solid rgba(211, 47, 47, 0.25);
  border-radius: 8px;
  z-index: 10000;
  font-size: 12px;
}
</style>
