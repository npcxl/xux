import { ref, shallowRef } from 'vue'

export function useQueueRender(options: {
  batchSize?: number
  batchDelay?: number
}) {
  const { batchSize = 5, batchDelay = 16 } = options
  const renderedCount = ref(0)
  const isRendering = ref(false)
  const renderQueue = shallowRef<any[]>([])
  let renderTimer: ReturnType<typeof requestAnimationFrame> | null = null

  const startRender = async (items: any[]) => {
    if (isRendering.value) return
    
    isRendering.value = true
    renderQueue.value = items

    // 如果项目较少，直接全部渲染
    if (items.length <= batchSize * 2) {
      renderedCount.value = items.length
      isRendering.value = false
      return
    }

    // 第一批立即渲染更多项目，减少初始闪烁
    const firstBatch = Math.min(batchSize * 2, items.length)
    renderedCount.value = firstBatch

    // 使用 requestAnimationFrame 进行后续渲染，更流畅
    let rendered = firstBatch
    const renderNextBatch = () => {
      if (rendered >= items.length) {
        isRendering.value = false
        return
      }

      rendered = Math.min(rendered + batchSize, items.length)
      renderedCount.value = rendered

      if (rendered < items.length) {
        renderTimer = requestAnimationFrame(() => {
          setTimeout(renderNextBatch, batchDelay)
        })
      } else {
        isRendering.value = false
      }
    }

    // 延迟一点再开始后续批次
    setTimeout(renderNextBatch, batchDelay * 2)
  }

  const reset = () => {
    if (renderTimer) {
      cancelAnimationFrame(renderTimer)
      renderTimer = null
    }
    renderedCount.value = 0
    isRendering.value = false
    renderQueue.value = []
  }

  return {
    renderedCount,
    isRendering,
    startRender,
    reset
  }
}

