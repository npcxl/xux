/**
 * 函数工具
 * 防抖、节流、重试等
 */

/**
 * 防抖函数
 * @param fn 要执行的函数
 * @param delay 延迟时间（毫秒）
 * @param immediate 是否立即执行
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay = 300,
  immediate = false
): (...args: Parameters<T>) => void {
  let timer: number | null = null

  return function (this: any, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer)

    if (immediate && !timer) {
      fn.apply(this, args)
    }

    timer = window.setTimeout(() => {
      if (!immediate) {
        fn.apply(this, args)
      }
      timer = null
    }, delay)
  }
}

/**
 * 节流函数
 * @param fn 要执行的函数
 * @param delay 延迟时间（毫秒）
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay = 300
): (...args: Parameters<T>) => void {
  let lastTime = 0

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    if (now - lastTime >= delay) {
      fn.apply(this, args)
      lastTime = now
    }
  }
}

/**
 * 只执行一次
 * @param fn 要执行的函数
 * @returns 包装后的函数
 */
export function once<T extends (...args: any[]) => any>(fn: T): T {
  let called = false
  let result: any

  return function (this: any, ...args: Parameters<T>) {
    if (!called) {
      called = true
      result = fn.apply(this, args)
    }
    return result
  } as T
}

/**
 * 延迟执行（sleep）
 * @param ms 延迟时间（毫秒）
 * @returns Promise
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 重试函数
 * @param fn 要执行的函数
 * @param maxAttempts 最大重试次数
 * @param delay 重试延迟（毫秒）
 * @returns Promise
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  delay = 1000
): Promise<T> {
  let lastError: any

  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      if (i < maxAttempts - 1) {
        await sleep(delay)
      }
    }
  }

  throw lastError
}

/**
 * 并发控制
 * @param tasks 任务数组
 * @param limit 并发限制数
 * @returns Promise
 */
export async function pLimit<T>(
  tasks: (() => Promise<T>)[],
  limit = 5
): Promise<T[]> {
  const results: T[] = []
  const executing: Promise<void>[] = []

  for (const task of tasks) {
    const p = task().then(result => {
      results.push(result)
    })

    executing.push(p)

    if (executing.length >= limit) {
      await Promise.race(executing)
      executing.splice(
        executing.findIndex(item => item === p),
        1
      )
    }
  }

  await Promise.all(executing)
  return results
}

/**
 * 函数缓存（记忆化）
 * @param fn 要缓存的函数
 * @returns 缓存后的函数
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, any>()

  return function (this: any, ...args: Parameters<T>) {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }
    const result = fn.apply(this, args)
    cache.set(key, result)
    return result
  } as T
}

/**
 * 函数柯里化
 * @param fn 要柯里化的函数
 * @returns 柯里化后的函数
 */
export function curry(fn: Function): any {
  return function curried(this: any, ...args: any[]): any {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    }
    return function (this: any, ...nextArgs: any[]) {
      return curried.apply(this, args.concat(nextArgs))
    }
  }
}

/**
 * 函数组合
 * @param fns 函数数组
 * @returns 组合后的函数
 */
export function compose<T>(...fns: Function[]): (arg: T) => any {
  return (arg: T) => fns.reduceRight((result, fn) => fn(result), arg)
}

/**
 * 函数管道
 * @param fns 函数数组
 * @returns 管道函数
 */
export function pipe<T>(...fns: Function[]): (arg: T) => any {
  return (arg: T) => fns.reduce((result, fn) => fn(result), arg)
}

