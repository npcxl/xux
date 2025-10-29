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
  sitemap: {
    hostname: 'https://xux.xlcig.cn'
  },
  
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'canonical', href: 'https://xux.xlcig.cn' }],
    ['meta', { name: 'theme-color', content: '#1a1a1a' }],
    ['meta', { name: 'author', content: 'XUX Team' }],
    ['meta', { name: 'keywords', content: 'Vue3, 组件库, UI组件库, 电商, TypeScript, XUX, Vue UI, 前端组件, 开源组件库, VitePress' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'googlebot', content: 'index, follow' }],
    
    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://xux.xlcig.cn' }],
    ['meta', { property: 'og:site_name', content: 'XUX' }],
    ['meta', { property: 'og:title', content: 'XUX - Vue3 电商组件库' }],
    ['meta', { property: 'og:description', content: '专为电商平台打造的现代化 UI 组件库，提供丰富的 Vue3 组件和完善的文档' }],
    ['meta', { property: 'og:image', content: 'https://xux.xlcig.cn/logo.png' }],
    
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'XUX - Vue3 电商组件库' }],
    ['meta', { name: 'twitter:description', content: '专为电商平台打造的现代化 UI 组件库' }],
    ['meta', { name: 'twitter:image', content: 'https://xux.xlcig.cn/logo.png' }],
    
    // Baidu verification (如果需要百度收录)
    ['meta', { name: 'baidu-site-verification', content: 'codeValue' }],
    
    // Baidu Analytics (百度统计)
    ['script', {}, `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?b114320f3d7780a049bb020c503a2850";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    `]
  ],

  themeConfig: {
    logo: {
      light: '/logo.png',
      dark: '/logo.png',
      alt: 'XUX'
    },
    siteTitle: 'XUX-UI',
    
    nav: [
      { text: '指南', link: '/guide/introduction' },
      { text: '组件', link: '/components/button' },
      { text: 'API 工具', link: '/api/' },
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
          text:"主题",
          items: [
            { text: '主题化配置', link: '/components/theme-config' },
          ]
        },
        {
          text: '通用',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Link 链接', link: '/components/link' },
            { text: 'Tag 标签', link: '/components/tag' },
            { text: 'Search 搜索', link: '/components/search' },
            { text: 'Table 表格(测试版)', link: '/components/table' },
            { text: 'Icon 图标', link: '/components/icon' },
          ]
        },
        {
          text: '导航',
          items: [
            { text: 'Tabs 标签页', link: '/components/tabs' },
          ]
        },
        {
          text: '布局',
          items: [
            { text: 'Flex 弹性布局', link: '/components/flex' },
            { text: 'Grid 网格布局', link: '/components/grid' },
            { text: 'Card 卡片', link: '/components/card' },
            { text: 'Divider 分割线', link: '/components/divider' },
            { text: 'Menu 菜单', link: '/components/menu' },
         
          ]
        },
        {
          text: '表单',
          items: [
            { text: 'Form 表单', link: '/components/form' },
            { text: 'Input 输入框', link: '/components/input' },
            { text: 'Select 选择器', link: '/components/select' },
            { text: 'Checkboxes 多选框', link: '/components/checkboxes' },
            { text: 'Radio 单选框', link: '/components/radio' },
            { text: 'CountrySelect 国家选择', link: '/components/country-select' },
            { text: 'RegionCascader 地区级联', link: '/components/region-cascader' },
            { text: 'Switch 开关', link: '/components/switch' },
            { text: 'DateTimePicker 日期时间选择器', link: '/components/datetime-picker' },
            { text: 'Color 颜色选择器', link: '/components/color' },
          ]
        },
        {
          text: '数据展示',
          items: [
            { text: 'Carousel 走马灯', link: '/components/carousel' },
            { text: 'Timeline 时间轴', link: '/components/timeline' },
            { text: 'Tree 树形控件', link: '/components/tree' },
            { text: 'Accordion 手风琴', link: '/components/accordion' },
            { text: 'Skeleton 骨架屏', link: '/components/skeleton' },
            { text: 'ThumbnailContainer 缩略图容器', link: '/components/thumbnail-container' },
            { text: 'Score 评分', link: '/components/score' },
            { text:'Qrcode 二维码',link:'/components/qrcode'},
            { text: 'Segmented 分段控制器', link: '/components/segmented' },
            { text: 'Badge 徽标', link: '/components/badge' },
            { text: 'Image 图片', link: '/components/image' },
            { text: 'DragSort 拖拽排序', link: '/components/drag-sort' },
            { text: 'Pagination 分页', link: '/components/pagination' },
            { text: 'List 列表', link: '/components/list' },
          ]
        },
        {
          text: '反馈',
          items: [
            { text: 'Alert 警告提示', link: '/components/alert' },
            { text: 'Modal 弹窗', link: '/components/modal' },
            { text: 'Drawer 抽屉', link: '/components/drawer' },
            { text: 'Msg 消息提示', link: '/components/msg' },
            { text: 'Tooltips 提示框', link: '/components/tooltips' },
            { text: 'Dropdown 下拉容器', link: '/components/dropdown' },
            { text: 'Popconfirm 气泡确认框', link: '/components/popconfirm' },
            { text: 'Result 结果', link: '/components/result' },
            { text: 'Chat 聊天', link: '/components/chat' },
            { text: 'Loading 加载中', link: '/components/loading' },
            { text: 'Tour 漫游式引导', link: '/components/tour' },
          ]
        },
        {
          text: '高级布局组件',
          items: [
            { text: 'DynamicMech 动画网格', link: '/components/dynamic-mech' },
          ]
        },
        {
          text: '特殊效果',
          items: [
            { text: '特殊动画效果', link: '/components/special-effects' },
          ]
        },
        {
          text: '时间处理',
          items: [
            { text: '时间处理函数', link: '/components/datetime-functions' },
          ]
        }
      ],

      '/api/': [
        {
          text: 'API 工具',
          items: [
            { text: '工具函数总览', link: '/api/' },
          ]
        },
        {
          text: '基础工具',
          items: [
            { text: '验证工具', link: '/api/validate'},
            { text: '类型检查', link: '/api/type' },
            { text: '字符串工具', link: '/api/string' },
            { text: '数组工具', link: '/api/array' },
            { text: '对象工具', link: '/api/object' },
          ]
        },
        {
          text: '格式化工具',
          items: [
            { text: '格式化工具', link: '/api/format' },
            { text: '数学工具', link: '/api/math' },
            { text: '颜色工具', link: '/api/color' },
          ]
        },
        {
          text: '网络与存储',
          items: [
            { text: 'WebSocket 工具', link: '/api/websocket' },
            { text: '存储工具', link: '/api/storage' },
            { text: 'URL 工具', link: '/api/url' },
          ]
        },
        {
          text: '高级功能',
          items: [
            { text: '函数工具', link: '/api/function' },
            { text: '树结构工具', link: '/api/tree' },
            { text: '文件工具', link: '/api/file' },
            { text: 'DOM 工具', link: '/api/dom' },
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
    server: {
      host: '0.0.0.0', // 允许外部访问
      port: 1234, // 自定义端口
      strictPort: false, // 如果端口被占用，自动尝试下一个可用端口
    },
    plugins: [
      UnoCSS(),
      demoblockVitePlugin(),
    ],
    resolve: {
      alias: {
        '@xlui/xux-ui': path.resolve(__dirname, '../../../packages/ui/src/index.ts'),
        '@xux/ui': path.resolve(__dirname, '../../../packages/ui/src/index.ts')
      }
    },
    worker: {
      format: 'es'
    },
    optimizeDeps: {
      exclude: ['@xlui/xux-ui', '@xux/ui']
    },
    ssr: {
      noExternal: ['element-plus']
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
