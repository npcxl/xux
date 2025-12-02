import { ref } from 'vue'

export function usePerformance() {
  const layoutCount = ref(0)
  const lastLayoutMs = ref(0)
  const avgLayoutMs = ref(0)
  let sumLayoutMs = 0

  let fps = ref(0)
  let rafId: number | null = null
  let lastTime = performance.now()

  const markLayout = (ms: number) => {
    lastLayoutMs.value = ms
    layoutCount.value++
    sumLayoutMs += ms
    avgLayoutMs.value = sumLayoutMs / layoutCount.value
  }

  const startFPS = () => {
    const loop = (t: number) => {
      const dt = t - lastTime
      lastTime = t
      const currentFps = dt > 0 ? 1000 / dt : 0
      // 简单平滑
      fps.value = fps.value ? (fps.value * 0.9 + currentFps * 0.1) : currentFps
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)
  }

  const stopFPS = () => {
    if (rafId != null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }

  return { layoutCount, lastLayoutMs, avgLayoutMs, fps, markLayout, startFPS, stopFPS }
}
