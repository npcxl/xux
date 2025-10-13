/**
 * 首页跑马灯效果
 * 特性卡片双行跑马灯，一行向左，一行向右
 */

export function initMagneticEffect() {
  if (typeof window === 'undefined') return

  // 初始化跑马灯
  const initMarquee = () => {
    // 避免重复初始化
    if ((window as any).__xuxMarqueeInited) return
    const featuresContainer = document.querySelector('.VPFeatures')
    if (!featuresContainer) return

    const items = featuresContainer.querySelector('.items')
    if (!items) return

    // 获取所有特性卡片
    const features = Array.from(items.children)
    if (features.length === 0) return

    // 清空原容器
    items.innerHTML = ''

    // 将卡片分成两行
    const midPoint = Math.ceil(features.length / 2)
    const row1Features = features.slice(0, midPoint)
    const row2Features = features.slice(midPoint)

    // 创建第一行（向左滚动）
    const row1 = document.createElement('div')
    row1.className = 'marquee-row'
    const row1Container = document.createElement('div')
    row1Container.className = 'marquee-container'
    
    // 添加第一行卡片（复制4次与-25%位移匹配，实现无缝循环）
    for (let i = 0; i < 4; i++) {
      row1Features.forEach(feature => {
        row1Container.appendChild(feature.cloneNode(true))
      })
    }
    
    row1.appendChild(row1Container)
    items.appendChild(row1)

    // 创建第二行（向右滚动）
    const row2 = document.createElement('div')
    row2.className = 'marquee-row'
    const row2Container = document.createElement('div')
    row2Container.className = 'marquee-container'
    
    // 添加第二行卡片（复制4次与-25%位移匹配，实现无缝循环）
    for (let i = 0; i < 4; i++) {
      row2Features.forEach(feature => {
        row2Container.appendChild(feature.cloneNode(true))
      })
    }
    
    row2.appendChild(row2Container)
    items.appendChild(row2)

    ;(window as any).__xuxMarqueeInited = true
  }

  // 初始化
  const init = () => {
    // 检查是否在首页
    const isHomePage = () => {
      return window.location.pathname === '/' || window.location.pathname === '/index.html'
    }

    // 设置跑马灯
    const setupMarquee = () => {
      if (!isHomePage()) {
        return
      }

      // 初始化跑马灯
      setTimeout(initMarquee, 100)
    }

    // 等待DOM加载完成
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupMarquee)
    } else {
      setupMarquee()
    }

    // 监听路由变化（VitePress的路由）
    setTimeout(setupMarquee, 500)
  }

  init()

  return () => {}
}

