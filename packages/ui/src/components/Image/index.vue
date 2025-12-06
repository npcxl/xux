<template>
  <div
    class="x-image"
    :class="[
      { 'is-loading': loading },
      { 'is-error': error },
      { 'hover-zoom': hoverZoom },
      { 'can-preview': preview },
    ]"
    :style="wrapperStyle"
  >
    <img
      ref="imgRef"
      v-if="!error && displaySrc"
      :src="displaySrc"
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
      <div
        v-if="showPreview"
        class="x-image-preview-mask"
        @click.self="closePreview"
      >
        <div class="x-image-preview">
          <div v-if="hasList" class="x-image-counter">
            {{ activeIndex + 1 }} / {{ props.previewList.length }}
          </div>
          <button class="x-image-prev" @click.stop="prev" :disabled="!hasPrev">
            ‹
          </button>
          <img :src="currentSrc" :alt="alt" />
          <button class="x-image-next" @click.stop="next" :disabled="!hasNext">
            ›
          </button>
          <button class="x-image-close" @click.stop="closePreview">✕</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import heic2any from "heic2any";

export interface ImageProps {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  radius?: string;
  fit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  hoverZoom?: boolean;
  preview?: boolean;
  previewList?: string[];
  previewIndex?: number;
}

const props = withDefaults(defineProps<ImageProps>(), {
  alt: "",
  width: "100%",
  height: "200px", // 改为默认200px，避免auto导致容器无高度
  radius: "8px",
  fit: "cover",
  hoverZoom: true,
  preview: false,
  previewList: () => [],
  previewIndex: 0,
});

const emit = defineEmits<{
  (e: "error", ev: Event): void;
  (e: "load", ev: Event): void;
  (e: "open", index: number): void;
  (e: "close"): void;
  (e: "change", index: number): void;
}>();

const loading = ref(true);
const error = ref(false);
// HEIC 转换后的运行时资源
const displaySrc = ref("");
const displayList = ref<string[]>([]);
// 标记是否正在转换中，避免中途触发 error
const converting = ref(false);
// 记录创建的 object URL，方便销毁
const objectUrls: string[] = [];
// img 元素引用
const imgRef = ref<HTMLImageElement | null>(null);

const isHeic = (url?: string) => !!url && /\.(heic|heif)$/i.test(url);

// 在浏览器端将 HEIC/HEIF 转为 JPEG，提升兼容性
async function convertIfHeic(url: string): Promise<string> {
  // 如果不是 HEIC 格式，直接返回 Promise
  if (!isHeic(url)) {
    return Promise.resolve(url);
  }

  try {
    // 获取图片资源
    const res = await fetch(url);
    // 获取图片blob
    const blob = await res.blob();

    // 转换为jpeg
    const converted = (await heic2any({
      blob,
      toType: "image/jpeg",
      quality: 0.9,
    })) as Blob | Blob[];
    // 获取输出blob
    const output = Array.isArray(converted) ? converted[0] : converted;
    // 创建object URL
    const objectUrl = URL.createObjectURL(output);
    // 记录object URL
    objectUrls.push(objectUrl);
    return Promise.resolve(objectUrl);
  } catch (err: any) {
    // 如果错误是 "already browser readable"，直接返回原始 URL
    if (err?.message?.includes("already browser readable")) {
      return Promise.resolve(url);
    }
    console.warn("[x-image] HEIC convert failed, fallback to original", err);
    // 转换失败时回退到原始 URL
    return Promise.resolve(url);
  }
}
// 释放转换的 blob URL
function revokeObjectUrls() {
  objectUrls.forEach((url) => URL.revokeObjectURL(url));
  objectUrls.length = 0;
}

