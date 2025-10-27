<template>
  <div 
    class="x-image" 
    :class="[{ 'is-loading': loading }, { 'is-error': error }, { 'hover-zoom': hoverZoom }, { 'can-preview': preview } ]"
    :style="wrapperStyle"
  >
    <img 
      v-if="!error"
      :src="src"
      :alt="alt"
      :style="imgStyle"
      @load="onLoad"
      @error="onError"
      @click="handleOpenPreview"
    />
    
    <!-- Loading overlay -->
    <div v-if="loading && !error" class="x-image-loading">
      <slot name="loading">
        <div class="x-image-spinner"></div>
      </slot>
    </div>
    
    <!-- Error fallback -->
    <div v-if="error" class="x-image-fallback" @click="handleOpenPreview">
      <slot name="error">
        <div class="x-image-error-icon">⚠️</div>
        <div class="x-image-error-text">图片加载失败</div>
      </slot>
    </div>

    <!-- Preview Modal -->
    <teleport to="body">
      <div v-if="showPreview" class="x-image-preview-mask" @click.self="closePreview">
        <div class="x-image-preview">
          <div v-if="hasList" class="x-image-counter">{{ activeIndex + 1 }} / {{ props.previewList.length }}</div>
          <button class="x-image-prev" @click.stop="prev" :disabled="!hasPrev">‹</button>
          <img :src="currentSrc" :alt="alt" />
          <button class="x-image-next" @click.stop="next" :disabled="!hasNext">›</button>
          <button class="x-image-close" @click.stop="closePreview">✕</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

export interface ImageProps {
  src: string
  alt?: string
  width?: string
  height?: string
  radius?: string
  fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  hoverZoom?: boolean
  preview?: boolean
  previewList?: string[]
  previewIndex?: number
}

const props = withDefaults(defineProps<ImageProps>(), {
  alt: '',
  width: '100%',
  height: '200px', // 改为默认200px，避免auto导致容器无高度
  radius: '8px',
  fit: 'cover',
  hoverZoom: true,
  preview: false,
  previewList: () => [],
  previewIndex: 0
})

const emit = defineEmits<{
  (e: 'error', ev: Event): void
  (e: 'load', ev: Event): void
  (e: 'open', index: number): void
  (e: 'close'): void
  (e: 'change', index: number): void
}>()

const loading = ref(true)
const error = ref(false)

const wrapperStyle = computed(() => ({
  width: props.width,
  height: props.height,
  borderRadius: props.radius
}))

const imgStyle = computed(() => ({
  objectFit: props.fit
}))

function onLoad(ev: Event) {
  loading.value = false
  emit('load', ev)
}
function onError(ev: Event) {
  loading.value = false
  error.value = true
  emit('error', ev)
}

const showPreview = ref(false)
const activeIndex = ref(props.previewIndex)

const hasList = computed(() => props.previewList && props.previewList.length > 0)
const currentSrc = computed(() => hasList.value ? props.previewList[activeIndex.value] : props.src)
const hasPrev = computed(() => hasList.value && activeIndex.value > 0)
const hasNext = computed(() => hasList.value && activeIndex.value < props.previewList.length - 1)

function handleOpenPreview() {
  if (!props.preview) return
  showPreview.value = true
  emit('open', activeIndex.value)
}
function closePreview() {
  showPreview.value = false
  emit('close')
}
function prev() {
  if (!hasPrev.value) return
  activeIndex.value -= 1
  emit('change', activeIndex.value)
}
function next() {
  if (!hasNext.value) return
  activeIndex.value += 1
  emit('change', activeIndex.value)
}

function onKeydown(e: KeyboardEvent) {
  if (!showPreview.value) return
  if (e.key === 'Escape') closePreview()
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})

watch(() => props.previewIndex, (val) => {
  if (typeof val === 'number') activeIndex.value = val
})
</script>

<style scoped>
.x-image {
  position: relative;
  display: inline-block;
  overflow: hidden;
}
.x-image img {
  width: 100%;
  height: 100%;
  display: block;
  opacity: 1;
  transition: transform .25s ease, opacity .3s ease;
  cursor: default;
}
.x-image.is-loading img {
  opacity: 0;
}
.x-image.is-error img {
  display: none;
}
.x-image.can-preview img { cursor: zoom-in; }
.x-image.hover-zoom:not(.is-loading) img:hover {
  transform: scale(1.06);
}

/* Loading overlay */
.x-image-loading {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  z-index: 1;
}
.x-image-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: x-image-spin 0.8s linear infinite;
}
@keyframes x-image-spin {
  to { transform: rotate(360deg); }
}
.x-image-fallback {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  color: #666;
  cursor: default;
  z-index: 2;
}
.x-image-error-icon {
  font-size: 32px;
  margin-bottom: 8px;
}
.x-image-error-text {
  font-size: 14px;
  color: #999;
}

/* Preview */
.x-image-preview-mask {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.x-image-preview {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
}
.x-image-counter {
  position: absolute;
  top: -44px;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 10px;
  background: rgba(0,0,0,0.55);
  color: #fff;
  border-radius: 999px;
  font-size: 12px;
  line-height: 1;
}
.x-image-preview img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  display: block;
}
.x-image-prev, .x-image-next, .x-image-close {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.5);
  color: #fff;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}
.x-image-prev { left: -60px; }
.x-image-next { right: -60px; }
.x-image-close { top: -60px; right: -60px; transform: none; }
.x-image-prev:disabled, .x-image-next:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>


