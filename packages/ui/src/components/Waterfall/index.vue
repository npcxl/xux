<template>
    <div ref="containerRef" class="x-waterfall" :style="containerStyle" @scroll="handleScroll">
        <div v-for="(item, index) in items" :key="getItemKey(item, index)" :ref="el => setItemRef(el, index)"
            class="x-waterfall-item" :style="getItemStyle(index)">
            <slot name="item" :item="item" :index="index">
                {{ item }}
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
export interface WaterfallProps {
    /** 列数 */
    cols?: number
    /** 列间距 */
    gap?: string | number
    /** 行间距 */
    rowGap?: string | number
    /** 数据源 */
    items?: any[]
    /** 容器宽度 */
    width?: string
    /** 容器高度 */
    height?: string
    /** 是否响应式（监听窗口大小变化） */
    responsive?: boolean
}

const props = withDefaults(defineProps<WaterfallProps>(), {
    cols: 3,
    gap: '16px',
    rowGap: '16px',
    items: () => [],
    width: '100%',
    height: 'auto',
    responsive: true
})

const emit = defineEmits<{
    (e: 'scroll', scrollTop: number): void
}>()

const containerRef = ref<HTMLElement | null>(null)
const itemRefs = ref<(HTMLElement | null)[]>([])
const columnHeights = ref<number[]>([])
const itemPositions = ref<Array<{ left: number; top: number; width: number }>>([])
const containerHeight = ref(0)
const isCalculating = ref(false) // 是否正在计算布局，用于禁用动画
const isReady = ref(false) // 是否已完成首次布局
const itemAnimations = ref<Record<number, boolean>>({}) // 记录每个项目的动画状态

// 格式化间距值
const formatGapValue = (value: string | number | undefined): number => {
    if (value === undefined) return 0
    if (typeof value === 'number') return value
    if (typeof value === 'string') {
        const match = value.match(/^([\d.]+)(px|rem|em)?$/)
        if (match) {
            const num = parseFloat(match[1])
            const unit = match[2] || 'px'
            if (unit === 'px') return num
            // 简单处理 rem/em，假设 1rem = 16px
            return num * 16
        }
    }
    return 16 // 默认值
}

const gapValue = computed(() => formatGapValue(props.gap))
const rowGapValue = computed(() => formatGapValue(props.rowGap))

const containerStyle = computed(() => {
    const baseStyle: Record<string, any> = {
        width: props.width,
        position: 'relative' as const
    }
    
    // 如果设置了固定高度（不是auto），需要设置overflow以支持滚动
    if (props.height !== 'auto') {
        baseStyle.height = props.height
        baseStyle.overflowY = 'auto'
        baseStyle.overflowX = 'hidden'
    } else {
        baseStyle.height = `${containerHeight.value}px`
    }
    
    return baseStyle
})

// 设置项目 ref
const setItemRef = (el: any, index: number) => {
    if (el && 'offsetHeight' in el) {
        itemRefs.value[index] = el as HTMLElement
    }
}

// 获取项目的 key
const getItemKey = (item: any, index: number): string | number => {
    if (item && typeof item === 'object' && item.id !== undefined) {
        return item.id
    }
    return index
}

// 获取项目样式
const getItemStyle = (index: number) => {
    const position = itemPositions.value[index]
    if (!position) {
        return {
            position: 'absolute' as const,
            visibility: 'hidden' as const,
            transition: 'none' as const
        }
    }
    return {
        position: 'absolute' as const,
        left: `${position.left}px`,
        top: `${position.top}px`,
        width: `${position.width}px`,
        visibility: 'visible' as const,
        transition: isCalculating.value ? 'none' : 'all 0.3s ease'
    }
}

