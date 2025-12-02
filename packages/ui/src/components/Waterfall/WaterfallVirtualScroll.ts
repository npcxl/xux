import { ref, computed, watch, nextTick, type Ref } from 'vue'

export interface ItemPosition {
    left: number
    top: number
    width: number
}

export interface WaterfallVirtualScrollOptions {
    /** 容器引用 */
    containerRef: Ref<HTMLElement | null>
    /** 项目位置数组 */
    itemPositions: Ref<ItemPosition[]>
    /** 项目高度数组 */
    itemHeights: Ref<number[]>
    /** 数据源长度 */
    itemsLength: Ref<number>
    /** 缓冲区大小（上下各预渲染的项目数） */
    buffer?: number
    /** 容器总高度 */
    containerHeight: Ref<number>
}

export interface VirtualScrollResult {
    /** 滚动位置 */
    scrollTop: Ref<number>
    /** 容器可视高度 */
    containerViewHeight: Ref<number>
    /** 可见范围 */
    visibleRange: Ref<{ start: number; end: number }>
    /** 起始索引 */
    startIndex: Ref<number>
    /** 结束索引 */
    endIndex: Ref<number>
    /** 可见项目数量 */
    visibleCount: Ref<number>
    /** 上方偏移量 */
    startOffset: Ref<number>
    /** 下方偏移量 */
    endOffset: Ref<number>
    /** 刷新虚拟滚动范围 */
    refreshVirtualRange: () => void
    /** 处理滚动事件 */
    handleScroll: (e: Event) => void
}

/**
 * 瀑布流虚拟滚动 composable
 * 专门用于处理瀑布流布局的虚拟滚动逻辑
 */
export function useWaterfallVirtualScroll(
    options: WaterfallVirtualScrollOptions
): VirtualScrollResult {
    const {
        containerRef,
        itemPositions,
        itemHeights,
        itemsLength,
        buffer = 5,
        containerHeight
    } = options

    const scrollTop = ref(0)
    const containerViewHeight = ref(0)

    /**
     * 计算可见范围
     * 基于项目的 top 位置来判断哪些项目在可见区域内
     */
    const updateVirtualRange = (scrollTopValue: number): { start: number; end: number } => {
        if (!containerRef.value || itemsLength.value === 0) {
            return { start: 0, end: itemsLength.value }
        }

        // 确保容器高度有效
        let containerHeightValue = containerViewHeight.value
        if (containerHeightValue === 0 && containerRef.value) {
            containerHeightValue = containerRef.value.clientHeight || 600
        }

        // 瀑布流使用动态高度模式（基于每个项目的 top 位置）
        let start = 0
        let end = itemsLength.value

        // 计算缓冲区高度（基于平均项目高度估算，或使用固定值）
        const bufferHeight = buffer * 200 // 假设每个buffer项约200px高度

        // 找到起始索引：第一个底部位置超过 scrollTop - bufferHeight 的项目
        for (let i = 0; i < itemsLength.value; i++) {
            const itemTop = itemPositions.value[i]?.top || 0
            const itemHeight = itemHeights.value[i] || 0
            const itemBottom = itemTop + itemHeight

            if (itemBottom >= scrollTopValue - bufferHeight) {
                start = Math.max(0, i - buffer)
                break
            }
        }

        // 找到结束索引：第一个顶部位置超过 scrollTop + containerHeight + bufferHeight 的项目
        const viewBottom = scrollTopValue + containerHeightValue + bufferHeight
        for (let i = start; i < itemsLength.value; i++) {
            const itemTop = itemPositions.value[i]?.top || 0

            if (itemTop > viewBottom) {
                end = Math.min(itemsLength.value, i + buffer)
                break
            }
        }

        return { start, end }
    }

    // 使用 computed 计算可见范围
    const visibleRange = computed(() => {
        return updateVirtualRange(scrollTop.value)
    })

    const startIndex = computed(() => visibleRange.value.start)
    const endIndex = computed(() => visibleRange.value.end)
    const visibleCount = computed(() => endIndex.value - startIndex.value)

    // 计算偏移量
    const startOffset = computed(() => {
        if (startIndex.value === 0) return 0

        // 返回第一个可见项目之前的高度
        const firstVisibleTop = itemPositions.value[startIndex.value]?.top || 0
        return Math.max(0, firstVisibleTop)
    })

    const endOffset = computed(() => {
        if (endIndex.value >= itemsLength.value) return 0

        // 返回最后一个可见项目之后的高度
        const lastVisibleIndex = endIndex.value - 1
        if (lastVisibleIndex < 0) return 0

        const lastVisibleTop = itemPositions.value[lastVisibleIndex]?.top || 0
        const lastVisibleHeight = itemHeights.value[lastVisibleIndex] || 0
        const lastVisibleBottom = lastVisibleTop + lastVisibleHeight
        const totalHeight = containerHeight.value

        return Math.max(0, totalHeight - lastVisibleBottom)
    })

    /**
     * 处理滚动事件
     */
    const handleScroll = (e: Event) => {
        const target = e.target as HTMLElement
        const currentScrollTop = target.scrollTop

        // 直接同步更新，不使用 RAF
        scrollTop.value = currentScrollTop

        // 更新容器高度（可能在滚动过程中变化）
        if (containerRef.value) {
            const newHeight = containerRef.value.clientHeight
            if (newHeight > 0 && newHeight !== containerViewHeight.value) {
                containerViewHeight.value = newHeight
            }
        }
    }

    /**
     * 刷新虚拟滚动范围
     */
    const refreshVirtualRange = () => {
        if (!containerRef.value) return

        if (containerRef.value) {
            const newHeight = containerRef.value.clientHeight
            if (newHeight > 0) {
                containerViewHeight.value = newHeight
            }
        }

        // 触发重新计算可见范围（通过更新 scrollTop 触发 computed）
        if (containerRef.value) {
            scrollTop.value = containerRef.value.scrollTop
        }
    }

    // 监听相关变化，自动刷新虚拟滚动范围
    watch(
        () => [
            itemsLength.value,
            itemPositions.value.length,
            containerHeight.value
        ],
        () => {
            // 当数据或布局变化时，刷新虚拟滚动范围
            nextTick(() => {
                refreshVirtualRange()
            })
        }
    )

    return {
        scrollTop,
        containerViewHeight,
        visibleRange,
        startIndex,
        endIndex,
        visibleCount,
        startOffset,
        endOffset,
        refreshVirtualRange,
        handleScroll
    }
}

