/**
 * 对象工具函数
 */

/**
 * 深拷贝
 * @param obj 对象
 * @returns 深拷贝后的对象
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj
  
  if (obj instanceof Date) return new Date(obj.getTime()) as any
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags) as any
  if (obj instanceof Map) {
    const cloned = new Map()
    obj.forEach((value, key) => {
      cloned.set(deepClone(key), deepClone(value))
    })
    return cloned as any
  }
  if (obj instanceof Set) {
    const cloned = new Set()
    obj.forEach(value => {
      cloned.add(deepClone(value))
    })
    return cloned as any
  }
  
  const cloned = (Array.isArray(obj) ? [] : {}) as T
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key])
    }
  }
  return cloned
}

/**
 * 对象深度合并
 * @param target 目标对象
 * @param sources 源对象
 * @returns 合并后的对象
 */
export function deepMerge<T extends Record<string, any>>(target: T, ...sources: Partial<T>[]): T {
  if (!sources.length) return target
  
  const source = sources.shift()
  if (!source) return target
  
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        deepMerge(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }
  
  return deepMerge(target, ...sources)
}

function isObject(item: any): item is Record<string, any> {
  return item && typeof item === 'object' && !Array.isArray(item)
}

/**
 * 获取对象指定路径的值
 * @param obj 对象
 * @param path 路径（支持 'a.b.c' 或 ['a', 'b', 'c']）
 * @param defaultValue 默认值
 * @returns 路径对应的值
 */
export function get<T = any>(obj: any, path: string | string[], defaultValue?: T): T {
  const keys = Array.isArray(path) ? path : path.split('.')
  let result = obj
  
  for (const key of keys) {
    if (result === null || result === undefined) {
      return defaultValue as T
    }
    result = result[key]
  }
  
  return result === undefined ? defaultValue as T : result
}

/**
 * 设置对象指定路径的值
 * @param obj 对象
 * @param path 路径（支持 'a.b.c' 或 ['a', 'b', 'c']）
 * @param value 值
 * @returns 修改后的对象
 */
export function set<T extends Record<string, any>>(obj: T, path: string | string[], value: any): T {
  const keys = Array.isArray(path) ? path : path.split('.')
  let current = obj
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {}
    }
    current = current[key]
  }
  
  current[keys[keys.length - 1]] = value
  return obj
}

/**
 * 删除对象指定路径的值
 * @param obj 对象
 * @param path 路径（支持 'a.b.c' 或 ['a', 'b', 'c']）
 * @returns 修改后的对象
 */
export function unset<T extends Record<string, any>>(obj: T, path: string | string[]): T {
  const keys = Array.isArray(path) ? path : path.split('.')
  let current = obj
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!(key in current)) return obj
    current = current[key]
  }
  
  delete current[keys[keys.length - 1]]
  return obj
}

/**
 * 判断对象是否有指定路径
 * @param obj 对象
 * @param path 路径（支持 'a.b.c' 或 ['a', 'b', 'c']）
 * @returns 是否存在
 */
export function has(obj: any, path: string | string[]): boolean {
  const keys = Array.isArray(path) ? path : path.split('.')
  let current = obj
  
  for (const key of keys) {
    if (!current || !(key in current)) return false
    current = current[key]
  }
  
  return true
}

/**
 * 提取对象的指定属性
 * @param obj 对象
 * @param keys 属性名数组
 * @returns 新对象
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key]
    }
  })
  return result
}

/**
 * 排除对象的指定属性
 * @param obj 对象
 * @param keys 要排除的属性名数组
 * @returns 新对象
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj }
  keys.forEach(key => {
    delete result[key]
  })
  return result
}

/**
 * 对象键值互换
 * @param obj 对象
 * @returns 键值互换后的对象
 */
export function invert<T extends Record<string, string | number>>(obj: T): Record<string, string> {
  const result: Record<string, string> = {}
  for (const key in obj) {
    result[String(obj[key])] = key
  }
  return result
}

/**
 * 对象键名转换
 * @param obj 对象
 * @param converter 转换函数
 * @returns 转换后的对象
 */
export function mapKeys<T extends Record<string, any>>(
  obj: T,
  converter: (key: string) => string
): Record<string, any> {
  const result: Record<string, any> = {}
  for (const key in obj) {
    result[converter(key)] = obj[key]
  }
  return result
}

/**
 * 对象值转换
 * @param obj 对象
 * @param converter 转换函数
 * @returns 转换后的对象
 */
export function mapValues<T extends Record<string, any>, R>(
  obj: T,
  converter: (value: any, key: string) => R
): Record<string, R> {
  const result: Record<string, R> = {}
  for (const key in obj) {
    result[key] = converter(obj[key], key)
  }
  return result
}

/**
 * 移除对象中的 null 和 undefined 值
 * @param obj 对象
 * @returns 清理后的对象
 */
export function compactObject<T extends Record<string, any>>(obj: T): Partial<T> {
  const result: any = {}
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== undefined) {
      result[key] = obj[key]
    }
  }
  return result
}

/**
 * 对象比较（深度比较）
 * @param obj1 对象1
 * @param obj2 对象2
 * @returns 是否相等
 */
export function isEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true
  
  if (obj1 === null || obj2 === null || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return obj1 === obj2
  }
  
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  
  if (keys1.length !== keys2.length) return false
  
  for (const key of keys1) {
    if (!keys2.includes(key) || !isEqual(obj1[key], obj2[key])) {
      return false
    }
  }
  
  return true
}

