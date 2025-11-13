import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    name: 'XUX React',
    logo: '/logo.png',
    nav: [
      { title: '指南', link: '/guide' },
      { title: '组件', link: '/components/button' },
      { 
        title: 'Vue 版本', 
        link: 'https://xux.xlcig.cn' 
      },
      { 
        title: 'Gitee', 
        link: 'https://gitee.com/leheya/xux' 
      },
    ],
    footer: 'XUX React | Made with ❤️',
  },
  
  // 输出目录
  outputPath: 'dist',
  
  // 多语言
  locales: [
    { id: 'zh-CN', name: '中文' },
  ],
  
  // 主题
  styles: [
    './.dumi/theme.css',
  ],
  
  // 配置别名
  alias: {
    '@xlui/xux-react': '../../packages/react/src',
  },
  
  // 更多配置
  favicons: ['/logo.png'],
  
  resolve: {
    // 自动解析为文档的目录
    docDirs: ['docs'],
    // 指定组件入口文件
    entryFile: '../../packages/react/src/index.ts',
  },
});