// 将当前 src/previewList 进行必要转换并重置加载状态
async function prepareSources() {
  // 如果 src 为空，直接结束加载状态
  if (!props.src || props.src.trim() === "") {
    loading.value = false;
    error.value = false;
    displaySrc.value = "";
    displayList.value = [];
    return;
  }

  loading.value = true;
  error.value = false;
  converting.value = true;
  revokeObjectUrls();
  displaySrc.value = "";
  // 转换源
  displaySrc.value = await convertIfHeic(props.src);
  // 转换列表
  displayList.value = props.previewList?.length
    ? await Promise.all(props.previewList.map((item) => convertIfHeic(item)))
    : [];
  converting.value = false;

  // 如果转换后的 src 仍然为空，结束加载状态
  if (!displaySrc.value || displaySrc.value.trim() === "") {
    loading.value = false;
    error.value = true;
    return;
  }

  // 等待 DOM 更新后，检查图片是否已经加载完成（从缓存中）
  await nextTick();
  // 检查 img 元素是否已经加载完成
  if (imgRef.value && imgRef.value.complete && imgRef.value.naturalHeight > 0) {
    // 图片已经从缓存中加载完成，手动触发 onload
    onLoad(new Event("load"));
  }
}

// 计算样式
const wrapperStyle = computed(() => ({
  width: props.width,
  height: props.height,
  borderRadius: props.radius,
}));

// 图片样式
const imgStyle = computed(() => ({
  objectFit: props.fit,
}));

// 图片加载完成
function onLoad(ev: Event) {
  loading.value = false;
  emit("load", ev);
}
// 图片加载失败
function onError(ev: Event) {
  // 转换期间的错误直接忽略，由转换完成后的 src 再次尝试加载
  if (converting.value) return;
  loading.value = false;
  error.value = true;
  emit("error", ev);
}

// 预览状态
const showPreview = ref(false);
// 当前索引
const activeIndex = ref(props.previewIndex);

// 是否有列表
const hasList = computed(() => displayList.value.length > 0);
// 当前源
const currentSrc = computed(() =>
  hasList.value ? displayList.value[activeIndex.value] : displaySrc.value
);
// 是否有上一张
const hasPrev = computed(() => hasList.value && activeIndex.value > 0);
// 是否有下一张
const hasNext = computed(
  () => hasList.value && activeIndex.value < displayList.value.length - 1
);

// 打开预览
function handleOpenPreview() {
  if (!props.preview) return;
  showPreview.value = true;
  emit("open", activeIndex.value);
}
// 关闭预览
function closePreview() {
  showPreview.value = false;
  emit("close");
}
// 上一张
function prev() {
  if (!hasPrev.value) return;
  activeIndex.value -= 1;
  emit("change", activeIndex.value);
}
// 下一张
function next() {
  if (!hasNext.value) return;
  activeIndex.value += 1;
  emit("change", activeIndex.value);
}

// 键盘事件
function onKeydown(e: KeyboardEvent) {
  if (!showPreview.value) return;
  if (e.key === "Escape") closePreview();
  if (e.key === "ArrowLeft") prev();
  if (e.key === "ArrowRight") next();
}

// 生命周期
onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});
prepareSources();
// 卸载
onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
  revokeObjectUrls();
});

// 监听预览索引
watch(
  () => props.previewIndex,
  (val) => {
    if (typeof val === "number") activeIndex.value = val;
  }
);

// 监听源和列表
watch(
  () => [props.src, props.previewList],
  () => {
    activeIndex.value = props.previewIndex || 0;
    prepareSources();
  },
  { deep: true }
);
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
  transition:
    transform 0.25s ease,
    opacity 0.3s ease;
  cursor: default;
}
.x-image.is-loading img {
  opacity: 0;
}
.x-image.is-error img {
  display: none;
}
.x-image.can-preview img {
  cursor: zoom-in;
}
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
  to {
    transform: rotate(360deg);
  }
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
  background: rgba(0, 0, 0, 0.7);
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
  background: rgba(0, 0, 0, 0.55);
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
.x-image-prev,
.x-image-next,
.x-image-close {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}
.x-image-prev {
  left: -60px;
}
.x-image-next {
  right: -60px;
}
.x-image-close {
  top: -60px;
  right: -60px;
  transform: none;
}
.x-image-prev:disabled,
.x-image-next:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>
