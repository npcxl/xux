/**
 * Loading 加载提示组件
 * 支持全屏加载和区域加载
 */

import { createApp, h, ref, App as VueApp } from 'vue'
import XIcon from '../components/Icon/index.vue'

export interface LoadingOptions {
  /** 加载文本 */
  text?: string
  /** 是否全屏加载 */
  fullscreen?: boolean
  /** 加载图标名称（loading, loading-2, loading-3, loading-4, loading-5, loading-6） */
  icon?: 'loading' | 'loading-2' | 'loading-3' | 'loading-4' | 'loading-5' | 'loading-6'
  /** 自定义图片 URL */
  image?: string
  /** 背景遮罩透明度 0-1 */
  opacity?: number
  /** 是否显示背景遮罩 */
  background?: boolean
  /** 目标元素（区域加载时使用） */
  target?: HTMLElement | string
}

let loadingInstance: { close: () => void; app?: VueApp } | null = null

export const xlLoading = () => {
  // 创建加载组件
  const show = (options: LoadingOptions = {}) => {
    const {
      text = '加载中...',
      fullscreen = true,
      icon = 'loading',
      image,
      opacity = 0.7,
      background = true,
      target
    } = options

    // 获取目标元素
    let targetElement: HTMLElement | null = null
    if (!fullscreen && target) {
      targetElement = typeof target === 'string' 
        ? document.querySelector(target) 
        : target
      
      if (!targetElement) {
        console.warn('Loading target element not found')
        return { close: () => {} }
      }
    }

    // 创建挂载容器
    const container = document.createElement('div')
    container.className = 'xl-loading-container'
    
    // 设置容器样式
    const isAbsolute = !fullscreen && targetElement
    const baseStyle = `
      position: ${isAbsolute ? 'absolute' : 'fixed'};
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: ${isAbsolute ? 999 : 9999};
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.3s ease;
      opacity: 0;
    `
    
    const bgStyle = background 
      ? `background: rgba(255, 255, 255, ${opacity});
         backdrop-filter: blur(4px);
         -webkit-backdrop-filter: blur(4px);`
      : ''
    
    container.style.cssText = baseStyle + bgStyle

    // 创建内容容器
    const contentDiv = document.createElement('div')
    contentDiv.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    `

    // 创建图标或图片
    if (image) {
      const img = document.createElement('img')
      img.src = image
      img.alt = 'loading'
      img.style.cssText = `
        width: 80px;
        height: 80px;
        object-fit: contain;
        animation: xl-loading-bounce 1s ease-in-out infinite;
      `
      contentDiv.appendChild(img)
    } else {
      // 创建图标容器
      const iconContainer = document.createElement('div')
      iconContainer.style.cssText = `color: #3b82f6;`
      
      // 使用 Vue 挂载 Icon 组件
      const iconApp = createApp({
        render() {
          return h(XIcon, {
            name: icon,
            size: 48
          })
        }
      })
      iconApp.mount(iconContainer)
      contentDiv.appendChild(iconContainer)
    }

    // 创建文本
    if (text) {
      const textDiv = document.createElement('div')
      textDiv.textContent = text
      textDiv.style.cssText = `
        color: #1a1a1a;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        animation: xl-loading-fade 1.5s ease-in-out infinite;
      `
      contentDiv.appendChild(textDiv)
    }

    container.appendChild(contentDiv)

    // 添加动画样式
    if (!document.getElementById('xl-loading-styles')) {
      const style = document.createElement('style')
      style.id = 'xl-loading-styles'
      style.textContent = `
        @keyframes xl-loading-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes xl-loading-fade {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `
      document.head.appendChild(style)
    }

    // 保存原始定位
    const originalPosition = targetElement?.style.position

    // 插入到目标元素或 body
    if (targetElement) {
      // 区域加载：设置目标元素为相对定位
      if (!originalPosition || originalPosition === 'static') {
        targetElement.style.position = 'relative'
      }
      targetElement.appendChild(container)
    } else {
      document.body.appendChild(container)
    }

    // 显示动画
    requestAnimationFrame(() => {
      container.style.opacity = '1'
    })

    // 关闭函数
    const close = () => {
      container.style.opacity = '0'
      setTimeout(() => {
        if (container.parentNode) {
          container.parentNode.removeChild(container)
        }
        // 恢复目标元素的定位
        if (targetElement && originalPosition) {
          targetElement.style.position = originalPosition
        }
        if (loadingInstance && loadingInstance.close === close) {
          loadingInstance = null
        }
      }, 300)
    }

    const instance = { close }
    
    // 保存全屏加载实例
    if (fullscreen || !targetElement) {
      loadingInstance = instance
    }

    return instance
  }

  // 关闭当前加载
  const close = () => {
    if (loadingInstance) {
      loadingInstance.close()
      loadingInstance = null
    }
  }

  return {
    show,
    close
  }
}

// 快捷方法
export const useLoading = xlLoading

// 默认导出
export default xlLoading
