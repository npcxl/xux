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

export interface QrcodeProps {
    /**
     * 二维码内容
     */
    value: string
  /**
   * 文本图标（支持emoji、文本）
   */
  textIcon?: string
  /**
   * 图片图标（支持图片URL）
   */
  icon?: string
  /**
   * 图标尺寸
   */
  iconSize?: number
  /**
   * 图标颜色（仅对文本图标有效）
   */
  iconColor?: string
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

const props = withDefaults(defineProps<QrcodeProps>(), {
  size: 200,
  iconSize: 40,
  iconColor: '#000000',
  backgroundColor: '#ffffff',
  foregroundColor: '#1a1a1a',
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

// 使用qrcode库生成真正的二维码
async function generateQRCode(value: string, size: number): Promise<void> {
    try {
        // 动态导入qrcode库
        const QRCode = (await import('qrcode')).default
        const canvas = canvasRef.value
        if (!canvas) {
            throw new Error('Canvas not found')
        }

        // 配置二维码选项
        const options = {
            width: size,
            margin: 1,
            color: {
                dark: props.foregroundColor,
                light: props.backgroundColor
            },
            errorCorrectionLevel: props.errorCorrectionLevel
        }

        // 生成二维码到canvas
        await QRCode.toCanvas(canvas, value, options)

        // 如果有图标，在二维码中心绘制图标
        if (props.textIcon || props.icon) {
            await drawIconInCenter(canvas, size)
        }
    } catch (err) {
        throw new Error(`Failed to generate QR code: ${err}`)
    }
}

// 在二维码中心绘制图标
async function drawIconInCenter(canvas: HTMLCanvasElement, size: number): Promise<void> {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const iconSize = props.iconSize
    const centerX = size / 2
    const centerY = size / 2
    const iconX = centerX - iconSize / 2
    const iconY = centerY - iconSize / 2

    // 优先处理图片图标
    if (props.icon) {
        // 图片图标处理
        const img = new Image()
        img.crossOrigin = 'anonymous'
        
        return new Promise((resolve, reject) => {
            img.onload = () => {
                try {
                    // 绘制白色背景矩形
                    ctx.fillStyle = props.backgroundColor
                    ctx.beginPath()
                    ctx.rect(iconX - 4, iconY - 4, iconSize + 8, iconSize + 8)
                    ctx.fill()
                    
                    ctx.drawImage(img, iconX, iconY, iconSize, iconSize)
                    resolve()
                } catch (err) {
                    reject(err)
                }
            }
            img.onerror = () => {
                reject(new Error('Failed to load icon image'))
            }
            img.src = props.icon!
        })
    } else if (props.textIcon) {
        // 文本图标处理（包括emoji）
        ctx.font = `${iconSize}px Arial`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        // 测量文本实际尺寸
        const textMetrics = ctx.measureText(props.textIcon)
        const textWidth = textMetrics.width
        const textHeight = iconSize // 字体大小作为高度参考
        
        // 计算背景矩形尺寸，添加适当的内边距
        const padding = 8
        const bgWidth = Math.max(textWidth + padding, iconSize)
        const bgHeight = Math.max(textHeight + padding, iconSize)
        const bgX = centerX - bgWidth / 2
        const bgY = centerY - bgHeight / 2
        
        // 绘制白色背景矩形
        ctx.fillStyle = props.backgroundColor
        ctx.beginPath()
        ctx.rect(bgX, bgY, bgWidth, bgHeight)
        ctx.fill()
        
        // 绘制文本
        ctx.fillStyle = props.iconColor
        ctx.fillText(props.textIcon, centerX, centerY)
    }
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
  () => [props.value, props.size, props.backgroundColor, props.foregroundColor, props.textIcon, props.icon, props.iconSize, props.iconColor],
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