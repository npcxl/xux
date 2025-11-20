<template>
    <div :class="containerClass" :style="containerStyle">
        <!-- Canvas -->
        <canvas ref="canvasRef" :width="canvasSize" :height="canvasSize" :style="canvasStyle"></canvas>

        <!-- Logo/GIF 覆盖层 -->
        <div v-if="config.logo && !loading && !error" class="x-qrcode-logo" :style="logoStyle">
            <img :src="config.logo" alt="logo" @load="onLogoLoad" @error="onLogoError">
        </div>

        <!-- 加载状态 -->
        <div v-if="loading" class="x-qrcode-loading">
            <div class="x-qrcode-spinner"></div>
            <span v-if="config.loadingText" class="x-qrcode-loading-text">{{ config.loadingText }}</span>
        </div>

        <!-- 错误状态 -->
        <div v-if="error" class="x-qrcode-error">
            <div class="x-qrcode-error-icon">⚠️</div>
            <span v-if="config.errorText" class="x-qrcode-error-text">{{ config.errorText }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'

/**
 * Qrcode 二维码组件
 * @displayName XQrcode
 */

export interface QrcodeOptions {
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
     * @values normal, rounded, dots, gradient, liquid
     */
    type?: 'normal' | 'rounded' | 'dots' | 'gradient' | 'liquid'
    /**
     * Logo图片（仅支持图片URL）
     */
    logo?: string
    /**
     * Logo尺寸
     */
    logoSize?: number
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

export interface QrcodeProps {
    /**
     * 二维码内容
     */
    value: string
    /**
     * 二维码配置选项（优先级高于单独的 props）
     */
    options?: QrcodeOptions
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
     * @values normal, rounded, dots, gradient, liquid
     */
    type?: 'normal' | 'rounded' | 'dots' | 'gradient' | 'liquid'
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

// 合并配置：options 优先级高于单独的 props
const config = computed(() => ({
  size: props.options?.size ?? props.size,
  logoSize: props.options?.logoSize ?? props.logoSize,
  backgroundColor: props.options?.backgroundColor ?? props.backgroundColor,
  foregroundColor: props.options?.foregroundColor ?? props.foregroundColor,
  errorCorrectionLevel: props.options?.errorCorrectionLevel ?? props.errorCorrectionLevel,
  type: props.options?.type ?? props.type,
  logo: props.options?.logo ?? props.logo,
  bordered: props.options?.bordered ?? props.bordered,
  borderColor: props.options?.borderColor ?? props.borderColor,
  borderWidth: props.options?.borderWidth ?? props.borderWidth,
  loadingText: props.options?.loadingText ?? props.loadingText,
  errorText: props.options?.errorText ?? props.errorText
}))

const canvasRef = ref<HTMLCanvasElement>()
const loading = ref(false)
const error = ref(false)
const logoLoaded = ref(false)

const canvasSize = computed(() => config.value.size)
const containerSize = computed(() => config.value.bordered ? config.value.size + config.value.borderWidth * 2 : config.value.size)

const containerClass = computed(() => [
    'x-qrcode',
    {
        'x-qrcode-bordered': config.value.bordered,
        'x-qrcode-loading': loading.value,
        'x-qrcode-error': error.value
    }
])

const containerStyle = computed(() => ({
    width: `${containerSize.value}px`,
    height: `${containerSize.value}px`
}))

const canvasStyle = computed(() => ({
    width: `${config.value.size}px`,
    height: `${config.value.size}px`,
    border: 'none', // 移除边框，使用容器的阴影
    borderRadius: '16px',
    background: 'white'
}))

const logoStyle = computed(() => {
    // 计算Logo的安全尺寸，确保不会遮挡过多二维码
    const maxLogoSize = config.value.size * 0.22 // Logo最大不超过二维码的22%
    const actualLogoSize = Math.min(config.value.logoSize, maxLogoSize)
    const padding = actualLogoSize * 0.18 // iOS风格的padding
    
    return {
        width: `${actualLogoSize}px`,
        height: `${actualLogoSize}px`,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: `${actualLogoSize * 0.22}px`, // iOS图标的圆角比例
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        padding: `${padding}px`,
        boxShadow: `
            0 3px 10px rgba(0, 0, 0, 0.16),
            0 3px 6px rgba(0, 0, 0, 0.1),
            0 1px 0 rgba(255, 255, 255, 0.8) inset
        `.trim(),
        border: '0.5px solid rgba(0, 0, 0, 0.04)',
        zIndex: 10,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }
})

// Logo 事件处理
function onLogoLoad() {
    logoLoaded.value = true
}

function onLogoError() {
    console.error('Logo failed to load')
}

// 使用qrcode库生成真正的二维码
async function generateQRCode(value: string, size: number): Promise<void> {
    try {
        // 动态导入qrcode库
        const QRCode = (await import('qrcode')).default
        const canvas = canvasRef.value
        if (!canvas) {
            throw new Error('Canvas not found')
        }

        const cfg = config.value

        // 配置二维码选项
        // 如果有Logo，强制使用最高容错级别H，确保能被扫描
        const options = {
            errorCorrectionLevel: cfg.logo ? 'H' : cfg.errorCorrectionLevel,
            margin: 1
        }

        // 先生成二维码数据
        const qrData = QRCode.create(value, options)
        
        // 根据type类型渲染不同风格
        if (cfg.type === 'normal' && !cfg.foregroundColor.startsWith('gradient')) {
            // 使用默认渲染
            await QRCode.toCanvas(canvas, value, {
                width: size,
                margin: 1,
                color: {
                    dark: cfg.foregroundColor,
                    light: cfg.backgroundColor
                },
                errorCorrectionLevel: cfg.errorCorrectionLevel
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

    const cfg = config.value
    const modules = qrData.modules
    const moduleCount = modules.size
    const margin = 1
    const totalModules = moduleCount + margin * 2
    const moduleSize = size / totalModules

    // 清空并填充背景
    ctx.fillStyle = cfg.backgroundColor
    ctx.fillRect(0, 0, size, size)

    // 设置渐变色（如果需要）
    let gradient: CanvasGradient | null = null
    if (cfg.foregroundColor.startsWith('gradient') || cfg.type === 'gradient') {
        // iOS 17风格渐变 - 更柔和的色彩过渡
        gradient = ctx.createLinearGradient(0, 0, size * 0.8, size * 0.8)
        gradient.addColorStop(0, '#007AFF')     // iOS蓝
        gradient.addColorStop(0.3, '#5856D6')   // iOS紫
        gradient.addColorStop(0.6, '#FF9500')   // iOS橙
        gradient.addColorStop(0.9, '#FF3B30')   // iOS红
        gradient.addColorStop(1, '#AF52DE')     // iOS洋红
    }

    // 遍历每个模块
    for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
            const isDark = modules.get(row, col)
            
            if (isDark) {
                const x = (col + margin) * moduleSize
                const y = (row + margin) * moduleSize

                // 设置填充样式
                if (gradient && (cfg.type === 'gradient' || cfg.type === 'normal')) {
                    ctx.fillStyle = gradient
                } else {
                    ctx.fillStyle = cfg.foregroundColor
                }

                if (cfg.type === 'dots') {
                    // 点状粒子风格 - 绘制圆点
                    ctx.beginPath()
                    ctx.arc(
                        x + moduleSize / 2,
                        y + moduleSize / 2,
                        moduleSize * 0.46,
                        0,
                        Math.PI * 2
                    )
                    ctx.fill()
                } else if (cfg.type === 'rounded') {
                    // iOS风格圆角方块
                    const radius = moduleSize * 0.37 // iOS风格的圆角比例
                    const padding = moduleSize * 0.08
                    const rectX = x + padding
                    const rectY = y + padding
                    const rectWidth = moduleSize - padding * 2
                    const rectHeight = moduleSize - padding * 2

                    // 使用iOS的平滑圆角算法
                    ctx.beginPath()
                    ctx.moveTo(rectX + radius, rectY)
                    ctx.lineTo(rectX + rectWidth - radius, rectY)
                    ctx.quadraticCurveTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + radius)
                    ctx.lineTo(rectX + rectWidth, rectY + rectHeight - radius)
                    ctx.quadraticCurveTo(rectX + rectWidth, rectY + rectHeight, rectX + rectWidth - radius, rectY + rectHeight)
                    ctx.lineTo(rectX + radius, rectY + rectHeight)
                    ctx.quadraticCurveTo(rectX, rectY + rectHeight, rectX, rectY + rectHeight - radius)
                    ctx.lineTo(rectX, rectY + radius)
                    ctx.quadraticCurveTo(rectX, rectY, rectX + radius, rectY)
                    ctx.closePath()
                    ctx.fill()
                } else if (cfg.type === 'liquid') {
                    // 液态流动风格 - 静态版本，避免持续动画影响性能
                    const offset = Math.sin(col * 0.3) * moduleSize * 0.08
                    const height = Math.cos(row * 0.3) * moduleSize * 0.08
                    
                    ctx.beginPath()
                    ctx.arc(
                        x + moduleSize / 2 + offset,
                        y + moduleSize / 2 + height,
                        moduleSize * 0.46,
                        0,
                        Math.PI * 2
                    )
                    ctx.fill()
                } else {
                    // 默认方块（包括gradient类型）
                    ctx.fillRect(x, y, moduleSize, moduleSize)
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
        await generateQRCode(props.value, config.value.size)
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
  () => [props.value, props.options, props.size, props.backgroundColor, props.foregroundColor, props.logo, props.logoSize, props.type],
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
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
}

.x-qrcode-bordered {
    box-shadow: 
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -2px rgba(0, 0, 0, 0.1),
        0 0 0 1px rgba(0, 0, 0, 0.05);
    background: rgba(255, 255, 255, 0.8);
}

/* iOS风格的悬停效果 */
.x-qrcode:hover {
    transform: translateY(-2px);
    box-shadow: 
        0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -4px rgba(0, 0, 0, 0.1),
        0 0 0 1px rgba(0, 0, 0, 0.05);
}

.x-qrcode canvas {
    display: block;
    transition: opacity 0.3s ease;
}

/* Logo样式 */
.x-qrcode-logo {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    pointer-events: none; /* 确保不会阻止二维码的点击事件 */
}

.x-qrcode-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
}

/* 加载状态 - iOS风格 */
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
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 20px;
}

.x-qrcode-loading canvas {
    opacity: 0.1;
}

.x-qrcode-spinner {
    width: 28px;
    height: 28px;
    border: 2.5px solid rgba(0, 0, 0, 0.1);
    border-top: 2.5px solid #007AFF;
    border-radius: 50%;
    animation: iosSpin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    margin-bottom: 12px;
}

.x-qrcode-loading-text {
    font-size: 13px;
    font-weight: 500;
    color: #8E8E93;
    text-align: center;
    letter-spacing: -0.08px;
}

/* 错误状态 - iOS风格 */
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
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 20px;
}

.x-qrcode-error canvas {
    opacity: 0.05;
}

.x-qrcode-error-icon {
    font-size: 28px;
    margin-bottom: 10px;
    filter: grayscale(20%);
}

.x-qrcode-error-text {
    font-size: 13px;
    font-weight: 500;
    color: #FF3B30;
    text-align: center;
    letter-spacing: -0.08px;
}

/* iOS风格的旋转动画 */
@keyframes iosSpin {
    to {
        transform: rotate(360deg);
    }
}

/* iOS风格的淡入动画 */
@keyframes iosFadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

/* 应用淡入动画 */
.x-qrcode {
    animation: iosFadeIn 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 响应式 - iOS风格 */
@media (max-width: 768px) {
    .x-qrcode {
        border-radius: 16px;
    }
    
    .x-qrcode canvas {
        border-radius: 12px;
    }

    .x-qrcode-loading-text,
    .x-qrcode-error-text {
        font-size: 12px;
    }
    
    .x-qrcode-spinner {
        width: 24px;
        height: 24px;
    }
}

/* 暗色模式支持 */
@media (prefers-color-scheme: dark) {
    .x-qrcode {
        background-color: rgba(28, 28, 30, 0.8);
    }
    
    .x-qrcode-loading,
    .x-qrcode-error {
        background-color: rgba(28, 28, 30, 0.95);
    }
    
    .x-qrcode-loading-text {
        color: #98989D;
    }
}
</style>