/**
 * 数组工具函数
 */

/**
 * 数组去重
 * @param arr 数组
 * @returns 去重后的数组
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)]
}

/**
 * 数组扁平化
 * @param arr 多维数组
 * @param depth 扁平化深度（默认为 Infinity）
 * @returns 扁平化后的数组
 */
export function flatten<T>(arr: any[], depth = Infinity): T[] {
  return arr.flat(depth)
}

/**
 * 数组分组
 * @param arr 数组
 * @param key 分组依据的键名或函数
 * @returns 分组后的对象
 */
export function groupBy<T>(arr: T[], key: keyof T | ((item: T) => string)): Record<string, T[]> {
  return arr.reduce((result, item) => {
    const groupKey = typeof key === 'function' ? key(item) : String(item[key])
    if (!result[groupKey]) {
      result[groupKey] = []
    }
    result[groupKey].push(item)
    return result
  }, {} as Record<string, T[]>)
}

/**
 * 数组分块
 * @param arr 数组
 * @param size 每块大小
 * @returns 分块后的二维数组
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

/**
 * 数组乱序
 * @param arr 数组
 * @returns 乱序后的新数组
 */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * 数组随机取值
 * @param arr 数组
 * @param count 取值数量（默认为 1）
 * @returns 随机取出的值或数组
 */
export function sample<T>(arr: T[], count = 1): T | T[] {
  const shuffled = shuffle(arr)
  return count === 1 ? shuffled[0] : shuffled.slice(0, count)
}

/**
 * 数组求和
 * @param arr 数字数组
 * @returns 总和
 */
export function sum(arr: number[]): number {
  return arr.reduce((total, num) => total + num, 0)
}

/**
 * 数组平均值
 * @param arr 数字数组
 * @returns 平均值
 */
export function average(arr: number[]): number {
  return arr.length > 0 ? sum(arr) / arr.length : 0
}

/**
 * 数组最大值
 * @param arr 数字数组
 * @returns 最大值
 */
export function max(arr: number[]): number {
  return Math.max(...arr)
}

/**
 * 数组最小值
 * @param arr 数字数组
 * @returns 最小值
 */
export function min(arr: number[]): number {
  return Math.min(...arr)
}

/**
 * 数组交集
 * @param arr1 数组1
 * @param arr2 数组2
 * @returns 交集数组
 */
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2)
  return unique(arr1.filter(item => set2.has(item)))
}

/**
 * 数组并集
 * @param arr1 数组1
 * @param arr2 数组2
 * @returns 并集数组
 */
export function union<T>(arr1: T[], arr2: T[]): T[] {
  return unique([...arr1, ...arr2])
}

/**
 * 数组差集（arr1 中有但 arr2 中没有的元素）
 * @param arr1 数组1
 * @param arr2 数组2
 * @returns 差集数组
 */
export function difference<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2)
  return arr1.filter(item => !set2.has(item))
}

/**
 * 移除数组中的假值（false, null, 0, "", undefined, NaN）
 * @param arr 数组
 * @returns 移除假值后的数组
 */
export function compact<T>(arr: T[]): T[] {
  return arr.filter(Boolean)
}

/**
 * 数组深度计数
 * @param arr 数组
 * @returns 统计每个元素出现的次数
 */
export function countBy<T>(arr: T[]): Record<string, number> {
  return arr.reduce((result, item) => {
    const key = String(item)
    result[key] = (result[key] || 0) + 1
    return result
  }, {} as Record<string, number>)
}

/**
 * 数组是否包含某个值
 * @param arr 数组
 * @param value 值
 * @returns 是否包含
 */
export function includes<T>(arr: T[], value: T): boolean {
  return arr.includes(value)
}

/**
 * 移动数组元素
 * @param arr 数组
 * @param from 源索引
 * @param to 目标索引
 * @returns 移动后的新数组
 */
export function move<T>(arr: T[], from: number, to: number): T[] {
  const result = [...arr]
  const item = result.splice(from, 1)[0]
  result.splice(to, 0, item)
  return result
}

/**
 * 数组排序（支持对象数组）
 * @param arr 数组
 * @param key 排序键名
 * @param order 排序方向（asc-升序，desc-降序）
 * @returns 排序后的新数组
 */
export function sortBy<T>(arr: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  const result = [...arr]
  return result.sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    if (aVal < bVal) return order === 'asc' ? -1 : 1
    if (aVal > bVal) return order === 'asc' ? 1 : -1
    return 0
  })
}