// 计算布局
const calculateLayout = async () => {
    if (!containerRef.value || props.items.length === 0) {
        containerHeight.value = 0
        itemPositions.value = []
        isReady.value = false
        return
    }

    // 开始计算布局，隐藏项目
    isCalculating.value = true

    await nextTick()
    
    // 等待图片等资源加载
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // 等待所有图片加载完成
    if (itemRefs.value.length > 0) {
      const images = containerRef.value.querySelectorAll('img')
      if (images.length > 0) {
        await Promise.all(
          Array.from(images).map(img => {
            if (img.complete && img.naturalHeight > 0) {
              return Promise.resolve()
            }
            return new Promise(resolve => {
              const timeout = setTimeout(resolve, 2000) // 超时保护
              img.onload = () => {
                clearTimeout(timeout)
                resolve(undefined)
              }
              img.onerror = () => {
                clearTimeout(timeout)
                resolve(undefined)
              }
            })
          })
        )
      }
    }

    const container = containerRef.value
    const containerWidth = container.offsetWidth
    const cols = props.cols

    if (containerWidth <= 0 || cols <= 0) {
        isCalculating.value = false
        return
    }

    // 计算每列宽度
    const totalGap = gapValue.value * (cols - 1)
    const columnWidth = (containerWidth - totalGap) / cols

    // 初始化列高度
    columnHeights.value = new Array(cols).fill(0)
    
    // 保存旧位置，在计算布局时保持项目在当前位置（避免抖动）
    const oldPositions = [...itemPositions.value]
    
    // 如果有旧位置，保持旧位置以便测量高度；如果没有，先不设置位置（项目会保持隐藏）
    // 不更新 itemPositions，保持项目在当前位置
    // 只更新宽度以便测量（通过直接操作 DOM）
    if (isReady.value && oldPositions.length > 0) {
        // 有旧位置，直接操作 DOM 更新宽度，保持位置不变
        for (let i = 0; i < props.items.length; i++) {
            const itemEl = itemRefs.value[i]
            if (itemEl && oldPositions[i]) {
                // 临时更新宽度以便测量，但保持位置不变
                itemEl.style.width = `${columnWidth}px`
            }
        }
    } else {
        // 首次布局，先设置临时位置（移到屏幕外），以便测量高度
        const tempPositions: Array<{ left: number; top: number; width: number }> = []
        for (let i = 0; i < props.items.length; i++) {
            tempPositions.push({
                left: -9999,
                top: -9999,
                width: columnWidth
            })
        }
        itemPositions.value = tempPositions
    }

    // 等待一次渲染，确保所有元素都已渲染
    await nextTick()
    
    // 再次等待，确保图片等资源开始加载
    await new Promise(resolve => setTimeout(resolve, 50))

    // 计算所有项目的位置
    const newPositions: Array<{ left: number; top: number; width: number }> = []
    
    for (let i = 0; i < props.items.length; i++) {
        let itemEl = itemRefs.value[i]
        
        // 如果元素不存在，等待一下再重试
        if (!itemEl) {
            await nextTick()
            await new Promise(resolve => setTimeout(resolve, 20))
            itemEl = itemRefs.value[i]
            
            // 如果还是找不到，使用估算高度
            if (!itemEl) {
                const estimatedHeight = 200
                const minColIndex = columnHeights.value.indexOf(Math.min(...columnHeights.value))
                const left = minColIndex * (columnWidth + gapValue.value)
                const top = columnHeights.value[minColIndex] > 0
                    ? columnHeights.value[minColIndex] + rowGapValue.value
                    : 0

                columnHeights.value[minColIndex] = top + estimatedHeight
                newPositions[i] = { left, top, width: columnWidth }
                continue
            }
        }

        // 找到最短的列
        let minHeight = columnHeights.value[0]
        let minColIndex = 0
        for (let j = 1; j < cols; j++) {
            if (columnHeights.value[j] < minHeight) {
                minHeight = columnHeights.value[j]
                minColIndex = j
            }
        }

        // 计算位置
        const left = minColIndex * (columnWidth + gapValue.value)
        // 如果列已经有项目，需要加上行间距
        const top = columnHeights.value[minColIndex] > 0
            ? columnHeights.value[minColIndex] + rowGapValue.value
            : 0

        // 使用getBoundingClientRect获取更准确的高度，避免重叠
        const rect = itemEl.getBoundingClientRect()
        const itemHeight = rect.height > 0 ? rect.height : (itemEl.offsetHeight || itemEl.scrollHeight || 0)
        
        // 确保高度有效
        if (itemHeight <= 0) {
            console.warn(`Waterfall: Item ${i} has invalid height: ${itemHeight}`)
            // 使用之前的位置或默认位置
            newPositions[i] = itemPositions.value[i] || { left: 0, top: 0, width: columnWidth }
            continue
        }

        // 更新列高度
        columnHeights.value[minColIndex] = top + itemHeight

        newPositions[i] = {
            left,
            top,
            width: columnWidth
        }
    }
    
    // 计算容器总高度
    containerHeight.value = Math.max(...columnHeights.value, 0)
    
    // 如果之前有旧位置，需要先禁用动画，更新位置，然后启用动画
    // 这样项目会从旧位置平滑移动到新位置（只触发一次动画）
    if (isReady.value && oldPositions.length > 0) {
        // 先禁用动画，更新位置
        itemPositions.value = newPositions
        
        // 等待一次渲染，确保位置已更新到 DOM（无动画）
        await nextTick()
        
        // 使用 requestAnimationFrame 确保浏览器已经应用了新的位置（无动画）
        await new Promise(resolve => requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // 重新启用动画，项目会从旧位置平滑移动到新位置
                isCalculating.value = false
                resolve(undefined)
            })
        }))
    } else {
        // 首次布局，直接更新位置并启用动画
        itemPositions.value = newPositions
        await nextTick()
        
        // 使用 requestAnimationFrame 确保浏览器已经应用了新的位置
        await new Promise(resolve => requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // 启用动画
                isCalculating.value = false
                isReady.value = true
                resolve(undefined)
            })
        }))
    }
}

// 处理滚动事件
const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement
    const currentScrollTop = target.scrollTop
    emit('scroll', currentScrollTop)
}

// 防抖函数
let resizeTimer: ReturnType<typeof setTimeout> | null = null
const debounceResize = () => {
    if (resizeTimer) {
        clearTimeout(resizeTimer)
    }
    resizeTimer = setTimeout(() => {
        calculateLayout()
    }, 100)
}

// 监听窗口大小变化
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
    calculateLayout()

    if (props.responsive) {
        // 使用 ResizeObserver 监听容器大小变化
        if (containerRef.value && typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(() => {
                debounceResize()
            })
            resizeObserver.observe(containerRef.value)
        } else {
            // 降级到 window resize
            window.addEventListener('resize', debounceResize)
        }
    }
})

onUnmounted(() => {
    if (resizeObserver) {
        resizeObserver.disconnect()
    }
    if (resizeTimer) {
        clearTimeout(resizeTimer)
    }
    window.removeEventListener('resize', debounceResize)
})

// 监听 props 变化
watch(
    () => [props.cols, props.items, props.gap, props.rowGap],
    () => {
        calculateLayout()
    },
    { deep: true }
)
</script>

<style lang="scss" scoped>
.x-waterfall {
    box-sizing: border-box;
}

.x-waterfall-item {
    box-sizing: border-box;
}
</style>
