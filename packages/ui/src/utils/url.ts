/**
 * URL 和浏览器工具函数
 */

/**
 * 解析 URL 参数
 * @param url URL 字符串（默认为当前页面 URL）
 * @returns 参数对象
 */
export function parseUrlParams(url?: string): Record<string, string> {
  const urlStr = url || window.location.href
  const params: Record<string, string> = {}
  const searchParams = new URL(urlStr).searchParams
  
  searchParams.forEach((value, key) => {
    params[key] = value
  })
  
  return params
}

/**
 * 获取 URL 参数
 * @param key 参数名
 * @param url URL 字符串（默认为当前页面 URL）
 * @returns 参数值
 */
export function getUrlParam(key: string, url?: string): string | null {
  const urlStr = url || window.location.href
  return new URL(urlStr).searchParams.get(key)
}

/**
 * 构建 URL 参数字符串
 * @param params 参数对象
 * @returns 参数字符串
 */
export function buildUrlParams(params: Record<string, any>): string {
  const searchParams = new URLSearchParams()
  
  Object.keys(params).forEach(key => {
    const value = params[key]
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value))
    }
  })
  
  return searchParams.toString()
}

/**
 * 拼接 URL
 * @param baseUrl 基础 URL
 * @param params 参数对象
 * @returns 完整 URL
 */
export function buildUrl(baseUrl: string, params?: Record<string, any>): string {
  if (!params || Object.keys(params).length === 0) {
    return baseUrl
  }
  
  const paramStr = buildUrlParams(params)
  const separator = baseUrl.includes('?') ? '&' : '?'
  return `${baseUrl}${separator}${paramStr}`
}

/**
 * 添加 URL 参数
 * @param url URL 字符串
 * @param params 要添加的参数
 * @returns 新的 URL
 */
export function addUrlParams(url: string, params: Record<string, any>): string {
  const urlObj = new URL(url)
  
  Object.keys(params).forEach(key => {
    const value = params[key]
    if (value !== null && value !== undefined) {
      urlObj.searchParams.set(key, String(value))
    }
  })
  
  return urlObj.toString()
}

/**
 * 删除 URL 参数
 * @param url URL 字符串
 * @param keys 要删除的参数名
 * @returns 新的 URL
 */
export function removeUrlParams(url: string, keys: string[]): string {
  const urlObj = new URL(url)
  
  keys.forEach(key => {
    urlObj.searchParams.delete(key)
  })
  
  return urlObj.toString()
}

/**
 * 判断是否为绝对 URL
 * @param url URL 字符串
 * @returns 是否为绝对 URL
 */
export function isAbsoluteUrl(url: string): boolean {
  return /^https?:\/\//i.test(url)
}

/**
 * 获取域名
 * @param url URL 字符串（默认为当前页面 URL）
 * @returns 域名
 */
export function getDomain(url?: string): string {
  const urlStr = url || window.location.href
  return new URL(urlStr).hostname
}

/**
 * 获取顶级域名
 * @param url URL 字符串（默认为当前页面 URL）
 * @returns 顶级域名
 */
export function getTopDomain(url?: string): string {
  const domain = getDomain(url)
  const parts = domain.split('.')
  return parts.length >= 2 ? parts.slice(-2).join('.') : domain
}

/**
 * 打开新窗口
 * @param url URL 地址
 * @param target 目标窗口（默认为 _blank）
 * @param features 窗口特性
 */
export function openWindow(url: string, target = '_blank', features?: string): Window | null {
  return window.open(url, target, features)
}

/**
 * 下载文件
 * @param url 文件 URL
 * @param filename 文件名
 */
export function downloadFile(url: string, filename?: string): void {
  const link = document.createElement('a')
  link.href = url
  link.download = filename || url.split('/').pop() || 'download'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * 下载 Blob
 * @param blob Blob 对象
 * @param filename 文件名
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  downloadFile(url, filename)
  URL.revokeObjectURL(url)
}

/**
 * 复制到剪贴板
 * @param text 要复制的文本
 * @returns 是否成功
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // 降级方案
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      const success = document.execCommand('copy')
      document.body.removeChild(textarea)
      return success
    }
  } catch (error) {
    console.error('复制失败:', error)
    return false
  }
}

/**
 * 从剪贴板读取
 * @returns 剪贴板文本
 */
