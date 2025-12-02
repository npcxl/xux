import { ref, computed } from 'vue'

export function useVirtualScroll(options: {
  items: any[]
  positions: Array<{ left: number; top: number; width: number }>
  itemHeights: number[]
  buffer?: number
  containerRef: { value: HTMLElement | null }
  virtualScroll?: boolean
}) {
  const buffer = options.buffer ?? 5
  const virtual = options.virtualScroll ?? true
  const scrollTop = ref(0)
  const containerViewHeight = ref(0)

  const updateContainerView = () => {
    const el = options.containerRef.value
    if (el) containerViewHeight.value = el.clientHeight || 600
  }

  const visibleRange = computed(() => {
    if (!virtual) return { start: 0, end: options.items.length }
    updateContainerView()
    const st = scrollTop.value
    const ch = containerViewHeight.value
    let start = 0
    let end = options.items.length
    const bufferHeight = buffer * 200
    for (let i = 0; i < options.items.length; i++) {
      const top = options.positions[i]?.top || 0
      const h = options.itemHeights[i] || 0
      const bottom = top + h
      if (bottom >= st - bufferHeight) {
        start = Math.max(0, i - buffer)
        break
      }
    }
    const viewBottom = st + ch + bufferHeight
    for (let i = start; i < options.items.length; i++) {
      const top = options.positions[i]?.top || 0
      if (top > viewBottom) {
        end = Math.min(options.items.length, i + buffer)
        break
      }
    }
    return { start, end }
  })

  const startIndex = computed(() => visibleRange.value.start)
  const endIndex = computed(() => visibleRange.value.end)
  const visibleItems = computed(() => options.items.slice(startIndex.value, endIndex.value))

  const handleScroll = (top: number) => {
    scrollTop.value = top
  }

  return { scrollTop, containerViewHeight, visibleRange, startIndex, endIndex, visibleItems, handleScroll }
}
