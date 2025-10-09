import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock'
import path from 'path'

export default defineConfig({
  title: 'XUX',
  description: 'Vue3 电商组件库 - 专为电商平台打造的现代化 UI 组件库',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  
  head: [
    ['link', { rel: 'icon', href: '/logo.PNG' }],
    ['meta', { name: 'theme-color', content: '#1a1a1a' }],
    ['meta', { name: 'keywords', content: 'Vue3, 组件库, UI, 电商, TypeScript, XUX' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'XUX - Vue3 电商组件库' }],
    ['meta', { property: 'og:description', content: '专为电商平台打造的现代化 UI 组件库' }],
    ['meta', { property: 'og:image', content: '/logo.PNG' }],
  ],

  themeConfig: {
    logo: {
      light: '/logo.PNG',
      dark: '/logo.PNG',
      alt: 'XUX'
    },
    siteTitle: false, // 只显示 logo，不显示文字
    
    nav: [
      { text: '指南', link: '/guide/introduction' },
      { text: '组件', link: '/components/button' },
      { 
        text: '资源',
        items: [
          { text: 'Gitee', link: 'https://gitee.com/leheya/xux' },
          { text: 'npm', link: 'https://www.npmjs.com/package/@xlui/xux-ui' },
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '介绍', link: '/guide/introduction' },
            { text: '安装', link: '/guide/installation' },
            { text: '快速开始', link: '/guide/quickstart' },
          ]
        }
      ],
      '/components/': [
        {
          text: '通用',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
          ]
        },
        {
          text: '布局',
          items: [
            { text: 'Card 卡片', link: '/components/card' },
          ]
        },
        {
          text: '表单',
          items: [
            { text: 'Input 输入框', link: '/components/input' },
            { text: 'Select 选择器', link: '/components/select' },
            { text: 'Checkboxes 多选框', link: '/components/checkboxes' },
            { text: 'CountrySelect 国家选择', link: '/components/country-select' },
          ]
        },
        {
          text: '数据展示',
          items: [
            { text: 'Accordion 手风琴', link: '/components/accordion' },
            { text: 'Skeleton 骨架屏', link: '/components/skeleton' },
            { text: 'ThumbnailContainer 缩略图容器', link: '/components/thumbnail-container' },
          ]
        },
        {
          text: '反馈',
          items: [
            { text: 'Alert 警告提示', link: '/components/alert' },
            { text: 'Modal 弹窗', link: '/components/modal' },
            { text: 'Msg 消息提示', link: '/components/msg' },
            { text: 'Tooltips 提示框', link: '/components/tooltips' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://gitee.com/leheya/xux' },
    ],

    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2025-present XUX'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      level: [2, 3],
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  },

  vite: {
    plugins: [
      UnoCSS(),
      demoblockVitePlugin(),
    ],
    resolve: {
      alias: {
        '@xlui/xux-ui': '/../../packages/ui/src/index.ts'
      }
    }
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true,
    config: (md) => {
      md.use(demoblockPlugin, {
        customClass: 'demoblock-custom'
      })
    }
  }
})
