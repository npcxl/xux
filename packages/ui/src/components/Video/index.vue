<template>
    <div class="x-video" :class="[{ 'is-loading': loading }, { 'is-error': error }, { 'is-playing': isPlaying }]"
        :style="wrapperStyle" @mouseenter="showControls = true" @mouseleave="hideControlsDelay">
        <video ref="videoRef" :src="actualSrc" :poster="actualPoster" :style="videoStyle"
            @loadedmetadata="onLoadedMetadata" @timeupdate="onTimeUpdate" @play="onPlay" @pause="onPause"
            @ended="onEnded" @error="onError" @waiting="onWaiting" @canplay="onCanPlay" @click="togglePlay" />

        <!-- Loading overlay -->
        <div v-if="loading && !error" class="x-video-loading">
            <slot name="loading">
                <div class="x-video-spinner"></div>
            </slot>
        </div>

        <!-- Error fallback -->
        <div v-if="error" class="x-video-fallback">
            <slot name="error">
                <div class="x-video-error-icon">
                    <Icon icon="material-symbols:error-outline" :width="48" :height="48" />
                </div>
                <div class="x-video-error-text">视频加载失败</div>
            </slot>
        </div>

        <!-- Center play button (when paused) -->
        <transition name="center-play">
            <div v-if="showCenterPlay && !isPlaying && !loading && !error" class="x-video-center-play"
                @click.stop="handleCenterPlay">
                <button class="x-video-center-play-btn">
                    <Icon icon="material-symbols:play-arrow" :width="48" :height="48" />
                </button>
            </div>
        </transition>

        <!-- Controls overlay -->
        <div v-if="showControls || isPlaying" class="x-video-controls"
            :class="{ 'is-visible': showControls || isPlaying }">
            <!-- Play/Pause button (hide when center play button is shown) -->
            <button v-if="!showCenterPlay || isPlaying" class="x-video-play-btn" @click.stop="togglePlay">
                <Icon v-if="!isPlaying" icon="material-symbols:play-arrow" :width="24" :height="24" />
                <Icon v-else icon="material-symbols:pause" :width="24" :height="24" />
            </button>

            <!-- Progress bar -->
            <div class="x-video-progress" @click.stop="seekTo">
                <div class="x-video-progress-track">
                    <div class="x-video-progress-filled" :style="{ width: `${progressPercent}%` }"></div>
                    <div class="x-video-progress-buffer" :style="{ width: `${bufferPercent}%` }"></div>
                </div>
            </div>

            <!-- Time display -->
            <div class="x-video-time">
                <span>{{ formatTime(currentTime) }}</span>
                <span>/</span>
                <span>{{ formatTime(duration) }}</span>
            </div>

            <!-- Quality selector -->
            <div v-if="actualQualities && actualQualities.length > 1" class="x-video-quality"
                :class="{ 'is-fullscreen': isFullscreen }">
                <div class="x-video-quality-wrapper">
                    <select :value="currentQuality" @change="changeQuality" @click.stop @mousedown.stop @focus.stop
                        class="x-video-quality-select">
                        <option v-for="quality in actualQualities" :key="quality.value" :value="quality.value">
                            {{ quality.label }}
                        </option>
                    </select>
                </div>
            </div>

            <!-- Volume control -->
            <div class="x-video-volume">
                <button @click.stop="toggleMute">
                    <Icon v-if="!isMuted" icon="material-symbols:volume-up" :width="20" :height="20" />
                    <Icon v-else icon="material-symbols:volume-off" :width="20" :height="20" />
                </button>
                <input type="range" min="0" max="100" :value="volume * 100" @input="onVolumeChange" @click.stop />
            </div>

            <!-- Fullscreen button -->
            <button class="x-video-fullscreen-btn" @click.stop="toggleFullscreen">
                <Icon icon="material-symbols:fullscreen" :width="20" :height="20" />
            </button>
        </div>

        <!-- Navigation buttons (for video list) -->
        <template v-if="hasPrev || hasNext">
            <button v-if="hasPrev" class="x-video-nav x-video-prev" @click.stop="prevVideo">
                <Icon icon="material-symbols:skip-previous" :width="24" :height="24" />
            </button>
            <button v-if="hasNext" class="x-video-nav x-video-next" @click.stop="nextVideo">
                <Icon icon="material-symbols:skip-next" :width="24" :height="24" />
            </button>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'

