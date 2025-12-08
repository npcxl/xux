import { shallowRef, nextTick } from 'vue'

export function useWaterfallLayout(options: {
  items: any[]
  getCols: () => number
  gap: number
  rowGap: number
  containerRef: { value: HTMLElement | null }
  estimateItemHeight: (index: number) => number
}) {
  const columnHeights = shallowRef<number[]>([])
  const itemPositions = shallowRef<Array<{ left: number; top: number; width: number }>>([])
  const itemHeights = shallowRef<number[]>([])
  const containerHeight = shallowRef(0)
  const isCalculating = shallowRef(false)
  const measuredCount = shallowRef(0)

  const updateMeasuredCount = (count: number) => {
    measuredCount.value = count
  }

  const calculateLayout = async () => {
    const el = options.containerRef.value
    // 如果容器不存在或没有数据，则不计算布局
    if (!el || options.items.length === 0) {
      console.log('容器不存在或没有数据，不计算布局');
      containerHeight.value = 0
      itemPositions.value = []
      isCalculating.value = false
      measuredCount.value = 0
      return
    }
    // 开始计算布局
    isCalculating.value = true
    await nextTick()
    // 获取容器宽度
    const containerWidth = el.offsetWidth
    // 获取列数
    const cols = options.getCols()
    // 如果容器宽度或列数小于等于0，则不计算布局
    if (containerWidth <= 0 || cols <= 0) {
      console.log('容器宽度或列数小于等于0，不计算布局');
      isCalculating.value = false
      return
    }
    // 计算列间距
    const totalGap = options.gap * (cols - 1)
    // 计算列宽度
    const columnWidth = (containerWidth - totalGap) / cols
    // 初始化列高度
    columnHeights.value = new Array(cols).fill(0)
    // 先使用估算高度快速完成初始布局（不等待图片加载）
    columnHeights.value = new Array(cols).fill(0)
    for (let i = 0; i < options.items.length; i++) {
      let minIndex = 0
      let minHeight = columnHeights.value[0]
      for (let j = 1; j < cols; j++) {
        if (columnHeights.value[j] < minHeight) {
          minHeight = columnHeights.value[j]
          minIndex = j
        }
      }
      const left = minIndex * (columnWidth + options.gap)
      const top = columnHeights.value[minIndex] > 0 ? columnHeights.value[minIndex] + options.rowGap : 0
      // 优先使用已测量的高度，如果没有则使用估算高度（安全区）
      const measuredHeight = itemHeights.value[i] || 0
      const estimatedHeight = options.estimateItemHeight(i)
      // 使用较大的值作为安全区，确保图片加载后不会重叠
      const safeHeight = Math.max(measuredHeight, estimatedHeight)
      itemHeights.value[i] = safeHeight
      columnHeights.value[minIndex] = top + safeHeight
      itemPositions.value[i] = { left, top, width: columnWidth }
    }
    
    // 等待一次渲染，让项目元素有机会渲染
    await nextTick()
    
    // 不等待图片加载，让图片在后台加载
    // 当图片加载完成时，ResizeObserver 会自动更新高度并重新计算布局
    containerHeight.value = Math.max(...columnHeights.value, 0)
    isCalculating.value = false
  }

  return { columnHeights, itemPositions, itemHeights, containerHeight, isCalculating, measuredCount, updateMeasuredCount, calculateLayout }
}
