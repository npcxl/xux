import { ref } from 'vue'

export function useLazyLoad() {
  const loadingStates = ref<Record<string, 'idle' | 'loading' | 'loaded' | 'error'>>({})
  const queuedKeys = new Set<string>()
  const queue: Array<{ key: string; src: string; priority: number; resolve: (v: any) => void; reject: (e: any) => void }> = []
  let running = 0
  const maxConcurrent = 4

  const runNext = () => {
    if (running >= maxConcurrent) return
    // 取最高优先级任务
    queue.sort((a, b) => b.priority - a.priority)
    const task = queue.shift()
    if (!task) return
    running++
    loadingStates.value[task.key] = 'loading'
    const img = new Image()
    img.onload = () => {
      loadingStates.value[task.key] = 'loaded'
      running--
      task.resolve(undefined)
      runNext()
    }
    img.onerror = () => {
      loadingStates.value[task.key] = 'error'
      running--
      task.reject(undefined)
      runNext()
    }
    img.src = task.src
  }

  const loadImage = (key: string, src: string, priority = 0) => {
    if (loadingStates.value[key] === 'loaded') return Promise.resolve(undefined)
    return new Promise((resolve, reject) => {
      if (!queuedKeys.has(key)) {
        queue.push({ key, src, priority, resolve, reject })
        queuedKeys.add(key)
      }
      runNext()
    })
  }

  return { loadingStates, loadImage }
}