export interface VideoQuality {
    label: string
    value: string
    src: string
    bitrate?: number // 用于自适应选择
}

export interface VideoProps {
    src: string | VideoQuality[]
    poster?: string
    width?: string
    height?: string
    radius?: string
    autoplay?: boolean
    loop?: boolean
    muted?: boolean
    controls?: boolean
    /** 视频列表（用于上一个/下一个功能） */
    videoList?: Array<{ src: string | VideoQuality[], poster?: string, title?: string }>
    /** 当前视频索引 */
    currentIndex?: number
    /** 是否根据系统配置自适应选择清晰度 */
    adaptive?: boolean
    /** 默认清晰度（当adaptive为false时使用） */
    defaultQuality?: string
}

const props = withDefaults(defineProps<VideoProps>(), {
    poster: '',
    width: '100%',
    height: 'auto',
    radius: '8px',
    autoplay: false,
    loop: false,
    muted: false,
    controls: true,
    videoList: () => [],
    currentIndex: 0,
    adaptive: true,
    defaultQuality: 'auto'
})

const emit = defineEmits<{
    (e: 'play'): void
    (e: 'pause'): void
    (e: 'ended'): void
    (e: 'timeupdate', time: number): void
    (e: 'error', ev: Event): void
    (e: 'qualitychange', quality: string): void
    (e: 'prev'): void
    (e: 'next'): void
    (e: 'change', index: number): void
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
const loading = ref(true)
const error = ref(false)
const isPlaying = ref(false)
const isMuted = ref(props.muted)
const showControls = ref(false)
const showCenterPlay = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(1)
const currentQuality = ref('auto')
const currentVideoIndex = ref(props.currentIndex)
const isFullscreen = ref(false)

// 检测系统配置（网络速度、设备性能）
const systemConfig = ref({
    connectionType: '4g',
    effectiveType: '4g',
    downlink: 10, // Mbps
    deviceMemory: 8, // GB
    hardwareConcurrency: 4 // CPU cores
})

// 解析视频源
const qualities = computed<VideoQuality[]>(() => {
    if (Array.isArray(props.src)) {
        return props.src
    }
    return [{
        label: '自动',
        value: 'auto',
        src: props.src
    }]
})

// 当前视频源
const currentSrc = computed(() => {
    const quality = qualities.value.find(q => q.value === currentQuality.value) || qualities.value[0]
    return quality?.src || ''
})

// 当前视频信息（用于视频列表）
const currentVideo = computed(() => {
    if (props.videoList && props.videoList.length > 0) {
        return props.videoList[currentVideoIndex.value] || props.videoList[0]
    }
    return null
})

// 如果有视频列表，使用列表中的源
const actualSrc = computed(() => {
    if (currentVideo.value) {
        const videoSrc = currentVideo.value.src
        if (Array.isArray(videoSrc)) {
            const quality = videoSrc.find((q: VideoQuality) => q.value === currentQuality.value) || videoSrc[0]
            return quality?.src || ''
        }
        return videoSrc
    }
    return currentSrc.value
})

// 更新qualities计算属性，支持视频列表
const actualQualities = computed<VideoQuality[]>(() => {
    if (currentVideo.value) {
        const videoSrc = currentVideo.value.src
        if (Array.isArray(videoSrc)) {
            return videoSrc
        }
        return [{
            label: '自动',
            value: 'auto',
            src: videoSrc as string
        }]
    }
    return qualities.value
})

// 实际使用的poster
const actualPoster = computed(() => {
    if (currentVideo.value?.poster) {
        return currentVideo.value.poster
    }
    return props.poster
})

const hasPrev = computed(() => {
    return props.videoList && props.videoList.length > 0 && currentVideoIndex.value > 0
})

const hasNext = computed(() => {
    return props.videoList && props.videoList.length > 0 && currentVideoIndex.value < props.videoList.length - 1
})

const progressPercent = computed(() => {
    if (duration.value === 0) return 0
    return (currentTime.value / duration.value) * 100
})

const bufferPercent = computed(() => {
    if (duration.value === 0 || !videoRef.value) return 0
    const bufferedRanges = videoRef.value.buffered
    if (bufferedRanges.length > 0) {
        const bufferedEnd = bufferedRanges.end(bufferedRanges.length - 1)
        return (bufferedEnd / duration.value) * 100
    }
    return 0
})

const wrapperStyle = computed(() => ({
    width: props.width,
    height: props.height,
    borderRadius: props.radius
}))

const videoStyle = computed(() => ({
    borderRadius: props.radius,
    objectFit: 'cover' as const
}))

// 检测系统配置
const detectSystemConfig = () => {
    if (typeof navigator === 'undefined') return

    // 检测网络连接
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    if (connection) {
        systemConfig.value.connectionType = connection.type || '4g'
        systemConfig.value.effectiveType = connection.effectiveType || '4g'
        systemConfig.value.downlink = connection.downlink || 10
    }

    // 检测设备内存
    if ((navigator as any).deviceMemory) {
        systemConfig.value.deviceMemory = (navigator as any).deviceMemory
    }

    // 检测CPU核心数
    if (navigator.hardwareConcurrency) {
        systemConfig.value.hardwareConcurrency = navigator.hardwareConcurrency
    }
}

// 根据系统配置选择清晰度
const selectAdaptiveQuality = () => {
    const availableQualities = actualQualities.value
    if (!props.adaptive || availableQualities.length <= 1) {
        currentQuality.value = props.defaultQuality || 'auto'
        return
    }

    const { downlink, deviceMemory, hardwareConcurrency } = systemConfig.value

    // 根据网络速度和设备性能选择清晰度
    let selectedQuality = 'auto'

    // 网络速度慢或设备性能低，选择低清晰度
    if (downlink < 2 || deviceMemory < 4 || hardwareConcurrency < 2) {
        // 找到最低清晰度
        const sortedQualities = [...availableQualities].sort((a, b) => {
            const aBitrate = a.bitrate || 0
            const bBitrate = b.bitrate || 0
            return aBitrate - bBitrate
        })
        selectedQuality = sortedQualities[0]?.value || 'auto'
    }
    // 网络速度中等，选择中等清晰度
    else if (downlink < 10 || deviceMemory < 8) {
        const sortedQualities = [...availableQualities].sort((a, b) => {
            const aBitrate = a.bitrate || 0
            const bBitrate = b.bitrate || 0
            return aBitrate - bBitrate
        })
        const midIndex = Math.floor(sortedQualities.length / 2)
        selectedQuality = sortedQualities[midIndex]?.value || 'auto'
    }
    // 网络速度快且设备性能好，选择最高清晰度
    else {
        const sortedQualities = [...availableQualities].sort((a, b) => {
            const aBitrate = a.bitrate || 0
            const bBitrate = b.bitrate || 0
            return bBitrate - aBitrate
        })
        selectedQuality = sortedQualities[0]?.value || 'auto'
    }

    currentQuality.value = selectedQuality
}

// 格式化时间
const formatTime = (seconds: number): string => {
    if (!isFinite(seconds)) return '00:00'
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)
    if (h > 0) {
        return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }
    return `${m}:${s.toString().padStart(2, '0')}`
}

