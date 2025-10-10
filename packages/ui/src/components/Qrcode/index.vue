<template>
    <div :class="containerClass" :style="containerStyle">
        <canvas ref="canvasRef" :width="canvasSize" :height="canvasSize" :style="canvasStyle"></canvas>

        <!-- 加载状态 -->
        <div v-if="loading" class="x-qrcode-loading">
            <div class="x-qrcode-spinner"></div>
            <span v-if="loadingText" class="x-qrcode-loading-text">{{ loadingText }}</span>
        </div>

        <!-- 错误状态 -->
        <div v-if="error" class="x-qrcode-error">
            <div class="x-qrcode-error-icon">⚠️</div>
            <span v-if="errorText" class="x-qrcode-error-text">{{ errorText }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'

/**
 * Qrcode 二维码组件
 * @displayName XQrcode
 */

interface Props {
    /**
     * 二维码内容
     */
    value: string
    /**
     * 二维码尺寸
     */
    size?: number
    /**
     * 二维码背景色
     */
    backgroundColor?: string
    /**
     * 二维码前景色
     */
    foregroundColor?: string
    /**
     * 二维码容错级别
     * @values L, M, Q, H
     */
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
    /**
     * 是否显示边框
     */
    bordered?: boolean
    /**
     * 边框颜色
     */
    borderColor?: string
    /**
     * 边框宽度
     */
    borderWidth?: number
    /**
     * 加载文本
     */
    loadingText?: string
    /**
     * 错误文本
     */
    errorText?: string
}

const props = withDefaults(defineProps<Props>(), {
    size: 200,
    backgroundColor: '#ffffff',
    foregroundColor: '#000000',
    errorCorrectionLevel: 'M',
    bordered: true,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    loadingText: '生成中...',
    errorText: '生成失败'
})

const emit = defineEmits<{
    /**
     * 二维码生成成功时触发
     */
    (e: 'success'): void
    /**
     * 二维码生成失败时触发
     */
    (e: 'error', error: Error): void
}>()

const canvasRef = ref<HTMLCanvasElement>()
const loading = ref(false)
const error = ref(false)

const canvasSize = computed(() => props.size)
const containerSize = computed(() => props.bordered ? props.size + props.borderWidth * 2 : props.size)

const containerClass = computed(() => [
    'x-qrcode',
    {
        'x-qrcode-bordered': props.bordered,
        'x-qrcode-loading': loading.value,
        'x-qrcode-error': error.value
    }
])

const containerStyle = computed(() => ({
    width: `${containerSize.value}px`,
    height: `${containerSize.value}px`
}))

const canvasStyle = computed(() => ({
    width: `${props.size}px`,
    height: `${props.size}px`,
    border: props.bordered ? `${props.borderWidth}px solid ${props.borderColor}` : 'none',
    borderRadius: '4px'
}))

// 简单的二维码生成算法（模拟）
function generateQRCode(value: string, size: number): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            const canvas = canvasRef.value
            if (!canvas) {
                reject(new Error('Canvas not found'))
                return
            }

            const ctx = canvas.getContext('2d')
            if (!ctx) {
                reject(new Error('Canvas context not found'))
                return
            }

            // 清空画布
            ctx.clearRect(0, 0, size, size)

            // 设置背景色
            ctx.fillStyle = props.backgroundColor
            ctx.fillRect(0, 0, size, size)

            // 生成简单的二维码图案（模拟）
            const moduleSize = Math.floor(size / 25) // 25x25 模块
            const padding = (size - moduleSize * 25) / 2

            ctx.fillStyle = props.foregroundColor

            // 生成随机图案模拟二维码
            const seed = value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
            const random = (seed: number) => {
                const x = Math.sin(seed) * 10000
                return x - Math.floor(x)
            }

            for (let row = 0; row < 25; row++) {
                for (let col = 0; col < 25; col++) {
                    const moduleSeed = seed + row * 25 + col
                    if (random(moduleSeed) > 0.5) {
                        ctx.fillRect(
                            padding + col * moduleSize,
                            padding + row * moduleSize,
                            moduleSize,
                            moduleSize
                        )
                    }
                }
            }

            // 添加定位点（左上、右上、左下）
            const cornerSize = moduleSize * 7
            const cornerModules = [
                { x: padding, y: padding },
                { x: padding + moduleSize * 18, y: padding },
                { x: padding, y: padding + moduleSize * 18 }
            ]

            cornerModules.forEach(corner => {
                // 外框
                ctx.fillRect(corner.x, corner.y, cornerSize, cornerSize)
                // 内框
                ctx.fillStyle = props.backgroundColor
                ctx.fillRect(
                    corner.x + moduleSize,
                    corner.y + moduleSize,
                    cornerSize - moduleSize * 2,
                    cornerSize - moduleSize * 2
                )
                // 中心点
                ctx.fillStyle = props.foregroundColor
                ctx.fillRect(
                    corner.x + moduleSize * 2,
                    corner.y + moduleSize * 2,
                    cornerSize - moduleSize * 4,
                    cornerSize - moduleSize * 4
                )
            })

            resolve()
        } catch (err) {
            reject(err)
        }
    })
}

async function createQRCode() {
    if (!props.value) {
        error.value = true
        emit('error', new Error('Value is required'))
        return
    }

    loading.value = true
    error.value = false

    try {
        await generateQRCode(props.value, props.size)
        loading.value = false
        emit('success')
    } catch (err) {
        loading.value = false
        error.value = true
        emit('error', err as Error)
    }
}

// 监听属性变化
watch(
    () => [props.value, props.size, props.backgroundColor, props.foregroundColor],
    () => {
        nextTick(() => {
            createQRCode()
        })
    },
    { deep: true }
)

onMounted(() => {
    createQRCode()
})

// 暴露方法
defineExpose({
    /**
     * 重新生成二维码
     */
    refresh: createQRCode
})
</script>

<style scoped>
.x-qrcode {
    position: relative;
    display: inline-block;
    background-color: var(--x-color-white, #ffffff);
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
}

.x-qrcode-bordered {
    box-shadow: var(--x-shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.05));
}

.x-qrcode canvas {
    display: block;
    transition: opacity 0.3s ease;
}

/* 加载状态 */
.x-qrcode-loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(2px);
}

.x-qrcode-loading canvas {
    opacity: 0.3;
}

.x-qrcode-spinner {
    width: 24px;
    height: 24px;
    border: 2px solid var(--x-color-gray-200, #e5e5e5);
    border-top: 2px solid var(--x-color-primary, #ff6b35);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 8px;
}

.x-qrcode-loading-text {
    font-size: 12px;
    color: var(--x-color-gray-600, #666666);
    text-align: center;
}

/* 错误状态 */
.x-qrcode-error {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(2px);
}

.x-qrcode-error canvas {
    opacity: 0.1;
}

.x-qrcode-error-icon {
    font-size: 24px;
    margin-bottom: 8px;
}

.x-qrcode-error-text {
    font-size: 12px;
    color: var(--x-color-danger, #ef4444);
    text-align: center;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

/* 响应式 */
@media (max-width: 768px) {
    .x-qrcode {
        border-radius: 6px;
    }

    .x-qrcode-loading-text,
    .x-qrcode-error-text {
        font-size: 11px;
    }
}
</style>