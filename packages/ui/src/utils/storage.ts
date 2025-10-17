/**
 * 本地存储工具函数
 * 提供 localStorage 和 sessionStorage 的封装
 */

export type StorageType = 'local' | 'session'

/**
 * 存储配置
 */
export interface StorageOptions {
  /** 存储类型 */
  type?: StorageType
  /** 过期时间（毫秒） */
  expires?: number
  /** 加密函数 */
  encrypt?: (data: string) => string
  /** 解密函数 */
  decrypt?: (data: string) => string
}

/**
 * 存储数据结构
 */
interface StorageData<T> {
  value: T
  expires?: number
}

class Storage {
  private storage: globalThis.Storage | null

  constructor(type: StorageType = 'local') {
    // SSR 环境检查
    if (typeof window === 'undefined') {
      this.storage = null
    } else {
      this.storage = type === 'local' ? localStorage : sessionStorage
    }
  }

  /**
   * 设置存储
   */
  set<T = any>(key: string, value: T, options?: StorageOptions): void {
    if (!this.storage) return
    
    try {
      const data: StorageData<T> = { value }

      if (options?.expires) {
        data.expires = Date.now() + options.expires
      }

      let dataStr = JSON.stringify(data)

      if (options?.encrypt) {
        dataStr = options.encrypt(dataStr)
      }

      this.storage.setItem(key, dataStr)
    } catch (error) {
      console.error('存储失败:', error)
    }
  }

  /**
   * 获取存储
   */
  get<T = any>(key: string, options?: StorageOptions): T | null {
    if (!this.storage) return null
    
    try {
      let dataStr = this.storage.getItem(key)
      if (!dataStr) return null

      if (options?.decrypt) {
        dataStr = options.decrypt(dataStr)
      }

      const data: StorageData<T> = JSON.parse(dataStr)

      // 检查是否过期
      if (data.expires && Date.now() > data.expires) {
        this.remove(key)
        return null
      }

      return data.value
    } catch (error) {
      console.error('获取存储失败:', error)
      return null
    }
  }

  /**
   * 移除存储
   */
  remove(key: string): void {
    if (!this.storage) return
    this.storage.removeItem(key)
  }

  /**
   * 清空存储
   */
  clear(): void {
    if (!this.storage) return
    this.storage.clear()
  }

  /**
   * 获取所有键
   */
  keys(): string[] {
    if (!this.storage) return []
    return Object.keys(this.storage)
  }

  /**
   * 获取存储大小（字节）
   */
  size(): number {
    if (!this.storage) return 0
    
    let size = 0
    for (const key in this.storage) {
      if (this.storage.hasOwnProperty(key)) {
        size += this.storage[key].length + key.length
      }
    }
    return size
  }

  /**
   * 是否存在某个键
   */
  has(key: string): boolean {
    if (!this.storage) return false
    return this.storage.getItem(key) !== null
  }
}

// 导出实例
export const localStore = new Storage('local')
export const sessionStore = new Storage('session')

// 导出便捷方法
export const setLocal = <T = any>(key: string, value: T, options?: StorageOptions) => {
  localStore.set(key, value, options)
}

export const getLocal = <T = any>(key: string, options?: StorageOptions): T | null => {
  return localStore.get<T>(key, options)
}

export const removeLocal = (key: string) => {
  localStore.remove(key)
}

export const clearLocal = () => {
  localStore.clear()
}

export const setSession = <T = any>(key: string, value: T, options?: StorageOptions) => {
  sessionStore.set(key, value, options)
}

export const getSession = <T = any>(key: string, options?: StorageOptions): T | null => {
  return sessionStore.get<T>(key, options)
}

export const removeSession = (key: string) => {
  sessionStore.remove(key)
}

export const clearSession = () => {
  sessionStore.clear()
}

/**
 * Cookie 工具
 */
export const cookie = {
  /**
   * 设置 Cookie
   */
  set(name: string, value: string, days?: number, path = '/'): void {
    if (typeof document === 'undefined') return
    
    let expires = ''
    if (days) {
      const date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      expires = `; expires=${date.toUTCString()}`
    }
    document.cookie = `${name}=${value}${expires}; path=${path}`
  },

  /**
   * 获取 Cookie
   */
  get(name: string): string | null {
    if (typeof document === 'undefined') return null
    
    const nameEQ = `${name}=`
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  },

  /**
   * 删除 Cookie
   */
  remove(name: string, path = '/'): void {
    if (typeof document === 'undefined') return
    this.set(name, '', -1, path)
  },

  /**
   * 清空所有 Cookie
   */
  clear(): void {
    if (typeof document === 'undefined') return
    
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i]
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      this.remove(name.trim())
    }
  }
}