// 播放/暂停
const togglePlay = () => {
    if (!videoRef.value) return
    if (isPlaying.value) {
        videoRef.value.pause()
        // 暂停后显示中央播放按钮
        setTimeout(() => {
            showCenterPlay.value = true
        }, 300)
    } else {
        videoRef.value.play()
        // 播放时隐藏中央播放按钮
        showCenterPlay.value = false
    }
}

// 中央播放按钮点击处理
const handleCenterPlay = () => {
    if (!videoRef.value) return
    showCenterPlay.value = false
    videoRef.value.play()
}

// 静音/取消静音
const toggleMute = () => {
    if (!videoRef.value) return
    isMuted.value = !isMuted.value
    videoRef.value.muted = isMuted.value
}

// 音量变化
const onVolumeChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    volume.value = parseInt(target.value) / 100
    if (videoRef.value) {
        videoRef.value.volume = volume.value
        if (volume.value === 0) {
            isMuted.value = true
            videoRef.value.muted = true
        } else {
            isMuted.value = false
            videoRef.value.muted = false
        }
    }
}

// 跳转到指定时间
const seekTo = (e: MouseEvent) => {
    if (!videoRef.value || duration.value === 0) return
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const percent = x / rect.width
    const time = percent * duration.value
    videoRef.value.currentTime = time
    currentTime.value = time
}