export async function readFromClipboard(): Promise<string> {
  try {
    if (navigator.clipboard) {
      return await navigator.clipboard.readText()
    }
    return ''
  } catch (error) {
    console.error('读取剪贴板失败:', error)
    return ''
  }
}

/**
 * 滚动到顶部
 * @param behavior 滚动行为（默认为 smooth）
 */
export function scrollToTop(behavior: ScrollBehavior = 'smooth'): void {
  window.scrollTo({ top: 0, behavior })
}

/**
 * 滚动到底部
 * @param behavior 滚动行为（默认为 smooth）
 */
export function scrollToBottom(behavior: ScrollBehavior = 'smooth'): void {
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior })
}

/**
 * 滚动到指定元素
 * @param selector 选择器或元素
 * @param behavior 滚动行为（默认为 smooth）
 */
export function scrollToElement(selector: string | HTMLElement, behavior: ScrollBehavior = 'smooth'): void {
  const element = typeof selector === 'string' ? document.querySelector(selector) : selector
  element?.scrollIntoView({ behavior })
}

/**
 * 全屏显示元素
 * @param element 元素（默认为 document.documentElement）
 */
export function requestFullscreen(element: HTMLElement = document.documentElement): Promise<void> {
  if (element.requestFullscreen) {
    return element.requestFullscreen()
  }
  return Promise.reject(new Error('不支持全屏'))
}

/**
 * 退出全屏
 */
export function exitFullscreen(): Promise<void> {
  if (document.exitFullscreen) {
    return document.exitFullscreen()
  }
  return Promise.reject(new Error('不支持全屏'))
}

/**
 * 是否全屏状态
 */
export function isFullscreen(): boolean {
  return !!document.fullscreenElement
}

/**
 * 获取浏览器信息
 */
export function getBrowserInfo(): {
  name: string
  version: string
} {
  const ua = navigator.userAgent
  let name = 'Unknown'
  let version = 'Unknown'
  
  if (ua.indexOf('Firefox') > -1) {
    name = 'Firefox'
    version = ua.match(/Firefox\/(\d+\.\d+)/)?.[1] || 'Unknown'
  } else if (ua.indexOf('Edg') > -1) {
    name = 'Edge'
    version = ua.match(/Edg\/(\d+\.\d+)/)?.[1] || 'Unknown'
  } else if (ua.indexOf('Chrome') > -1) {
    name = 'Chrome'
    version = ua.match(/Chrome\/(\d+\.\d+)/)?.[1] || 'Unknown'
  } else if (ua.indexOf('Safari') > -1) {
    name = 'Safari'
    version = ua.match(/Version\/(\d+\.\d+)/)?.[1] || 'Unknown'
  }
  
  return { name, version }
}

/**
 * 获取操作系统信息
 */
export function getOSInfo(): string {
  const ua = navigator.userAgent
  
  if (ua.indexOf('Win') > -1) return 'Windows'
  if (ua.indexOf('Mac') > -1) return 'MacOS'
  if (ua.indexOf('Linux') > -1) return 'Linux'
  if (ua.indexOf('Android') > -1) return 'Android'
  if (ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) return 'iOS'
  
  return 'Unknown'
}

/**
 * 是否为移动设备
 */
export function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

/**
 * 是否为微信浏览器
 */
export function isWechat(): boolean {
  return /MicroMessenger/i.test(navigator.userAgent)
}

/**
 * 页面可见性
 */
export function onVisibilityChange(callback: (visible: boolean) => void): () => void {
  const handleChange = () => {
    callback(!document.hidden)
  }
  
  document.addEventListener('visibilitychange', handleChange)
  
  return () => {
    document.removeEventListener('visibilitychange', handleChange)
  }
}

/**
 * 监听网络状态
 */
export function onNetworkChange(callback: (online: boolean) => void): () => void {
  const handleOnline = () => callback(true)
  const handleOffline = () => callback(false)
  
  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)
  
  return () => {
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)
  }
}

