/**
 * DOM 操作工具
 */

/**
 * 获取元素距离顶部的距离
 * @param element 元素
 * @returns 距离顶部的像素值
 */
export function getOffsetTop(element: HTMLElement): number {
  let offsetTop = 0
  while (element) {
    offsetTop += element.offsetTop
    element = element.offsetParent as HTMLElement
  }
  return offsetTop
}

/**
 * 获取元素距离左侧的距离
 * @param element 元素
 * @returns 距离左侧的像素值
 */
export function getOffsetLeft(element: HTMLElement): number {
  let offsetLeft = 0
  while (element) {
    offsetLeft += element.offsetLeft
    element = element.offsetParent as HTMLElement
  }
  return offsetLeft
}

/**
 * 获取滚动条宽度
 * @returns 滚动条宽度
 */
export function getScrollbarWidth(): number {
  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.overflow = 'scroll'
  document.body.appendChild(outer)

  const inner = document.createElement('div')
  outer.appendChild(inner)

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth
  document.body.removeChild(outer)

  return scrollbarWidth
}

/**
 * 判断元素是否在可视区域
 * @param element 元素
 * @returns 是否在可视区域
 */
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * 平滑滚动到指定位置
 * @param top 目标位置
 * @param duration 持续时间（毫秒）
 */
export function smoothScrollTo(top: number, duration = 300): void {
  const start = window.pageYOffset
  const change = top - start
  const startTime = performance.now()

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // 缓动函数
    const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

    window.scrollTo(0, start + change * easeInOutQuad(progress))

    if (progress < 1) {
      requestAnimationFrame(animateScroll)
    }
  }

  requestAnimationFrame(animateScroll)
}

/**
 * 添加样式
 * @param element 元素
 * @param styles 样式对象
 */
export function setStyle(element: HTMLElement, styles: Partial<CSSStyleDeclaration>): void {
  Object.assign(element.style, styles)
}

/**
 * 判断元素是否有某个 class
 * @param element 元素
 * @param className 类名
 * @returns 是否有该类名
 */
export function hasClass(element: HTMLElement, className: string): boolean {
  return element.classList.contains(className)
}

/**
 * 添加 class
 * @param element 元素
 * @param classNames 类名（可多个）
 */
export function addClass(element: HTMLElement, ...classNames: string[]): void {
  element.classList.add(...classNames)
}

/**
 * 移除 class
 * @param element 元素
 * @param classNames 类名（可多个）
 */
export function removeClass(element: HTMLElement, ...classNames: string[]): void {
  element.classList.remove(...classNames)
}

/**
 * 切换 class
 * @param element 元素
 * @param className 类名
 */
export function toggleClass(element: HTMLElement, className: string): void {
  element.classList.toggle(className)
}

/**
 * 获取元素的实际宽度（包括边框和内边距）
 * @param element 元素
 * @returns 宽度
 */
export function getWidth(element: HTMLElement): number {
  const styles = window.getComputedStyle(element)
  return (
    element.offsetWidth -
    parseFloat(styles.paddingLeft) -
    parseFloat(styles.paddingRight) -
    parseFloat(styles.borderLeftWidth) -
    parseFloat(styles.borderRightWidth)
  )
}

/**
 * 获取元素的实际高度（包括边框和内边距）
 * @param element 元素
 * @returns 高度
 */
export function getHeight(element: HTMLElement): number {
  const styles = window.getComputedStyle(element)
  return (
    element.offsetHeight -
    parseFloat(styles.paddingTop) -
    parseFloat(styles.paddingBottom) -
    parseFloat(styles.borderTopWidth) -
    parseFloat(styles.borderBottomWidth)
  )
}

/**
 * 监听元素尺寸变化
 * @param element 元素
 * @param callback 回调函数
 * @returns 清理函数
 */
export function onResize(
  element: HTMLElement,
  callback: (entry: ResizeObserverEntry) => void
): () => void {
  const observer = new ResizeObserver(entries => {
    callback(entries[0])
  })

  observer.observe(element)

  return () => observer.disconnect()
}

/**
 * 等待元素出现
 * @param selector 选择器
 * @param timeout 超时时间（毫秒）
 * @returns Promise
 */
export function waitForElement(selector: string, timeout = 5000): Promise<HTMLElement> {
  return new Promise((resolve, reject) => {
    const element = document.querySelector(selector) as HTMLElement
    if (element) {
      resolve(element)
      return
    }

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector) as HTMLElement
      if (element) {
        observer.disconnect()
        clearTimeout(timer)
        resolve(element)
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    const timer = setTimeout(() => {
      observer.disconnect()
      reject(new Error(`Element ${selector} not found within ${timeout}ms`))
    }, timeout)
  })
}