// 切换清晰度
const changeQuality = (e: Event) => {
    const target = e.target as HTMLSelectElement
    const newQuality = target.value
    if (newQuality !== currentQuality.value) {
        currentQuality.value = newQuality
        emit('qualitychange', newQuality)
        // 重新加载视频
        if (videoRef.value) {
            const wasPlaying = isPlaying.value
            videoRef.value.load()
            if (wasPlaying) {
                videoRef.value.play()
            }
        }
    }
}

// 全屏
const toggleFullscreen = () => {
    if (!videoRef.value) return
    if (!document.fullscreenElement) {
        videoRef.value.requestFullscreen()
        isFullscreen.value = true
    } else {
        document.exitFullscreen()
        isFullscreen.value = false
    }
}

// 监听全屏状态变化
const handleFullscreenChange = () => {
    isFullscreen.value = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
    )
}

// 上一个视频
const prevVideo = () => {
    if (!hasPrev.value) return
    currentVideoIndex.value--
    emit('prev')
    emit('change', currentVideoIndex.value)
    if (videoRef.value) {
        videoRef.value.load()
        if (props.autoplay) {
            videoRef.value.play()
        }
    }
}

// 下一个视频
const nextVideo = () => {
    if (!hasNext.value) return
    currentVideoIndex.value++
    emit('next')
    emit('change', currentVideoIndex.value)
    if (videoRef.value) {
        videoRef.value.load()
        if (props.autoplay) {
            videoRef.value.play()
        }
    }
}

// 隐藏控制栏延迟
let hideControlsTimer: ReturnType<typeof setTimeout> | null = null
const hideControlsDelay = () => {
    if (hideControlsTimer) {
        clearTimeout(hideControlsTimer)
    }
    hideControlsTimer = setTimeout(() => {
        if (!isPlaying.value) {
            showControls.value = false
            // 如果暂停且没有显示中央播放按钮，则显示它
            if (!showCenterPlay.value) {
                showCenterPlay.value = true
            }
        }
    }, 3000)
}

// 事件处理
const onLoadedMetadata = () => {
    if (videoRef.value) {
        duration.value = videoRef.value.duration
        loading.value = false
    }
}

const onTimeUpdate = () => {
    if (videoRef.value) {
        currentTime.value = videoRef.value.currentTime
        emit('timeupdate', videoRef.value.currentTime)
    }
}

const onPlay = () => {
    isPlaying.value = true
    showControls.value = true
    showCenterPlay.value = false
    emit('play')
}

const onPause = () => {
    isPlaying.value = false
    // 暂停时显示中央播放按钮
    setTimeout(() => {
        if (!isPlaying.value) {
            showCenterPlay.value = true
        }
    }, 300)
    emit('pause')
}

const onEnded = () => {
    isPlaying.value = false
    // 播放结束时显示中央播放按钮
    setTimeout(() => {
        if (!isPlaying.value) {
            showCenterPlay.value = true
        }
    }, 300)
    emit('ended')
    // 自动播放下一个视频
    if (hasNext.value && props.autoplay) {
        nextVideo()
    }
}

const onError = (ev: Event) => {
    error.value = true
    loading.value = false
    emit('error', ev)
}

const onWaiting = () => {
    loading.value = true
}

const onCanPlay = () => {
    loading.value = false
}

// 监听视频源变化
watch(() => actualSrc.value, () => {
    if (videoRef.value) {
        loading.value = true
        error.value = false
        // 重新选择清晰度（如果视频列表变化）
        selectAdaptiveQuality()
        videoRef.value.load()
    }
})

// 监听视频列表变化，重新选择清晰度
watch(() => currentVideoIndex.value, () => {
    selectAdaptiveQuality()
})

// 监听当前视频索引变化
watch(() => props.currentIndex, (newIndex) => {
    currentVideoIndex.value = newIndex
})

onMounted(() => {
    detectSystemConfig()
    selectAdaptiveQuality()

    if (videoRef.value) {
        videoRef.value.muted = props.muted
        videoRef.value.volume = volume.value
        if (props.autoplay) {
            videoRef.value.play()
        }
    }

    // 监听全屏状态变化
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', handleFullscreenChange)
    document.addEventListener('MSFullscreenChange', handleFullscreenChange)
})

onUnmounted(() => {
    if (hideControlsTimer) {
        clearTimeout(hideControlsTimer)
    }

    // 移除全屏监听
    document.removeEventListener('fullscreenchange', handleFullscreenChange)
    document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
    document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
})
</script>

