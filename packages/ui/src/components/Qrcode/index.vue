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
   * Logo图片（仅支持图片URL）
   */
  logo?: string
  /**
   * Logo尺寸
   */
  logoSize?: number
  /**
   * 二维码尺寸
   */
  size?: number
    /**
     * 二维码背景色
     */
    backgroundColor?: string
    /**
     * 二维码前景色（支持渐变：gradient-{color1}-{color2}）
     */
    foregroundColor?: string
    /**
     * 二维码容错级别
     * @values L, M, Q, H
     */
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
    /**
     * 二维码样式类型
     * @values normal, rounded, dots
     */
    type?: 'normal' | 'rounded' | 'dots'
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
  logoSize: 40,
  backgroundColor: '#ffffff',
  foregroundColor: '#1a1a1a',
  errorCorrectionLevel: 'H',
  type: 'normal',
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
            errorCorrectionLevel: props.errorCorrectionLevel,
            margin: 1
        }

        // 先生成二维码数据
        const qrData = QRCode.create(value, options)
        
        // 根据type类型渲染不同风格
        if (props.type === 'normal') {
            // 使用默认渲染
            await QRCode.toCanvas(canvas, value, {
                width: size,
                margin: 1,
                color: {
                    dark: props.foregroundColor.startsWith('gradient') ? '#000000' : props.foregroundColor,
                    light: props.backgroundColor
                },
                errorCorrectionLevel: props.errorCorrectionLevel
            })
        } else {
            // 自定义渲染风格化二维码
            renderStyledQRCode(qrData, canvas, size)
        }
    } catch (err) {
        throw new Error(`Failed to generate QR code: ${err}`)
    }
}

// 渲染风格化二维码
function renderStyledQRCode(qrData: any, canvas: HTMLCanvasElement, size: number) {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const modules = qrData.modules
    const moduleCount = modules.size
    const margin = 1
    const totalModules = moduleCount + margin * 2
    const moduleSize = size / totalModules

    // 清空并填充背景
    ctx.fillStyle = props.backgroundColor
    ctx.fillRect(0, 0, size, size)

    // 设置前景色
    ctx.fillStyle = props.foregroundColor

    // 遍历每个模块
    for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
            const isDark = modules.get(row, col)
            
            if (isDark) {
                const x = (col + margin) * moduleSize
                const y = (row + margin) * moduleSize

                if (props.type === 'dots') {
                    // 点状粒子风格 - 绘制圆点
                    ctx.beginPath()
                    ctx.arc(
                        x + moduleSize / 2,
                        y + moduleSize / 2,
                        moduleSize * 0.46, // 使用46%的半径确保足够覆盖
                        0,
                        Math.PI * 2
                    )
                    ctx.fill()
                } else if (props.type === 'rounded') {
                    // 圆角方块风格
                    const radius = Math.min(moduleSize * 0.28, 3) // 圆角半径
                    const padding = moduleSize * 0.03
                    const rectX = x + padding
                    const rectY = y + padding
                    const rectWidth = moduleSize - padding * 2
                    const rectHeight = moduleSize - padding * 2

                    ctx.beginPath()
                    ctx.moveTo(rectX + radius, rectY)
                    ctx.lineTo(rectX + rectWidth - radius, rectY)
                    ctx.arcTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + radius, radius)
                    ctx.lineTo(rectX + rectWidth, rectY + rectHeight - radius)
                    ctx.arcTo(rectX + rectWidth, rectY + rectHeight, rectX + rectWidth - radius, rectY + rectHeight, radius)
                    ctx.lineTo(rectX + radius, rectY + rectHeight)
                    ctx.arcTo(rectX, rectY + rectHeight, rectX, rectY + rectHeight - radius, radius)
                    ctx.lineTo(rectX, rectY + radius)
                    ctx.arcTo(rectX, rectY, rectX + radius, rectY, radius)
                    ctx.closePath()
                    ctx.fill()
                }
            }
        }
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
  () => [props.value, props.size, props.backgroundColor, props.foregroundColor, props.logo, props.logoSize, props.type],
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