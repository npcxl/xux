import type { Directive } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export const vLazy: Directive<HTMLElement, { src: string; key: string; loader: (key: string, src: string) => Promise<any> }> = {
  mounted(el, binding) {
    const { src, key, loader } = binding.value
    const { stop } = useIntersectionObserver(el, ([entry]) => {
      const ratio = entry?.intersectionRatio ?? 0
      if (entry.isIntersecting) {
        stop()
        loader(key, src, Math.min(1, ratio + 0.5)).then(() => {
          const target = el as any
          if ('src' in target) target.src = src
        })
      }
    })
    ;(el as any).__lazy_stop = stop
  },
  unmounted(el) {
    const stop: (() => void) | undefined = (el as any).__lazy_stop
    if (stop) stop()
  }
}