<style lang="scss" scoped>
.x-video {
    position: relative;
    overflow: hidden;
    background: var(--x-fill-color, #F2F2F7);
    cursor: pointer;

    video {
        width: 100%;
        height: 100%;
        display: block;
    }

    &.is-loading {
        .x-video-loading {
            display: flex;
        }
    }

    &.is-error {
        .x-video-fallback {
            display: flex;
        }
    }
}

.x-video-loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: none;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2;
}

.x-video-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.x-video-fallback {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--x-fill-color, #F2F2F7);
    color: var(--x-text-color-secondary, #8E8E93);
}

.x-video-error-icon {
    margin-bottom: 12px;
    color: var(--x-text-color-secondary, #8E8E93);
    display: flex;
    align-items: center;
    justify-content: center;
}

.x-video-error-text {
    font-size: 14px;
}

.x-video-center-play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
    pointer-events: auto;
}

.x-video-center-play-btn {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.6);
    border: 3px solid rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #fff;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    backdrop-filter: blur(10px);
    position: relative;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

    &:hover {
        background: rgba(0, 0, 0, 0.8);
        transform: scale(1.1);
        border-color: rgba(255, 255, 255, 1);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
    }

    &:active {
        transform: scale(0.95);
    }
}


/* 中央播放按钮淡入淡出动画 */
.center-play-enter-active {
    animation: centerPlayFadeIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.center-play-leave-active {
    animation: centerPlayFadeOut 0.3s ease-out;
}

@keyframes centerPlayFadeIn {
    0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
    }

    60% {
        transform: translate(-50%, -50%) scale(1.1);
    }

    100% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}

@keyframes centerPlayFadeOut {
    0% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }

    100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
    }
}

.x-video-controls {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    display: flex;
    align-items: center;
    gap: 12px;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 3;

    &.is-visible {
        opacity: 1;
    }
}

.x-video-play-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--x-color-primary, #007AFF);
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.1);
    }
}

.x-video-progress {
    flex: 1;
    height: 4px;
    cursor: pointer;
}

.x-video-progress-track {
    position: relative;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    overflow: hidden;
}

.x-video-progress-buffer {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    transition: width 0.1s;
}

.x-video-progress-filled {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: var(--x-color-primary, #007AFF);
    transition: width 0.1s;
    z-index: 1;
}

.x-video-time {
    color: #fff;
    font-size: 12px;
    white-space: nowrap;
}

.x-video-quality {
    position: relative;
}

.x-video-quality-wrapper {
    position: relative;
}

.x-video-quality-select {
    padding: 4px 8px;
    padding-right: 24px;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    font-size: 12px;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
    transition: all 0.2s;
    z-index: 10;
    position: relative;

    &:hover {
        background: rgba(0, 0, 0, 0.9);
        border-color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
        border-color: var(--x-color-primary, #007AFF);
        background: rgba(0, 0, 0, 0.9);
    }

    &::-ms-expand {
        display: none;
    }

    option {
        background: rgba(0, 0, 0, 0.95);
        color: #fff;
        padding: 8px;
    }
}

/* 全屏模式下的样式优化 */
.x-video-quality.is-fullscreen .x-video-quality-select,
:fullscreen .x-video-quality-select,
:-webkit-full-screen .x-video-quality-select,
:-moz-full-screen .x-video-quality-select,
:-ms-fullscreen .x-video-quality-select {
    font-size: 14px;
    padding: 6px 10px;
    padding-right: 28px;
    z-index: 1000;
    position: relative;
    background: rgba(0, 0, 0, 0.9);
}

:fullscreen .x-video-quality,
:-webkit-full-screen .x-video-quality,
:-moz-full-screen .x-video-quality,
:-ms-fullscreen .x-video-quality {
    z-index: 1000;
    position: relative;
}

.x-video-volume {
    display: flex;
    align-items: center;
    gap: 8px;

    button {
        background: none;
        border: none;
        color: #fff;
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    input[type="range"] {
        width: 60px;
        height: 4px;
        cursor: pointer;
    }
}

.x-video-fullscreen-btn {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.x-video-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.6);
    border: none;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4;
    transition: background 0.2s;

    &:hover {
        background: rgba(0, 0, 0, 0.8);
    }

    &.x-video-prev {
        left: 16px;
    }

    &.x-video-next {
        right: 16px;
    }
}
</style>
