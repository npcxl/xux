import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import './custom.css'

// 导入 demoblock 样式
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'

// 导入组件库样式（使用相对路径指向源码）
import '../../../../packages/ui/src/styles/theme.css'

// 导入所有组件（使用相对路径指向源码）
import * as XUX from '../../../../packages/ui/src/index'

// 导入 demoblock 组件
import { useComponents } from './useComponents'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册 demoblock 组件
    useComponents(app)
    
    // 注册所有 XUX 组件
    Object.entries(XUX).forEach(([name, component]) => {
      if (name.startsWith('X')) {
        app.component(name, component)
      }
    })
  }
} satisfies Theme
