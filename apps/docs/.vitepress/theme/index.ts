import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import './custom.css'

// 导入 Element Plus 样式
import 'element-plus/dist/index.css'

// 导入 demoblock 样式
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'

// 导入组件库样式（使用相对路径指向源码）
import '../../../../packages/ui/src/styles/theme.css'

// 导入所有组件（使用相对路径指向源码）
import * as XUX from '../../../../packages/ui/src/index'

// 导入 demoblock 组件
import { useComponents } from './useComponents'

// 导入磁性效果
import { initMagneticEffect } from './magnetic-effect'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    // 注册 demoblock 组件
    useComponents(app)
    
    // 注册所有 XUX 组件
    // @ts-ignore - 动态组件注册可能包含非组件对象
    Object.entries(XUX).forEach(([name, component]) => {
      // 只注册真正的组件（以X开头且不是函数）
      if (name.startsWith('X') && typeof component !== 'function') {
        app.component(name, component)
      }
    })

    // 初始化磁性效果（仅在浏览器端）
    if (typeof window !== 'undefined') {
      // 路由变化时重新初始化
      router.onAfterRouteChanged = () => {
        setTimeout(() => {
          initMagneticEffect()
        }, 100)
      }
      
      // 首次加载
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          initMagneticEffect()
        }, 500)
      }
    }
  }
} satisfies Theme
